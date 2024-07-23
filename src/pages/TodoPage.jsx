import styled from "styled-components";
import { useMatch } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoriesState,
  filteredTodosState,
  sortState,
  filterState,
} from "../recoil";
import TodoCreator from "../components/Todo/TodoCreator";
import TodoItem from "../components/Todo/TodoItem";
import { useEffect } from "react";

function TodoContainer() {
  const categories = useRecoilValue(categoriesState);
  const filteredTodos = useRecoilValue(filteredTodosState);

  const [sort, setSort] = useRecoilState(sortState);
  const [filter, setFilter] = useRecoilState(filterState);

  const urlMatch = useMatch("/:id");
  const categoryId = urlMatch?.params.id;
  const categoryMatch =
    categoryId &&
    categories.find((category) => String(category.id) === categoryId);

  const todosMatch =
    categoryMatch &&
    filteredTodos.filter((todo) => todo.categoryId === categoryMatch.id);

  const sortTodos = (e) => {
    setSort(e.target.value);
  };

  const filterTodos = (e) => {
    setFilter(e.target.name);
  };

  useEffect(() => {
    setSort("new");
    setFilter("all");
  }, [categoryId, setSort, setFilter]);

  if (!categoryMatch) {
    return (
      <Wrapper>
        <Message>Mục này không tồn tại.</Message>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>{categoryMatch.value}</Title>
      <TodoCreator categoryId={categoryMatch.id} />
      <Controller>
        <Filters>
          <Filter name="all" onClick={filterTodos} filter={filter}>
            Toàn Bộ 
          </Filter>
          <Filter name="doing" onClick={filterTodos} filter={filter}>
            Đang Tiến Hành
          </Filter>
          <Filter name="done" onClick={filterTodos} filter={filter}>
            Hoàn Thành
          </Filter>
        </Filters>
        <Sort value={sort} onChange={sortTodos}>
          <Option value="new">Mới Nhất</Option>
          <Option value="old">Cũ Nhất</Option>
          <Option value="asc">Thứ Tự A - Z</Option>
          <Option value="desc">Thứ Tự Z - A</Option>
        </Sort>
      </Controller>
      <List>
        {todosMatch.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </Wrapper>
  );
}

export default TodoContainer;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 40px 30px;
`;

const Message = styled.div``;

const Title = styled.h2`
  margin-bottom: 20px;
  padding: 0 10px;
  font-size: 1.2rem;
  /* font-size: 60px; */
`;

const Controller = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const Filters = styled.div``;

const Filter = styled.button.attrs({ type: "button" })`
  padding: 8px 16px;
  margin-right: 10px;
  border-radius: 10px;
  background-color: ${({ name, filter, theme }) =>
    name === filter && theme.hoverBgColor};
  font-size: 0.9rem;
`;

const Sort = styled.select`
  /* width: 80px; */
  font-size: 0.9rem;
`;

const Option = styled.option``;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  overflow-x: hidden;
  overflow-y: auto;
`;
