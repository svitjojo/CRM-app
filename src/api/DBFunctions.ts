import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

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
