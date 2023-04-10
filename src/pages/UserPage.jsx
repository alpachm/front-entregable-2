import React, { useEffect, useState } from 'react';
import './styles/userPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/slices/user.slice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const UserPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [colorEstado, setColorEstado] = useState();
  const [colorAmount, setColorAmount] = useState();
  const [isTransfer, setIsTransfer] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isRetirar, setIsRetirar] = useState(false);

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleError = (error) => {
    if (
      error.response.data.message ===
      'Account number of reciver user is invalid'
    ) {
      setErrorMessage('El número de cuenta de destino es inválido');
    }
    if (
      error.response.data.message === 'Account number of sender user is invalid'
    ) {
      setErrorMessage('Tu número de cuenta es inválido');
    }
    if (error.response.data.message === 'Insufficient money') {
      setErrorMessage('No tienes el monto necesario');
    }
  };

  const submit = (data) => {
    const url = `http://localhost:3100/api/v1/transfers`;

    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        setHasError(true);
        handleError(err);
        console.log(err.response);
      });

    reset({
      amount: '',
      reciverUserId: '',
      senderUserId: '',
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const url = `http://localhost:3100/api/v1/users/2`;

    const data = {
      accountNumber: user?.accountNumber,
      amount: +e.target.montoSave.value,
    };

    console.log(data);

    axios
      .patch(url, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    reset((e.target.montoSave.value = ''));
  };

  const handleRetirar = (e) => {
    e.preventDefault();

    const url = `http://localhost:3100/api/v1/users/3`;

    const data = {
      accountNumber: user?.accountNumber,
      amount: +e.target.montoRetirar.value,
    };

    axios
      .patch(url, data)
      .then((res) => {
        setHasError(false);
        console.log(res.data);
      })
      .catch((err) => {
        setHasError(true);
        console.log(err.response);
      });

    reset((e.target.montoRetirar.value = ''));
  };

  useEffect(() => {
    if (localStorage.getItem('user'))
      dispatch(setUser(JSON.parse(localStorage.getItem('user'))));

    if (user) {
      user?.status === 'active'
        ? setColorEstado('var(--green)')
        : setColorEstado('var(--red)');

      user?.amount >= 1000
        ? setColorAmount('var(--green)')
        : setColorAmount('var(--red)');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');

    navigate('/');
  };

  const handleTransfer = () => {
    setIsTransfer(true);
  };

  const handleCerrarVentana = () => {
    setHasError(false);
    setIsTransfer(false);
  };

  return (
    <section className="userPage">
      <header>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>
      <div className="container-userPage">
        <h1>
          ¡Hola <span>{user?.name}</span>! aquí puedes ver todos tus movimientos
        </h1>

        <div className="box-amount">
          <div className="top-box">
            <p style={{ color: colorEstado }}>
              <span>Estado:</span> {user?.status}
            </p>
            <p>
              <span>Número de cuenta</span> {user?.accountNumber}
            </p>
          </div>
          <p style={{ color: colorAmount }}>
            <span>Monto:</span> {user?.amount}
          </p>
        </div>

        <div className="btn-transfer">
          <button onClick={() => setIsSave(true)}>Guardar dinero</button>
          <button onClick={() => setIsRetirar(true)}>Retirar</button>
          <button onClick={handleTransfer}>Transferir</button>
        </div>

        <div className={`box-transfer ${isTransfer && 'active-transfer'}`}>
          <form
            onSubmit={handleSubmit(submit)}
            className={`${isTransfer && 'active'}`}
          >
            <i
              onClick={() => setIsTransfer(false)}
              className="bx bxs-x-square bx-rotate-270"
            ></i>
            <div>
              <label htmlFor="monto">Monto</label>
              <input {...register('amount')} type="number" id="monto" />
            </div>

            <div>
              <label htmlFor="reciverAccount">
                Ingrese número de cuenta destino
              </label>
              <input
                {...register('reciverUserId')}
                type="number"
                id="reciverAccount"
              />
            </div>

            <div>
              <label htmlFor="senderAccount">Ingrese su número de cuenta</label>
              <input
                {...register('senderUserId')}
                type="number"
                id="senderAccount"
              />
            </div>

            <button>Envíar</button>

            <p className={`messageError ${hasError && 'active'}`}>
              {errorMessage}
            </p>
          </form>
        </div>

        <div className={`box-transfer ${isSave && 'active-transfer'}`}>
          <form onSubmit={handleSave} className={`${isSave && 'active'}`}>
            <i
              onClick={() => setIsSave(false)}
              className="bx bxs-x-square bx-rotate-270"
            ></i>
            <div>
              <label htmlFor="monto">Monto</label>
              <input type="number" id="montoSave" />
            </div>

            <button>Guardar</button>
          </form>
        </div>

        <div className={`box-transfer ${isRetirar && 'active-transfer'}`}>
          <form onSubmit={handleRetirar} className={`${isRetirar && 'active'}`}>
            <i
              onClick={() => setIsRetirar(false)}
              className="bx bxs-x-square bx-rotate-270"
            ></i>
            <div>
              <label htmlFor="monto">Monto</label>
              <input type="number" id="montoRetirar" />
            </div>

            <button>Retirar</button>

            <p className={`messageError ${hasError && 'active'}`}>
              Monto insuficiente para realizar el retiro
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
