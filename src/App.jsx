import React, { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    setTodoList([
      ...todoList,
      {
        id: Date.now(),
        content: inputValue,
        isCompleted: false,
        isEditing: false,
      },
    ]);
    setInputValue("");
  };

  const toggleComplete = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const updateTodo = (id, newContent) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, content: newContent, isEditing: false }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <header>
        <h1>My Todo-App</h1>
      </header>
      <main>
        <div className="input-area">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="할 일을 입력하세요"
          />
          <button onClick={addTodo}>추가하기</button>
        </div>
        <ul className="todo-list">
          {todoList.map((todo) => (
            <li key={todo.id} className="todo-item">
              <label>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => toggleComplete(todo.id)}
                />
                <span
                  style={{
                    textDecoration: todo.isCompleted ? "line-through" : "none",
                  }}
                >
                  {todo.content}
                </span>
              </label>
              <div className="buttons">
                {todo.isEditing ? (
                  <>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={() => updateTodo(todo.id, inputValue)}>
                      수정완료
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => editTodo(todo.id)}>수정</button>
                    <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
