import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {
  const [on, setOn] = useState(false);
  const location = useLocation();

  const handleKakaoLogout = () => {
    if (localStorage.getItem('cream_token')) {
      localStorage.removeItem('cream_token');
      alert('로그아웃되었습니다.');
      setOn(!on);
    } else {
      alert('로그인 상태가 아닙니다.');
    }
  };

  console.log(location.pathname);
  return (
    <NavStyle>
      {location.pathname !== '/login' && (
        <>
          <Link to="/products">
            <TitleLogo alt="main title logo" src="/images/nav_logo.png" />
          </Link>
          <NavSearchInput>
            <i class="fas fa-search"></i>
          </NavSearchInput>
          <NavLinkContainer>
            {localStorage.getItem('cream_token') ? (
              <>
                <Link to="/my">마이 페이지</Link>
                <Link to="/products" onClick={handleKakaoLogout}>
                  로그아웃
                </Link>
              </>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </NavLinkContainer>
        </>
      )}
    </NavStyle>
  );
};

export default Nav;

const NavStyle = styled.nav`
  ${props => props.theme.flexbox('row', 'space-around', 'center')}
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 90px;
  padding: 0 16px;
  border-bottom: 1px solid #e8e8e8;
  background-color: white;
  z-index: 1;
`;

const TitleLogo = styled.img`
  width: 120px;
  height: 20px;
`;

const NavSearchInput = styled.div`
  width: 76%;
  height: 40px;
  border-radius: 8px;
  background-color: #f4f4f4;
  cursor: text;

  .fas {
    color: #bebebe;
    font-size: 18px;
    margin: 11px 0 0 11px;
  }
`;

const NavLinkContainer = styled.div`
  font-size: 14px;

  a {
    padding: 8px 10px;
  }
`;
