import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone } from '@fortawesome/free-solid-svg-icons';

function LinkButton(props) {
    const [sharableLink, setSharableLink] = useState(`${window.location.origin}${window.location.pathname}`);

    useEffect(() => {
        const nominatedIds = Array.from(props.nomItems.keys());
        const searchParamsString = nominatedIds.length > 0 ? `?nominated=${nominatedIds.join(",")}` : "";
        setSharableLink(`${window.location.origin}${window.location.pathname}${searchParamsString}`);
    }, [props.nomItems]);

    const copySharableLink = () => {
        navigator.clipboard.writeText(sharableLink)
            .then(() => {
                props.setCopyBannerVisible(true);
                // Auto close after a short time
                setTimeout(() => {
                    props.setCopyBannerVisible(false);
                }, 2000);
            });
    }

    return(
        <div className="component thin-padding flex flex-1">
            <input className="flex-1 m-2" readOnly={true} value={sharableLink} />
            <button onClick={copySharableLink} className="bg-yellow-400 rounded flex m-2">
                <FontAwesomeIcon icon={faClone} className="text-white m-2"/>
            </button>
        </div>
    )
}

export default LinkButton;