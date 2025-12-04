import './SearchNotFound.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SearchNotFound = () => {
    return(
        <div className="NoResultDogContainer">
            <div className="NoResultDog">
                <div className='animationContainer'>
                    <DotLottieReact
                        src='../../Happy_dog.json'
                        loop
                        autoplay
                        style={{ transform: 'scale(1.4)', transformOrigin: 'center center' }}
                    />
                </div>
                <p>No se encontraron resultados para esta búsqueda.</p>
            </div>
        </div>
    );
}

export default SearchNotFound;