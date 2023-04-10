import {
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [authing, setAuthing] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');

  const emailRex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const usersCollection = collection(db, 'users');

  const sendUserDataToDB = async (): Promise<void> => {
    try {
      await addDoc(usersCollection, {
        full_name: fullName,
        photo_url: 'https://i.ibb.co/FYhxqJz/04.jpg'
      });
    } catch (error) {
      setErrorMessage('Oops, something went wrong... Please, try again');
    }
  };

  const createUserByEmailAndPassword = async (email: string, password: string): Promise<void> => {
    setAuthing(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendUserDataToDB();
      navigate('/');
    } catch (error) {
      setErrorMessage('Email or password are invalid');
      setAuthing(false);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!emailRex.test(email)) {
      setErrorMessage('Email is invalid');

      return;
    } else if (password !== confirmPassword) {
      setErrorMessage('Password is not confirm');

      return;
    }

    createUserByEmailAndPassword(email, password);
  };

  const handlerFullName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFullName(e.target.value);
  };

  const handlerEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setErrorMessage('');
  };

  const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    setErrorMessage('');
  };

  const handlerConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);
    setErrorMessage('');
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <h2 className="text-center mb-3">Sign Up</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                  type="text"
                  value={fullName}
                  onChange={handlerFullName}
                  required
              />
            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Sex :</Form.Label>
              <div className="d-flex justify-content-around">
                <Form.Check type="radio" label="Male" name='1' />
              <Form.Check type="radio" label="Female" name='1' />
              <Form.Check type="radio" label="Other" name='1'/>
              </div>
            </Form.Group> */}
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                  type="email"
                  value={email}
                  onChange={handlerEmail}
                  required
              />
            </Form.Group>
            <Form.Group className="mb-2">
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
      {/* <Button>Back to Log In</Button> */}
      <div id="recaptcha-container"></div>
    </>
  );
};
