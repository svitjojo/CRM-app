import { LogIn } from '../components/LogIn';
import { Modal } from 'react-bootstrap';

export const LoginPage: React.FC = () => {
  return (
    <Modal show fullscreen>
      <Modal.Body>
        <LogIn />
      </Modal.Body>
    </Modal>
  //   <Container
  //   className="d-flex align-items-center justify-content-center"
  //   style={{ minHeight: '100vh' }}
  // >
  //   <div className="w-100" style={{ maxWidth: '400px' }}>
  //     <LogIn />
  //   </div>
  // </Container>
  );
};
