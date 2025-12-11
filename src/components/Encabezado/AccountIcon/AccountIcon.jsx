import './AccountIcon.css'
import TooltipAccount from '../TooltipAccount/TooltipAccount';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import userIcon from '../../../assets/account_icon.png'


export default function AccountIcon(){
    /*
    const [open, setOpen] = useState(false);
    const closeTimeout = useRef(null);*/
    const navigate = useNavigate();

    /*const openTooltip = () => {
        clearTimeout(closeTimeout.current);
        setOpen(true);
    }

    const closeTooltip = () => {
        closeTimeout.current = setTimeout( () => {
            setOpen(false);
        }, 250);
    }*/

    return (
        <div 
            className="contenedorFlexAccount"
            {...{} /* onMouseEnter={openTooltip} */}
            {...{} /* onMouseLeave={closeTooltip} */}
        >
            <button className="accountButton" >
                <img src={userIcon} onClick={() => {navigate('/login')}}/>
            </button>

            {/*<TooltipAccount visible={open} />*/}
        </div>
    );
}