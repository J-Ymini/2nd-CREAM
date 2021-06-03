import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Styled from 'styled-components';
import ProductImg from './ProductImg/ProductImg';
import ProductInfo from './ProductInfo/ProductInfo';
import DealInfo from './DealInfo/DealInfo';
import DealChart from './DealChart/DealChart';
import Modal from '../../components/Modal/Modal';
import RecentDealModal from './ModalContents/RecentDealModal';
import BidHistoryModal from './ModalContents/BidHistoryModal';
import ProductBox from './Util/ProductBox';
import API_URLS from '../../config';

export default function Detail() {
  const [chartChange, setChartChange] = useState('chart1');
  const [tableChange, setTableChange] = useState('table1');
  const [sellList, setSellList] = useState([]);
  const [purchaseList, setPurchaseList] = useState([]);
  const [chartDataWeek, setChartDataWeek] = useState([]);
  const [chartDataMonth, setChartDataMonth] = useState([]);
  const [onRecentDealModal, setOnRecentDealModal] = useState(false);
  const [onBidHistoryModal, setOnBidHistoryModal] = useState(false);
  const routeMatchID = useRouteMatch().params.id;

  const weekChart = [];
  const monthChart = [];

  useEffect(() => {
    fetch(`${API_URLS.DETAIL}/${routeMatchID}/order?term=week`)
      // fetch('/data/chartData.json')
      .then(res => res.json())
      .then(data => setChartDataWeek(data.order_list));

    fetch(`${API_URLS.DETAIL}/${routeMatchID}/order?term=month`)
      // fetch('/data/chartData2.json')
      .then(res => res.json())
      .then(data => setChartDataMonth(data.order_list));

    fetch(`${API_URLS.DETAIL}/${routeMatchID}/sellbidding`)
      // fetch('/data/recentDealData2.json')
      .then(res => res.json())
      .then(infos => setSellList(infos.selling_bidding));

    fetch(`${API_URLS.DETAIL}/${routeMatchID}/buybidding`)
      // fetch('/data/recentDealData3.json')
      .then(res => res.json())
      .then(infos => setPurchaseList(infos.buying_bidding));
  }, []);

  const makeChartData = () => {
    for (let i = 0; i < 7; i++) {
      weekChart.push(chartDataWeek[i]);
    }

    for (let i = 0; i < 30; i++) {
      monthChart.push(chartDataMonth[i]);
    }
  };

  makeChartData();

  return (
    <Main>
      <ProductArea>
        <ProductImg />
        <div className="infos">
          <ProductInfo />

          <DealInfo
            tableTitle="채결 거래"
            btnName={TABLE_BTN_NAME[0]}
            tableHeader={TABLE_HEADER[0]}
            Change={chartChange}
            setChange={setChartChange}
            name="chart"
          >
            {chartChange === 'chart1' ? (
              <DealChart chartData={weekChart} />
            ) : (
              <DealChart chartData={monthChart} />
            )}
          </DealInfo>

          <CheckDealBtn
            className="checkDealBtn"
            onClick={() => setOnRecentDealModal(!onRecentDealModal)}
          >
            거래 내역 더보기
          </CheckDealBtn>

          <Modal on={onRecentDealModal}>
            <RecentDealModal
              on={onRecentDealModal}
              onSet={setOnRecentDealModal}
            />
          </Modal>

          <DealInfo
            tableTitle="입찰 내역"
            btnName={TABLE_BTN_NAME[1]}
            tableHeader={
              tableChange === 'table1' ? TABLE_HEADER[1] : TABLE_HEADER[2]
            }
            Change={tableChange}
            setChange={setTableChange}
            dealList={tableChange === 'table1' ? sellList : purchaseList}
            name="table"
          />

          <CheckDealBtn
            className="checkDealBtn"
            onClick={() => setOnBidHistoryModal(!onBidHistoryModal)}
          >
            입찰 내역 더보기
          </CheckDealBtn>

          <Modal on={onBidHistoryModal}>
            <BidHistoryModal
              on={onBidHistoryModal}
              onSet={setOnBidHistoryModal}
            />
          </Modal>
        </div>
      </ProductArea>
      <ProductBox />
    </Main>
  );
}

const TABLE_BTN_NAME = [
  { btnTitle1: '1주일', btnTitle2: '1개월' },
  { btnTitle1: '판매 입찰', btnTitle2: '구매 입찰' },
];

const TABLE_HEADER = [
  { headerSize: '사이즈', headerPrice: '거래가', headerOption: '거래일' },
  { headerSize: '사이즈', headerPrice: '판매 희망가', headerOption: '수량' },
  { headerSize: '사이즈', headerPrice: '구매 희망가', headerOption: '수량' },
];

const Main = Styled.main`
  max-width: 1300px;
  margin: 0 auto;
  padding-top: 130px;

  .infos {
    width : 100%;
    margin-left: 5%;
  }
`;

const ProductArea = Styled.section`
  ${props => props.theme.flexbox('row', 'space-between', 'flex-start')}
`;

const CheckDealBtn = Styled.div`
    width: 100%;
    margin-top: 30px;
    padding: 10px;
    border: 1px solid #ebebeb;
    border-radius: 12px;
    color: rgba(34,34,34,.5);
    text-align: center;
    cursor: pointer;

    &:active {
      background-color: #ebebeb;
    }
`;
