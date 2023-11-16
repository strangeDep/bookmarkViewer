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
const childBookList = ref([]) // 하위 자식 북마크 리스트
const prevBookList = ref([]) // 상위 북마크
const parentId = ref('1')

const insertBookmark = () => {

  chrome.bookmarks.create({
    'parentId': parentId.value,
    'title': '가나다라',
    'url': 'https://www.naver.com/',
  });

  childBookList.value = props.bookList
}

// ----------------------------------------------------------------------------------
// Content Show
// ----------------------------------------------------------------------------------
const showContents = () => {

  // component 초기화 여기서 진행
  isShow.value = true

  childBookList.value = props.bookList
}

// ----------------------------------------------------------------------------------
// Image Get
// ----------------------------------------------------------------------------------
const getImageUrl = (name, ext) => {
  return new URL(`../assets/${name}.${ext}`, import.meta.url).href
}

// ----------------------------------------------------------------------------------
// Image Get
// ----------------------------------------------------------------------------------
const errorImg = (e) => {
  e.target.src = getImageUrl('earth','png')
}

// ----------------------------------------------------------------------------------
// Content Hide
// ----------------------------------------------------------------------------------
const hideContents = () => {
  isShow.value = false
}

// ----------------------------------------------------------------------------------
// 폴더/링크 요소 클릭
// ----------------------------------------------------------------------------------
const fnClick = (item) => {
  console.log(item)
  parentId.value = item.id
  if(item.children != undefined){
    prevBookList.value = childBookList.value
    childBookList.value = item.children
  }else{

  }
}

// ----------------------------------------------------------------------------------
// 뒤로가기 클릭
// ----------------------------------------------------------------------------------
const fnBackClick = () => {

  if(childBookList.value == prevBookList.value) { // 폴더 안에 폴더
    childBookList.value = props.bookList
  } else {
    childBookList.value = prevBookList.value
  }
  //childBookList.value = prevBookList.value
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
    <button @click="fnBackClick" v-show="childBookList != props.bookList">뒤로가기</button>
    <div class="container px-4 px-lg-5 mt-5">
      <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        <div class="col mb-5" v-for="(item, index) in childBookList" :key="index" @click="fnClick(item)">
          <div class="card h-100">
<!--            <div class="text-center">-->
<!--              <p v-if="item.children != undefined">폴더</p>-->
<!--              <p v-else>링크</p>-->
<!--            </div>-->
            <!-- Product image-->
            <img v-if="item.children != undefined" class="card-img-top" :src="getImageUrl('blue-folder','png')" alt="..." />
            <img v-else class="card-img-top" :src="item.url + '/favicon.ico'"
                 alt="" @error="errorImg" />
            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
              <h5 class="fw-bolder"><a :href="item.url" target="_blank">{{item.title}}</a></h5><!--새 창 띄워서 이동-->
                <!-- Product price-->

              </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer pt-0 border-top-0 bg-transparent">
              <div class="text-center d-flex">
                <button type="button" class="btn btn-primary m-1">수정</button>
                <button type="button" class="btn btn-primary m-1">삭제</button>
              </div>
            </div>
          </div>
        </div>
<!--        /////////////////-->
        <div class="col mb-5">
          <div class="card h-100">
            <div class="text-center">
              <p>추가</p>
            </div>
            <!-- Product image-->
            <img class="card-img-top" src="../assets/plus.png" alt="..." @click="insertBookmark"/>
            <!-- Product details-->
            <div class="card-body p-4">
              <div class="text-center">
                <!-- Product name-->
<!--                <h5 class="fw-bolder">추가</h5>-->
                <!-- Product price-->

              </div></div>
            <!-- Product actions-->
            <div class="card-footer pt-0 border-top-0 bg-transparent">
              <div class="text-center d-flex">
                <button type="button" class="btn btn-primary m-1">등록</button>
                <button type="button" class="btn btn-primary m-1">취소</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
