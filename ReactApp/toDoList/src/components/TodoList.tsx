import React from "react";
import * as S from "./TodoList.styles";

import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { todo } from "../commons/actions";
import { State } from "../commons/reducer";

const TodoList = () => {
    const todos = useSelector((state: State) => state.todos);

    return (
        <S.Container>
            {todos.map((todo: todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </S.Container>
    )
}

export default TodoList;