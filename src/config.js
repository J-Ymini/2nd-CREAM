const BASE_URL = 'http://3.35.234.195:8000';
const API_URLS = {
  LOGIN: `${BASE_URL}/users/kakao`,
  MYPAGE: `${BASE_URL}/users/mypage`,
  LIST_PAGE: `${BASE_URL}/products`,
  DETAIL: `${BASE_URL}/products`,
  BUY_PAGE: `${BASE_URL}/orders/buy`,
  SELL_PAGE: `${BASE_URL}/orders/sell`,
};

export default API_URLS;
