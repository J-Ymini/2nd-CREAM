import React from 'react';
import styled from 'styled-components';

function LoginInput({ type, text, discription, placeholder }) {
  return (
    <InputContents>
      <Label>{text}</Label>
      <Input placehoder={placeholder} type={type} />
      <Discription>{discription}</Discription>
    </InputContents>
  );
}

const InputContents = styled.div`
  padding: 10px 0 14px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-bottom: 2px;
  padding: 8px 30px 8px 0;
  width: 400px;
  border-bottom: 1px solid #ebebeb;

  &::placeholder {
    color: grey;
  }
`;

const Discription = styled.p`
  font-size: 11px;
`;

export default LoginInput;
