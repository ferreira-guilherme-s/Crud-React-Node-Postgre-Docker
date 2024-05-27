import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "../../GlobalCss/Global.css";
import { Link } from "react-router-dom";
import { CustomButton } from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import { createUser } from "../../utils/CreateUser";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("user");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      setUserType("user");
      const create = await createUser({ name, email: username, password, userType });
      if(create === 201){
        alert("Usuário criado com sucesso");
        navigate("/");
      }
    } catch (error) {
      alert("Erro ao criar usuário");
      window.location.reload();
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Crie seu usuário</h1>
        <div className="input-field">
          <CustomInput
            type="text"
            placeholder="Nome Completo"
            value={name}
            onChange={setName}
          />
          <FaUser className="icon" />
        </div>
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
        <div className="input-field">
          <CustomInput
            type="password"
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
          <FaLock className="icon" />
        </div>
        <CustomButton label="Cadastrar"/>
        <div className="signup-link">
          <p>
            Já tem uma conta? <Link to="/">Login</Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;