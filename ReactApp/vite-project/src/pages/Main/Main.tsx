import React from 'react'

export default function Main() {
  return (
    <div className="iframebox width-3x md:width-5xl"> 
    <iframe src="http://127.0.0.1:5500/canvas/guideAnimation/index.html" width="1010" height="635" scrolling='no' allowFullScreen></iframe> 
    {/* //컨텐츠를 띄워놓고 불러오는 방식으로  */}
    </div>

  )
}
