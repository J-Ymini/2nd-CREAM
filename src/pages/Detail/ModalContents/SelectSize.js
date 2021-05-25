import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Styled from 'styled-components';

export default function SelectSize({ on, onSet, sizePrice, children }) {
  const routeMatchId = useRouteMatch().params.id;

  return (
    <SelectSizeStyle>
      <h1>사이즈 선택</h1>
      <p className="subTitle">즉시 구매가(원)</p>
      <SizeBtns>
        {children}
        {sizePrice &&
          sizePrice.map((el, index) => {
            if (Object.keys(el)[0] === 'buy_price') {
              return (
                <Link
                  to={`/products/buypage/${routeMatchId}?size=${el.size}`}
                  key={index}
                >
                  <div className="sizeBtn">
                    <span className="btnTitle">{el.size}</span>
                    <span
                      className="btnPrice"
                      style={
                        el['buy_price'] === null
                          ? { color: 'black' }
                          : { color: '#f1604f' }
                      }
                    >
                      {el['buy_price'] === null
                        ? '구매 입찰'
                        : Math.floor(el['buy_price']).toLocaleString()}
                    </span>
                  </div>
                </Link>
              );
            } else if (Object.keys(el)[0] === 'sell_price') {
              return (
                <Link
                  to={`/products/sellpage/${routeMatchId}?size=${el.size}`}
                  key={index}
                >
                  <div className="sizeBtn">
                    <span className="btnTitle">{el.size}</span>
                    <span
                      className="btnPrice"
                      style={
                        el['sell_price'] === null
                          ? { color: 'black' }
                          : { color: '#41b979' }
                      }
                    >
                      {el['sell_price'] === null
                        ? '판매 입찰'
                        : Math.floor(el['sell_price']).toLocaleString()}
                    </span>
                  </div>
                </Link>
              );
            }
          })}
      </SizeBtns>
      <i className="fas fa-times closeModal" onClick={() => onSet(!on)} />
    </SelectSizeStyle>
  );
}

const SelectSizeStyle = Styled.section`
  position: relative;
  width: 100%;

  h1 {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }

  .subTitle {
    margin-top: 3px;
    font-size: 14px;
    font-weight: 100;
    color: gray;
    text-align: center;
  }

  .closeModal {
    position : absolute;
    padding: 10px;
    top: 0;
    right: 0;
    font-size: 20px;
    cursor: pointer;
  }
`;

const SizeBtns = Styled.div`
  ${props => props.theme.flexbox('row', 'flex-start', 'center')}
  flex-wrap: wrap;
  margin-top: 30px;

  .sizeBtn {
    ${props => props.theme.flexbox('column', 'center', 'center')}
    width: 121.2px;
    margin: 5px;
    padding: 10px 20px;
    border: 1px solid #d3d3d3;
    border-radius: 12px;

    span {
      margin: 0 0;
    }

    .btnPrice {
      margin-top: 2px;
      font-size: 14px;
      font-weigth: 100;
    }
  }
`;
