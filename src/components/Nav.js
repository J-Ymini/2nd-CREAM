import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import styled from 'styled-components';
import Modal from './Modal/Modal';

const Nav = () => {
  const [on, setOn] = useState(false);
  const [onSearchModal, setOnSearchModal] = useState(false);
  const [inputValue, setinputValue] = useState('');
  const history = useHistory();
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

  const searchKeyword = e => {
    e.preventDefault();
    history.push(`/products?search=${inputValue}`);
    setOnSearchModal(!onSearchModal);
    setinputValue('');
  };

  const handleInput = e => {
    setinputValue(e.target.value);
  };

  return (
    <>
      {location.pathname !== '/login' && (
        <NavStyle>
          <Link to="/products">
            <TitleLogo alt="main title logo" src="/images/nav_logo.png" />
          </Link>
          <NavSearchInput
            onClick={() => {
              setOnSearchModal(!onSearchModal);
            }}
          >
            <i class="fas fa-search"></i>
          </NavSearchInput>
          <Modal on={onSearchModal} navSearch>
            <NavSearchModalContainer>
              <SearchInputContainerDisplay>
                <SearchInputContainer
                  onSubmit={searchKeyword}
                  setOn={setOnSearchModal}
                >
                  <i class="fas fa-search"></i>
                  <SearchInput
                    placeholder="브랜드명, 모델명, 모델번호 등"
                    onChange={handleInput}
                    value={inputValue}
                  />
                </SearchInputContainer>
              </SearchInputContainerDisplay>
              <button
                onClick={() => {
                  setOnSearchModal(!onSearchModal);
                  setinputValue('');
                }}
              >
                취소
              </button>
              <BrandList>
                {BRAND_LISTS.map(brandinfo => {
                  return (
                    <li key={brandinfo.brand_id}>
                      <TopBrandLogo src={brandinfo.brand_logo_url} />
                      {brandinfo.brand_name}
                    </li>
                  );
                })}
              </BrandList>
            </NavSearchModalContainer>
          </Modal>
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
        </NavStyle>
      )}
    </>
  );
};

export default Nav;

const BRAND_LISTS = [
  {
    brand_id: 1,
    brand_logo_url: 'https://i.postimg.cc/j5STmz4x/bear.png',
    brand_name: 'Ojae',
  },
  {
    brand_id: 2,
    brand_logo_url: 'https://i.postimg.cc/hPdBk4Td/monkey.png',
    brand_name: 'Yongmin',
  },
  {
    brand_id: 3,
    brand_logo_url: 'https://i.postimg.cc/HWKmv8cm/raccoon.png',
    brand_name: 'Hamin',
  },
  {
    brand_id: 4,
    brand_logo_url: 'https://i.postimg.cc/MHcSKqLg/rat.png',
    brand_name: 'Syeon',
  },
  {
    brand_id: 5,
    brand_logo_url: 'https://i.postimg.cc/T1ZXKBM1/sheep.png',
    brand_name: 'Mihwa',
  },
];

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

const NavSearchModalContainer = styled.div`
  margin: 0 auto;
  width: 660px;

  button {
    text-align: right;
    width: 6%;
    font-size: 14px;
  }
`;

const SearchInputContainerDisplay = styled.div`
  display: inline-block;
  width: 94%;
`;

const BrandList = styled.ul`
  ${props => props.theme.flexbox()}
  justify-content: space-between;
  margin: 25px 0 16px 0;
  padding-bottom: 10px;

  li {
    background-color: #ebf0f4;
    padding: 16px 22px 16px 22px;
    border-radius: 10px;
    text-align: center;
  }
`;

const TopBrandLogo = styled.img`
  display: block;
  width: 70px;
  height: 70px;
`;

const SearchInputContainer = styled.form`
  display: flex;
  margin-top: 25px;
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

const SearchInput = styled.input`
  margin-left: 11px;
  width: 90%;
  font-size: 14px;

  &::placeholder {
    color: #bcbcbc;
    font-size: 14px;
  }
`;

const NavLinkContainer = styled.div`
  font-size: 14px;

  a {
    padding: 8px 10px;
  }
`;
