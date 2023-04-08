import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail
  // RecaptchaVerifier,
  // signInWithPhoneNumber,
} from 'firebase/auth';
import { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from '../../icons/google-icon.svg';
import { ReactComponent as FaceBookIcon } from '../../icons/facebook-icon.svg';
import { auth } from '../../firebase';
import { FirebaseError } from 'firebase/app';

// declare global {
//   interface Window {
//       recaptchaVerifier: RecaptchaVerifier;
//       recaptchaWidgetId: number;
//   }
// }

export const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const [authing, setAuthing] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');

  const emailRex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (emailRex.test(email)) {
      signInByEmailAndPassword(email, password);
    } else {
      setErrorMessage('Email is invalid');
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    setAuthing(true);

    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate('/');
    } catch (error) {
      setAuthing(false);
    }
  };

  const signInWithFacebook = async (): Promise<void> => {
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
  };

  // try {
  //     const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  //     'size': 'invisible',
  //     'callback': (response: Response) => {
  //         // reCAPTCHA solved, allow signInWithPhoneNumb
  //         console.log(response);
  //     }
  //     }, auth);

  //     window.recaptchaVerifier = recaptchaVerifier;
  // } catch (error) {
  //     console.log(error.message);
  // }

  // const signInWithPhone = async () => {
  //     try {
  //         const phoneNumber = "+380981314187";
  //         const appVerifier = window.recaptchaVerifier;
  //         const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  //         const verificationCode = window.prompt('Please enter the verification code sent to your phone');

  //         if (verificationCode) {
  //             return confirmationResult.confirm(verificationCode);
  //         }
  //     } catch (error) {
  //         console.log(error);
  //     }
  //  };

  const handlerEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setErrorMessage('');
  };

  const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    setErrorMessage('');
  };

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
                    {/* <Form.Group id="password-confirm" className="mb-4">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required/>
                    </Form.Group> */}
                    {/* <Form.Group className="mb-4">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" required />
                    </Form.Group> */}
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
        <div id="recaptcha-container"></div>
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
            <GoogleIcon className="mr-3" />
            Continue with Google
        </Button>
        <Button
            onClick={() => { signInWithFacebook(); }}
            disabled={authing}
            className="d-flex align-items-center justify-content-center w-100 mb-2"
        >
            <FaceBookIcon className="mr-3" />
            Continue with Facebook
        </Button>
        {/* <Button
            // onClick={() => signInWithPhone()}
            disabled={authing}
            className="d-flex align-items-center justify-content-center w-100"
        >
            Continue with Phone
        </Button>     */}
    </>;
}
