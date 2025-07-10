<script setup>
import { computed } from "vue";
import { addItem } from "@/services/cartService";

// 프로퍼티 객체
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

// 상품 할인가 계산
const computedItemDiscountPrice = computed(() => {
  return (
    (
      props.item.price -
      (props.item.price * props.item.discountPer) / 100
    ).toLocaleString() + "원"
  );
});

// 장바구니에 상품 담기
const put = async () => {
  const res = await addItem(props.item.id).catch((e) => e.response);
  if (!res) {
    alert("장바구니 요청 실패");
    return;
  }

  if (res.status === 409) {
    console.log("res.status:", res.status);
    alert("이미 장바구니에 있는 상품입니다.");
    return;
  }
  // 로그인 된 상태라면 장바구니 담기 API 호출
  if (res.status === 401 || res.status === 403) {
    const goLogin = confirm(
      "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
    );
    if (goLogin) {
      window.location.href = "/login";
    }
    return;
  }

  if (res.status !== 200) {
    console.log("res.status: ", res.status);
    alert("장바구니 요청 실패");
    return;
  }

  //장바구니로 가기
  const goCart = confirm(
    "상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?"
  );
  if (goCart) {
    window.location.href = "/cart";
  }
};

const buy = () => {
  window.location.href = "/orders";
};

const computedDiscountRate = computed(() => {
  return String(props.item.discountPer ?? 0);
});
</script>

<template>
  <div class="card shadow-sm">
    <!-- 상품 사진 -->
    <span
      class="img"
      :style="{
        backgroundImage: `url(http://localhost:8080/pic/item/${props.item.imgPath})`,
      }"
      :aria-label="`상품사진(${props.item.name})`"
    ></span>
    <div class="card-body">
      <p class="card-text">
        <!-- 상품 이름 -->
        <span class="me-2">{{ props.item.name }}</span>
      </p>

      <div class="price-info">
        <!-- 상품 할인율 -->
        <small class="discount-rate text-danger me-2"
          >{{ computedDiscountRate }}%</small
        >
        <!-- 상품 할인가 -->
        <small class="real text me-2">{{ computedItemDiscountPrice }}</small>

        <!-- 상품 정가(숫자 데이터에 3자리마다 쉼표 표시) -->
        <small class="price text-muted"
          >{{ props.item.price.toLocaleString() }}원</small
        >
      </div>

      <div class="d-flex justify-content-end align-items-center mt-3">
        <button class="btn btn-secondary btn-sm me-2 ms-2" @click="put()">
          장바구니
        </button>
        <button class="btn btn-naver-green btn-sm me-1" @click="buy()">
          구매하기
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price-info {
  display: flex;
  gap: 8px; /* 각 항목 사이에 간격 추가 */
  align-items: baseline;
}
</style>

<style lang="scss" scoped>
.card {
  .img {
    display: inline-block;
    width: 100%;
    height: 250px;
    background-size: cover;
    background-position: center;
  }

  .card-body .price {
    text-decoration: line-through;
  }

  .btn-naver-green {
    background-color: #03c75a;
    color: #fff;
    font-size: 16px;
    border: none;

    &:hover {
      background-color: #029746;
    }
  }
  .discount-rate.text-danger {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 20px;
    color: #000;
    font-weight: bold;
  }

  .card-text > .me-2 {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 16px;
  }

  .real.text {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 20px;
    color: #000;
    font-weight: bold;
  }
}
</style>
