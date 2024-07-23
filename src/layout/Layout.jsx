import styled from "styled-components";

function Layout({ children }) {
  return (
    <Wrapper>
      <>{children}</>
    </Wrapper>
  );
}

export default Layout;

const Wrapper = styled.div`
  width: 1100px;
  height: 650px;
  display: grid;
  grid-template-columns: 3fr 7fr;
  margin: 100px auto 0px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.layoutBgColor};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;
