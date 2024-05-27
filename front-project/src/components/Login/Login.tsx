import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "../../GlobalCss/Global.css";
import { Link } from "react-router-dom";
import { CustomButton } from "../CustomButton/CustomButton";
import  CustomInput  from "../CustomInput/CustomInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../utils/BaseApi";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Função que é chamada quando o formulário é enviado
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Cheguei no login');
    console.log(api);
    const response = await axios.post(`${api}login`, {
      email: username,
      password: password,
    });
    console.log(response);
    if (response.status === 200) {
      console.log("Usuário logado com sucesso");
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.user.userType)
      localStorage.setItem("userId", response.data.user.id)
      return navigate("/dashboard");
    } else {
      alert("Usuário ou senha incorretos");
    }
    // Faz o console log das credenciais do usuário
    console.log("Dados de Login:", { username, password });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-field">
          <CustomInput
            type="text"
            placeholder="E-mail"
            value={username}
            onChange={setUsername}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <CustomInput
            type="password"
            placeholder="Senha"
            value={password}
            onChange={setPassword}
          />
          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          <Link to="/forgot-password">Esqueceu sua senha?</Link>
        </div>
        <CustomButton label="Login"/>
        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/register">Registrar</Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;