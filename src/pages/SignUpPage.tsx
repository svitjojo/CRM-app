// import { Container } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { SignUp } from '../components/SignUp';

export const SignUpPage: React.FC = () => {
  return (
    <Modal show fullscreen>
      <Modal.Body>
        <SignUp />
      </Modal.Body>
    </Modal>
  //   <Container
  //   className="d-flex align-items-center justify-content-center"
  //   style={{ minHeight: '100vh' }}
  // >
  //   <div className="w-100" style={{ maxWidth: '400px' }}>
  //     <SignUp />
  //   </div>
  // </Container>
  );
};
