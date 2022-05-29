import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import {
    DEF_INDEX_LANG
} from "../global.js";

import en from "./en.js";
import ru from "./ru.js";

const langs = {
    en,
    ru
};

i18next
.use(initReactI18next)
.init({
    resources: langs,
    lng: Object.keys(langs)[DEF_INDEX_LANG],
    fallbackLng: 'en',
    interpolation: {
        escapeValue: true,
    }
});

export {
    i18next,
    langs,
};