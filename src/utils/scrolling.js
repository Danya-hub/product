import { BODY } from "../global.js";

export function stopSroll() {
    BODY.style.overflowY = BODY.style.overflowY === "hidden" ? "scroll" : "hidden";
}