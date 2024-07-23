import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ type = "button", icon, onClick, visible }) => {
  return (
    <Wrapper type={type} onClick={onClick} visible={visible}>
      <FontAwesomeIcon icon={icon} />
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.button`
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
`;
