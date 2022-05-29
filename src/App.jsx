import {
    Fragment,
    useState,
    createElement,
} from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { getObjVisCompByLoc, links } from "./route/routers.js";

import { 
    Context,
} from "./index.js";
import { useAuthState } from "react-firebase-hooks/auth";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Popup from "./components/UI/AppPopup.jsx";
import Lang from "./components/UI/ClientLang.jsx";
import Laoder from "./components/UI/StaticLoader.jsx";
import RouteList from "./components/UI/RouteList.jsx";
import WasClicked from "./components/events/WasClicked.jsx";

import { stopSroll } from "./utils/scrolling.js";
import {
    DEF_INDEX_LANG
} from "./global.js";
import {
    auth,
} from "./firebase/auth.js";
import { signOut } from "firebase/auth";

import "./styles/base.css";
import { useTranslation } from "react-i18next";

function App() {
    const [isVisMenu, setVisMenu] = useState(false);
    const actLangInd = useState(DEF_INDEX_LANG);

    const visComp = getObjVisCompByLoc(useLocation().pathname);
    const [, isLoading] = useAuthState(auth);
    const { t } = useTranslation();
    const navigate = useNavigate();

    function closePopup(isClose) {
        setVisMenu(isClose);
        stopSroll();
    }

    return (
        <Context.Provider value={{
            auth,
            actLangInd,
        }}>
            { isLoading ? <Laoder styles={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
                left: "50%",
                top: "50%",
            }} withText></Laoder> : 
            <Fragment>
                {
                    isVisMenu && <Popup className="lines" close={closePopup} hasCloseBtn styles={{
                    position: "absolute",
                    background: "rgb(var(--lightBrown))",
                    boxShadow: `inset 0 0 14px rgba(var(--coffee), 0.05), 
                                0 0 0 1px rgba(var(--brown), 0.5)`,
                    width: "fit-content",
                    height: "100vh",
                    padding: "30px 20px",
                    left: 0,
                    top: 0,
                  }}>
                    <WasClicked parentTag="nav" callback={(isClick) => closePopup(!isClick)}>
                        <ul>
                            <li>
                                <a href="">{ t("catalogTitle") }</a>
                            </li>
                            <li>
                                <a href="">{ t("cartTitle") }</a>
                            </li>
                            <li>
                                <a href="">{ t("reviewsTitle")}</a>
                            </li>
                        </ul>
                    </WasClicked>
                    <Lang></Lang>
                    <nav>
                        <h3>{ t("infoCompanyTitle") }</h3>
                        <WasClicked parentTag="ul" callback={(isClick) => closePopup(!isClick)}>
                            <RouteList parentTag={Fragment} items={["mainTitle", "prodTitle"]}></RouteList>
                        </WasClicked>
                    </nav>
                    <WasClicked parentTag="nav" callback={(isClick) => closePopup(!isClick)}>
                        <RouteList items={["signinTitle", "signupTitle"]}></RouteList>
                    </WasClicked>
                    { auth.currentUser && <button id="quit" onClick={() => {
                        signOut(auth);
                        navigate('/');
                        window.location.reload();
                    }}>{t("logoutBtn") }</button> }
                </Popup>
                }
                {visComp?.header && <Header setVisMenu={closePopup}></Header> }
                { visComp?.main && <main>
                    <Routes>{
                        links.map((route) => <Route key={route.pathname} path={route.pathname} element={createElement(route.el, {})}>
                        </Route>)
                    }</Routes>
                </main> }
                { visComp?.footer && <Footer></Footer> }
            </Fragment> }
        </Context.Provider>
    );
}

export { App as default };