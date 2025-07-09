import axios from "./httpRequester";

// 장바구니 상품 추가
export const addItem = (itemId) => {
  return axios.post("/cart", { itemId }).catch((e) => e.response);
};

// 장바구니 상품 목록 조회
export const getItems = () => {
  return axios.get("/cart").catch((e) => e.response);
};

// 장바구니에서 상품 삭제
export const removeItem = () => {
  return axios.get("/cart").catch((e) => e.response);
};
