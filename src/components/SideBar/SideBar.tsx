import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { FiHome, FiEdit, FiMessageSquare } from 'react-icons/fi';
import { FaBus, FaRegCalendar } from 'react-icons/fa';
import { GiTriangleTarget } from 'react-icons/gi';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import './SideBar.scss';

interface Props {
  children: React.ReactNode
}

export const SideBar: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handlerSideBar = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='wrapper vh-100 d-flex'>
      <aside className="sidebar border" style={{ width: isOpen ? '200px' : '58px' }}>
        <div className="top_section border-bottom p-2 mb-3 d-flex justify-content-between align-items-center">
          <Link
            to={'/home'}
            className={cn('logo', { 'logo-hidden': !isOpen })}
          >
            <GiTriangleTarget size={'2.6rem'} className='text-left'/>
          </Link>
          <button
            style={{ transform: isOpen ? 'none' : 'rotate(0.5turn)' }}
            className='p-2'
            onClick={handlerSideBar}
          >
            <MdKeyboardDoubleArrowLeft color='#007bff' size={'1.6rem'}/>
          </button>
        </div>
        <nav className='nav flex-column overflow-hidden'>
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
          <NavLink to={'/trips'} className='d-flex align-items-center nav__link p-2 mb-3 rounded text-decoration-none'>
            <div className="mr-3 ml-2">
              <FaBus size={'1.6rem'}/>
            </div>
            Trips
          </NavLink>
          <NavLink to={'/calendar'} className='d-flex align-items-center nav__link p-2 mb-3 rounded text-decoration-none'>
            <div className="mr-3 ml-2">
              <FaRegCalendar size={'1.6rem'}/>
            </div>
              Calendar
          </NavLink>
          <NavLink to={'/message'} className='d-flex align-items-center nav__link p-2 mb-3 rounded text-decoration-none'>
            <div className="mr-3 ml-2">
              <FiMessageSquare size={'1.6rem'}/>
            </div>
              Message
          </NavLink>
          <NavLink to={'/editing'} className='d-flex align-items-center nav__link p-2 mb-3 text-nowrap rounded text-decoration-none'>
            <div className="mr-3 ml-2">
              <FiEdit size={'1.6rem'}/>
            </div>
            Editing users
          </NavLink>
        </nav>
        <section></section>
      </aside>
      <main className='flex-fill'>{children}</main>
    </div>
  );
};
