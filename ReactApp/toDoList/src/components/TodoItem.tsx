import React from 'react'
import { useDispatch } from 'react-redux';

import * as S from "./TodoItem.styles";
import { delete_todo }from "../commons/actions";
import { todo } from '../commons/actions';

interface Props {
    todo: todo
}

const TodoItem = ({ todo }: Props) => {
    const dispatch = useDispatch();

    const { id, title, isComplete } = todo;

    const handleClick = () => {
        dispatch(delete_todo(id));
    }

    return (
        <S.Container>
            <S.TextColumn>
                <div>
                    <S.Text>{title}</S.Text>
                </div>
                <S.X onClick={handleClick}>{isComplete || "X"}</S.X>
            </S.TextColumn>
        </S.Container>
      )
}

export default TodoItem;
  
