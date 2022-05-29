import { Link } from "react-router-dom";

function Logo() {
    return (    
        <Link to="/" id="logo">
            <img src={ require("../../assets/image/logo.png") } alt="logo" />
        </Link>
    )
}

export { Logo as default };