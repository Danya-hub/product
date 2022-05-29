import { useState } from "react";

import { ACTIVE_OPTION_SELECT } from "../../global.js";

import "../../styles/components/Select.css";

function Select(props) {
    const [actOption, setActOption] = useState(props.actOption || ACTIVE_OPTION_SELECT);
    const [isVis, setVis] = useState(false);

    return (
        <div className="select">
            <span onClick={() => setVis(!isVis)} className={`default ${props.className || ""}`}>{ props.content[actOption]?.text || props.content[actOption] }</span>
            { isVis && <div className="options">
                {props.content.map((item, i) => <span key={item?.value || item} value={item?.value || item} name={props.nameOption} onClick={(e) => { 
                    props.callback(e, i); 
                    setActOption(i); 
                    setVis(false); 
                }}>{ item?.text || item }</span>)}
            </div> }
        </div>
    )
}

export { Select as default };