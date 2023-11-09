<script setup>

import {onMounted, ref} from "vue";

// ----------------------------------------------------------------------------------
// 상위 component 에서 전달 받은 props 정의
// ----------------------------------------------------------------------------------
const props = defineProps({
  bookList : Object
})

// state 변수
const isShow = ref(false) // display 여부


// ----------------------------------------------------------------------------------
// Content Show
// ----------------------------------------------------------------------------------
const showContents = () => {

  // component 초기화 여기서 진행
  isShow.value = true
}

// ----------------------------------------------------------------------------------
// Content Hide
// ----------------------------------------------------------------------------------
const hideContents = () => {
  isShow.value = false
}

// ----------------------------------------------------------------------------------
// [Lifecycle Hook] 컴포넌트가 마운트된 후 호출될 콜백
// ----------------------------------------------------------------------------------
onMounted(()=>{
  console.log('Contents onMounted()')
})

// ----------------------------------------------------------------------------------
// 상위 component 에서 호출 가능한 함수 정의
// ----------------------------------------------------------------------------------
defineExpose({
  showContents,
  hideContents,
})

</script>

<template>

  <!--isShow 가 true 일때만 화면에 표시-->
  <section class="py-5" v-if="isShow">
    <div class="container px-4 px-lg-5 mt-5">
      <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        <div class="col mb-5" v-for="(item, index) in bookList" :key="index">
          <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">{{item.title}}</h5>
                <!-- Product price-->

              </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
              <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">{{item.link}}</a></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
