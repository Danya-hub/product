import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { authErrors } from "./errors.js";

export const auth = getAuth();

export function newAuthValUser() {
    return {
        name: "",
        email: "",
        password: "",
    };
}

export function signUp(state, setError, e) {
    !e ?? e.preventDefault();
    return createUserWithEmailAndPassword(auth, state.value.email, state.value.password)
        .then(() => {
            updateProfile(auth.currentUser, {
                displayName: state.value.name,
            })
        })
        .catch((error) => {
            setError(authErrors[error.code]);
            throw new Error(error);
        });
}

export function signIn(e, state, setError) {
    e.preventDefault();
    return signInWithEmailAndPassword(auth, state.value.email, state.value.password)
    .catch((error) => {
        setError(authErrors[error.code]);
        throw new Error(error);
    });
}