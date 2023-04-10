import React, { useState } from 'react';
import './styles/loginPage.css';
import './styles/signUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SingupPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  const submit = (data) => {
    const url = `http://localhost:3100/api/v1/users/signup`;

    axios
      .post(url, data)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setHasError(false);
        navigate('/userPage');
        console.log(res.data);
      })
      .catch((err) => {
        setHasError(true);
        console.log(err.response);
      });

    reset({
      name: '',
      password: '',
    });
  };

  return (
    <div className="loginPage singupPage">
      <form onSubmit={handleSubmit(submit)}>
        <h2>
          Bienvenido a banco <span>Bank Of Alex</span>, registrate y contarás
          con excelentes beneficios
        </h2>

        <div>
          <label htmlFor="name">Nombre</label>
          <input {...register('name')} type="text" id="name" />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input {...register('password')} type="password" id="password" />
        </div>

        <button>Registrar</button>
        <p className={`error ${hasError && 'hasError'}`}>
          Ingrese datos válidos
        </p>
        <Link to={'/'}>¿Ya tienes una cuenta? Ingresa</Link>
      </form>
    </div>
  );
};

export default SingupPage;
