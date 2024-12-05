import { useState } from 'react';
import axios from 'axios';
import { endpoints } from '../../api/api';
import { toast } from 'react-toastify';
import { useApp } from '../../context/AppContext';

const LoginForm = () => {
  const {setAppUser,setAuthToken} = useApp()
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${endpoints.auth.login}`, formData);
      toast.success(`Welcome back, ${data.name}`);
      setAppUser(data);
      setAuthToken(data.token)
    } catch (error) {
      toast.error(`Error logging in  user: ${error.response.data.message}`)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
