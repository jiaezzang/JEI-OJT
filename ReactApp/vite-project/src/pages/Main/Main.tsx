import React from 'react';
import { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}


const Button: React.FC<ButtonProps> = ({ label, onClick }) => {


  return (
    <button
    className="bg-blue-500 rounded-xl shadow-lg px-4 py-2 mr-2 text-white"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default function Main() {

  return (
    <div
      className="flex items-center justify-center w-full h-screen px-4 bg-blue-100">
      <div className="p-4 md:p-8 w-full flex flex-col items-center max-w-screen-md">
        <div className="w-full h-0 relative" style={{ paddingTop: '56.25%' }}>
          <iframe
            src="http://127.0.0.1:5500/ReactApp/vite-project/public/content2/index.html"
            className="absolute top-0 left-0 w-full h-full shadow-lg bg-white"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex mt-4" >
          <Button label="튜토리얼" />
          <Button label="더하기" />
          <Button label="원 그리기" />
          <Button label="삼각형 찾기" />
        </div>
      </div>
    </div>
  );
}