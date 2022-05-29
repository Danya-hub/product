import {
    signIn,
    newAuthValUser,
} from "../firebase/auth.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
    useCallback,
    useContext,
    useState,
} from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";
import { auth } from "../firebase/auth.js";

import { useTranslation } from "react-i18next";
import { i18next } from "../lang/index.js";

import Select from "../components/UI/InputSelect.jsx";

import { langs } from "../lang/index.js";
import { Context } from "../index.js";

import "../styles/sections/Auth.css";

function SignIn() {
    const { t } = useTranslation();
    const [actLang, setActLang] = useContext(Context).actLangInd;
    const [valSignUp, setValSignIn] = useState(useCallback(newAuthValUser, []));
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const changeVal = useCallback((e) => {
        setValSignIn((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }, []);

    return (
        <section id="signIn" className="auth">
            <Select
                actOption={actLang}
                nameOption="currency"
                content={Object.keys(langs)} callback={(e, i) => {
                    i18next.changeLanguage(e.target.getAttribute("value"));
                    setActLang(i);
                }}
                required>
            </Select>
            <Link id="toMain" to="/">{ t("toMainLink") }</Link>
            <div className="wrapper">
                <h2 className="title">{ t("signinTitle") }</h2>
                <form onSubmit={(e) => signIn(e, { value: valSignUp, setValSignIn }, setErrorMsg).then(() => navigate("/cabinet")) }>
                    { errorMsg && <p id="error" onClick={() => setErrorMsg("")}>{errorMsg}</p> }
                    <label id="email">
                        <span>{ t("emailUserTitle") }</span>
                        <input type="email" value={valSignUp.email} onChange={changeVal} name="email" required />
                    </label>
                    <label id="password">
                        <span>{ t("passwordUserTitle") }</span>
                        <input type="password" value={valSignUp.password} onChange={changeVal} name="password" required />
                    </label>
                    <button>{ t("signinTitle") }</button>
                    <p>{t("noSignupYetText")}?<Link className="switch" to="/signup">{ t("signupTitle") }</Link></p>
                </form>
                <div id="otherAuth">
                    <span>{ t("orOtherOptionSignin") }</span>
                </div>
                <div id="socNetwork">
                    <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider()).then(() => navigate("/cabinet"))}>
                        <i className="fa fa-google" aria-hidden="true"></i>
                        Google
                    </button>
                </div>
            </div>
        </section>
    )
}

export { SignIn as default };