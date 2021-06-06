import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TypeBox from './TypeBox';
import ProductInfo from '../../components/ProductInfo';
import MainTopBanner from '../../pages/Main/MainTopBanner/Maintopbanner';
import API_URLS from '../../config';

export default function Main(props) {
  const [SortListState, setSortListState] = useState(false);
  // 백엔드에서 상품리스트 데이터를 받아와서 저장하는 배열 state
  const [productList, setproductList] = useState([]);
  // 체크박스 체크시 해당 요소의 name 값을 받아서 저장하는 객체 state
  const [productfilters, setProductFilters] = useState({
    brand_id: [],
    collection_id: [],
    color: [],
    size: [],
  });
  // 상품리스트의 3가지 정렬 방식을 위한 정수 state (0,1,2 3가지)
  const [SortTypeState, setSortTypeState] = useState(0);

  // 첫 페이지 렌더시 받아오는 상품데이터를 현재 정렬기준(0번)에 맞게 정렬하여 상품리스트
  // state에 담음
  useEffect(() => {
    fetch(`${API_URLS.LIST_PAGE}${props.location.search}`)
      .then(result => result.json())
      .then(ProductListData => {
        const sortedProductList = sortProductList(
          SortTypeState,
          ProductListData.result
        );
        setproductList(sortedProductList);
      });
  }, []);

  // 현재 productfilters state의 값이 바뀔 때 마다 productfilters 에 담긴 값으로
  // 쿼리스트링을 생성하여 해당 주소로 fetch 하여 필터링된 상품리스트를
  // 현재 정렬기준(0번)에 맞게 정렬하여 상품리스트 state에 담음

  useEffect(() => {
    if (Object.values(productfilters)[0].length > 0) {
      const filterQuery = makeFilterQuery(productfilters);
      fetch(`${API_URLS.LIST_PAGE}${filterQuery}`)
        .then(result => result.json())
        .then(ProductListData => {
          const sortedProductList = sortProductList(
            SortTypeState,
            ProductListData.result
          );
          setproductList(sortedProductList);
        });
    }
  }, [productfilters]);

  // 만약 검색을 통해 상품리스트를 통해 페이지에 올경우 검색어에 대한 결과 상품 리스트를
  // 현재 정렬기준(0번)에 맞게 정렬하여 상품리스트 state에 담음
  useEffect(() => {
    if (props.location.search) {
      fetch(`${API_URLS.LIST_PAGE}${props.location.search}`)
        .then(result => result.json())
        .then(ProductListData => {
          const sortedProductList = sortProductList(
            SortTypeState,
            ProductListData.result
          );
          setproductList(sortedProductList);
        });
    }
  }, [props.location.search]);

  const makeFilterQuery = productfilters => {
    let query = '';
    for (let filterType in productfilters) {
      const filterIds = productfilters[filterType];
      if (filterIds.length) {
        query += `&${filterType}=${filterIds.join(`&${filterType}=`)}`;
      }
    }
    return query.replace('&', '?');
  };

  const sortProductList = (type, productList) => {
    if (type === 0) {
      const sortedProductList = productList;
      sortedProductList.map(products => {
        products[0].product_options.sort(function (a, b) {
          return (
            (a.sell_price === null) - (b.sell_price === null) ||
            a.sell_price - b.sell_price
          );
        });
      });
      sortedProductList.sort(function (a, b) {
        return a[0].product_id - b[0].product_id;
      });
      return sortedProductList;
    } else if (type === 1) {
      const sortedProductList = productList;
      sortedProductList.map(products => {
        products[0].product_options.sort(function (a, b) {
          return (
            (a.sell_price === null) - (b.sell_price === null) ||
            a.sell_price - b.sell_price
          );
        });
      });
      sortedProductList.sort(function (a, b) {
        const aPrice = a[0].product_options[0].sell_price;
        const bPrice = b[0].product_options[0].sell_price;
        return (aPrice === null) - (bPrice === null) || aPrice - bPrice;
      });
      return sortedProductList;
    } else if (type === 2) {
      const sortedProductList = productList;
      sortedProductList.map(products => {
        products[0].product_options.sort(function (a, b) {
          return (
            (a.buy_price === null) - (b.buy_price === null) ||
            b.buy_price - a.buy_price
          );
        });
      });
      sortedProductList.sort(function (a, b) {
        const aPrice = a[0].product_options[0].buy_price;
        const bPrice = b[0].product_options[0].buy_price;
        return (aPrice === null) - (bPrice === null) || bPrice - aPrice;
      });
      return sortedProductList;
    }
  };

  const controlProductFilter = (e, filterTypeQuery) => {
    const isAlreadyInFilter = productfilters[filterTypeQuery].includes(
      e.target.name
    );
    const newQuery = isAlreadyInFilter
      ? productfilters[filterTypeQuery].filter(el => el !== e.target.name)
      : [...productfilters[filterTypeQuery], e.target.name];
    setProductFilters(prev => ({ ...prev, [filterTypeQuery]: newQuery }));
  };

  const SortListToggle = e => {
    setSortListState(!SortListState);
  };

  const SortListOff = e => {
    setSortListState(false);
  };

  const handleSortType = (e, type) => {
    e.stopPropagation();
    setSortTypeState(type);
    sortProductList(type, productList);
  };

  return (
    <MainStyle>
      <MainTopBanner />
      <ProductList>
        <ListTitle>SHOP</ListTitle>
        <BrandList>
          {BRAND_LISTS.map(brandinfo => {
            return (
              <li key={brandinfo.brand_id}>
                <TopBrandLogo src={brandinfo.brand_logo_url} />
                {brandinfo.brand_name}
              </li>
            );
          })}
        </BrandList>
        <FileterAndProducts>
          <MainPageAside>
            <Filter>
              <i class="fas fa-filter" />
              필터
            </Filter>
            {FILTER_LISTS.map((filterData, index) => {
              return (
                <TypeBox
                  key={index}
                  filterData={filterData}
                  setBrandFilter={controlProductFilter}
                />
              );
            })}
          </MainPageAside>
          <ItemList>
            <ProductQuantityAndSort>
              <ProductQuantity>
                <span>{`상품 `}</span>
                <Quantity>{productList.length}</Quantity>
              </ProductQuantity>
              <Sortbutton
                type="button"
                onClick={SortListToggle}
                onBlur={SortListOff}
              >
                {SortTypeState === 0
                  ? `인기순 `
                  : SortTypeState === 1
                  ? `즉시 구매가순 `
                  : `즉시 판매가순 `}
                <i class="fas fa-sort" />
                <SortLists view={SortListState}>
                  {SORT_LIST.map((sortList, index) => {
                    return (
                      <SortList
                        key={index}
                        onClick={e => {
                          handleSortType(e, index);
                        }}
                      >
                        <div>
                          <SortType>{sortList.type}</SortType>
                          <TypeExplanation>
                            {sortList.explanation}
                          </TypeExplanation>
                        </div>
                        <SortCheck view={[index, SortTypeState]}>
                          <i class="fas fa-check" />
                        </SortCheck>
                      </SortList>
                    );
                  })}
                </SortLists>
              </Sortbutton>
            </ProductQuantityAndSort>
            {productList.length === 0 ? (
              <NoResultContainer>
                <NoResult>검색하신 결과가 없습니다.</NoResult>
                <ProductRegistMethod>
                  상품 등록 요청은 앱 1:1 문의하기 로 요청해주세요.
                </ProductRegistMethod>
              </NoResultContainer>
            ) : (
              productList.map((productInfo, index) => {
                return (
                  <ProductInfo
                    key={index}
                    productInfo={productInfo}
                    sortType={SortTypeState}
                  />
                );
              })
            )}
          </ItemList>
        </FileterAndProducts>
      </ProductList>
    </MainStyle>
  );
}

const BRAND_LISTS = [
  {
    brand_id: 1,
    brand_logo_url: 'https://i.postimg.cc/j5STmz4x/bear.png',
    brand_name: 'Ojae',
  },
  {
    brand_id: 2,
    brand_logo_url: 'https://i.postimg.cc/hPdBk4Td/monkey.png',
    brand_name: 'Yongmin',
  },
  {
    brand_id: 3,
    brand_logo_url: 'https://i.postimg.cc/HWKmv8cm/raccoon.png',
    brand_name: 'Hamin',
  },
  {
    brand_id: 4,
    brand_logo_url: 'https://i.postimg.cc/MHcSKqLg/rat.png',
    brand_name: 'Syeon',
  },
  {
    brand_id: 5,
    brand_logo_url: 'https://i.postimg.cc/T1ZXKBM1/sheep.png',
    brand_name: 'Mihwa',
  },
];
const FILTER_LISTS = [
  {
    filtertype: ['brand_id', '브랜드'],
    idAndName: [
      { 1: 'Ojae' },
      { 2: 'Yongmin' },
      { 3: 'Hamin' },
      { 4: 'Syeon' },
      { 5: 'Mihwa' },
    ],
  },
  {
    filtertype: ['collection_id', '컬렉션'],
    idAndName: [
      { 1: 'bio jae' },
      { 2: 'foldedneck ojae' },
      { 3: 'sleeping ojae' },
      { 4: 'for jae' },
      { 5: 'suprised ojae' },
      { 6: 'seniorYongminLimited' },
      { 7: 'sadYongminAir' },
      { 8: 'angryYongminPlus' },
      { 9: 'smileYongminEdition' },
      { 10: 'basicYongminSeries' },
      { 11: 'Mingu' },
      { 12: 'Lounge Mingu' },
      { 13: 'Sigh Mingu' },
      { 14: 'Tardy Mingu' },
      { 15: 'Programingu' },
      { 16: 'Syeon origin' },
      { 17: 'Syeon X Cucubol Eidition' },
      { 18: 'DrunkenSyeon' },
      { 19: 'Syeon&dev Season 1' },
      { 20: 'Syeongry' },
      { 21: 'MovingAroundMihwa' },
      { 22: 'SoullessMihwa' },
      { 23: 'BlueberryMihwa' },
      { 24: 'ReactionMihwa' },
      { 25: 'CheeseburgerMihwa' },
    ],
  },
  {
    filtertype: ['color', '색깔'],
    idAndName: [
      { White: '하얀색' },
      { Black: '검은색' },
      { Red: '빨간색' },
      { Blue: '파란색' },
      { Beige: '베이지색' },
    ],
  },
  {
    filtertype: ['size', '사이즈'],
    idAndName: [
      { 250: 250 },
      { 260: 260 },
      { 270: 270 },
      { 280: 280 },
      { 290: 290 },
    ],
  },
];
const SORT_LIST = [
  { type: '인기순', explanation: '많이 판매된 순서대로 정렬합니다.' },
  {
    type: '즉시 구매가순',
    explanation: '즉시 구매가가 낮은 순서대로 정렬합니다.',
  },
  {
    type: '즉시 판매가순',
    explanation: '즉시 판매가가 높은 순서대로 정렬합니다.',
  },
];

const MainStyle = styled.main`
  margin-top: 90px;
  background-color: #fafafa;
`;
const ProductList = styled.section`
  margin: 0 auto;
  padding: 60px 40px 0 40px;
  max-width: 1300px;
`;

const ListTitle = styled.h2`
  text-align: center;
  font-size: 36px;
  font-weight: 900;
`;

const BrandList = styled.ul`
  ${props => props.theme.flexbox()}
  margin-top: 50px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebebeb;
  li {
    margin-left: 60px;
    text-align: center;
  }
`;

const TopBrandLogo = styled.img`
  display: block;
  width: 70px;
  height: 70px;
`;

const MainPageAside = styled.aside`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  width: 200px;
`;

const Filter = styled.div`
  padding: 20px 20px 20px 0;
  .fas {
    margin-right: 10px;
  }
`;

const FileterAndProducts = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const ItemList = styled.div`
  width: 80%;
`;

const ProductQuantityAndSort = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductQuantity = styled.div`
  margin-left: 10px;
  padding: 20px 0;
  font-size: 14px;
  font-weight: 100;
`;

const Quantity = styled.span`
  font-weight: 900;
`;

const Sortbutton = styled.button`
  position: relative;
  cursor: pointer;
`;

const SortLists = styled.ul`
  display: ${props => (props.view ? 'block' : 'none')};
  position: absolute;
  bottom: -188px;
  right: 0;
  width: 280px;
  height: 198px;
  border: 1px #ebebeb solid;
  background-color: #fafafa;
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 10px 0px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 10px 0px;
`;

const SortList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  text-align: left;
  &:hover {
    background-color: rgba(192, 192, 192, 0.1);
  }
`;

const SortType = styled.p`
  font-size: 14px;
`;

const TypeExplanation = styled.p`
  font-size: 12px;
  font-weight: 100;
`;

const SortCheck = styled.div`
  display: ${props => (props.view[0] === props.view[1] ? 'block' : 'none')};
`;

const NoResultContainer = styled.div`
  text-align: center;
  padding: 220px 0 400px 0;
`;

const NoResult = styled.p`
  font-size: 16px;
  color: rgba(34, 34, 34, 0.8);
`;

const ProductRegistMethod = styled.p`
  padding-top: 6px;
  font-size: 14px;
  color: rgba(34, 34, 34, 0.5);
`;
