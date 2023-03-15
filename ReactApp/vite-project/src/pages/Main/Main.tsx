import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoutLogo from '../../assets/img/logout_icon.png';
import graphLogo from '../../assets/img/graph_icon.png';
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import NavBar from '../../components/NavBar';


let num = 0, count = 0;
let a = true, b = true, c = true, d = true;

export default function Main() {

  //첫화면 애니메이션
  const [content, setContent] = useState("/content5/index.html");

  //iframe 메세지 수신
  window.addEventListener('message', (e) => {
     if(e.data === 'success3'){
      openNextModal();
      num = 1;
      if(count<4 && a){
        count++;
        a = false;
      }
     } else if(e.data === 'success1'){
      openNextModal();
      num = 2;
      if(count<4 && b){
        count++;
        b = false
      }
     } else if(e.data === 'success2'){
      openNextModal();
      num = 3;
      if(count<4 && c){
        count++;
        c = false;
      }
     } else if(e.data === 'success4'){
      openNextModal();
      num = 4;
      if(count<4 && d){
        count++;
        d = false;
      }
     }
  });

  //모달
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [header, setHeader] = useState("")

  const openNextModal = () => {
    if(num === 4){
      setHeader("학습 완료")
      setModalMsg("학습이 완료되었습니다.")
      setModalOpen(true);
    } else {
      setHeader("학습 진행 중")
      setModalMsg("이어서 학습하시겠습니까?")
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  //다음 학습으로 진행
  const submitEvent = () => {
  setModalOpen(false);
  if(num === 1){
    setContent('content1/index.html')
  } else if(num === 2){
    setContent('content2/index.html')
  } else if(num === 3){
    setContent('content4/index.html')
  } else if(num === 4){
    setContent('content5/index.html')
    num = 0;
  } else if(num === 5)
  navigate('/log-in');
}

  //로그인 페이지에서 데이터 전송받기
  const location = useLocation();
  const { name } = location.state;

  //페이지 이동
  const navigate = useNavigate();

  const MoveToSignIn = () => {
    setModalOpen(true);
    setHeader("로그아웃")
    setModalMsg("로그아웃 하시겠습니까?")
    num = 5;
  }

  const MoveToMyPage = () => {
    navigate('/mypage', { state: { name: name, correct: count } });
  }

  //버튼 클릭 시 콘텐츠 변경
  const btnHandler = (e: any) => {
    setContent(e.currentTarget.value);
  }

  return (
    <React.Fragment>
      <Modal open={modalOpen} close={closeModal} submit={submitEvent} header={header}>{modalMsg}</Modal>
      <div className="flex flex-col items-center justify-center w-full h-screen px-4 bg-violet-100">
        <NavBar src1={graphLogo} onClick1={MoveToMyPage} src2={logoutLogo} onClick2={MoveToSignIn} name={name}/>
        <div className="p-2 md:p-2 w-full flex flex-col min-w-max max-w-screen-md">
          <div className="w-full h-0 relative" style={{ paddingTop: '62.7%' }}>
            <iframe
              src={content}
              className="absolute top-1 left-0 w-full h-full shadow-lg bg-white"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
            ></iframe>
          </div>
          <div className="hidden md:flex flex-col" >
            <Button label="순서대로 학습하기" onClick={btnHandler} value="/content3/index.html"/>
            <div className='flex'>
              <Button label="튜토리얼" onClick={btnHandler} value="/content3/index.html"/>
              <Button label="더하기" onClick={btnHandler} value="/content1/index.html"/>
              <Button label="원 그리기" onClick={btnHandler} value="/content2/index.html"/>
              <Button label="삼각형 찾기" onClick={btnHandler} value="/content4/index.html"/>
            </div>
          </div>
        </div>
        <div className="md:hidden flex flex-col w-4/5" >
          <Button label="순서대로 학습하기" onClick={btnHandler} value="/content3/index.html"/>
          <Button label="튜토리얼" onClick={btnHandler} value="/content3/index.html"/>
          <Button label="더하기" onClick={btnHandler} value="/content1/index.html"/>
          <Button label="원 그리기" onClick={btnHandler} value="/content2/index.html"/>
          <Button label="삼각형 찾기" onClick={btnHandler} value="/content4/index.html"/>
        </div>
      </div>
    </React.Fragment>
  );
}