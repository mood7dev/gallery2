<script setup>
import { getItems } from "@/services/itemService";
import { onMounted } from "vue";

//이 화면이 마운트 될 때 딱 한 번 겟아이템 통신
onMounted(async () => {
  const res = await getItems();
  if (res.status === 200) {
    console.log(res.data);
  }
});
</script>

<template>
  <div class="container">
    <h1 class="mt-5">┃HELLO, HOME<span class="clover">🍀</span></h1>
  </div>
</template>

<style scoped>
.container {
  font-weight: 700;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.clover {
  font-size: 24px;
  vertical-align: middle;
  line-height: 1;
  margin-left: 3px;
}
</style>
