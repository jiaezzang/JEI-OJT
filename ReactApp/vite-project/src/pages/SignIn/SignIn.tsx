import React from 'react'

export default function SignIn() {
  return (
    <div className="width-3x md:width-5xl"
    style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      width: '100%', height: '100vh'
    }}>
      <form style={{display: 'flex', flexDirection: 'column'}}>
        <label>아이디</label>
        <input type="text"/>
        <label>비밀번호</label>
        <input type="password" />
        <br />
        <button formAction=''>
          로그인
        </button>
      </form>
    </div>
  )
}
