<script setup>
import {onMounted, ref} from 'vue'
import Contents from '../components/Contents.vue'

// ----------------------------------------------------------------------------------
// 상위 component 에서 전달 받은 props 정의
// ----------------------------------------------------------------------------------
defineProps({
  msg: String,
})

// object 변수
const contentObj = ref(null)    // Contents obj
const { bookmarks } = chrome          // 북마크 object

// data 변수
const bookList = ref([])        // 북마크 리스트


// ----------------------------------------------------------------------------------
// 북마크 리스트 조회
// ----------------------------------------------------------------------------------
const setBookmarkBarTree = (tree) => {
  if(tree && tree.length > 0) {
    tree[0].children.forEach((item) => {
      if(item.title == '북마크바') {
        bookList.value = item.children
      }
    })
  }

  return new Promise((resolve, reject) => {
    resolve()
  })

}

// ----------------------------------------------------------------------------------
// [Lifecycle Hook] 컴포넌트가 마운트된 후 호출될 콜백
// ----------------------------------------------------------------------------------
onMounted(async ()=>{
  console.log('BookmarkMain onMounted()')
  await bookmarks.getTree().then(setBookmarkBarTree);

  // 하위 Contents component 호출
  contentObj.value.showContents()

})

</script>

<template>
  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
<!--    <div class="container px-4 px-lg-5">
      <a class="navbar-brand" href="#!">Start Bootstrap</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <li class="nav-item"><a class="nav-link active" aria-current="page" href="#!">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#!">About</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#!">All Products</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#!">Popular Items</a></li>
              <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex">
          <button class="btn btn-outline-dark" type="submit">
            <i class="bi-cart-fill me-1"></i>
            Cart
            <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
          </button>
        </form>
      </div>
    </div>-->
  </nav>
  <!-- Header-->
  <header class="bg-dark py-2">
    <div class="container px-4 px-lg-5 my-5">
      <div class="text-center text-white">
        <h1 class="display-4 fw-bolder">Shop in style</h1>
        <p class="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
      </div>
    </div>
  </header>
  <!-- Section-->
  <Contents ref="contentObj" :bookList="bookList"></Contents>
  <!-- Footer-->
  <footer class="py-5 bg-dark">
    <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
  </footer>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
