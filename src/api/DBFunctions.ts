import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { type User } from '../types/User';

export const sendUserDataToDB = async (fullName: string, email: string, tel: string, sex: string, role: string): Promise<void> => {
  const usersCollection = collection(db, 'users');

  try {
    await addDoc(usersCollection, {
      full_name: fullName,
      email,
      telephone: tel,
      sex,
      role
    });
  } catch {
    throw new Error('Oops, something went wrong... Please, try again');
  }
};

export const getUsers = async (): Promise<User[]> => {
  const usersCollectionRef = collection(db, 'users');
  try {
    const data = await getDocs(usersCollectionRef);
    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as User[];

    return filteredData;
  } catch (error) {
    console.log(error);

    return [];
  }
};
