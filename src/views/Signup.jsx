import {
    signUp,
    newAuthValUser,
} from "../firebase/auth.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/auth.js";

import { useTranslation } from "react-i18next";
import { i18next } from "../lang/index.js";

import {
    useCallback,
    useContext,
    useState,
} from "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";

import Select from "../components/UI/InputSelect.jsx";

import { langs } from "../lang/index.js";
import { Context } from "../index.js";

import "../styles/sections/Auth.css";

function SignUp() {
    const { t } = useTranslation();
    const [actLang, setActLang] = useContext(Context).actLangInd;
    const [valSignUp, setValSignUp] = useState(useCallback(newAuthValUser, []));
    const [errorMsg, setErrorMsg] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const changeVal = useCallback((e) => {
        setValSignUp((prev) => ({
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
                <h2 className="title">{ t("signupTitle") }</h2>
                <form onSubmit={(e) => {
                        e.preventDefault();

                        if (confirmPassword === valSignUp.password)
                            signUp({ value: valSignUp, setValSignUp }, setErrorMsg)
                            .then(() => navigate("/signin"));
                        else setErrorMsg("Passwords do not match. Make sure your passwords are correct");
                    }}>
                    {errorMsg && <p id="error" onClick={() => setErrorMsg("")}>{errorMsg}</p> }
                    <label id="name">
                        <span>{ t("nameUserTitle") }</span>
                        <input type="text" value={valSignUp.name} onChange={changeVal} name="name" required />
                    </label>
                    <label id="email">
                        <span>{ t("emailUserTitle") }</span>
                        <input type="email" value={valSignUp.email} onChange={changeVal} name="email" required />
                    </label>
                    <label id="password">
                        <span>{ t("passwordUserTitle") }</span>
                        <input type="password" value={valSignUp.password} onChange={changeVal} name="password" required />
                    </label>
                    <label id="confPassword">
                        <span>{ t("confirmPasswordUserTitle") }</span>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confPassword" required />
                    </label>
                    <button>{ t("signupTitle") }</button>
                    <p>
                        {t("alreadySignup")}?
                        <Link className="switch" to="/signin">{ t("signinTitle") }</Link>
                    </p>
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

export { SignUp as default };