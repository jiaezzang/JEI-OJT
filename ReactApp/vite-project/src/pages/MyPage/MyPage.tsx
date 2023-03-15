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

  console.log(correct);
  console.log(name);

  //페이지 이동
  const navigate = useNavigate();

  const MoveToMain = () => {
    navigate('/main', { state: { name: name } });
  }
  const MoveToSignIn = () => {
    setModalOpen(true);
    setHeader("로그아웃");
    setModalMsg("로그아웃 하시겠습니까?");
    console.log('modal')
  }

  const submitEvent = () => {
    setModalOpen(false);
    navigate('/sign-in');
  }

  //모달
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [header, setHeader] = useState("")

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
       <Modal open={modalOpen} close={closeModal} header={header} submit={submitEvent}>{modalMsg}</Modal>
      <div className="flex flex-col items-center justify-center w-full h-screen bg-violet-100">
        <NavBar src1={studyLogo} onClick1={MoveToMain} src2={logoutLogo} onClick2={MoveToSignIn} name={name}/>
        <div className="flex justify-center bg-white rounded-lg shadow-lg p-6 h-3/4 w-full md:w-2/3 lg:w-1/2 xl:w-5/7">
          <Chart correct={correct}></Chart>
        </div>

      </div>
    </React.Fragment>
  )
}
