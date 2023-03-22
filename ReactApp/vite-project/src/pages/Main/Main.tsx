import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoutLogo from '../../assets/img/logout_icon.png';
import graphLogo from '../../assets/img/graph_icon.png';
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import NavBar from '../../components/NavBar';
import { postMain } from '../../api/Main';
import { postCount } from '../../api/Count';

export default function Main() {
  //첫화면 애니메이션
  const [content, setContent] = useState("/content5/index.html");
  const [num, setNum] = useState(0);
  //const [count, setCount] = useState(0);

  const [startMessage, setStartMessage] =  useState("");
  const [endMessage, setEndMessage] = useState("");

  //iframe 메세지 수신
  useEffect(()=>{
    const getMessage = (e: MessageEvent<any>) => {
      setEndMessage(e.data);

      if(e.data ==='success3'){
        setNum(1);
        postCount(e.data, name)
      }else if(e.data ==='success1'){
        setNum(2)
        postCount(e.data, name)
      }else if(e.data ==='success2'){
        setNum(3);
        postCount(e.data, name)
      }else if(e.data ==='success4'){
         setNum(4);
         postCount(e.data, name)
      }
    }
    window.addEventListener("message",getMessage);

    return ()=>{window.removeEventListener("message", getMessage)
    }
  },[])


  useEffect(()=>{
    window.addEventListener("message", e => {
      setStartMessage(e.data)
    });
    return ()=>{window.removeEventListener("message", e => {
      setStartMessage(e.data)
    })
    }
  },[])

  const [oldTime, setOldTime] = useState(0);
  const [currTime, setCurrTime] = useState(0);

  //학습 시작, 종료 시간 측정
  useEffect(()=> {
    setOldTime(Date.now());
  }, [startMessage])

  useEffect(()=> {
    setCurrTime(Date.now());
  }, [endMessage]);


  //모달
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [header, setHeader] = useState("")

  useEffect(() => {
    (() => {
      if(num === 4){
        setHeader("학습 완료")
        setModalMsg("학습이 완료되었습니다.")
        setModalOpen(true);
      } else if(num !== 0 && num !== 5) {
        setHeader("학습 진행 중")
        setModalMsg("이어서 학습하시겠습니까?")
        setModalOpen(true);
      }
    })();
  }, [num])

  const closeModal = () => {
    setModalOpen(false);
  };

  //다음 학습으로 진행
  const submitEvent = () => {
  setModalOpen(false);
  for(let i=1; i<5; i++){
    if(num === i && i < 3){
      setContent(`content${i}/index.html`)
    }else if(num === i){
      setContent(`content${i+1}/index.html`)
      if(num === 4){
        setNum(0);
      }
    }
  }
  if(num === 5){
    navigate('/log-in', {replace: true});
  }
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
    setNum(5);
  }

  const MoveToMyPage = () => {
    postMain(name)
    .then(response => {
      navigate('/mypage', { state: { name: response.data.name }});
    })
  }

  

  //버튼 클릭 시 콘텐츠 변경
  const btnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setContent(e.currentTarget.value);
  }

  return (
      <div className="flex flex-col items-center justify-center w-full h-screen px-4 bg-violet-100">
        <Modal open={modalOpen} close={closeModal} submit={submitEvent} header={header}>
          <div className='md:w-1/2 md:h-1/2 w-full h-full'>
            {modalMsg}
          </div>
        </Modal>
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
  );
}