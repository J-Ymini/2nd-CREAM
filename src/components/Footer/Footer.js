import React from 'react';
import Styled from 'styled-components';

export default function Footer() {
  return (
    <FooterStyle>
      <FooterBanner>
        <Banner first="first">
          <h1>SERVISE GUIDE</h1>
          <span>CREAM은 처음이지?</span>
          <span>서비스 소개를 확인해보세요</span>
          <img alt="image3" src="/images/funny1.png" className="ojeaImage" />
        </Banner>
        <Banner second="second">
          <h1>DOWNLOAD THE APP</h1>
          <span>CREAM 앱을 설치하여</span>
          <span>한정판 스니커즈를 FLEX 하세요!</span>
          <img alt="image2" src="/images/banner2.gif" />
        </Banner>
      </FooterBanner>
      <div className="footerBottom">
        <FooterLinks>
          <Links>
            <h1>이용안내</h1>
            <li>검수기준</li>
            <li>이용정책</li>
            <li>패널티 정책</li>
            <li>커뮤니티 가이드라인</li>
          </Links>
          <Links>
            <h1>고객지원</h1>
            <li>공지사항</li>
            <li>서비스 소개</li>
            <li>쇼룸 안내</li>
            <li>판매자 방문접수</li>
          </Links>
        </FooterLinks>
        <FooterFunny>
          <img alt="image1" src="/images/banner1.png" />
          <img alt="image2" src="/images/funny2.jpg" />
        </FooterFunny>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = Styled.section`
  width: 100%;
  margin: 100px auto;
  padding-bottom: 50px;
  border-bottom: 1px solid #e4e4e4;

  .footerBottom {
    ${props => props.theme.flexbox('row', 'space-between', 'center')};
  }
`;

const FooterBanner = Styled.div`
  ${props => props.theme.flexbox('row', 'space-between', 'center')}
  width: 100%;
  height: 300px;
`;

const Banner = Styled.div`
  position: relative;
  width: 50%;
  padding: 50px;
  color: #e7e7e7;
  background-color: ${props =>
    props.first === 'first' ? '#565656' : '#3b3a3c'};
  
  h1 {
    margin-bottom: 10px;
  }

  span {
    display: block;
    margin-bottom: 2px;
  }

  img {
    position: absolute;
    top: -1px;
    right: 40px;
    width: 100px;
    border-radius: 12px;
  }
`;

const FooterLinks = Styled.div`
  ${props => props.theme.flexbox('row', 'space-between', 'center')};
  width: 40%;
`;

const Links = Styled.ul`
  ${props => props.theme.flexbox('column', 'space-between', 'flex-start')}
  margin-left: 50px;

  h1 {
    margin-bottom: 20px;
    font-size: 15px;
  }

  li {
    margin-bottom: 15px;
    font-size: 15px;
    color: gray;
  }
`;

const FooterFunny = Styled.div`
  ${props => props.theme.flexbox('row')}
  width: 30%;

  img {
    width: 300px;
    height: 200px;
    margin-right: 10px;
  }
`;
