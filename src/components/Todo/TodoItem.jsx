import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { todosState } from "../../recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEllipsis,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

function TodoItem({ todo: { id, value, isDone } }) {
  const todoInputRef = useRef();
  const [todoInput, setTodoInput] = useState(value);

  const [todos, setTodos] = useRecoilState(todosState);

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOffset, setModalOffset] = useState({});

  const onTodoInputChange = (e) => setTodoInput(e.target.value);

  const editTodo = (e) => {
    e.preventDefault();

    if (todoInput === "") {
      return alert("내용을 입력해주세요");
    }

    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, value: todoInput } : todo
    );

    setTodos(newTodos);
    setIsEditing(false);
  };

  const deleteTodo = () => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleTodoIsDone = () => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(newTodos);
  };

  const openDropdown = (e) => {
    e.stopPropagation();

    const coords = e.target.getBoundingClientRect();
    setModalOffset({ x: coords.x, y: coords.y });

    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isEditing) {
      todoInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <Wrapper>
      <Form
        onSubmit={editTodo}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        isHovered={isHovered}
        isModalOpen={isModalOpen}
        isEditing={isEditing}
      >
        <Checkbox
          icon={isDone ? faSquareCheck : faSquare}
          onClick={toggleTodoIsDone}
        />
        <Input
          type="text"
          value={todoInput}
          onChange={onTodoInputChange}
          isEditing={isEditing}
          readOnly={!isEditing}
          ref={todoInputRef}
          isDone={isDone}
        />
        <Button
          type="button"
          icon={isEditing ? faCheck : faEllipsis}
          onClick={isEditing ? editTodo : openDropdown}
          visible={isHovered || isModalOpen || isEditing}
        />
        {isModalOpen && (
          <Modal
            offset={modalOffset}
            setIsEditing={setIsEditing}
            setIsModalOpen={setIsModalOpen}
            setIsHovered={setIsHovered}
            deleteCategory={deleteTodo}
          />
        )}
      </Form>
    </Wrapper>
  );
}

export default TodoItem;

const Wrapper = styled.li``;

const Form = styled.form`
  display: flex;
  position: relative;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: ${({ isModalOpen, isHovered, isEditing, theme }) =>
    isEditing
      ? theme.layoutBgColor
      : isModalOpen
      ? theme.hoverBgColor
      : isHovered
      ? theme.hoverBgColor
      : theme.layoutBgColor};
`;

const Input = styled.input`
  flex: 1;
  margin-left: 15px;
  margin-right: 5px;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  border-color: ${({ isEditing, theme }) =>
    isEditing && theme.inputBorderColor};
  text-decoration: ${({ isDone }) => isDone && "line-through"};
  opacity: ${({ isDone }) => (isDone ? 0.5 : 1)};
  cursor: ${({ isEditing }) => (isEditing ? "text" : "default")};
`;

const Checkbox = styled(FontAwesomeIcon)`
  cursor: pointer;
`;
