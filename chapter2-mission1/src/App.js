import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [list, setList] = useState("");
  const [todos, setTodos] = useState([]);
  const [finish, setFinish] = useState([]);
  const changeHandler = (event) => {
    setList(event.target.value);
  };
  const addTodo = () => {
    if (list.trim() !== "") {
      //앞뒤 공백 제거 후 비어있는지 확인
      setTodos([...todos, list]); // 기존 목록 복제 후 새로운 목록 추가
      setList(""); //
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };
  const clickSuccessHandler = (todo) => {
    const upTodo = todos.filter((item) => item !== todo);
    setTodos(upTodo);
    setFinish([...finish, todo]);
  };

  const clickDeleteHandler = (todo) => {
    // 클릭된 항목 받아와서 목록에서 제거
    const updatedFinish = finish.filter((item) => item !== todo);
    setFinish(updatedFinish);
  };
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <h1>UMC Study Plan</h1>
        <div className={styles.inputwrapper}>
          <input
            type="text"
            value={list}
            onChange={changeHandler}
            onKeyDown={handleKeyPress} // 키 이벤트 핸들러
            placeholder="스터디 계획을 작성해보세요!"
          />
        </div>
        <div className={styles.listwrapper}>
          <div className={styles.worklist}>
            <h3 className={styles.work}>해야 할 일</h3>
            {todos.map((todo, index) => (
              <div key={index} className={styles.item}>
                <span>{todo}</span>
                <button onClick={() => clickSuccessHandler(todo)}>완료</button>
              </div>
            ))}
          </div>
          <div className={styles.successlist}>
            <h3 className={styles.success}>해낸 일</h3>
            {finish.map((fini, index) => (
              <div key={index} className={styles.item}>
                <span>{fini}</span>
                <button onClick={() => clickDeleteHandler(fini)}>삭제</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
