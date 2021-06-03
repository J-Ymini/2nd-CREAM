import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Styled from 'styled-components';
import SizeBtn from '../Util/SizeBtn';
import API_URLS from '../../../config';

export default function BidHistoryModal({ on, onSet }) {
  const [onSizeBtn, setOnSizeBtn] = useState(false);
  const [sortSize, setSortSize] = useState(true);
  const [sortPrice, setSortPrice] = useState(true);
  const [currentSize, setCurrentSize] = useState('');
  const [currentFetchURL, setcurrentFetchURL] = useState('');
  const [dealsTable, setDealsTable] = useState('sellTable');
  const [productList, setProductList] = useState([]);
  const [productList2, setProductList2] = useState([]);
  const [itemNum, setItemNum] = useState(20);
  const [productInfo, setProductInfo] = useState({});
  const tableRef = useRef();
  const routeMatchID = useRouteMatch().params.id;

  useEffect(() => {
    getData();
  }, [itemNum, currentFetchURL]);

  useEffect(() => {
    tableRef.current.addEventListener('scroll', infiniteScroll);
  }, []);

  useEffect(() => {
    fetch(`${API_URLS.DETAIL}/${routeMatchID}`)
      .then(res => res.json())
      .then(productInfo => setProductInfo(productInfo['product_information']));
  }, []);

  const getData = () => {
    fetch(`${API_URLS.DETAIL}/${routeMatchID}/sellbidding?${currentFetchURL}`)
      .then(res => res.json())
      .then(infos => {
        const result = infos.selling_bidding.slice(0, itemNum);
        setProductList([...result]);
      });

    fetch(`${API_URLS.DETAIL}/${routeMatchID}/buybidding?${currentFetchURL}`)
      .then(res => res.json())
      .then(infos => {
        const result = infos.buying_bidding.slice(0, itemNum);
        setProductList2([...result]);
      });
  };

  const infiniteScroll = () => {
    const scrollHeight = tableRef.current.scrollHeight;
    const scrollTop = tableRef.current.scrollTop;
    const clientHeight = tableRef.current.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      setItemNum(preItemNum => preItemNum + 10);
    }
  };

  const addSizeURL = e => {
    const usp = new URLSearchParams(currentFetchURL);
    usp.delete('sort_price');
    if (sortSize) {
      usp.set('sort_option', '-product_option__size');
    }

    if (!sortSize) {
      usp.set('sort_option', 'product_option__size');
    }
    setSortPrice('none');
    setcurrentFetchURL(usp.toString());
  };

  const addPriceURL = e => {
    const usp = new URLSearchParams(currentFetchURL);
    usp.delete('sort_option');
    if (sortPrice) {
      usp.set('sort_price', '-price');
    }

    if (!sortPrice) {
      usp.set('sort_price', 'price');
    }
    setSortSize('none');
    setcurrentFetchURL(usp.toString());
  };

  const addSizeFilter = sizeValue => {
    const usp = new URLSearchParams(currentFetchURL);
    if (sizeValue) {
      usp.set('size', sizeValue);
    }

    if (sizeValue === '') {
      usp.delete('size');
    }

    setCurrentSize(sizeValue);
    setcurrentFetchURL(usp.toString());
  };

  return (
    <BidHistoryModalStyle>
      <ProductInfoModal>
        <img alt="product" src="/images/test1.jpeg" />
        <div className="productNames">
          <h1>{productInfo['english_name']}</h1>
          <h2>{productInfo['korean_name']}</h2>
          <div
            className="sizeChangeBtn"
            onClick={() => setOnSizeBtn(!onSizeBtn)}
          >
            {currentSize === '' ? '모든 사이즈' : currentSize}
            <i className="far fa-caret-square-down" />
            <SizeBtn on={onSizeBtn} setCurrentSize={addSizeFilter} />
          </div>
        </div>
      </ProductInfoModal>
      <div>
        <TableTitle>
          <TitleBtn
            name={dealsTable}
            bg="sellTable"
            onClick={() => {
              setDealsTable('sellTable');
            }}
          >
            판매 입찰
          </TitleBtn>
          <TitleBtn
            name={dealsTable}
            bg="purchaseTable"
            onClick={() => setDealsTable('purchaseTable')}
          >
            구매 입찰
          </TitleBtn>
        </TableTitle>

        {dealsTable === 'sellTable' ? (
          <>
            <TableHeader>
              <HeaderTitle onClick={() => setSortSize(!sortSize, addSizeURL())}>
                사이즈
                {sortSize ? (
                  <i className="fas fa-caret-up upBtn" />
                ) : (
                  <i className="fas fa-caret-down upBtn" />
                )}
              </HeaderTitle>
              <HeaderTitle
                onClick={() => setSortPrice(!sortPrice, addPriceURL())}
              >
                판매 희망가
                {sortPrice ? (
                  <i className="fas fa-caret-up upBtn" />
                ) : (
                  <i className="fas fa-caret-down upBtn" />
                )}
              </HeaderTitle>
            </TableHeader>
            <TableBody ref={tableRef}>
              {productList.map((infos, index) => (
                <div className="tableRow" key={index}>
                  <div className="tbody1">{infos.size}</div>
                  <div className="tbody2">{`${Math.floor(
                    infos.price
                  ).toLocaleString()}원`}</div>
                </div>
              ))}
            </TableBody>
          </>
        ) : (
          <>
            <TableHeader>
              <HeaderTitle onClick={() => setSortSize(!sortSize, addSizeURL())}>
                사이즈
                {sortSize ? (
                  <i className="fas fa-caret-up upBtn" />
                ) : (
                  <i className="fas fa-caret-down upBtn" />
                )}
              </HeaderTitle>
              <HeaderTitle
                onClick={() => setSortPrice(!sortPrice, addPriceURL())}
              >
                구매 희망가
                {sortPrice ? (
                  <i className="fas fa-caret-up upBtn" />
                ) : (
                  <i className="fas fa-caret-down upBtn" />
                )}
              </HeaderTitle>
            </TableHeader>
            <TableBody ref={tableRef}>
              {productList2.map((infos, index) => (
                <div className="tableRow" key={index}>
                  <div className="tbody1">{infos.size}</div>
                  <div className="tbody2">{`${Math.floor(
                    infos.price
                  ).toLocaleString()}원`}</div>
                </div>
              ))}
            </TableBody>
          </>
        )}
      </div>
      <i className="fas fa-times closeModal" onClick={() => onSet(!on)} />
    </BidHistoryModalStyle>
  );
}

const BidHistoryModalStyle = Styled.div`
  position: relative;
  width: 100%;

  .closeModal {
    position : absolute;
    padding: 10px;
    top: 0;
    right: 0;
    font-size: 20px;
    cursor: pointer;
  }
`;

const ProductInfoModal = Styled.div`
  ${props => props.theme.flexbox('row', 'flex-start', 'flex-start')}
  margin: 20px 10px;

  img {
    margin-right: 10px;
    width: 80px;
    height: 80px;
  }

  .productNames {
    width: 100%;

    h1 {
      font-size: 14px;
      margin-bottom: 5px;
    }

    h2{
      margin-bottom: 10px;
      font-size: 12px;
      color: gray;
    }

    .sizeChangeBtn {
      position: relative;
      width: 70%;
      padding: 10px 20px;
      border: 1px solid #ebebeb;
      border-radius: 12px;
      text-align: center;
      cursor: pointer;

      i {
        margin-left: 10px;
      }
    }
  }
`;

const TableTitle = Styled.div`
    ${props => props.theme.flexbox('row', 'space-between', 'center')}
    padding: 10px 5px;
    border-radius: 12px;
    text-align: center;
    color: gray;
    background-color: #f4f4f4;
`;

const TitleBtn = Styled.div`
  width: 40%;
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.bg === props.name && '#ffffff'};
`;

const TableHeader = Styled.div`
  ${props => props.theme.flexbox('row', 'space-between', 'center')}
  width: 100%;
  margin-top: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #ebebeb;
  color: gray;
`;

const HeaderTitle = Styled.div`
  cursor: pointer;
  
  i {
    margin-left: 5px;
  }
`;

const TableBody = Styled.div`
  height: 300px;
  overflow-y: scroll;

  .tableRow {
    ${props => props.theme.flexbox('row', 'space-between', 'center')}
    margin-top: 10px;
    font-size: 14px;
    color: gray;
  }

  .tbody2 {
    margin-left: 50px;
  }

  .tbody3 {
    font-weight: 600;
    color: black;
  }
`;
