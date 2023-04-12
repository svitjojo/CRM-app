import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useCallback, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { sendUserDataToDB } from '../../api/DBFunctions';
import { emailRex, phoneRex } from '../../utils/regExp';

export const SignUp: React.FC = () => {
  const [authing, setAuthing] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [sex, setSex] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const createUserByEmailAndPassword = async (
    email: string,
    password: string,
    fullName: string,
    tel: string,
    sex: string,
    role: string
  ): Promise<void> => {
    setAuthing(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await sendUserDataToDB(fullName, email, `+${tel}`, sex, role);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      setAuthing(false);
    }
  };

  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!emailRex.test(email)) {
      setErrorMessage('Email is invalid');

      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password is not confirmed');

      return;
    }

    if (!phoneRex.test(tel)) {
      setErrorMessage('Phone number is invalid');

      return;
    }

    createUserByEmailAndPassword(email, password, fullName, tel, sex, role);
  }, [email, password, confirmPassword, tel, sex, role]);

  const handlerFullName = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setFullName(event.target.value);
  }, []);

  const handlerEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
    setErrorMessage('');
  }, []);

  const handlerPassword = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
    setErrorMessage('');
  }, []);

  const handlerConfirmPassword = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(event.target.value);
    setErrorMessage('');
  }, []);

  const handlerTel = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    if (!Number.isNaN(+value)) {
      setTel(value);
    }

    setErrorMessage('');
  }, []);

  const handlerSex = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setSex(event.target.value);
    setErrorMessage('');
  }, []);

  const handlerRole = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setRole(event.target.value);
    setErrorMessage('');
  }, []);

  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <h2 className="text-center mb-3">Sign Up</h2>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Full Name :</Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                onChange={handlerFullName}
                placeholder='exp: John Jonson'
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handlerEmail}
                placeholder='example@example.com'
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone :</Form.Label>
              <Form.Control
                type="tel"
                value={tel}
                onChange={handlerTel}
                placeholder='exp: 380123456789'
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sex :</Form.Label>
              <div className="d-flex justify-content-around">
                <Form.Check type="radio" label="Male" name='1' value='male' checked={sex === 'male'} required onChange={handlerSex} />
                <Form.Check type="radio" label="Female" name='1' value='female' checked={sex === 'female'} required onChange={handlerSex} />
                <Form.Check type="radio" label="Other" name='1' value='other' checked={sex === 'other'} required onChange={handlerSex} />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role :</Form.Label>
              <div className="d-flex justify-content-around">
                <Form.Check
                  type="radio"
                  label="Passenger"
                  name="2"
                  value="passenger"
                  checked={role === 'passenger'}
                  required onChange={handlerRole}
                />
                <Form.Check
                  type="radio"
                  label="Driver"
                  name="2"
                  value="driver"
                  checked={role === 'driver'}
                  required
                  onChange={handlerRole}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={handlerPassword}
                placeholder='minimum 6 characters'
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={handlerConfirmPassword}
                required
              />
            </Form.Group>
            <Button type='submit' className="w-100" disabled={authing}>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
