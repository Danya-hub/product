import {
    StrictMode,
    createContext,
} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./firebase/config.js";
import "./lang/index.js";

import App from "./App";

export const Context = createContext();

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
        <StrictMode>
            <App />
        </StrictMode>
    </Router>
);
