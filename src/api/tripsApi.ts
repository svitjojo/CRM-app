import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { type Trip } from '../types/Trip';

const tripsCollectionRef = collection(db, 'trips');

export const getTrips = async (): Promise<Trip[]> => {
  try {
    const data = await getDocs(tripsCollectionRef);
    const normalizedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Trip[];

    return normalizedData;
  } catch {
    return [];
  }
};

export const createTrip = async (
  from: string,
  to: string,
  date: string,
  passengerCapacity: number
): Promise<void> => {
  try {
    await addDoc(tripsCollectionRef, {
      from,
      to,
      date,
      passenger_capacity: passengerCapacity
    });
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    }
  }
};
