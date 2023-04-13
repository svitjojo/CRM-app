import { LogIn } from '../components/LogIn';
import { Container } from 'react-bootstrap';

export const LoginPage: React.FC = () => {
  return (
    <Container
    className="d-flex flex-fill align-items-center justify-content-center"
  >
    <div className="w-100 mt-4" style={{ maxWidth: '400px' }}>
      <LogIn />
    </div>
  </Container>
  );
};
