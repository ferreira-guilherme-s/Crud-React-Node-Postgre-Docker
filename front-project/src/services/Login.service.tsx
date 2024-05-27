import axios from "axios";
import api from "../utils/BaseApi";
import { useNavigate } from "react-router-dom";

const AuthService = async (username: string, password:string) => {

  const navigate = useNavigate();
  try {
    const response = await axios.post(`${api}login`, {
      email: username,
      password: password,
    });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.user.userType)
      localStorage.setItem("userId", response.data.user.id)
      return navigate("/dashboard");
    }
  } catch (error) {
    alert("Usuário ou senha inválidos")
  }
}

export default AuthService;