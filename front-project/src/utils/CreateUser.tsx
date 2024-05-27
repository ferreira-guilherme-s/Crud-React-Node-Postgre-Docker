import axios from 'axios';
import api from './BaseApi';

export const createUser = async (user: { name: string, email: string, password: string, userType: string }) => {
  const response = await axios.post(`${api}insertUser`, user);
  if(response.status === 201) {
    return response.status;
  } else {
    throw new Error("Erro ao criar usuário");
  }
}