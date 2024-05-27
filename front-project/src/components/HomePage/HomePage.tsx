import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import Modal from '../Modal/Modal';
import { CustomButton } from '../CustomButton/CustomButton';
import { createUser } from '../../utils/CreateUser';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/BaseApi';

interface User {
  id: string;
  name: string;
  email: string;
  userType: string;
}

const HomePage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const getUserType = localStorage.getItem('userType');
  const userId = localStorage.getItem('userId');
  const [status, setStatus] = useState('loading');
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  //Criação de usuário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("user");


  const handleCreateModal = () => {
    setModalTitle('Criar Usuário');
    setSelectedUser(null);
    setIsModalOpen(true);
  }

  const handleGetUser = async (id: string) => {
    setModalTitle('Editar Usuário');
    const response = await axios.get(`${api}getUser/:${id}`,
    {
      headers: {
        'auth-token': token
      }
    }
    );
    if(response.status === 200) {
      setSelectedUser(response.data);
    } else {
      alert("Erro ao buscar usuário");
    }
    setIsModalOpen(true);
  }

  const handleEditUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(selectedUser!== null){
      const response = await axios.put(`${api}updateUser/:${selectedUser.id}`,
      { name: selectedUser.name, email: selectedUser.email, userType: selectedUser.userType},
      {
        headers: {
          'auth-token': token
        }
      }
    );
      if(response.status === 200) {
        if(selectedUser.id === userId){
          alert("Usuário editado com sucesso, faça login novamente");
          navigate('/');
          localStorage.clear();
        }
        window.location.reload();
      } else {
        alert("Erro ao editar usuário");
      }
    }
  }

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    try {
      const create = await createUser({ name, email, password, userType });
      if(create === 201) {
        window.location.reload();
      }
    } catch (error) {
      alert('Erro ao criar usuário');
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  const handleDelete = async (id: string) => {
    const response = await axios.delete(`${api}deleteUser/:${id}`,{
      headers: {
        'auth-token': token
      }
    });
    if(response.status === 200) {
      window.location.reload();
    } else {
      alert("Erro ao deletar usuário");
    }
  }
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${api}getAllUsers`, {
          headers: {
            'auth-token': token
          }
        });
        if (response.status === 200) {
          setStatus('success');
          setUsers(response.data.data.users);
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
        setStatus('error');
      }
    };

    if (token !== null && token !== '' && token !== undefined) {
      fetchUsers();
    } else {
      setStatus('error');
    }
  }, [token]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error 404: Page not found</div>;
  }

  return (
    <>
    <div className='exit-button'>
      <button onClick={handleLogout}>Sair</button>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {getUserType === 'admin' ? (
          <button onClick={handleCreateModal} className="create-button">
            <FiPlus /> Criar Usuário
          </button>
        ) : null}
        {userId !== null && userId !== '' && userId !== undefined ? (
          <button onClick={() => handleGetUser(userId)} className="create-button">
            Meu Perfil
          </button>
         ) : null }
        
      </div>


      <table className="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              {getUserType === 'admin' ? (
                <>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleGetUser(user.id)}>
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleDelete(user.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </>
              ) : null}
              
            </tr>
          ))}
        </tbody>
      </table>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className='title'>{modalTitle}</h2>
          {selectedUser && selectedUser.name ? (
            <>
            <form onSubmit={handleEditUser}>
              <input type="hidden" defaultValue={ selectedUser.id } />
              <label>Nome</label>
              <input
                className='modal-input'
                type="text"
                value={selectedUser.name}
                onChange={event => setSelectedUser({ ...selectedUser, name: event.target.value })}
              />
              <label>Email</label>
              <input
                className='modal-input'
                type="email"
                value={selectedUser.email}
                onChange={event => setSelectedUser({ ...selectedUser, email: event.target.value })}
              />
                {getUserType === 'admin' ? (
                  <>
                    <label>Tipo de Usuário</label>
                    <select
                      className='modal-input'
                      value={selectedUser.userType}
                      onChange={event => setSelectedUser({ ...selectedUser, userType: event.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </>
                ): null}
              <CustomButton label="Salvar" />
            </form>
            </>) : (
            <>
            <form onSubmit={handleCreateUser}>
              <input className='modal-input-create' type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
              <input className='modal-input-create' type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <input className='modal-input-create' type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
              <input className='modal-input-create' type="password" placeholder="Confirme a senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              <select
                className='modal-input-create'
                value={userType}
                onChange={e => setUserType(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <CustomButton label="Salvar"/>
            </form>
            </>
            )}
        </Modal>
      </div>
    </>
  );
};

export default HomePage;