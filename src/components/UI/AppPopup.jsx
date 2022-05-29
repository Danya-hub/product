import { useEffect } from "react";
import "../../styles/components/Popup.css";
import { stopSroll } from "../../utils/scrolling";

function Popup(props) {
    useEffect(() => {
        stopSroll();
    }, []);

    return (
        <div className="backPopup" onClick={(e) => {
            if (e.target !== e.currentTarget) return;
            props.close(false);
        } }>
            <div className={`popup ${props.className || ""}`} style={props.styles}>
                {props.hasCloseBtn && <button id="close" onClick={() => {
                    props.close(false);
                }}>
                    <img src={require("../../assets/image/close.png")} alt="close" />
                </button>}
                {props.children}
            </div>
        </div>
    )
}

export { Popup as default };