import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function TextBanner(props) {
    return (
        <div className={`fixed ${props.visible ? "top-0" : "-top-full"} left-0 w-screen p-4 z-30 text-center transition-all ${props.backgroundColourClass || "bg-gray-300"}`}>
            {props.text || ""}
            <button className="h-full absolute top-0 right-10">
                <FontAwesomeIcon
                    icon={faTimes}
                    size="lg"
                    className="text-white"
                    onClick={() => props.setVisibility(false)} />
            </button>
        </div>
    )
}

export default TextBanner;