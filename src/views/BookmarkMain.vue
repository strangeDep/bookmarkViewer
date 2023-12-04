<script setup>
import {onMounted, ref} from 'vue'
import Contents from '../components/Contents.vue'
import Modal from '../components/Modal.vue'

// ----------------------------------------------------------------------------------
// 상위 component 에서 전달 받은 props 정의
// ----------------------------------------------------------------------------------
defineProps({
  msg: String,
})

// object 변수
const contentObj = ref(null)    // Contents obj
const modalObj = ref(null)      // toastObj 팝업 obj

// data 변수
const searchText = ref('')      // 검색어

// state 변수
const modalVisible = ref(false) // 모달창 visible
const variant = ref('info')  // 모달창 variant

// ----------------------------------------------------------------------------------
// 등록/수정 모달창 open
// ----------------------------------------------------------------------------------
const openModal = async () => {
  modalObj.value.openModal()
}

// ----------------------------------------------------------------------------------
// [Lifecycle Hook] 컴포넌트가 마운트된 후 호출될 콜백
// ----------------------------------------------------------------------------------
onMounted(() => {

  console.log('BookmarkMain onMounted()')
  contentObj.value.showContents()

})

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-12 text-center">
        <div class="card m-5">
          <div class="card-body">
            <h1 class="fw-bolder">{{ msg }}</h1>

            <hr class="m-3" />

            <div class="row mb-3">

              <div class="col-lg-4 col-sm-6">
                <div class="search-box mb-2 me-2">
                  <div class="position-relative">
                    <input v-bind="searchText" type="text" class="form-control bg-light border-light rounded" placeholder="Search...">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" class="eva eva-search-outline search-icon"><g data-name="Layer 2"><g data-name="search"><rect width="24" height="24" opacity="0"></rect><path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"></path></g></g></svg>
                  </div>
                </div>
              </div>

              <div class="col-lg-8 col-sm-6">
                <div class="mt-4 mt-sm-0 d-flex align-items-center justify-content-sm-end">
                  <div class="mb-2 me-2">
                    <div class="dropdown">
                      <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="mdi mdi-plus me-1"></i> Create New
                      </button>
                      <div class="dropdown-menu dropdown-menu-end">
                        <a class="dropdown-item" href="#" @click="openModal"><i class="mdi mdi-folder-outline me-1"></i> Folder</a>
                        <a class="dropdown-item" href="#"><i class="mdi mdi-file-outline me-1"></i> File</a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            <Contents ref="contentObj" :searchTitle="searchText"></Contents>

          </div>
        </div>
      </div>
    </div>

  </div>

  <Modal ref="modalObj"></Modal>

</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/ionicons/4.5.6/css/ionicons.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');


body{margin-top:20px;
  background-color: #f1f3f7;
}

.search-box .form-control {
  border-radius: 10px;
  padding-left: 40px
}

.search-box .search-icon {
  position: absolute;
  left: 13px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  fill: #545965;
  width: 16px;
  height: 16px
}

</style>
