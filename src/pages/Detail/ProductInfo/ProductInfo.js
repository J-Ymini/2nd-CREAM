import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Styled from 'styled-components';
import Precautions from '../Precautions/Precautions';
import SelectSize from '../ModalContents/SelectSize';
import Modal from '../../../components/Modal/Modal';
import DealBtn from '../DealBtn/DealBtn';
import API_URLS from '../../../config';

export default function ProductInfo() {
  const [onSelectSizeModal, setOnSelectSizeModal] = useState(false);
  const [productInfos, setProductInfos] = useState({});
  const [percentage, setPercentage] = useState([]);
  const percentageResult = {};
  const purchasePrice = [];
  const sellPrice = [];
  const routeMatchID = useRouteMatch().params.id;

  useEffect(() => {
    fetch(`${API_URLS.DETAIL}/${routeMatchID}`)
      // fetch('/data/detailMockData.json')
      .then(res => res.json())
      .then(productInfos => {
        setProductInfos(productInfos['product_information']);
      });

    fetch(`${API_URLS.DETAIL}/${routeMatchID}/order`)
      // fetch('/data/recentDealData.json')
      .then(res => res.json())
      .then(price => setPercentage(price.order_list));
  }, []);

  const dividePurchase = () => {
    if (productInfos.id) {
      productInfos.option.map(el =>
        purchasePrice.push({ buy_price: el['buy_price'], size: el.size })
      );
    }
  };

  const divideSell = () => {
    if (productInfos.id) {
      productInfos.option.map(el =>
        sellPrice.push({ sell_price: el['sell_price'], size: el.size })
      );
    }
  };

  const pricePercentage = () => {
    if (percentage.length > 0) {
      if (percentage[0].price >= percentage[1].price) {
        percentageResult.raise = 'up';
        percentageResult.value = percentage[0].price - percentage[1].price;
        percentageResult.percentage = percentage[0].price / percentage[1].price;
      } else {
        percentageResult.raise = 'down';
        percentageResult.value = percentage[1].price - percentage[0].price;
        percentageResult.percentage = percentage[1].price / percentage[0].price;
      }
    }
  };

  pricePercentage();
  dividePurchase('buy_price');
  divideSell('sell_price');

  return (
    <ProductInfoStyle>
      <ProductName>
        <h1>{productInfos['english_name']}</h1>
        <h2>{productInfos['korean_name']}</h2>
        <i className="far fa-bookmark" />
      </ProductName>
      <ProductSize>
        <h3>사이즈</h3>
        <button type="button">
          <span onClick={() => setOnSelectSizeModal(!onSelectSizeModal)}>
            모든 사이즈
          </span>
          <i className="far fa-caret-square-down" />
        </button>
      </ProductSize>
      <ProductPrice changePriceColor={percentageResult.raise}>
        <h3>최근 거래가</h3>
        <div className="prices">
          <div className="price">
            {`${Math.floor(productInfos['lately_order']).toLocaleString()}원`}
          </div>
          <div className="changePrice">
            {percentageResult.raise === 'up' ? (
              <i className="fas fa-caret-up" />
            ) : (
              <i className="fas fa-caret-down" />
            )}
            <span>
              {Math.floor(percentageResult.value).toLocaleString()}원{' '}
              {`${percentageResult.raise === 'up' ? '+' : '-'}${
                percentageResult.percentage !== undefined &&
                percentageResult.percentage.toFixed(1)
              }%`}
            </span>
          </div>
        </div>
      </ProductPrice>
      {productInfos && (
        <DealBtn purchasePrice={purchasePrice} sellPrice={sellPrice} />
      )}
      <Precautions />

      <Modal on={onSelectSizeModal}>
        <SelectSize
          on={onSelectSizeModal}
          onSet={setOnSelectSizeModal}
          latelyOrder={productInfos['lately_order']}
          sizePrice={purchasePrice}
        >
          <div className="sizeBtn">
            <span className="btnTitle">모든 사이즈</span>
            <span className="btnPrice" style={{ color: '#ef6253' }}>
              {Math.floor(productInfos['lately_order']).toLocaleString()}
            </span>
          </div>
        </SelectSize>
      </Modal>
    </ProductInfoStyle>
  );
}

const ProductInfoStyle = Styled.div`
  width: 100%;
`;

const ProductName = Styled.div`
  position: relative;

  h1 {
  font-size: 1.5rem;
  font-weight: 600;
  }

  h2 {
  margin-top: 8px;
  font-weight: 100;
  }

  i {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.3rem;
  cursor: pointer;
  }
`;

const ProductSize = Styled.div`
  ${props => props.theme.flexbox('row', 'space-between', 'center')}
    padding-top: 2.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgb(235 235 235);

    h3 {
      font-size: 0.9rem;
      font-weight: 200;
    }

    button {
      font-size: 1.05rem;
      font-weight: 600;
      cursor: pointer;

      span {
        margin-right: 6px;
      }
    }
`;

const ProductPrice = Styled.div`
  ${props => props.theme.flexbox('row', 'space-between', 'flex-start')}
  padding-top: 1rem;

  h3 {
    font-size: 0.9rem;
    font-weight: 200;
  }

  .prices {
    ${props => props.theme.flexbox('column', 'center', 'flex-end')}

  .price {
    margin-bottom: 8px;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .changePrice {
    font-size: 0.8rem;
    color: ${props =>
      props.changePriceColor === 'up' ? '#f25b49' : '#41b979'};
  }
`;
