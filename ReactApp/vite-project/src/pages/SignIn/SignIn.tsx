import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {default as poy} from  "../../assets/img/포이.svg";
import Modal from '../../components/Modal'
import Input from '../../components/Input'

import {  postSignIn } from '../../api/User';

export default function SignIn() {
  //페이지 이동
  const navigate = useNavigate();

  //아이디 비밀번호 업데이트 
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.currentTarget.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  //모달 설정
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const openIdModal = () => {
    setModalMsg("아이디를 올바르게 입력해주세요.")
    setModalOpen(true);
  };

  const openPwModal = () => {
    setModalMsg("비밀번호를 올바르게 입력해주세요.")
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  //로그인 성공 실패에 따른 결과물
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postSignIn(id, password)
      .then(response => {
        const user = response.data;
        navigate('/main', { state: user });
      })
      .catch((error) => {
        if(error.response.status === 400){
          openPwModal();
        } else if (error.response.status === 500){
          openIdModal();
        }
      })
  };

  return (
      
      <div className="flex items-center justify-center w-full h-screen px-10 bg-violet-100">
        <Modal open={modalOpen} close={closeModal} submit={closeModal} header="로그인 실패">{modalMsg}</Modal>
        <form
          className="bg-white rounded-lg shadow-lg p-6 w-full md:w-2/3 lg:w-1/2 xl:w-1/3"
          onSubmit={onSubmitHandler}
        >
          <img className='mb-6 m-auto' src={poy} width="150"/>
          <h2 className="text-2xl mb-6 text-center">로그인을 해주세요!</h2>
          <Input label='아이디' type='text' id='id' value={id} onChange={onIdHandler}/>
          <Input label='비밀번호' type='password' id='password' value={password} onChange={onPasswordHandler}/>
          <button
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded w-full"
            type="submit"
          >
            로그인
          </button>
        </form>
      </div>
  );
}