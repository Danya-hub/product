import "../styles/sections/Footer.css";

import {
    tels,
} from "../content/telephone.js";

import Logo from "./UI/StaticLogo.jsx";
import RouteList from "./UI/RouteList.jsx";
import { useTranslation } from "react-i18next";
import { AUTHOR_NAME } from "../global.js";

function Footer () {
    const { t } = useTranslation();
    
    return (
        <footer>
            <Logo></Logo>
            <RouteList className="links" items={["mainTitle", "prodTitle"]}></RouteList>
            <ul className="tels">
                {tels.map((item, i) => <li key={item + i}>
                    <a href={"tel:" + item}>{item}</a>
                </li>)}
            </ul>
            <span id="copyright">&#169; { t("copyrightTitle") }: <b>{ AUTHOR_NAME }</b></span>
        </footer>
    );
}

export { Footer as default };