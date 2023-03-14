import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoutLogo from '../../assets/img/logout_icon.png';
import graphLogo from '../../assets/img/graph_icon.png';

interface ButtonProps {
  label: string;
  onClick?: (e: any) => void;
  value: string;
}

const Button = ({ label, onClick, value}: ButtonProps) => {

  return (
    <button
    className="bg-violet-700 hover:bg-violet-400 rounded-xl shadow-lg px-4 py-2 mr-2 text-white w-full mt-4"
      onClick={onClick} value={value}
    >
      {label}
    </button>
  );
};

export default function Main() {

  const [content, setContent] = useState("http://127.0.0.1:5500/ReactApp/vite-project/public/content5/index.html");

  const location = useLocation();
  const { name } = location.state;

  const navigate = useNavigate();

  const MoveToSignIn = () => {
    navigate('/log-in');
  }

  const btnHandler = (e: any) => {
    setContent(e.currentTarget.value);
  }

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen px-4 bg-violet-100" >
      <div className="max-w-screen-lg flex flex-row justify-between" style={{width: '150%', justifyContent: 'space-around'}}>
        <h1 className="font-bold mr-2 text-xl md:text-2xl lg:text-3xl">안녕 {name}</h1>
        <img className='logout cursor-pointer w-10 h-10' src={logoutLogo} width="50" onClick={MoveToSignIn}/>
      </div>
      <div className="p-2 md:p-2 w-full flex flex-col min-w-max max-w-screen-lg">
        <div className="w-full h-0 relative" style={{ paddingTop: '62.7%' }}>
          <iframe
            src={content}
            className="absolute top-0 left-0 w-full h-full shadow-lg bg-white"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
          ></iframe>
        </div>
        <div className="hidden md:flex items-center space-x-1" >
          <Button label="튜토리얼" onClick={btnHandler} value="http://127.0.0.1:5500/ReactApp/vite-project/public/content3/index.html"/>
          <Button label="더하기" onClick={btnHandler} value="http://127.0.0.1:5500/ReactApp/vite-project/public/content1/index.html"/>
          <Button label="원 그리기" onClick={btnHandler} value="http://127.0.0.1:5500/ReactApp/vite-project/public/content2/index.html"/>
          <Button label="삼각형 찾기" onClick={btnHandler} value="http://127.0.0.1:5500/ReactApp/vite-project/public/content4/index.html"/>
        </div>
      </div>
      <div className="md:hidden flex flex-col items-center w-full" >
        <Button label="튜토리얼" onClick={btnHandler} value="http://127.0.0.1:5500/ReactApp/vite-project/public/content3/index.html"/>
        <Button label="더하기" onClick={btnHandler} value="http://127.0.0.1:5500/ReactApp/vite-project/public/content1/index.html"/>
        <Button label="원 그리기" onClick={btnHandler} value="http://127.0.0.1:5500/ReactApp/vite-project/public/content2/index.html"/>
        <Button label="삼각형 찾기" onClick={btnHandler} value="http://127.0.0.1:5500/ReactApp/vite-project/public/content4/index.html"/>
      </div>
    </div>
  );
}