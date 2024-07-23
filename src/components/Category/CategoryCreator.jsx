import { useRef } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { categoriesState } from "../../recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function CategoryCreator() {
  const setCategories = useSetRecoilState(categoriesState);
  const categoryInputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const value = categoryInputRef.current.value;

    if (value === "") return;

    const newCategory = {
      id: Date.now(),
      value,
    };

    setCategories((prev) => [...prev, newCategory]);

    categoryInputRef.current.value = "";
  };

  return (
    <Form onSubmit={onSubmit}>
      <FontAwesomeIcon icon={faPlus} />
      <Input
        type="text"
        ref={categoryInputRef}
        placeholder="Thêm Danh Mục Công Việc"
      />
    </Form>
  );
}

export default CategoryCreator;

const Form = styled.form`
  display: flex;
  margin-top: 10px;
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
