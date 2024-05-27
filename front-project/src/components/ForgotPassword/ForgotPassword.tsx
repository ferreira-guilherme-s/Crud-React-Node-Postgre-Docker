import { useState } from "react";
import "../../GlobalCss/Global.css";
import './ForgotPassword.css';
import { CustomButton } from "../CustomButton/CustomButton"; 
import CustomInput from "../CustomInput/CustomInput";
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from "../../utils/BaseApi";


function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [userId, setUserId] = useState('');
  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      //await new Promise((resolve) => setTimeout(resolve, 4000));
      const response = await axios.post(`${api}getUserByEmail`, { email });
      console.log(response);
      if (response.status === 200) {
        setUserId(response.data.data.user.id);
        setShowPasswordInput(true);
      }
    } catch (error) {
      alert("Usuário não encontrado");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if(password !== confirmPassword) {
        alert("As senhas não coincidem");
        return;
      }
      console.log(userId);
      const response = await axios.put(`${api}resetPassword`, { id: userId, newPassword: password });
      console.log(response);
      if(response.status === 200) {
        alert("Senha alterada com sucesso");
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao alterar senha");
    }
  };

  return (
    <div className="container">
      <h1>Recuperação de senha</h1>
      {!loading && !showPasswordInput && (
        <form onSubmit={handleEmailSubmit}>
          <div className="input-field">
            <CustomInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={setEmail}
            />
            <FaUser className="icon" />
          </div>
          <CustomButton label="Enviar" />
        </form>
      )}
      {loading && 
      <div className="loading-container">
        <div className="loading">
          <span></span><span></span><span></span>
        </div>
      </div>
      }
      {showPasswordInput && (
        <form onSubmit={handlePasswordSubmit}>
          <div className="input-field">
            <CustomInput
              type="password"
              placeholder="Nova senha"
              value={password}
              onChange={ setPassword }
            />
          <FaLock className="icon" />
          </div>
          <div className="input-field">
            <CustomInput
              type="password"
              placeholder="Confirme a nova senha"
              value={confirmPassword}
              onChange={ setConfirmPassword }
            />
          <FaLock className="icon" />
          </div>
          <CustomButton label="Confirmar senha" />
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;