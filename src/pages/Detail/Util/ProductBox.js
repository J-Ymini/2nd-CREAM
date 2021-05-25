import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Styled from 'styled-components';
import OtherProducts from '../OtherProducts/OtherProducts';
import API_URLS from '../../../config';

export default function ProductBox() {
  const [products, setProducts] = useState([]);
  const routeMatchID = useRouteMatch().params.id;

  useEffect(() => {
    fetch(`${API_URLS.DETAIL}/${routeMatchID}/collection/1`)
      // fetch('/data/otherProduct.json')
      .then(res => res.json())
      .then(infos => setProducts(infos.collection_product));
  }, []);

  return (
    <ProductBoxStyle>
      <h1>유사 제품</h1>
      {products.length > 0 &&
        products.map((el, index) => {
          if (index < 4) {
            return <OtherProducts products={el} />;
          }
        })}
    </ProductBoxStyle>
  );
}

const ProductBoxStyle = Styled.div`
  margin-top: 100px;
  border-top: 2px solid rgba(34, 34, 34, 0.3);
  width: 100%;

  h1 {
    margin: 50px;
    margin-top: 100px;
    font-size: 25px;
  }
`;
