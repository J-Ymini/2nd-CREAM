import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Styled from 'styled-components';
import SizeBtn from '../Util/SizeBtn';
import API_URLS from '../../../config';

export default function RecentDealModal({ on, onSet }) {
  const [onSizeBtn, setOnSizeBtn] = useState(false);
  const [currentSize, setCurrentSize] = useState('');
  const [modalList, setModalList] = useState([]);
  const [itemNum, setItemNum] = useState(20);
  const [productInfo, setProductInfo] = useState({});
  const tableRef = useRef();
  const routeMatchID = useRouteMatch().params.id;

  useEffect(() => {
    getData();
  }, [itemNum, currentSize]);

  useEffect(() => {
    fetch(`${API_URLS.DETAIL}/${routeMatchID}`)
      // fetch('/data/detailMockData.json')
      .then(res => res.json())
      .then(productInfo => setProductInfo(productInfo['product_information']));
  }, []);

  useEffect(() => {
    tableRef.current.addEventListener('scroll', infiniteScroll);
  }, []);

  const getData = () => {
    fetch(`${API_URLS.DETAIL}/${routeMatchID}/order`)
      // fetch('/data/recentDealData.json')
      .then(res => res.json())
      .then(infos => {
        const result = infos.order_list.slice(0, itemNum);
        setModalList([...result]);
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

  return (
    <RecentDealModalStyle>
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
            <SizeBtn on={onSizeBtn} setCurrentSize={setCurrentSize} />
          </div>
        </div>
      </ProductInfoModal>
      <RecentTable>
        <div className="tableTitle">최근 거래</div>
        <div className="tableHeader">
          <div className="header1">
            사이즈 <i className="fas fa-caret-up upBtn" />
          </div>
          <div className="header2">
            거래가
            <i className="fas fa-caret-up upBtn" />
          </div>
          <div className="header3">
            거래일
            <i className="fas fa-caret-up upBtn" />
          </div>
        </div>
        <div className="tableBody" ref={tableRef}>
          {modalList.map((infos, index) => (
            <div className="tableRow" key={index}>
              <div className="tbody1">{infos.size}</div>
              <div className="tbody2">{`${Math.floor(
                infos.price
              ).toLocaleString()}원`}</div>
              <div className="tbody3">{infos.order_date}</div>
            </div>
          ))}
        </div>
      </RecentTable>
      <i className="fas fa-times closeModal" onClick={() => onSet(!on)} />
    </RecentDealModalStyle>
  );
}

const RecentDealModalStyle = Styled.div`
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
  ${props => props.theme.flexbox('row', 'flex-start', 'flex-start')};
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

const RecentTable = Styled.div`
  .tableTitle {
    padding: 10px 5px;
    border-radius: 12px;
    text-align: center;
    color: gray;
    background-color: #f4f4f4;
  }

  .tableHeader {
    ${props => props.theme.flexbox('row', 'space-between', 'center')}
    width: 100%;
    margin-top: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #ebebeb;
    color: gray;

    i {
      margin-left: 5px;
    }
  }

  .header1, .header2, .header3 {
    cursor: pointer;
  }

  .header2 {
    margin-left: 50px;
    text-align: end;
  }

  .tableBody {
    height: 300px;
    overflow-y: scroll;
  }

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
