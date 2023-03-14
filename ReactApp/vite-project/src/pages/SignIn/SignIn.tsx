import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {default as poy} from  "../../assets/img/포이.svg";

const users = [
  { id: 'jiae22', password: '1234', name: '지애' },
  { id: 'jiae33', password: '3456', name: 'jiae' },
  { id: 'jiae44', password: '4567', name: 'kim' },
];

export default function SignIn() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onIdHandler = (e: any) => {
    setId(e.currentTarget.value);
  };

  const onPasswordHandler = (e: any) => {
    setPassword(e.currentTarget.value);
  };


    const navigate = useNavigate();

    const onSubmitHandler = (e: any) => {
    e.preventDefault();
    const user = users.find((u) => u.id === id && u.password === password);
    if (user) {
      navigate('/main', { state: { name: user.name } });
    }  else if(users.find((u) => u.id === id && u.password !== password)){
      setErrorMessage('패스워드를 확인해 주세요');
    } else {
      setErrorMessage('아이디를 확인해 주세요');
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen px-10 bg-violet-100">
      <form
        className="bg-white rounded-lg shadow-lg p-6 w-full md:w-2/3 lg:w-1/2 xl:w-1/3"
        onSubmit={onSubmitHandler}
      >
        <img className='mb-6 m-auto' src={poy} width="150"/>
        <h2 className="text-2xl mb-6 text-center">로그인을 해주세요!</h2>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="username">
            아이디
          </label>
          <input
            className="border rounded-lg py-2 px-3 w-full"
            type="text"
            name="id"
            id="id"
            value={id}
            onChange={onIdHandler}
          />
        </div>
        <div className="mb-6">
          <label className="block font-bold mb-2" htmlFor="password">
            비밀번호
          </label>
          <input
            className="border rounded-lg py-2 px-3 w-full"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onPasswordHandler}
          />
        </div>
        <button
          className="bg-violet-400 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded w-full"
          type="submit"
        >
          로그인
        </button>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
      </form>
    </div>
  );
}