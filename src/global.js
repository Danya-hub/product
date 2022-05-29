const BODY = document.getElementById("root");
const MAX_COUNT_STARS = 5;
const MAIN_DATA_USER_KEY = ["photoURL", "displayName"];
const ADDIT_DATA_USER_KEY = ["status", "about"];
const DEF_INDEX_SELECT_FILE = 0;
const DEF_INDEX_LANG = 0;
const AUTHOR_NAME = require("../package.json").author;
const ACTIVE_OPTION_SELECT = 0;

export {
    BODY,
    MAX_COUNT_STARS,
    MAIN_DATA_USER_KEY,
    ADDIT_DATA_USER_KEY,
    DEF_INDEX_SELECT_FILE,
    DEF_INDEX_LANG,
    AUTHOR_NAME,
    ACTIVE_OPTION_SELECT,
}