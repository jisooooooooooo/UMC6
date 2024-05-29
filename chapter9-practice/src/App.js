import React from "react";

import TodoList from "./components/TodoList";
import InputTodo from "./components/InputTodo";
function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      <InputTodo />
      <TodoList />
    </div>
  );
}

export default App;
