import React from 'react'

const users = [
  {id: "jiae22", password: "1234", name:"jiae"},
  {id: "jiae33", password: "3456", name:"kim"},
  {id: "jiae44", password: "4567", name:"diae"},
];

console.log(users[1])
export default function SignIn() {

  return (
    <div
      className="flex items-center justify-center w-full h-screen px-4 bg-blue-100">
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
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full"
          type="submit"
        >
          로그인
        </button>
      </form>
    </div>
  );
}