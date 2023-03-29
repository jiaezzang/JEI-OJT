import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as S from "./InputForm.styles"
import { add_todo } from "../commons/actions";
import { id } from "../commons/actions";

const InputForm = () => {
    const dispatch = useDispatch();

    const [text, setText] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setText(value);
    }

    const handleClick = () => {
        const todo = {
            id:  id,
            title: text,
            isComplete: false,
        };

        dispatch(add_todo(todo));
        setText("");
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            handleClick();
        }
    }

    return (
        <S.Container>
            <S.InputBox
                type="text"
                placeholder="오늘의 할 일은?"
                onChange={handleChange}
                value={text}
                onKeyDown={handleKeyPress}
            />
            <S.Button onClick={handleClick}>추가하기</S.Button>
        </S.Container>
    );
}

export default InputForm;