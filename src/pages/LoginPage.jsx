import React, { useState } from 'react';
import './styles/loginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import sliderImages from '../utils/sliderImages';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  const submit = (data) => {
    const url = `http://localhost:3100/api/v1/users/login`;

    axios
      .post(url, data)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/userPage');
        setHasError(false);
        console.log(res.data);
      })
      .catch((err) => {
        localStorage.clear();
        setHasError(true);
        console.log(err.response);
      });

    reset({
      accountNumber: '',
      password: '',
    });
  };

  return (
    <div className="loginPage">
      <div className="slider">
        <div className="sliderMovement">
          {sliderImages.map((image) => (
            <div key={image.image} className="img-container">
              <img src={image.image} alt="" />
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(submit)}>
        <h2>
          Bienvenido a banco <span>Bank Of Alex</span>, ingrese sus datos para
          continuar
        </h2>

        <div>
          <label htmlFor="accountNumber">Número de cuenta</label>
          <input
            {...register('accountNumber')}
            type="number"
            id="accountNumber"
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input {...register('password')} type="password" id="password" />
        </div>

        <button>Ingresar</button>
        <p className={`error ${hasError && 'hasError'}`}>
          Los datos ingresados son inválidos
        </p>
        <Link to={'/olvido'}>¿Olvidaste tu contraseña?</Link>
        <Link to={'/registrarse'}>Registrarse</Link>
      </form>
    </div>
  );
};

export default LoginPage;
