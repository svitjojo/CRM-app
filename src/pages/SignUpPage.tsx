import { SignUp } from '../components/SignUp';

export const SignUpPage: React.FC = () => {
  return (
    <div
    className="d-flex flex-fill align-items-center justify-content-center"
  >
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <SignUp />
    </div>
  </div>
  );
};
