import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { FiHome, FiEdit, FiMessageSquare } from 'react-icons/fi';
import { FaBus, FaRegCalendar } from 'react-icons/fa';
import { ImEarth } from 'react-icons/im';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import './SideBar.scss';
import { auth } from '../../firebase';

interface Props {
  children: React.ReactNode
}

export const SideBar: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAdmin(user.uid === 'hRVYVeVMMXVSBqitlXdxI1scSPj2');
      }
    });

    return () => { unsubscribe(); };
  }, []);

  const handlerSideBar = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='wrapper vh-100 d-flex'>
      <aside className="sidebar border-right" style={{ width: isOpen ? '200px' : '58px' }}>
        <div className="top_section border-bottom p-2 mb-3 d-flex justify-content-between align-items-center">
          <Link
            to={'/home'}
            className={cn('logo d-flex align-items-center font-weight-bold text-dark text-decoration-none', { 'logo-hidden': !isOpen })}
          >
            <ImEarth color='#343a40' size={'2.3rem'} className='text-left mr-2' />
            LOGO
          </Link>
          <button
            style={{ transform: isOpen ? 'none' : 'rotate(0.5turn)' }}
            className='p-2'
            onClick={handlerSideBar}
          >
            <MdKeyboardDoubleArrowLeft color='#007bff' size={'1.6rem'}/>
          </button>
        </div>
        <nav className='overflow-hidden'>
          <div className="">
            <NavLink
            to={'/home'}
            className={({ isActive }) => cn('position-relative d-flex align-items-center p-2 mb-3 nav__link rounded text-decoration-none', {
              'active-link': isActive
            })}
          >
            <div className="mr-3 ml-2">
              <FiHome size={'1.6rem'}/>
            </div>
            Home
          </NavLink>
          <NavLink
            to={'/trips'}
            className={({ isActive }) => cn('position-relative d-flex align-items-center p-2 mb-3 nav__link rounded text-decoration-none', {
              'active-link': isActive
            })}
          >
            <div className="mr-3 ml-2">
              <FaBus size={'1.6rem'}/>
            </div>
            Trips
          </NavLink>
          <NavLink
            to={'/calendar'}
            className={({ isActive }) => cn('position-relative d-flex align-items-center p-2 mb-3 nav__link rounded text-decoration-none', {
              'active-link': isActive
            })}
          >
            <div className="mr-3 ml-2">
              <FaRegCalendar size={'1.6rem'}/>
            </div>
              Calendar
          </NavLink>
          <NavLink
            to={'/message'}
            className={({ isActive }) => cn('position-relative d-flex align-items-center p-2 mb-3 nav__link rounded text-decoration-none', {
              'active-link': isActive
            })}
          >
            <div className="mr-3 ml-2">
              <FiMessageSquare size={'1.6rem'}/>
            </div>
              Message
          </NavLink>
            {isAdmin && (
              <NavLink
                to={'/editing'}
                className={({ isActive }) => cn('position-relative d-flex align-items-center p-2 mb-3 nav__link rounded text-decoration-none text-nowrap', {
                  'active-link': isActive
                })}
              >
                <div className="mr-3 ml-2">
                  <FiEdit size={'1.6rem'}/>
                </div>
                Editing users
              </NavLink>
            )}
          </div>
          <NavLink
            to={'/account'}
            className={({ isActive }) => cn('position-relative d-flex align-items-center p-2 nav__link rounded text-decoration-none', {
              'active-link': isActive
            })}
          >
            <div className="mr-3 ml-2">
              <FiEdit size={'1.6rem'}/>
            </div>
            Account
          </NavLink>
        </nav>
      </aside>
      <main className='flex-fill'>{children}</main>
    </div>
  );
};
