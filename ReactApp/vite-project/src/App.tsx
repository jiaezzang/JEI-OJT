import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import SignIn from './pages/SignIn'
import Main from './pages/Main'
import MyPage from './pages/MyPage'

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path= "/*" element={<Navigate to="/sign-in"></Navigate>}>
        </Route>
        <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
        <Route path="/main" element={<Main></Main>}></Route>
        <Route path="/mypage" element={<MyPage></MyPage>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App