import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { categoriesState, todosState } from "../../recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCheck, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

function CategoryItem({ category: { id, value } }) {
  const categoryInputRef = useRef();
  const [categoryInput, setCategoryInput] = useState(value);

  const [categories, setCategories] = useRecoilState(categoriesState);
  const [todos, setTodos] = useRecoilState(todosState);

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOffset, setModalOffset] = useState({});

  const navigate = useNavigate();
  const goToTodoPage = () => navigate(`/${id}`);
  const goToHomePage = () => navigate("/", { replace: true });

  const onCategoryInputChange = (e) => setCategoryInput(e.target.value);

  const editCategory = (e) => {
    e.preventDefault();

    if (categoryInput === "") {
      return alert("Vui Lòng Nhập Thông Tin Chi Tiết Của Bạn!");
    }

    const newCategories = categories.map((category) =>
      category.id === id ? { ...category, value: categoryInput } : category
    );

    setCategories(newCategories);
    setIsEditing(false);
  };

  const deleteCategory = () => {
    const newCategories = categories.filter((category) => category.id !== id);
    const newTodos = todos.filter((todo) => todo.categoryId !== id);

    setCategories(newCategories);
    setTodos(newTodos);

    setTimeout(goToHomePage, 0);
  };

  const openDropdown = (e) => {
    e.stopPropagation();

    const coords = e.target.getBoundingClientRect();
    setModalOffset({ x: coords.x, y: coords.y });

    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isEditing) {
      categoryInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <Wrapper onClick={goToTodoPage}>
      <Form
        onSubmit={editCategory}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        isHovered={isHovered}
        isModalOpen={isModalOpen}
        isEditing={isEditing}
      >
        <FontAwesomeIcon icon={faBars} />
        <Input
          type="text"
          value={categoryInput}
          onChange={onCategoryInputChange}
          ref={categoryInputRef}
          isEditing={isEditing}
          readOnly={!isEditing}
        />
        <Button
          type="button"
          icon={isEditing ? faCheck : faEllipsis}
          onClick={isEditing ? editCategory : openDropdown}
          visible={isHovered || isModalOpen || isEditing}
        />
        {isModalOpen && (
          <Modal
            offset={modalOffset}
            setIsEditing={setIsEditing}
            setIsModalOpen={setIsModalOpen}
            setIsHovered={setIsHovered}
            deleteCategory={deleteCategory}
          />
        )}
      </Form>
    </Wrapper>
  );
}

export default CategoryItem;

const Wrapper = styled.li``;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
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
  cursor: ${({ isEditing }) => (isEditing ? "text" : "default")};
`;
