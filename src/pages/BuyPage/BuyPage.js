import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ProductThumbnail from '../../components/ProductThumbnail/ProductThumbnail';
import API_URLS from '../../config';

export default function BuyPage(props) {
  const [wishPrice, setWishPrice] = useState(0);
  const [purchaseBidding, setPurchaseBidding] = useState(true);
  const [purchaseImmediately, setPurchaseImmediately] = useState(false);
  const [buyInformation, setBuyInformation] = useState([]);
  const [buyState, setBuyState] = useState('');
  const inputElement = useRef();
  const history = useHistory();

  const goToFirstTap = () => {
    setPurchaseBidding(true);
    setPurchaseImmediately(false);
    setWishPrice(0);
    setBuyState('bidding');
  };

  const goToSecondTap = () => {
    setPurchaseBidding(false);
    setPurchaseImmediately(true);
    setWishPrice(
      Number(buyInformation['product_information']?.['buying_price'])
    );
    setBuyState('buying');
  };

  const setPrice = () => {
    if (
      inputElement.current.value >
      Number(buyInformation['product_information']?.['buying_price'])
    ) {
      setPurchaseBidding(false);
      setPurchaseImmediately(true);
      setWishPrice(
        Number(buyInformation['product_information']?.['buying_price'])
      );
      setBuyState('buying');
    } else {
      setWishPrice(inputElement.current.value);
      setBuyState('bidding');
    }
  };

  const pressEnter = e => {
    e.charCode === 13 && setPrice();
  };

  const deciseBuy = () => {
    const { id } = props.match.params;
    if (wishPrice === 0) {
      alert('가격을 입력하셔야 합니다.');
    } else {
      fetch(`${API_URLS['BUY_PAGE']}/${id}?buy=${buyState}`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('cream_token'),
        },
        body: JSON.stringify({
          price: wishPrice,
          selling_id: buyInformation['product_information']?.['selling_id'],
          sell_user: buyInformation['product_information']?.['selling_user'],
          size: buyInformation['product_information']?.size,
        }),
      }).then(res => {
        if (res.status === 400) {
          alert('금액이 부족합니다. 충전 후 이용 바랍니다.');
        } else {
          if (buyState === 'buying') {
            alert('구매가 완료되었습니다.');
            history.push('/my');
          } else {
            alert('구매 입찰이 완료되었습니다.');
            history.push('/my');
          }
        }
      });
    }
  };

  useEffect(() => {
    const { id } = props.match.params;
    const size = props.location.search.split('=')[1];
    fetch(`${API_URLS['BUY_PAGE']}/${id}?size=${size}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('cream_token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setBuyInformation(res);
      });
  }, []);

  const PRICE_LISTS = [
    {
      '즉시 구매가': Number(
        buyInformation['product_information']?.['buying_price']
      ).toLocaleString(),
    },
    {
      '즉시 판매가': Number(
        buyInformation['product_information']?.['selling_price']
      ).toLocaleString(),
    },
  ];

  return (
    <Container>
      <ProductThumbnail
        eng_title={buyInformation['product_information']?.['english_name']}
        kor_title={buyInformation['product_information']?.['korean_name']}
        size={buyInformation['product_information']?.size}
        img={buyInformation['product_information']?.image}
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
            <FirstTabBtn
              onClick={goToFirstTap}
              purchaseBidding={purchaseBidding}
            >
              구매 입찰
            </FirstTabBtn>
            <SecondTabBtn
              onClick={goToSecondTap}
              purchaseImmediately={purchaseImmediately}
            >
              즉시 구매
            </SecondTabBtn>
          </TapList>
          {purchaseBidding && (
            <>
              <UserWishPrice inputElement={inputElement}>
                <Label>구매 희망가</Label>
                <PriceInput>
                  <WishPriceInput
                    type="number"
                    placeholder="구매 희망가 입력"
                    required
                    ref={inputElement}
                    onBlur={setPrice}
                    onKeyPress={pressEnter}
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
                  <div>-</div>
                </DeliveryPrice>
                <Label>총 결제금액</Label>
                <TotalBuyPrice>
                  <span>{Number(wishPrice).toLocaleString()}</span>
                  <span>원</span>
                </TotalBuyPrice>
              </TotalPrice>
              <Decision onClick={deciseBuy}>구매 입찰 결정</Decision>
            </>
          )}
          {purchaseImmediately && (
            <>
              <UserWishPrice>
                <Label>즉시 구매가</Label>
                <PriceInput>
                  <WishPriceInputFixed>
                    {Number(
                      buyInformation['product_information']?.['buying_price']
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
                  <div>-</div>
                </DeliveryPrice>
                <Label>총 결제금액</Label>
                <TotalBuyPrice>
                  <span>
                    {Number(
                      buyInformation['product_information']?.['buying_price']
                    ).toLocaleString()}
                  </span>
                  <span>원</span>
                </TotalBuyPrice>
              </TotalPrice>
              <Decision onClick={deciseBuy}>구매 결정</Decision>
            </>
          )}
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

const FirstTabBtn = styled.button`
  padding: 10px 100px;
  color: ${props => (props.purchaseBidding ? 'white' : 'gray')};
  background-color: ${props => (props.purchaseBidding ? '#ef6253' : '#f4f4f4')};
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

const SecondTabBtn = styled(FirstTabBtn.withComponent('button'))`
  color: ${props => (props.purchaseImmediately ? 'white' : 'gray')};
  background-color: ${props =>
    props.purchaseImmediately ? '#ef6253' : '#f4f4f4'};
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
  background-color: #ef6253;
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
