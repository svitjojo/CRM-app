import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
    FacebookAuthProvider,
    fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as GoogleIcon } from '../../icons/google-icon.svg';
import { ReactComponent as FaceBookIcon } from '../../icons/facebook-icon.svg';
import { auth } from '../../firebase';
import { FirebaseError } from 'firebase/app';

export const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [authing, setAuthing] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');

    const emailRex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const createByEmailAndPassword = async (email: string, password: string) => {
        setAuthing(true);

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setErrorMessage('Email or password are invalid');
            setAuthing(false);
        }
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!emailRex.test(email)) {
            setErrorMessage('Email is invalid');

            return;
        } else if (password !== confirmPassword) {
            setErrorMessage('Password is not confirm');

            return;
        }

        createByEmailAndPassword(email, password);
    };

    const signInWithGoogle = async () => {
        setAuthing(true);

        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            navigate('/');
        } catch (error) {
            setAuthing(false);
        }
    };

    const signInWithFacebook = async () => {
        setAuthing(true);

        try {
            await signInWithPopup(auth, new FacebookAuthProvider());
            navigate('/');
        } catch (error) {
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/account-exists-with-different-credential' && error.customData) {
                    const method = await fetchSignInMethodsForEmail(auth, error.customData.email as string);
                    const normalizeMethod = method[0].includes('google') ? 'Google' : 'Facebook';

                    setErrorMessage(`You have already an account with same registered email, please try to sign in with ${normalizeMethod}`);
                }
            }
            setAuthing(false);
        }
    };

    const handlerEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setErrorMessage('');
    };

    const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrorMessage('');
    };

    const handlerConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setErrorMessage('');
    };
    
    return <>
        <Card className="mb-4">
            <Card.Body>
                <h2 className="text-center mb-3">Sign Up</h2>
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
                    <Form.Group className="mb-4">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={handlerConfirmPassword}
                            required
                        />
                    </Form.Group>
                    {/* <Form.Group className="mb-4">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" required />
                    </Form.Group> */}
                    <Button type='submit' className="w-100" disabled={authing}>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div id="recaptcha-container"></div>
        <div className="d-flex align-items-center justify-content-center mb-3">
            <div className="col"><hr /></div>
            <div className="col-auto">OR</div>
            <div className="col"><hr /></div>
        </div>
        <Button
            onClick={() => signInWithGoogle()}
            disabled={authing}
            className="d-flex align-items-center justify-content-center w-100 mb-2"
        >
            <GoogleIcon className="mr-3" />
            Continue with Google
        </Button>
        <Button
            onClick={() => signInWithFacebook()}
            disabled={authing}
            className="d-flex align-items-center justify-content-center w-100 mb-2"
        >
            <FaceBookIcon className="mr-3" />
            Continue with Facebook
        </Button>
    </>;
};
