import './ProfileIcon.css';
import { useNavigate } from 'react-router-dom';
import userIcon from '../../../assets/profile_fallback.png';

const ProfileIcon = () => {

  const navigate = useNavigate();

  return(
    <div className="profileIconContainer">
        <img src={userIcon} onClick={() => {navigate('/login')}}/>
    </div>
    );
};

export default ProfileIcon;