import './HeaderSimple.css'
import imageLogo from '../../assets/movie-database-logo-md.png';

const HeaderSimple = () => {
    return(
        <div className='headerSimple'>
            <div className="wrapperLogo">
                <img src={imageLogo} alt="Logo"/>
            </div>
        </div>
    );
}

export default HeaderSimple;