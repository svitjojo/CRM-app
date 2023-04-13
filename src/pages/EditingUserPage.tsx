import { Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { UserTableRow } from '../components/UserTableRow';
import { SideBar } from '../components/SideBar';
import { type User } from '../types/User';
import { getUsers } from '../api/DBFunctions';

export const EditingUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const usersData = await getUsers();

        setUsers(usersData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <SideBar>
      <Table bordered className='mt-4'>
        <thead className='thead-dark'>
          <tr>
            <th>Id</th>
            <th className='text-nowrap'>Full Name</th>
            <th>Role</th>
            <th>Sex</th>
          </tr>
        </thead>
        <tbody>
          {!!users && (
            users.map(user => (
              <UserTableRow user={user} key={user.id}/>
            ))
          )}
        </tbody>
      </Table>
    </SideBar>
  );
};
