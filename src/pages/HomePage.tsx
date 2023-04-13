import { useEffect } from 'react';
import { getUsers, sendUserDataToDB } from '../api/DBFunctions';
import { SideBar } from '../components/SideBar';
import { auth } from '../firebase';

export const HomePage: React.FC = () => {
  useEffect(() => {
    const user = auth.currentUser;

    (async () => {
      const usersFromDB = await getUsers();
      const isUserInDB = usersFromDB.find(userData => userData.email === user?.email);

      if (!isUserInDB && user) {
        await sendUserDataToDB(user.displayName ?? '', user.email ?? '', '', '', 'passenger');
      }
    })();
  }, []);

  return (
    <SideBar>
      <h2 className="mt-4 text-center">Home Page</h2>
    </SideBar>
  );
};
