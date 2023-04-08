import { LogIn } from '../components/LogIn';
import { Container } from 'react-bootstrap';

export const LoginPage: React.FC = () => {
  return (
    <Container
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: '100vh' }}
  >
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <LogIn />
    </div>
  </Container>
  );
};
