import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import API_URLS from '../../config';

export default function Mypage() {
  const [buyingCount, setBuyingCount] = useState({
    전체: 0,
    진행중: 0,
    종료: 0,
  });

  const [sellingCount, setSellingCount] = useState({
    전체: 0,
    진행중: 0,
    종료: 0,
  });

  const [userInfo, setUserInfo] = useState({
    id: 0,
    name: '',
    email: '',
    point: '',
  });

  const history = useHistory();

  const checkProfile = () => {
    alert('점검중입니다.');
  };

  const setValuesOfUserInformation = value => {
    setBuyingCount({
      ...buyingCount,
      전체: value[0]['buy_biddings']['buy_all'],
      진행중: value[0]['buy_biddings']['buy_finished'],
      종료: value[0]['buy_biddings']['buy_proceeding'],
    });
    setSellingCount({
      ...sellingCount,
      전체: value[0]['sell_biddings']['sell_all'],
      진행중: value[0]['sell_biddings']['sell_finished'],
      종료: value[0]['sell_biddings']['sell_proceeding'],
    });
    setUserInfo({
      ...userInfo,
      id: value[0]['user_information']['user_id'],
      name: value[0]['user_information']['user_nickname'],
      email: value[0]['user_information']['user_email'],
      point: value[0]['user_information']['user_point'],
    });
  };

  useEffect(() => {
    fetch(`${API_URLS.MYPAGE}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('cream_token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'INVALID_USER_ERROR') {
          alert('로그인이 필요합니다.');
          history.push('/login');
        } else {
          const { result } = res;
          setValuesOfUserInformation(result);
        }
      });
  }, [
    buyingCount.전체,
    buyingCount.진행중,
    buyingCount.종료,
    sellingCount.전체,
    sellingCount.진행중,
    sellingCount.종료,
    setUserInfo.point,
  ]);

  return (
    <Container>
      <AsideBar>
        <h1>MY PAGE</h1>
        <Label>쇼핑 정보</Label>
        <ul>
          {ASIDE_BARLISTS.map((list, index) => (
            <List key={index}>{list}</List>
          ))}
        </ul>
      </AsideBar>
      <Contents>
        <TopContents>
          <UserInfo>
            <UserImg />
            <div>
              <UserName>{userInfo.name}</UserName>
              <UserEmail>{userInfo.email}</UserEmail>
              <UserEditProfile onClick={checkProfile}>
                프로필 수정
              </UserEditProfile>
            </div>
          </UserInfo>
          <UserGradeInfo>
            <UserGrade>
              <div>일반 회원</div>
              <div>회원 등급</div>
            </UserGrade>
            <UserPoint>
              <div>{userInfo.point.toLocaleString()}P</div>
              <div>포인트</div>
            </UserPoint>
          </UserGradeInfo>
        </TopContents>
        <MiddleContents>
          <BuyingSection>
            <DealLabel>구매 내역</DealLabel>
            <DealSection>
              {Object.keys(buyingCount).map((key, index) => {
                return (
                  <DealContents key={index}>
                    <Name total={key}>{key}</Name>
                    <Count>{buyingCount[key]}</Count>
                  </DealContents>
                );
              })}
            </DealSection>
          </BuyingSection>
          <SellingSection>
            <DealLabel>판매 내역</DealLabel>
            <DealSection>
              {Object.keys(sellingCount).map((key, index) => {
                return (
                  <DealContents key={index}>
                    <Name total={key}>{key}</Name>
                    <Count>{sellingCount[key]}</Count>
                  </DealContents>
                );
              })}
            </DealSection>
          </SellingSection>
        </MiddleContents>
      </Contents>
    </Container>
  );
}

const Container = styled.section`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'start')}
  margin: 180px auto 0;
  padding: 40px 40px 160px;
  max-width: 1300px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 30px;
  font-size: 25px;
`;

const List = styled.li`
  margin-bottom: 20px;
  color: rgba(34, 34, 34, 0.5);
  font-size: 20px;
`;

const AsideBar = styled.aside`
  margin-right: 40px;

  h1 {
    margin-bottom: 25px;
    font-size: 32px;
    font-weight: bold;
  }
`;

const Contents = styled.article`
  ${({ theme }) => theme.flexbox('column', 'flex-start')}
  width: 100%;
`;

const TopContents = styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-between')};
  margin-bottom: 60px;
  padding: 30px;
  width: 100%;
  border: 1px solid rgba(34, 34, 34, 0.2);
  border-radius: 15px;
`;

const BuyingSection = styled.div`
  margin-bottom: 100px;
`;

const SellingSection = styled(BuyingSection.withComponent('div'))``;

const UserInfo = styled.div`
  ${({ theme }) => theme.flexbox()}
`;

const UserImg = styled.img.attrs(() => ({
  alt: 'user_profile_image',
  src: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
}))`
  margin-right: 30px;
  width: 100px;
  border-radius: 50%;
`;

const UserName = styled.div`
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: bold;
`;

const UserEmail = styled.div`
  margin-bottom: 10px;
  color: rgba(34, 34, 34, 0.5);
`;

const UserEditProfile = styled.button`
  padding: 5px 15px;
  border: 1px solid rgba(34, 34, 34, 0.2);
  border-radius: 10px;
  cursor: pointer;
`;

const UserGradeInfo = styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-around')}
  position: relative;
  width: 300px;

  &:after {
    display: block;
    position: absolute;
    width: 1px;
    left: 53%;
    content: '';
    height: 100px;
    background-color: rgba(34, 34, 34, 0.2);
  }
`;

const UserGrade = styled.div`
  div {
    padding: 30px;

    &:first-child {
      font-weight: bold;
    }
  }
`;

const UserPoint = styled.div`
  div {
    padding: 30px;
    text-align: center;

    &:first-child {
      font-weight: bold;
    }
  }
`;

const MiddleContents = styled.div`
  padding: 30px;
  width: 100%;
  border: 1px solid rgba(34, 34, 34, 0.2);
  border-radius: 10px;
`;

const DealLabel = styled.label`
  display: block;
  margin-bottom: 30px;
  font-size: 25px;
  font-weight: bold;
`;

const DealContents = styled.div`
  ${({ theme }) => theme.flexbox('column')}
  position: relative;

  &:after {
    display: block;
    position: absolute;
    width: 40px;
    height: 1px;
    content: '';
    top: 90px;
    background-color: rgba(34, 34, 34, 0.2);
  }
`;

const DealSection = styled.dl`
  ${({ theme }) => theme.flexbox('row', 'space-around')}
  padding: 30px;
`;

const Name = styled.dt`
  margin-bottom: 30px;
  font-size: 17px;
  font-weight: bold;
  color: ${props => {
    if (props.total === '전체') {
      return 'red';
    }

    if (props.total === '종료') {
      return '#41b979';
    }
  }};
`;

const Count = styled.dd`
  font-size: 20px;
  font-weight: bold;
`;

const ASIDE_BARLISTS = ['구매 내역', '판매 내역', '상품 내역'];
