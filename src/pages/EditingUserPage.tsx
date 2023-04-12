import { collection, getDocs } from 'firebase/firestore';
import { Table } from 'react-bootstrap';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { UserTableRow } from '../components/UserTableRow';
import { SideBar } from '../components/SideBar';
import { type User } from '../types/User';

export const EditingUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const usersCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      try {
        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as User[];

        setUsers(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
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
