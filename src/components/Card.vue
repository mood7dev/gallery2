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
        <!-- 상품 할인율 -->
        <span class="discount badge bg-danger"
          >{{ props.item.discountPer }}%</span
        >
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <button class="btn btn-primary btn-sm" @click="put()">
          장바구니 담기
        </button>
        <!-- 상품 정가(숫자 데이터에 3자리마다 쉼표 표디) -->
        <small class="price text-muted"
          >{{ props.item.price.toLocaleString() }}원</small
        >
        <!-- 상품 할인가 -->
        <small class="real text-danger">{{ computedItemDiscountPrice }}</small>
      </div>
    </div>
  </div>
</template>

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
}
</style>
