import React from 'react';
import Styled from 'styled-components';

export default function PrecautionModal({ on, onSet }) {
  return (
    <PrecautionModalStyle>
      <h1>상품 특이사항</h1>
      <h2>
        반드시 보유하신 상품만 <br /> 판매하세요.
      </h2>
      <div className="textTitle">
        모든 판매는 보유하신 상품으로만 거래하시는 것이 원칙입니다.
      </div>
      <p>
        KREAM은 판매거래 체결 후, 48시간 이내(일,공휴일 제외)에 상품을
        발송하여야 합니다. 온라인 주문 후 상품을 배송 받지 못하여 운송장번호를
        입력하지 못하는 사례가 발생하고 있습니다.
      </p>
      <p>
        보유하신 상품이 아니거나, 즉시 발송이 불가능한 경우의 거래 체결은
        발송지연, 미입고 등으로 페널티 15%가 부과됩니다.
      </p>

      <i className="fas fa-times closeModal" onClick={() => onSet(!on)} />
    </PrecautionModalStyle>
  );
}

const PrecautionModalStyle = Styled.div`
  position: relative;
  width: 100%;

  h1 {
    font-size: 18px;
    text-align: center;
  }

  h2 {
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid black;
    font-size: 25px;
    font-weight: 600;
    line-height: 1.2;
  }

  .textTitle {
    margin: 20px 0;
    font-weight: 600;
  }

  p {
    margin-top: 30px;
    font-size: 14px;
    line-height: 1.25;
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
