import './Login.css'
import loginImage from '../assets/movie-theater.jpg'

const Login = () => {
    const backgroundStyle = {
    color: 'blue',
    backgroundColor: 'lightgray',
    fontSize: '16px',
    padding: '10px'
  };
    return(
        <div className="loginContainer">
            <div className="contenedorImagen" style={{
    background: `linear-gradient(rgba(0, 0, 50, 0.5), rgba(0, 0, 50, 0.5)), url('${loginImage}') center/cover no-repeat`,
  }}>
            </div>
        </div>
    );
}

export default Login;