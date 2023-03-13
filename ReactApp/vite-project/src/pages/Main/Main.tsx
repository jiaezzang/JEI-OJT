import React from 'react';
import { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick?: (e: any) => void;
  value: string;
}

const Button = ({ label, onClick, value}: ButtonProps) => {

  return (
    <button
    className="bg-blue-500 rounded-xl shadow-lg px-4 py-2 mr-2 text-white"
      onClick={onClick} value={value}
    >
      {label}
    </button>
  );
};

export default function Main() {

  const [content, setContent] = useState('');

  const btnHandler = (e: any) => {
    setContent(e.currentTarget.value);
  }

  return (
    <div
      className="flex items-center justify-center w-full h-screen px-4 bg-blue-100">
      <div className="p-2 md:p-2 w-full flex flex-col items-center max-w-screen-md">
        <div className="w-full h-0 relative" style={{ paddingTop: '62.7%' }}>
          <iframe
            src={content}
            className="absolute top-0 left-0 w-full h-full shadow-lg bg-white"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex mt-4" >
          <Button label="튜토리얼" onClick={btnHandler} value="http://127.0.0.1:5500/ReactApp/vite-project/public/content3/index.html"/>
          <Button label="더하기" onClick={btnHandler} value="http://127.0.0.1:5500/ReactApp/vite-project/public/content1/index.html"/>
          <Button label="원 그리기" onClick={btnHandler} value="http://127.0.0.1:5500/ReactApp/vite-project/public/content2/index.html"/>
          <Button label="삼각형 찾기" onClick={btnHandler} value="http://127.0.0.1:5500/ReactApp/vite-project/public/content4/index.html"/>
        </div>
      </div>
    </div>
  );
}