import React from 'react'

export default function SignIn() {
  return (
    <div
      className="flex items-center justify-center w-full h-screen px-4"
      style={{ backgroundColor: '#f9f9f9' }}
    >
      <form className="bg-white rounded-lg shadow-lg p-6 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="username">
            아이디
          </label>
          <input
            className="border rounded-lg py-2 px-3 w-full"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="mb-6">
          <label className="block font-bold mb-2" htmlFor="password">
            비밀번호
          </label>
          <input
            className="border rounded-lg py-2 px-3 w-full"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
          type="submit"
        >
          로그인
        </button>
      </form>
    </div>
  );
}