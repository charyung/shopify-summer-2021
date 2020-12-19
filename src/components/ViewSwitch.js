import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faThLarge } from '@fortawesome/free-solid-svg-icons';

import './ViewSwitch.css'

function ViewSwitch(props) {
    return (
        <div className="switch">
            <input type="checkbox" id="viewSwitch" className="hidden" onChange={(e) => props.setView(e.target.checked)}/>
            <label htmlFor="viewSwitch" className="viewSwitch rounded block bg-black relative">
                <div className={`switchBlock rounded absolute bg-green-600 top-2 z-10 transition-all ${props.view ? "listView" : "gridView"}`}></div>
                <FontAwesomeIcon
                    icon={faList}
                    size="lg"
                    className={`absolute text-white z-20 switchIcon listView`}/>
                <FontAwesomeIcon
                    icon={faThLarge}
                    size="lg"
                    className={`absolute text-white z-20 switchIcon gridView`}/>
            </label>
        </div>
    )
}

export default ViewSwitch;