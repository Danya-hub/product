import { createElement } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getCompByName } from "../../route/routers";

function RouteList({parentTag = "ul", itemsTag = Link, ...props}) {
    const { t } = useTranslation();

    return createElement(parentTag, parentTag.toString() !== "Symbol(react.fragment)" ? {
            className: props.className || ""
        } : {}, 
        getCompByName(props.items).map(item => <li key={item.pathname}>
            {createElement(itemsTag, {
                to: item.pathname,
                className: itemsTag.displayName === "NavLink" ? ({isActive}) => {
                    return isActive ? "active" : "";
                } : "",
            }, t(item.name)) }
            </li>)
        )
}

export { RouteList as default };