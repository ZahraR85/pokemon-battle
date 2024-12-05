import { useState } from 'react';
import axios from 'axios';
import { endpoints } from '../../api/api';
import { toast } from 'react-toastify';


const SignupForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${endpoints.auth.signup}`, formData);
      toast.success('You have successfully registered')
    } catch (error) {
      toast.error(`Error registering user: ${error.response.data.message}`)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
