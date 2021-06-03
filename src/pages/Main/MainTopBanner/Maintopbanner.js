import React, { useState } from 'react';
import styled from 'styled-components';

const MainTopBanner = () => {
  const topBannerImageIds = [1, 2, 3, 4, 5];
  const [currentBanner, setcurrentBanner] = useState(1);

  const moveNextBannerImage = e => {
    if (currentBanner === 5) {
      setcurrentBanner(1);
    } else {
      setcurrentBanner(currentBanner + 1);
    }
  };

  const movePrevBannerImage = e => {
    if (currentBanner === 1) {
      setcurrentBanner(5);
    } else {
      setcurrentBanner(currentBanner - 1);
    }
  };

  const goToBannerImage = imageId => {
    setcurrentBanner(imageId);
  };

  return (
    <MainTopBannerStyle>
      <div>
        {topBannerImageIds.map((imageId, index) => {
          return (
            <BannerImageContainer
              key={index}
              backgroundIndex={[imageId, index, currentBanner]}
            >
              <BannerImage
                alt="banner image"
                imageId={[imageId, currentBanner]}
                src={`/images/topBanner_${imageId}.jpeg`}
              />
            </BannerImageContainer>
          );
        })}
      </div>
      <TargetButtonList>
        {topBannerImageIds.map((imageId, index) => {
          return (
            <TargetButton
              key={index}
              imageId={[imageId, currentBanner]}
              onClick={() => goToBannerImage(imageId)}
            />
          );
        })}
      </TargetButtonList>
      <BannerButton onClick={movePrevBannerImage} left="24px">
        <i class="fas fa-chevron-left"></i>
      </BannerButton>
      <BannerButton onClick={moveNextBannerImage} right="24px">
        <i class="fas fa-chevron-right"></i>
      </BannerButton>
    </MainTopBannerStyle>
  );
};

export default MainTopBanner;

const bannerBackgroundColors = [
  '#3398dc',
  '#255762',
  '#263f2c',
  '#4ebd95',
  '#e8ddd7',
];

const MainTopBannerStyle = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
`;

const BannerImageContainer = styled.div`
  ${props => props.theme.flexbox('column')};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props =>
    bannerBackgroundColors[props.backgroundIndex[1]]};
  opacity: ${props =>
    props.backgroundIndex[0] === props.backgroundIndex[2] ? 1 : 0};
`;

const BannerImage = styled.img`
  position: absolute;
  height: 480px;
  transition: opacity 1000ms;
  opacity: ${props => (props.imageId[0] === props.imageId[1] ? 1 : 0)};
`;

const TargetButtonList = styled.ul`
  position: absolute;
  bottom: 16px;
  left: 0;
  width: 100%;
  text-align: center;
`;
const TargetButton = styled.li`
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-left: 12px;
  border-radius: 50%;
  background-color: ${props =>
    props.imageId[0] === props.imageId[1]
      ? 'white'
      : 'rgba(255, 255, 255, 0.3)'};
`;

const BannerButton = styled.button`
  ${props => props.theme.flexbox('column')};
  position: absolute;
  top: 0;
  height: 100%;
  left: ${props => props.left};
  right: ${props => props.right};

  .fas {
    color: white;
    font-size: 48px;
  }
`;
