import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

function Modal({
  offset,
  setIsEditing,
  setIsModalOpen,
  setIsHovered,
  deleteCategory,
}) {
  const clickOverlay = (e) => {
    e.stopPropagation();
    setIsModalOpen((prev) => !prev);
    setIsHovered(false);
  };

  const clickEdit = () => {
    setIsEditing(true);
    setIsModalOpen((prev) => !prev);
    setIsHovered(false);
  };

  const clickDelete = () => {
    setIsModalOpen((prev) => !prev);
    setIsHovered(false);
    deleteCategory();
  };

  return (
    <>
      <Overlay onClick={clickOverlay} />
      <Wrapper offset={offset}>
        <Menu onClick={clickEdit}>
          <FontAwesomeIcon icon={faPencil} />
          <span>Chỉnh Sửa</span>
        </Menu>
        <Menu onClick={clickDelete}>
          <FontAwesomeIcon icon={faTrash} />
          <span>Xóa</span>
        </Menu>
      </Wrapper>
    </>
  );
}

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div`
  position: fixed;
  top: ${({ offset }) => `${offset.y + 20}px`};
  left: ${({ offset }) => `${offset.x - 100}px`};
  z-index: 9999;
  overflow: hidden;
  width: 140px;
  height: 80px;
  margin-left: -10px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.layoutBgColor};
  cursor: pointer;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  z-index: 9999;
  height: 50%;
  padding-left: 15px;

  span {
    margin-left: 10px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.hoverBgColor};
  }
`;
