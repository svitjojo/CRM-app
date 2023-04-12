import { SignUp } from '../components/SignUp';

export const SignUpPage: React.FC = () => {
  return (
    <div
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: '100vh' }}
  >
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <SignUp />
    </div>
  </div>
  );
};
