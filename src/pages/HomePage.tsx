import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export const HomePage: React.FC = () => {
  return (
    <>
      Home
      <button onClick={() => { signOut(auth); }}>SighOut</button>
    </>
  );
};
