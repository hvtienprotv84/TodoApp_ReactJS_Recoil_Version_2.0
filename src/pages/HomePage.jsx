import styled from "styled-components";

function HomeContainer() {
  return <Wrapper>
      <TitleHome>Trang Chủ&nbsp;|&nbsp;Todo App - Ghi Chú Công Việc - ReactJS - Recoil - Version 2.0</TitleHome>
      <Description>Hãy Ghi Chú Công Việc Nào!</Description>
      <ImgHome src="logo_22.png" alt="" />
      <Copyright>&copy; Mọi Bản Quyền Thuộc Về Huỳnh Vĩnh Tiến</Copyright>
  </Wrapper>;
}

export default HomeContainer;

const Wrapper = styled.div`
  padding: 40px 30px;
`;

const TitleHome = styled.h1`
  font-size: 20px;
`;

const Description = styled.p`
  position: absolute;
  font-size: 30px;
  margin-top: 50px;
  font-weight: bold;
  margin-left: 150px;

  @media (max-width: 768px) {
    font-size: 28px;
    width: 100%;
  }

`;

const ImgHome = styled.img`
  position: absolute;
  font-size: 30px;
  margin-top: 110px;
  font-weight: bold;
  width: 450px;
  margin-left: 150px;

  @media (max-width: 768px) {
    width: 400px;
  }
`;

const Copyright = styled.p`
  position: absolute;
  font-size: 30px;
  margin-top: 545px;
  font-weight: bold;
  margin-left: 50px;

  @media (max-width: 768px) {
    font-size: 16px;
    width: 100%;
    max-width: 100%;
    margin-left: 200px;
  }
`;