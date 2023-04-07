import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const HomePage = () => { 
    return (
    <>
        Home
        <button onClick={() => signOut(auth)}>SighOut</button>
    </>);
};