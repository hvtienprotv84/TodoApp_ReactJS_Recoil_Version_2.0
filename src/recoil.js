import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "react-todolist",
});

export const isDarkState = atom({
  key: "isDarkState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const categoriesState = atom({
  key: "categoriesState",
  default: [
    { id: 1698407099750, value: "Loại 1" },
    { id: 1698407101694, value: "Loại 2" },
    { id: 1698407103565, value: "Loại 3" },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const todosState = atom({
  key: "todosState",
  default: [
    {
      id: 1698408167889,
      categoryId: 1698407099750,
      value: "Làm 1",
      isDone: false,
    },
    {
      id: 1698408169317,
      categoryId: 1698407099750,
      value: "Làm 2",
      isDone: true,
    },
    {
      id: 1698408170517,
      categoryId: 1698407099750,
      value: "Làm 3",
      isDone: false,
    },
    {
      id: 1698408177454,
      categoryId: 1698407101694,
      value: "Làm 1",
      isDone: false,
    },
    {
      id: 1698408178414,
      categoryId: 1698407101694,
      value: "Làm 2",
      isDone: true,
    },
    {
      id: 1698408179486,
      categoryId: 1698407101694,
      value: "Làm 3",
      isDone: true,
    },
    {
      id: 1698408186506,
      categoryId: 1698407103565,
      value: "Làm 1",
      isDone: true,
    },
    {
      id: 1698408187430,
      categoryId: 1698407103565,
      value: "Làm 2",
      isDone: true,
    },
    {
      id: 1698408188366,
      categoryId: 1698407103565,
      value: "Làm 3",
      isDone: false,
    },
    {
      id: 1698408189198,
      categoryId: 1698407103565,
      value: "Làm 4",
      isDone: false,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const sortState = atom({
  key: "sortState",
  default: "new",
  effects_UNSTABLE: [persistAtom],
});

export const filterState = atom({
  key: "filterState",
  default: "all",
  effects_UNSTABLE: [persistAtom],
});

export const filteredTodosState = selector({
  key: "filteredTodosState",
  get: ({ get }) => {
    const sort = get(sortState);
    const filter = get(filterState);
    const todos = get(todosState);

    let filteredTodos;

    if (filter === "doing") {
      filteredTodos = todos.filter((todo) => !todo.isDone);
    } else if (filter === "done") {
      filteredTodos = todos.filter((todo) => todo.isDone);
    } else {
      filteredTodos = todos;
    }

    switch (sort) {
      case "new":
        return [...filteredTodos].sort((a, b) => b.id - a.id);
      case "old":
        return [...filteredTodos].sort((a, b) => a.id - b.id);
      case "asc":
        return [...filteredTodos].sort((a, b) => {
          const textA = a.value;
          const textB = b.value;
          return textA.localeCompare(textB);
        });
      case "desc":
        return [...filteredTodos].sort((a, b) => {
          const textA = a.value;
          const textB = b.value;
          return textB.localeCompare(textA);
        });
      default:
        return filteredTodos;
    }
  },
});
