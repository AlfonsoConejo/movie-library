import './AccountIcon.css'
import TooltipAccount from '../TooltipAccount/TooltipAccount';
import { useState } from 'react';


export default function AccountIcon(){

    const [tooltipVisible, setTooltipVisible] = useState(false);

    return(
        <div className="contenedorFlexAccount">
            <button className="accountButton" onClick={() => {setTooltipVisible(!tooltipVisible)}}>
                <span className="material-symbols-outlined">
                    account_circle
                </span>
            </button>
            <TooltipAccount
                tooltipVisible = {tooltipVisible}
                setTooltipVisible = {setTooltipVisible}/>
        </div>
    );
}