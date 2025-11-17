import './Registro.css'
import HeaderSimple from '../components/HeaderSimple/HeaderSimple';
import registerImage from '../assets/clapperboard.jpg'

const handleSubmit = () => {

};

const Registro = () => {
    return(
        <div className="registerPage">
            <HeaderSimple/>
            <div
                className="registerContainer"
                style={{
                    background: `linear-gradient(rgba(43, 50, 0, 0.5), rgba(43, 50, 0, 0.5)), url('${registerImage}') center/cover no-repeat`,
                }}
            >
                <div className="contenedorFormulario">
                    <h1>Crea una cuenta</h1>
                    <form onSubmit={handleSubmit}>

                    </form>
                </div>
            </div> 
        </div>
    );
}

export default Registro;