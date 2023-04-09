import { collection, getDocs } from 'firebase/firestore';
import { Container, Table } from 'react-bootstrap';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { UserTableRow } from '../components/UserTableRow';

export interface UserData {
  id: string
  full_name: string
  role: string
  photo_url: string
};

export const EditingUser: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const usersCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      try {
        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as UserData[];

        setUsers(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return (
    <Container>
      <Table bordered responsive className='mt-4'>
        <thead className='thead-dark'>
          <tr>
            <th>Full Name</th>
            <th>Role</th>
            <th>Username</th>
            <th>Username</th>
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
    </Container>
  );
};
