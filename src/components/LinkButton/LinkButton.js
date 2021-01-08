import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

function LinkButton(props) {
    const copySharableLink = () => {
        const nominatedIds = Array.from(props.nomItems.keys());
        navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?nominated=${nominatedIds.join(",")}`);
    }

    return(
        <button onClick={copySharableLink}>
            <FontAwesomeIcon icon={faLink} size="lg" className="text-black m-2 hover:text-gray-600 active:text-gray"/>
        </button>
    )
}

export default LinkButton;