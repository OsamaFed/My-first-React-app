import { createContext, useContext, useReducer } from 'react';
import Todored from '../Reducers/TodolistReducer';

export const TodosContext = createContext([]);

const TodosProvider = ({ children }) =>{
  const [todos, dispatch] = useReducer(Todored, []);
  return (
    <TodosContext.Provider value={{
      todos,
      dispatch
    }}>
      {children}
    </TodosContext.Provider>
  )
};


export const useTodos = () => {
  return useContext(TodosContext);
}

export default TodosProvider;