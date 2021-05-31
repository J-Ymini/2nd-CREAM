import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import LoginInput from './components/LoginInput';
import API_URLS from '../../config';

function Login() {
  const { Kakao } = window;
  const history = useHistory();
  useEffect(() => {
    Kakao.init('db017fd8a2487a8a7a4cf4e615f3b53d');
  }, []);

  const handleKakaoLogin = e => {
    e.preventDefault();
    Kakao.Auth.login({
      success: function (response) {
        fetch(`${API_URLS.LOGIN}`, {
          scope: 'profile, account_email',
          method: 'POST',
          headers: {
            Authorization: response.access_token,
          },
        })
          .then(res => res.json())
          .then(res => {
            if (res['cream_token']) {
              Kakao.Auth.logout();
              alert('로그인에 성공하셨습니다.');
              localStorage.setItem('cream_token', res['cream_token']);
              history.push('/products');
            }
          });
      },
      fail: function (error) {
        alert('로그인에 실패했습니다.');
      },
    });
  };

  return (
    <Container>
      <Logo alt="cream로고" src="/images/login_logo.png" />
      <form>
        {loginData.map(loginData => {
          const { id, type, text, discription, placeholder } = loginData;
          return (
            <LoginInput
              key={id}
              type={type}
              text={text}
              discription={discription}
              placeholder={placeholder}
            />
          );
        })}
        <LoginButton onClick={handleKakaoLogin}>
          <img
            alt="kakao lion"
            src="https://t1.daumcdn.net/cfile/tistory/2207573D58CFDE2704"
          />
          카카오 로그인
        </LoginButton>
      </form>
    </Container>
  );
}

const Container = styled.section`
  ${props => props.theme.flexbox('column')}
  margin-top: 150px;
`;

const Logo = styled.img`
  margin: 0 auto 50px;
  width: 250px;
`;

const LoginButton = styled.button`
  ${props => props.theme.flexbox()}
  width: 100%;
  margin: 40px 0;
  padding: 10px 0;
  background-color: #f3c800;
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }

  img {
    width: 80px;
  }

  span {
    margin-left: -15px;
  }
`;

const LogoutButton = styled.button`
  ${props => props.theme.flexbox()}
  width: 100%;
  margin: 40px 0;
  padding: 10px 0;
  background-color: #f3c800;
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }

  img {
    width: 80px;
  }

  span {
    margin-left: -15px;
  }
`;

const loginData = [
  {
    id: 1,
    type: 'email',
    text: '이메일 주소',
    discription: '이메일 주소를 정확히 입력해주세요.',
    placeholder: '예)cream@cream.co.kr',
  },
  {
    id: 2,
    type: 'password',
    text: '비밀번호',
    discription: '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)',
    placeholder: '',
  },
];

export default Login;
