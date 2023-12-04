<script setup>

import {onMounted, ref, computed} from "vue";
import {useStore} from "vuex";

// ----------------------------------------------------------------------------------
// 상위 component 에서 전달 받은 props 정의
// ----------------------------------------------------------------------------------
const props = defineProps({
  searchTitle : String
})

// store
const store = useStore()

// object 변수
const { bookmarks } = chrome          // 북마크 object

// state 변수
const children = ref([])        // 현재 요소 자식 목록
const pathList = ref([])        // 현재 위치
const parentId = ref({})        // 부모 ID

// const insertBookmark = () => {
//
//   chrome.bookmarks.create({
//     'parentId': parentId.value,
//     'title': '가나다라',
//     'url': 'https://www.naver.com/',
//   });
//
// }

// ----------------------------------------------------------------------------------
// Content Show
// ----------------------------------------------------------------------------------
const showContents = async () => {

  // store 예시
  // console.log(computed(() => store.getters.getQuickLaunch).value)
  // store.dispatch('setQuickLaunchAction', rootList)

  // component 초기화
  setChildrenById('1')
  pathList.value.push({id: '1', path: '/root'})
  parentId.value = '1'

}

// ----------------------------------------------------------------------------------
// 북마크 query 검색
// ----------------------------------------------------------------------------------
const searchBookmarkByQuery = (str) => {

  bookmarks.search(str, (results) => {
    if(results.length > 0) {
      console.log('searchBookmarkByQuery', results)
      children.value = results
    }
  })
}

// ----------------------------------------------------------------------------------
// 북마크 Id 검색
// ----------------------------------------------------------------------------------
const setChildrenById = (id) => {
  bookmarks.getSubTree(id, (results) => {
    if(results.length > 0) {
      console.log('getSubTree', results[0])
      parentId.value = results[0].parentId
      children.value = results[0].children
    }
  })
}

// ----------------------------------------------------------------------------------
// 폴더/링크 요소 클릭
// ----------------------------------------------------------------------------------
const clickItem = (item) => {
  console.log('clickItem', item)

  if(item.children != undefined){
    setChildrenById(item.id)
  } else {
    let win = window.open(item.url, '_blank');
    win.focus();
  }

}

// ----------------------------------------------------------------------------------
// 뒤로가기 클릭
// ----------------------------------------------------------------------------------
const clickBack = () => {
  console.log('clickBack')
  setChildrenById(parentId.value)
}

// ----------------------------------------------------------------------------------
// [Lifecycle Hook] 컴포넌트가 마운트된 후 호출될 콜백
// ----------------------------------------------------------------------------------
onMounted(() => {
  console.log('Contents onMounted()')
})

// ----------------------------------------------------------------------------------
// 상위 component 에서 호출 가능한 함수 정의
// ----------------------------------------------------------------------------------
defineExpose({
  showContents,
})

</script>

<template>

  <ol class="breadcrumb text-big container-p-x py-3 m-0">
    <!--경로-->
    <div v-for="(item, index) in pathList" :key="index">
      <li class="breadcrumb-item" :class="{'active':index == pathList.length - 1}">
        <a href="javascript:void(0)">{{item.path}}</a>
      </li>
    </div>
  </ol>

  <hr class="m-3" />

  <div class="file-manager-container file-manager-col-view">

    <div class="file-manager-row-header">
      <div class="file-item-name pb-2">Filename</div>
      <div class="file-item-changed pb-2">Changed</div>
    </div>

    <!--뒤로가기-->
    <div class="file-item">
      <div class="file-item-icon file-item-level-up fas fa-level-up-alt text-secondary" @click="clickBack"></div>
      <a href="javascript:void(0)" class="file-item-name">
        ..
      </a>
    </div>

    <!--북마크 목록-->
    <div class="file-item" v-for="(item, index) in children" :key="index" @click="clickItem(item)">

      <div v-if="item.children != undefined" class="file-item-icon far fa-folder text-secondary"></div>
      <div v-else class="file-item-icon fas fa-external-link-alt text-secondary"></div>

      <a href="javascript:void(0)" class="file-item-name">
        {{item.title}}
      </a>
      <div class="file-item-actions btn-group">
        <button type="button" class="btn btn-default btn-sm rounded-pill icon-btn borderless md-btn-flat hide-arrow dropdown-toggle" data-toggle="dropdown"><i class="ion ion-ios-more"></i></button>
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="javascript:void(0)">Rename</a>
          <a class="dropdown-item" href="javascript:void(0)">Move</a>
          <a class="dropdown-item" href="javascript:void(0)">Copy</a>
          <a class="dropdown-item" href="javascript:void(0)">Remove</a>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
@import url('../assets/css/file_manager.css');

</style>
