import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ProductThumbnail from '../../components/ProductThumbnail/ProductThumbnail';
import API_URLS from '../../config';

export default function BuyPage(props) {
  const [wishPrice, setWishPrice] = useState(0);
  const [sellBidding, setSellBidding] = useState(true);
  const [sellImmediately, setSellImmediately] = useState(false);
  const [sellInformation, setSellInformation] = useState([]);
  const [sellState, setSellState] = useState('');
  const inputElement = useRef();
  const history = useHistory();

  const goToFirstTap = () => {
    setSellBidding(true);
    setSellImmediately(false);
    setWishPrice(0);
    setSellState('bidding');
  };

  const goToSecondTap = () => {
    setSellBidding(false);
    setSellImmediately(true);
    setWishPrice(
      Number(sellInformation['product_information']?.['selling_price'])
    );
    setSellState('selling');
  };

  const setPrice = () => {
    if (
      inputElement.current.value <
      Number(sellInformation['product_information']?.['selling_price'])
    ) {
      setSellBidding(false);
      setSellImmediately(true);
      setWishPrice(
        Number(sellInformation['product_information']?.['selling_price'])
      );
      setSellState('selling');
    } else {
      setWishPrice(inputElement.current.value);
      setSellState('bidding');
    }
  };

  const pressEnter = e => {
    e.charCode === 13 && setPrice();
  };

  const deciseSell = () => {
    const { id } = props.match.params;
    if (wishPrice === 0) {
      alert('가격을 입력하셔야 합니다.');
    } else {
      fetch(`${API_URLS['SELL_PAGE']}/${id}?sell=${sellState}`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('cream_token'),
        },
        body: JSON.stringify({
          price: wishPrice,
          buying_id: sellInformation['product_information']?.['buying_id'],
          buy_user: sellInformation['product_information']?.['buying_user'],
          size: sellInformation['product_information']?.size,
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (sellState === 'selling') {
            alert('판매가 완료되었습니다.');
            history.push('/my');
          } else if (sellState === 'bidding') {
            alert('판매 입찰이 완료되었습니다.');
            history.push('/my');
          }
        });
    }
  };

  useEffect(() => {
    const { id } = props.match.params;
    const size = props.location.search.split('=')[1];
    fetch(`${API_URLS['SELL_PAGE']}/${id}?size=${size}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('cream_token'),
      },
    })
      .then(res => res.json())
      .then(res => setSellInformation(res));
  }, []);

  const PRICE_LISTS = [
    {
      '즉시 구매가': Number(
        sellInformation['product_information']?.['buying_price']
      ).toLocaleString(),
    },
    {
      '즉시 판매가': Number(
        sellInformation['product_information']?.['selling_price']
      ).toLocaleString(),
    },
  ];

  return (
    <Container>
      <ProductThumbnail
        eng_title={sellInformation['product_information']?.['english_name']}
        kor_title={sellInformation['product_information']?.['korean_name']}
        size={sellInformation['product_information']?.size}
        img={sellInformation['product_information']?.image}
      />
      <ProductInformation>
        <ProductPriceInformation>
          <Label>가격 현황</Label>
          <PriceList>
            {PRICE_LISTS.map((price, index) => {
              return (
                <ImmediateDealInformation key={index}>
                  <div>{Object.keys(price)}</div>
                  <div>{Object.values(price)}원</div>
                </ImmediateDealInformation>
              );
            })}
          </PriceList>
          <TapList>
            <Button1 onClick={goToFirstTap} sellBidding={sellBidding}>
              판매 입찰
            </Button1>
            <Button2 onClick={goToSecondTap} sellImmediately={sellImmediately}>
              즉시 판매
            </Button2>
          </TapList>
          {sellBidding && (
            <>
              <UserWishPrice inputElement={inputElement}>
                <Label>판매 희망가</Label>
                <PriceInput>
                  <WishPriceInput
                    type="number"
                    placeholder="판매 희망가 입력"
                    required
                    onBlur={setPrice}
                    onKeyPress={pressEnter}
                    ref={inputElement}
                  />
                  <span>원</span>
                </PriceInput>
              </UserWishPrice>
              <TotalPrice>
                <CheckPrice>
                  <div>검수비</div>
                  <div>-</div>
                </CheckPrice>
                <DeliveryPrice>
                  <div>배송비</div>
                  <div>선불 &middot; 판매자 부담</div>
                </DeliveryPrice>
                <Label className>총 정산금액</Label>
                <TotalBuyPrice>
                  <span>{Number(wishPrice).toLocaleString()}</span>
                  <span>원</span>
                </TotalBuyPrice>
              </TotalPrice>
            </>
          )}
          {sellImmediately && (
            <>
              <UserWishPrice>
                <Label>즉시 판매가</Label>
                <PriceInput>
                  <WishPriceInputFixed>
                    {Number(
                      sellInformation['product_information']?.['selling_price']
                    ).toLocaleString()}
                  </WishPriceInputFixed>
                  <span>원</span>
                </PriceInput>
              </UserWishPrice>
              <TotalPrice>
                <CheckPrice>
                  <div>검수비</div>
                  <div>-</div>
                </CheckPrice>
                <DeliveryPrice>
                  <div>배송비</div>
                  <div>선불 &middot; 판매자 부담</div>
                </DeliveryPrice>
                <Label className="totalPrice">총 정산금액</Label>
                <TotalBuyPrice>
                  <span>
                    {Number(
                      sellInformation['product_information']?.['selling_price']
                    ).toLocaleString()}
                  </span>
                  <span>원</span>
                </TotalBuyPrice>
              </TotalPrice>
            </>
          )}
          <Decision onClick={deciseSell}>판매 결정</Decision>
        </ProductPriceInformation>
      </ProductInformation>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexbox()}
  margin-top: 180px;
  padding: 40px 40px 160px 40px;
`;

const ProductInformation = styled.div`
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%);
`;

const ProductPriceInformation = styled.div`
  padding: 30px;
`;

const TotalPrice = styled.div`
  padding-bottom: 40px;
  margin-bottom: 50px;
  border-bottom: 2px solid #f4f4f4;
`;

const PriceList = styled.div`
  ${props => props.theme.flexbox('row', 'space-around')}
`;

const TapList = styled.div`
  ${props => props.theme.flexbox('row')}
  padding: 5px 10px;

  margin-bottom: 40px;
  border-radius: 12px;
  background-color: #f4f4f4;
`;

const Button1 = styled.button`
  padding: 10px 100px;
  color: ${props => (props.sellBidding ? 'white' : 'gray')};
  background-color: ${props => (props.sellBidding ? '#41b979' : '#f4f4f4')};
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:first-child {
    margin-right: 80px;
  }

  &:active {
    opacity: 0.8;
  }
`;

const Button2 = styled(Button1.withComponent('button'))`
  color: ${props => (props.sellImmediately ? 'white' : 'gray')};
  background-color: ${props => (props.sellImmediately ? '#41b979' : '#f4f4f4')};
`;

const PriceInput = styled.div`
  ${props => props.theme.flexbox('row', 'flex-end')}
  margin-bottom: 40px;
  width: 100%;
`;

const WishPriceInput = styled.input`
  width: 80%;
  margin-right: 20px;
  text-align: right;
  font-size: 25px;
  font-style: italic;
  font-weight: bold;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::placeholder {
    color: rgb(34, 34, 34, 0.5);
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
  }
`;

const WishPriceInputFixed = styled(WishPriceInput.withComponent('span'))``;

const UserWishPrice = styled.div`
  margin-bottom: 30px;
  width: 100%;
  border-bottom: 2px solid #f4f4f4;
`;

const Label = styled.h1`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const ImmediateDealInformation = styled.div`
  position: relative;

  div {
    margin-bottom: 40px;
    text-align: center;
    font-weight: bold;
  }

  &:first-child:after {
    display: block;
    position: absolute;
    top: -10px;
    left: 205px;
    width: 1px;
    height: 80px;
    content: '';
    background-color: #f4f4f4;
  }
`;

const Decision = styled.button`
  padding: 20px;
  width: 100%;
  color: white;
  border-radius: 12px;
  background-color: #41b979;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.5s;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
`;

const CheckPrice = styled.div`
  ${props => props.theme.flexbox('row', 'space-between')}
  margin-bottom: 30px;
  color: rgba(34, 34, 34, 0.5);
  font-weight: bold;
`;

const DeliveryPrice = styled(CheckPrice.withComponent('div'))``;

const TotalBuyPrice = styled.div`
  text-align: right;

  span:first-child {
    width: 100%;
    margin-right: 20px;
    font-size: 25px;
    font-style: italic;
    font-weight: bold;
  }
`;
