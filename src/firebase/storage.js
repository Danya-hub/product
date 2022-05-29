import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storageErros } from "./errors.js";

export const storage = getStorage();

export function putImageInStorage(path, file) {
    return uploadBytes(ref(storage, path), file)
    .catch((error) => {
        throw new Error(storageErros[error.code]);
    });
}

export async function getImageFromStorage(path) {
    let res = null;
    await getDownloadURL(ref(storage, path))
    .then((_res) => res = _res);

    return res;
}