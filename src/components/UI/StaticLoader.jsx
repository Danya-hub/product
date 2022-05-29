import { useTranslation } from "react-i18next";
import "../../styles/components/Loader.css";

function Loader({withText, ...props}) {
    const { t } = useTranslation();

    return (
        <div className={props.className || ""} id="loader" style={props.styles}>
            <img src={require("../../assets/gif/loader.gif")} alt="loader" />
            {withText && <b>{ t("loadTitle") }</b> }
        </div>
    );
}

export { Loader as default };