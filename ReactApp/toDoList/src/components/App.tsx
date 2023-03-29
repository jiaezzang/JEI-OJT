import React from 'react'
import * as S from "./App.styles"
import { Provider } from 'react-redux';

import InputForm from "./InputForm";
import TodoList from "./TodoList"
import store from '../commons/store';

function App() {
  return (
    <Provider store={store}>
    <S.Container>
      <S.Wrapper>
        <h1>ToDoList for jiaezzang</h1>
        <InputForm />
        <TodoList />
      </S.Wrapper>
    </S.Container>
    </Provider>
  );
}

export default App
