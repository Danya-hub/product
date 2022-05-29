import { putImageInStorage, getImageFromStorage } from "../../firebase/storage.js";
import { DEF_INDEX_SELECT_FILE } from "../../global.js";
import "../../styles/components/File.css";

export async function getFile(e, path) {
    const selectFile = e.target.files[DEF_INDEX_SELECT_FILE];
    let res = null;

    await putImageInStorage(`${path}/${selectFile.name}`, selectFile)
    .then(() => getImageFromStorage(`${path}/${selectFile.name}`)
    .then((_res) => res = _res));
    
    return res;
}

function File({
    children,
    ...props
}) {
    return (
        <label id="inputFile" className={props.className}>
            { children }
            <input type="file" className="file" name={props.name} onChange={(e) => props.onChange(getFile(e, props.name))} accept={props.accept} />
        </label>
    );
}

export { File as default };