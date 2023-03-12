import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="px-4 py-2 bg-gray-200 rounded-md mr-2"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default function Main() {
  return (
    <div className="p-4 md:p-8 w-full flex flex-col justify-center items-center max-w-screen-md">
      <div className="w-full h-0 relative" style={{ paddingTop: '56.25%' }}>
        <iframe
          src="http://127.0.0.1:5500/canvas/guideAnimation/index.html"
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex mt-4">
        <Button label="Button 1" />
        <Button label="Button 2" />
        <Button label="Button 3" />
        <Button label="Button 4" />
      </div>
    </div>
  );
}