import About from "../views/About.jsx";
import Product from "../views/Product.jsx";
import Signin from "../views/Signin.jsx";
import Signup from "../views/Signup.jsx";
import Cabinet from "../views/Cabinet.jsx";
import Error from "../views/Error.jsx";

export const links = [{
        name: "mainTitle",
        el: About,
        pathname: "/",
        visComp: {
            header: true,
            main: true,
            footer: true,
        },
    },
    {
        name: "prodTitle",
        el: Product,
        pathname: "/products",
        visComp: {
            header: true,
            main: true,
        },
    },
    {
        name: "signinTitle",
        el: Signin,
        pathname: "/signin",
        visComp: {
            main: true,
        },
    },
    {
        name: "signupTitle",
        el: Signup,
        pathname: "/signup",
                visComp: {
            main: true,
        },
    },
    {
        name: "cabinetTitle",
        el: Cabinet,
        pathname: "/cabinet",
        visComp: {
            header: true,
            main: true,
        },
    },
    {
        name: "errorTitle",
        el: Error,
        pathname: "*",
        visComp: {
            main: true,
        },
    }
];

export function getCompByName(arrName) {
    return links.filter(obj => arrName.some(name => obj.name === name));
}

export function getObjVisCompByLoc(pathname) {
    return links.find(obj => obj.pathname === pathname).visComp;
}