import "../styles/sections/Header.css";
import { Fragment, useState } from "react";
import { auth } from "../firebase/auth.js";

import Logo from "./UI/StaticLogo.jsx";
import RouteList from "./UI/RouteList.jsx";
import WasClicked from "./events/WasClicked.jsx";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header (props) {
const [isVisAuth, setVisAuth] = useState(false);
const { t } = useTranslation();

return (
<header>
    <button id="openModal" className="imageBtn" onClick={() => props.setVisMenu(true)}>
        <img src={ require("../assets/image/menu.png") } alt="menu" id="menu" />
    </button>
        <button id="catalog">{ t("catalogTitle") }</button>
    <label id="search">
        <input type="text" placeholder={ t("lookingForInput") } />
        <button id="find">{t("findBtn") }</button>
    </label>
    <Logo></Logo>
    <RouteList className="links" itemsTag={NavLink} items={["mainTitle", "prodTitle" ]}></RouteList>
    <div id="client">
        <button id="cart" className="imageBtn">
            <img src={ require("../assets/image/shopping-cart.png") } alt="cart" />
        </button>
        <div id="auth">
            <button id="user" className="imageBtn" onClick={()=> setVisAuth(!isVisAuth)}>
                <img src={ require("../assets/image/user.png") } alt="user" />
            </button>
            { isVisAuth && <WasClicked parentTag="ul" className="links lines" callback={(isClicked)=>
                setVisAuth(!isClicked)}>
                <RouteList parentTag={Fragment} items={[auth.currentUser && "cabinetTitle", "signinTitle", "signupTitle" ]}>
                </RouteList>
            </WasClicked> }
        </div>
    </div>
</header>
);
}

export { Header as default };