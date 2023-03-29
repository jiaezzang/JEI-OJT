import { ADD, DELETE } from "./actions";
import { todo } from "./actions";

const initialState = {
    todos:  [],
};

export interface State {
    todos: todo[];
}

export const reducer = (state: State = initialState, action: any): State => {
    if(action.type === ADD){
        return {
            todos: [...state.todos, action.todo],
        };
    } else if(action.type === DELETE){
        return {
            todos: [...state.todos.filter((todo : todo) => todo.id !== action.id)],
        };
    } else {
        return state;
    }

}