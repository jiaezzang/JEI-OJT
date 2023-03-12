import React from 'react';

export default function Main() {
  return (
    <div className="p-4 md:p-8 w-full flex justify-center items-center max-w-screen-md">
      <div className="w-full h-0 relative" style={{ paddingTop: '56.25%' }}>
        <iframe
          src="http://127.0.0.1:5500/canvas/guideAnimation/index.html"
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}