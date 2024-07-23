import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isDarkState } from "../../recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

function DarkModeButton() {
  const [isDark, setIsDark] = useRecoilState(isDarkState);
  const toggleDarkMode = () => setIsDark((prev) => !prev);

  return (
    <>
      <Button isDark={isDark} onClick={toggleDarkMode}>
        <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
      </Button>
    </>
  );
}

export default DarkModeButton;

const Button = styled.button`
  width: 50px;
  height: 50px;
  position: fixed;
  top: 15px;
  left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: ${(props) => props.theme.btnColor};

  &:hover {
    background-color: ${(props) => props.theme.btnHoverBgColor};
    cursor: pointer;
  }
`;
