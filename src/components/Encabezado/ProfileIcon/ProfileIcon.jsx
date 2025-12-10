import './ProfileIcon.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import ProfileOptions from '../ProfileOptions/ProfileOptions';
import userIcon from '../../../assets/profile_fallback.png';

const ProfileIcon = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const menuRef = useRef(null);   // Referencia al contenedor del menú
  const containerRef = useRef(null); // Referencia al icono + menú
  const navigate = useNavigate();

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setShowProfileOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return(
    <div className="profileIconContainer" ref={containerRef}>
        <img src={userIcon} onClick={() => {setShowProfileOptions(!showProfileOptions)}}/>
        <ProfileOptions showProfileOptions={showProfileOptions} ref={menuRef}/>
    </div>
    );
};

export default ProfileIcon;