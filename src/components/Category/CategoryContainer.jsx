import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { categoriesState } from "../../recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import CategoryItem from "./CategoryItem";
import CategoryCreator from "./CategoryCreator";

function CategoryContainer() {
  const categories = useRecoilValue(categoriesState);

  const navigate = useNavigate();
  const goToHomePage = () => navigate("/");

  return (
    <Wrapper>
      <Title onClick={goToHomePage} tabIndex={0}>
        <FontAwesomeIcon icon={faHome} />
        <span>Trang Chủ</span>
      </Title>
      <List>
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </List>
      <CategoryCreator />
    </Wrapper>
  );
}

export default CategoryContainer;

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 40px 30px;
`;

const Title = styled.h1`
  width: fit-content;
  margin-bottom: 20px;
  padding: 0 10px;
  cursor: pointer;
  font-size: 1.2rem;

  span {
    margin-left: 10px;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  overflow-x: hidden;
  overflow-y: auto;
`;
