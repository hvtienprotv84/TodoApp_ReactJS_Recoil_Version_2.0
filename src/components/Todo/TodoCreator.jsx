import { useRef } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { todosState } from "../../recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function TodoCreator({ categoryId }) {
  const setTodos = useSetRecoilState(todosState);
  const todoInputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const value = todoInputRef.current.value;

    if (value === "") return;

    const newTodo = {
      id: Date.now(),
      categoryId,
      value,
      isDone: false,
    };

    setTodos((prev) => [...prev, newTodo]);

    todoInputRef.current.value = "";
  };

  return (
    <Form onSubmit={onSubmit}>
      <FontAwesomeIcon icon={faPlus} />
      <Input type="text" ref={todoInputRef} placeholder="Thêm nhiệm vụ mới" />
    </Form>
  );
}

export default TodoCreator;

const Form = styled.form`
  display: flex;
  padding: 10px 15px;
  border-radius: 5px;
  opacity: 0.5;

  &:hover,
  &:focus-within {
    opacity: 1;
    background-color: ${({ theme }) => theme.hoverBgColor};
  }
`;

const Input = styled.input`
  flex: 1;
  margin-left: 15px;
`;
