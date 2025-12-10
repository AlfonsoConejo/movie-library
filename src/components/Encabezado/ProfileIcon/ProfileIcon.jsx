import './ProfileIcon.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProfileOptions from '../ProfileOptions/ProfileOptions';
import userIcon from '../../../assets/profile_fallback.png';

const ProfileIcon = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  console.log(`Este es el valor de ${showProfileOptions}`);
  const navigate = useNavigate();

  return(
    <div className="profileIconContainer">
        <img src={userIcon} onClick={() => {setShowProfileOptions(!showProfileOptions)}}/>
        <ProfileOptions showProfileOptions={showProfileOptions}/>
    </div>
    );
};

export default ProfileIcon;