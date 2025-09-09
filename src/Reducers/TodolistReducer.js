export default function Todoreducer(state, action) {
  switch (action.type) {
    case "GET": {
      const storedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storedTodos;
    }

    case "ADD_TODO": {
      const newTodos = [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          comp: false,
        },
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    }

    case "EDIT_TODO": {
      const updatedTodos = state.map((t) =>
        t.id === action.payload.id ? { ...t, text: action.payload.text } : t
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
      return updatedTodos;
    }

    case "TOGGLE_TODO": {
      const updatedTodos = state.map((t) =>
        t.id === action.payload ? { ...t, comp: !t.comp } : t
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
      return updatedTodos;
    }

    case "DELETE_TODO": {
      const updatedTodos = state.filter((t) => t.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "DELETE_ALL": {
      localStorage.removeItem("todos");
      return [];
    }

    default:
      return state;
  }
}