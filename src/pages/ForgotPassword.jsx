import React, { useState } from 'react';
import './styles/loginPage.css';
import './styles/forgotPassword.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = (data) => {
    const id = 1;

    const url = `http://localhost:3100/api/v1/users/${id}`;

    const data2 = {
      accountNumber: data.account,
      password: data.password2,
    };

    if (data.password2 !== data.password) {
      setHasError(true);
      return;
    }

    setHasError(false);

    axios
      .patch(url, data2)
      .then((res) => {
        setSuccess(true);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response));

    // prueba1423

    reset({
      account: '',
      password: '',
      password2: '',
    });
  };

  const handleIngresar = () => {
    if (success) navigate('/');
  };

  return (
    <div className="loginPage forgotPage">
      <form onSubmit={handleSubmit(submit)}>
        <h2>
          Registra una nueva <span>clave</span> y recupera acceso a tu cuenta
        </h2>

        <div>
          <label htmlFor="account">Ingrese su número de cuenta</label>
          <input {...register('account')} type="number" id="account" />
        </div>

        <div>
          <label htmlFor="password">Ingrese su nueva contraseña</label>
          <input {...register('password')} type="password" id="password" />
        </div>

        <div>
          <label htmlFor="password2">Repita su nueva contraseña</label>
          <input {...register('password2')} type="password" id="password2" />
        </div>

        <button>Cambiar clave</button>
        <p className={`error ${hasError && 'hasError'}`}>
          Las claves deben coincidir
        </p>
        <Link to={'/'}>¿Ya recordaste la clave? Ingresa</Link>
      </form>

      <div className={`confirmMessage ${success && 'showMessage'}`}>
        <h3>
          Tu clave ha sido <span>actualizada con exito</span> ¿deseas ingresar a
          tu cuenta?
        </h3>
        <div className="buttons">
          <button onClick={handleIngresar}>Ingresar</button>
          <button onClick={() => setSuccess(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
