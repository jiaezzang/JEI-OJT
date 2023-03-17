import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoutLogo from '../../assets/img/logout_icon.png';
import studyLogo from '../../assets/img/study_icon.png';
import NavBar from '../../components/NavBar';
import Modal from '../../components/Modal';
import Chart from '../../components/Chart';

export default function MyPage() {
  //학습 페이지에서 데이터 전송받기
  const location = useLocation();
  const name = location.state.name;
  const correct = location.state.correct;
  const sum = location.state.sum;

  //페이지 이동
  const navigate = useNavigate();

  const MoveToMain = () => {
    navigate('/main', { state: { name: name } });
  }
  const MoveToSignIn = () => {
    setModalOpen(true);
    setHeader("로그아웃");
    setModalMsg("로그아웃 하시겠습니까?");
  }

  const submitEvent = () => {
    setModalOpen(false);
    navigate('/sign-in', {replace: true});
  }

  //모달
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [header, setHeader] = useState("")

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
      <div className="flex flex-col items-center justify-center w-full h-screen bg-violet-100">
        <Modal open={modalOpen} close={closeModal} header={header} submit={submitEvent}>{modalMsg}</Modal>
        <NavBar src1={studyLogo} onClick1={MoveToMain} src2={logoutLogo} onClick2={MoveToSignIn} name={name}/>
        <div className="flex-col mt-3 pt-14 bg-white rounded-lg shadow-lg p-6 h-3/4 w-full md:w-2/3 lg:w-1/2 xl:w-5/7 flex justify-center items-center">
          <Chart correct={correct}></Chart>
          <div className='text-lg md:text-xl lg:text-2xl mt-8'>
            <h1 className='mt-3'>총 컨텐츠 수 : 4개</h1>
            <h1 className='mt-3'>학습한 컨텐츠 수 : {correct}개</h1>
            <h1 className='mt-3'>학습한 횟수 : {sum}번</h1>
            <h1 className='mt-3'>학습한 시간 : </h1>
          </div>
        </div>
      </div>
  )
}