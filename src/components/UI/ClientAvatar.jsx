import { useTranslation } from "react-i18next";
import File from "./InputFile.jsx";

import "../../styles/components/Avatar.css";

function setTextForAvatar(name) {
    return name.match(/[A-Z]/g).filter((symb, i, arr) => i === 0 || i === arr.length - 1).join("");
}

function Avatar({user, ...props}) {
    const { t } = useTranslation();

    return (
        <label id="avatar" className={props.className} style={{ background: `url(${user.photoURL}) center/cover no-repeat` }}>
            {!user.photoURL && <span className="textAvatar">{ setTextForAvatar(user.name) }</span>}
            {props.changeImage && <File onChange={props.callback} name="image" accept=".jpg,.jpeg,.png">
                <div key="text" className="text">
                    <i className="fa fa-camera" aria-hidden="true"></i>
                    <span>{ t("changeBtn") }</span>
                </div>
            </File>}
        </label> 
    );
}

export { Avatar as default }