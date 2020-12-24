import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faThLarge } from '@fortawesome/free-solid-svg-icons';

import './ViewSwitch.css';

function ViewSwitch(props) {
    return (
        <div className="switch">
            <input type="checkbox" id="viewSwitch" className="hidden" onChange={(e) => props.setIsGrid(e.target.checked)}/>
            <label htmlFor="viewSwitch" className="component viewSwitch rounded block relative cursor-pointer">
                <div className={`switchBlock rounded absolute bg-yellow-400 z-10 transition-all ${props.isGrid ? "gridView" : "listView"}`}></div>
                <FontAwesomeIcon
                    icon={faThLarge}
                    size="lg"
                    className={`absolute z-20 transition-colors switchIcon gridView ${props.isGrid ? "text-white" : "text-black"}`}/>
                <FontAwesomeIcon
                    icon={faList}
                    size="lg"
                    className={`absolute z-20 transition-colors switchIcon listView ${props.isGrid ? "text-black" : "text-white"}`}/>
            </label>
        </div>
    )
}

export default ViewSwitch;