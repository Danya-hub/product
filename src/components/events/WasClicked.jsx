import { createElement } from "react";

function WasClicked({children, parentTag = "div", callback, className = ""}) {
    return createElement(parentTag, {
        onClick(e) {
            e.preventDefault();
            if (e.target === e.currentTarget) return;
            
            callback(true);
        },
        className,
    }, children);
}

export { WasClicked as default };