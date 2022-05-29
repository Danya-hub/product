import {
    ref,
    set,
    get,
    getDatabase,
    child,
} from "firebase/database";
import { withoutFunc } from "../utils/toObj.js";
import { authErrors } from "./errors.js";
import { auth } from "./auth.js";

export const database = getDatabase();

export function getValData(nameProp) {
    return get(child(ref(database), `/${nameProp}`))
    .then((snapshot) => snapshot.val())
    .catch((error) => { throw new Error(authErrors[error.code]) });
}

export function setValData(nameProp, obj, e) {
    !e ?? e.preventDefault();

    set(ref(database, `/${nameProp}`), withoutFunc.call(auth.currentUser, obj))
    .catch((error) => console.error(authErrors[error.code]));
}

export function newDescrUser() {
    return {
        displayName: "",
        photoURL: "",
        status: 0,
        about: "",
    }
}