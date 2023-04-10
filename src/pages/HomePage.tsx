import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Button } from 'react-bootstrap';

export const HomePage: React.FC = () => {
  return (
    <>
      Home
      <Button onClick={() => { signOut(auth); }}>Sign Out</Button>
    </>
  );
};
