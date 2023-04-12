import { useLocation } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  const location = useLocation();
  let headerText = location.pathname.slice(1);

  if (headerText === '') {
    headerText = 'home';
  }

  return (
    <header className='border-bottom header p-2 pl-3'>
      <h2 className="text-uppercase mb-0">{headerText}</h2>
    </header>
  );
};
