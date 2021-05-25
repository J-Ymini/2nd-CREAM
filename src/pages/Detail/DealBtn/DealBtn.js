import React, { useState } from 'react';
import Styled from 'styled-components';
import Modal from '../../../components/Modal/Modal';
import SelectSize from '../ModalContents/SelectSize';

export default function DealBtn({ purchasePrice, sellPrice }) {
  const [onPurchaseModal, setOnPurchaseModal] = useState(false);
  const [onSalesModal, setOnSalesModal] = useState(false);

  const recentPurchasePrice = () => {
    for (let i = 0; i < purchasePrice.length; i++) {
      if (purchasePrice[i]['buy_price'] !== null) {
        return purchasePrice[i]['buy_price'];
      }
    }
  };

  const recentSellPrice = () => {
    for (let i = 0; i < purchasePrice.length; i++) {
      if (sellPrice[i]['sell_price'] !== null) {
        return sellPrice[i]['sell_price'];
      }
    }
  };

  return (
    <PurchaseBtnStyle>
      <div
        className="purchaseBtn"
        onClick={() => setOnPurchaseModal(!onPurchaseModal)}
      >
        <div className="btnName">구매</div>
        <DealPrice>
          <span>{Math.floor(recentPurchasePrice()).toLocaleString()}원</span>
          <span>즉시 구매가</span>
        </DealPrice>
      </div>

      <Modal on={onPurchaseModal}>
        <SelectSize
          on={onPurchaseModal}
          onSet={setOnPurchaseModal}
          sizePrice={purchasePrice}
        />
      </Modal>

      <div className="salesBtn" onClick={() => setOnSalesModal(!onSalesModal)}>
        <div className="btnName">판매</div>
        <DealPrice>
          <span>{Math.floor(recentSellPrice()).toLocaleString()}원</span>
          <span>즉시 판매가</span>
        </DealPrice>
      </div>

      <Modal on={onSalesModal}>
        <SelectSize
          on={onSalesModal}
          onSet={setOnSalesModal}
          sizePrice={sellPrice}
        />
      </Modal>
    </PurchaseBtnStyle>
  );
}

const PurchaseBtnStyle = Styled.section`
  ${props => props.theme.flexbox('row', 'space-between', 'center')}
  margin-top: 25px;

  .purchaseBtn,
  .salesBtn {
    ${props => props.theme.flexbox('row', 'flex-start', 'center')}
    position: relative;
    width: 48%;
    height: 60px;
    border-radius: 12px;
    color: ${props => props.theme.white};
    cursor: pointer;
  }

  .purchaseBtn {
    background-color: #ef6253;
  }

  .salesBtn {
    background-color: #41b979;
  }

  .btnName {
    margin: 0 13px;
    font-size: 19px;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 55px;
      width: 1px;
      height: 100%;
      background-color: rgba(34, 34, 34, .1);
    }
  }
`;

const DealPrice = Styled.div`
    ${props => props.theme.flexbox('column', 'center', 'flex-start')}
    margin-left: 10px;

    span:last-child {
      margin-top: 3px;
      font-size: 11px;
      font-weight: 100;
    }
`;
