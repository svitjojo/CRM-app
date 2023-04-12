import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  type ConfirmationResult
} from 'firebase/auth';
import { type FormEvent, useCallback, useState } from 'react';
import { Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../../firebase';
import { FirebaseError } from 'firebase/app';
import { phoneRex } from '../../utils/regExp';
import { sendUserDataToDB } from '../../api/DBFunctions';
import { setUpRecaptcha } from '../../api/userApi';

export const LogIn: React.FC = () => {
  const [authing, setAuthing] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmObj, setConfirmObj] = useState<ConfirmationResult | null>(null);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isCaptchaVisible, setIsCaptchaVisible] = useState<boolean>(true);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(false);
  const [phoneAuthing, setPhoneAuthing] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const signInByEmailAndPassword = async (email: string, password: string): Promise<void> => {
      setAuthing(true);

      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } catch (error) {
        setErrorMessage('Email or password are invalid');
        setAuthing(false);
      }
    };

    signInByEmailAndPassword(email, password);
  }, [email, password]);

  const signInWithGoogle = useCallback(async (): Promise<void> => {
    setAuthing(true);

    try {
      await signInWithPopup(auth, new GoogleAuthProvider());

      navigate('/home');
    } catch {
      setAuthing(false);
    }
  }, []);

  const signInWithFacebook = useCallback(async (): Promise<void> => {
    setAuthing(true);

    try {
      await signInWithPopup(auth, new FacebookAuthProvider());

      navigate('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/account-exists-with-different-credential' && (error.customData != null)) {
          const method = await fetchSignInMethodsForEmail(auth, error.customData.email as string);
          const normalizeMethod = method[0].includes('google') ? 'Google' : 'Facebook';

          setErrorMessage(`You have already an account with same registered email, please try to sign in with ${normalizeMethod}`);
        }
      }
      setAuthing(false);
    }
  }, []);

  const getOtp = useCallback(async (): Promise<void> => {
    try {
      setPhoneAuthing(true);
      const response = await setUpRecaptcha(tel);

      setConfirmObj(response);
      setIsCaptchaVisible(false);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      setPhoneAuthing(false);
    }
  }, [tel]);

  const verifyOtp = useCallback(async (): Promise<void> => {
    try {
      if (confirmObj) {
        await confirmObj.confirm(verificationCode);
        await sendUserDataToDB('', '', '', 'other', 'passenger');
        navigate('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  }, [confirmObj, verificationCode]);

  const handlerEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setErrorMessage('');
  }, []);

  const handlerPassword = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    setErrorMessage('');
  }, []);

  const handlerTel = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!Number.isNaN(+e.target.value)) {
      setTel(e.target.value);
      setIsValidPhone(phoneRex.test(e.target.value));
    }

    setErrorMessage('');
  }, []);

  return <>
    <Card className="mb-4">
      <Card.Body>
        <h2 className="text-center mb-3">Log In</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={handlerEmail}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handlerPassword}
              required
            />
          </Form.Group>
          <Button type='submit' className="w-100" disabled={authing}>Log In</Button>
        </Form>
      </Card.Body>
    </Card>
    <div className="w100 text-center mb-3">
      Don&apos;t have an account?
      <Link to={'/registration'}>
        <span className="ml-1">Sign Up</span>
      </Link>
    </div>
    <div className="d-flex align-items-center justify-content-center mb-3">
      <div className="col"><hr /></div>
      <div className="col-auto">OR</div>
      <div className="col"><hr /></div>
    </div>
    <Button
      onClick={() => { signInWithGoogle(); }}
      disabled={authing}
      className="d-flex align-items-center justify-content-center w-100 mb-2"
    >
      <FcGoogle className="mr-3" />
      Continue with Google
    </Button>
    <Button
      onClick={() => { signInWithFacebook(); }}
      disabled={authing}
      className="d-flex align-items-center justify-content-center w-100 mb-3"
    >
      <FaFacebookF className="mr-3" />
      Continue with Facebook
    </Button>
    <p>Please enter a phone number to Log in with phone :</p>
    <InputGroup className="mb-2">
      <InputGroup.Text style={{ borderRadius: 0 }} className='rounded-left'>Tel :</InputGroup.Text>
      <Form.Control
        type="tel"
        value={tel}
        className='border-left-0'
        onChange={handlerTel}
        placeholder='exp: 380123456789'
        required
      />
    </InputGroup>
    <Button
      onClick={() => { getOtp(); }}
      disabled={!isValidPhone || phoneAuthing}
      className="d-flex align-items-center justify-content-center w-100 mb-3"
    >
      <FaPhoneAlt className="mr-3" />
      Continue with Phone
    </Button>
    {isCaptchaVisible && <div id='recaptcha-container'></div>}
    {!!confirmObj && (
      <>
        <Form.Group className="mb-4 mt-3">
          <Form.Label>Please enter your code: </Form.Label>
          <Form.Control
            type="text"
            value={verificationCode}
            onChange={(e) => { setVerificationCode(e.target.value); }}
          />
        </Form.Group>
        <Button
          onClick={() => { verifyOtp(); }}
          className="d-flex align-items-center justify-content-center w-100"
        >
          Verify
        </Button>
      </>
    )}
  </>;
};
