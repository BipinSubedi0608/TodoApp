import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { UserSignInDto, UserSignUpDto } from "../models/userDtos";

export async function signUpWithEmailAndPassword(credentials: UserSignUpDto) {
    const { displayName, email, password } = credentials;
    console.log(displayName);

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    
    const result = await updateProfile(userCredential.user, { displayName: displayName });
    
}

export async function loginWithEmailAndPassword({ email, password }: UserSignInDto) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
}

export async function logout() {
    signOut(auth);
}