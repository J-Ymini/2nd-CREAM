import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Styled from 'styled-components';
import API_URLS from '../../../config';

export default function DealInfo({
  tableTitle,
  btnName,
  tableHeader,
  Change,
  setChange,
  name,
  dealList,
  children,
}) {
  const [chartList, setChartList] = useState([]);
  const routeMatchID = useRouteMatch().params.id;

  useEffect(() => {
    fetch(`${API_URLS.DETAIL}/${routeMatchID}/order`)
      // fetch('/data/recentDealData.json')
      .then(res => res.json())
      .then(infos => setChartList(infos.order_list));
  }, []);

  return (
    <DealInfoStyle>
      <div className="chartTitle">{tableTitle}</div>
      <DateBtn>
        <DateBtnList
          bgColor={Change}
          name={`${name}1`}
          onClick={() => setChange(`${name}1`)}
        >
          {btnName.btnTitle1}
        </DateBtnList>
        <DateBtnList
          bgColor={Change}
          name={`${name}2`}
          onClick={() => {
            setChange(`${name}2`);
          }}
        >
          {btnName.btnTitle2}
        </DateBtnList>
      </DateBtn>
      {children}
      <DealTable>
        <TableHead>
          <tr className="tableTop">
            <th className="tableHeader">{tableHeader.headerSize}</th>
            <th className="tableHeader textAlign">{tableHeader.headerPrice}</th>
            <th className="tableHeader textAlign">
              {tableHeader.headerOption}
            </th>
          </tr>
        </TableHead>
        {name === 'chart' ? (
          <TableBody>
            {chartList.map((infos, index) => {
              if (index < 4) {
                return (
                  <tr key={index}>
                    <td className="tableData">{infos.size}</td>
                    <td className="tableData textAlign">{`${Math.floor(
                      infos.price
                    ).toLocaleString()}원`}</td>
                    <td className="tableData textAlign">{infos.order_date}</td>
                  </tr>
                );
              }
            })}
          </TableBody>
        ) : (
          <TableBody>
            {dealList.map((infos, index) => {
              if (index < 4) {
                return (
                  <tr key={index}>
                    <td className="tableData">{infos.size}</td>
                    <td className="tableData textAlign">{`${Math.floor(
                      infos.price
                    ).toLocaleString()}원`}</td>
                    <td className="tableData textAlign">{infos.quantity}</td>
                  </tr>
                );
              }
            })}
          </TableBody>
        )}
      </DealTable>
    </DealInfoStyle>
  );
}

const DealInfoStyle = Styled.div`
  margin-top: 80px;

  .chartTitle {
    margin-bottom: 20px;
    font-size: 20px;
  }
`;

const DateBtn = Styled.ul`
  ${props => props.theme.flexbox('row', 'space-around', 'center')};
  border-radius: 10px;
  background-color: rgba(0,0,0,0.07);

  li {
    margin: 5px 3%;
    padding: 2px 10%;
    border-radius: 10px;
    font-weight: 100;
    cursor: pointer;
  }
`;

const DateBtnList = Styled.li`
  background-color: ${props => props.name === props.bgColor && '#ffffff'};
`;

const DealTable = Styled.table`
  margin: 30px 2px;
`;

const TableHead = Styled.thead`
  .tableHeader {
    width: 300px;
    padding: 5px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ebebeb;
    color: rgba(34,34,34,.8);
    text-align: start;
  }

  .textAlign {
    text-align: end;
  }
`;

const TableBody = Styled.tbody`
  .tableData {
    width: 300px;
    padding: 5px;
    padding-top: 15px;
    color: rgba(34,34,34,.8);
  }

  .textAlign {
    text-align: end;
  }
`;
