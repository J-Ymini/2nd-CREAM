import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Styled from 'styled-components';
import API_URLS from '../../../config';

export default function ProductImg() {
  const [productInfo, setProductInfo] = useState([]);
  const [currentImage, setCurrentImage] = useState(1);
  const routeMatchID = useRouteMatch().params.id;

  useEffect(() => {
    fetch(`${API_URLS.DETAIL}/${routeMatchID}`)
      .then(res => res.json())
      .then(images =>
        setProductInfo([
          images.product_information.main_image,
          images.product_information.sub_image,
        ])
      );
  }, []);

  const moveNextImage = () => {
    if (currentImage === 2) {
      setCurrentImage(1);
    }
    if (currentImage !== 2) {
      setCurrentImage(currentImage + 1);
    }
  };

  const movePreImage = () => {
    if (currentImage === 1) {
      setCurrentImage(2);
    }
    if (currentImage !== 1) {
      setCurrentImage(currentImage - 1);
    }
  };

  return (
    <ProductImgStyle>
      <ImageBox>
        {productInfo.map((image, index) => {
          return (
            <img
              className="productImage"
              alt="product"
              src={image}
              key={index}
              style={
                currentImage === index + 1 ? { opacity: 1 } : { opacity: 0 }
              }
            />
          );
        })}
        <i
          className="fas fa-angle-left leftBtn"
          onClick={() => movePreImage()}
        />
        <i
          className="fas fa-angle-right rightBtn"
          onClick={() => moveNextImage()}
        />
      </ImageBox>
      <ProductGuide>
        <img className="buttonImage" alt="" src="/images/test1.jpeg" />
        <div className="guideText">
          <p className="guideTextTitle">CREAM 구매 방법</p>
          <p className="guideTextContent">
            구매 프로세스 확인 후 구매해주세요.
          </p>
        </div>
      </ProductGuide>
    </ProductImgStyle>
  );
}

const ProductImgStyle = Styled.section`
  position: sticky;
  top: 130px;
`;

const ImageBox = Styled.div`
  ${props => props.theme.flexbox('row', 'flex-start', 'center')}
  position: relative;
  width: 600px;
  height: 600px;
  background-color: #ebf0f5;
  
  .leftBtn,
  .rightBtn {
    position: absolute;
    font-size: 30px;
    color: gray;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .leftBtn {
    left: 10px;
  }

  .rightBtn {
    right: 10px;
  }

.productImage {
  position: absolute;
  width: 600px;
  height: 600px;
  margin-bottom: 24px;
  transition: opacity 0.3s ease;
}
`;

const ProductGuide = Styled.div`
  ${props => props.theme.flexbox('row', 'flex-start', 'center')}
  margin-top: 30px;
  padding: 18px;
  border: 2px solid #222;
  cursor: pointer;
  
  img {
    width: 48px;
    height: 48px;
    margin-right: 10px;
  }

  .guideTextTitle {
    margin-top: 3px;
  }

  .guideTextContent {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 100;
  }
`;
