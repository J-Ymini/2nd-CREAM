import React from 'react';
import Styled from 'styled-components';

export default function SizeBtn({ on, setCurrentSize }) {
  return (
    <SizeBtnStyle displayOn={on}>
      {BTN_LIST.map((el, index) => (
        <div
          key={index}
          name={el.name}
          onClick={() => {
            setCurrentSize(el.name);
          }}
        >
          {el.size}
        </div>
      ))}
    </SizeBtnStyle>
  );
}

const BTN_LIST = [
  {
    size: '모든 사이즈',
    name: '',
  },
  {
    size: '250',
    name: '250',
  },
  {
    size: '260',
    name: '260',
  },
  {
    size: '270',
    name: '270',
  },
  {
    size: '280',
    name: '280',
  },
  {
    size: '290',
    name: '290',
  },
];

const SizeBtnStyle = Styled.div`
  ${props => props.theme.flexbox('column', 'flex-start', 'flex-start')};
  display: ${props => !props.displayOn && 'none'};
  position: absolute;
  top: 50px;
  right: -20px;
  width: 180px;
  height: 280px;
  padding-top: 5px;
  border: 1px solid #ebebeb;
  background-color: #ffffff;
  overflow-y: scroll;

  div {
    padding: 15px 20px;
    color: rgba(34,34,34,.8);
  }
`;
