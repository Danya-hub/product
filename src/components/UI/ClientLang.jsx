import "../../styles/components/Lang.css";
import { i18next } from "../../lang/index.js";
import { langs } from "../../lang/index.js";
import { useContext } from "react";
import { Context } from "../../index.js";
import { useTranslation } from "react-i18next";

function Lang() {
    const [actLang, setActLang] = useContext(Context).actLangInd;
    const { t } = useTranslation();

    return (
        <div id="lang">
            <span>{ t("langTitle") }:</span>
            <div className="options">
                { Object.keys(langs).map((item, i) => <button key={`${item}/${i}`} className={ actLang === i ? "active" : "" } value={item} 
                onClick={(e) => {
                    i18next.changeLanguage(e.target.value);
                    setActLang(i);
                }}>{ item }</button>) }
            </div>
        </div>
    )
}

export { Lang as default };