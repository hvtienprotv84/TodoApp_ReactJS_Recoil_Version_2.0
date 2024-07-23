import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isDarkState } from "./recoil";
import { ThemeProvider } from "styled-components";
import { dark, light } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import Layout from "./layout/Layout";
import DarkModeButton from "./components/Button/DarkModeButton";
import CategoryContainer from "./components/Category/CategoryContainer";
import HomePage from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";

function App() {
  const isDark = useRecoilValue(isDarkState);
  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <GlobalStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Layout>
          <DarkModeButton />
          <CategoryContainer />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/:id" element={<TodoPage />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
