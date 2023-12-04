<script setup>
import {ref, watch} from "vue";
// ----------------------------------------------------------------------------------
// 상위 component 에서 전달 받은 props 정의
// ----------------------------------------------------------------------------------
const props = defineProps({
})

// state 변수
const visible = ref(false)


// ----------------------------------------------------------------------------------
// close modal
// ----------------------------------------------------------------------------------
const closeModal = () => {
  console.log('Modal : closeModal')
  visible.value = false
}

// ----------------------------------------------------------------------------------
// open modal
// ----------------------------------------------------------------------------------
const openModal = (type) => {
  console.log('Modal : openModal')
  visible.value = true
}


// ----------------------------------------------------------------------------------
// 상위 component 에서 호출 가능한 함수 정의
// ----------------------------------------------------------------------------------
defineExpose({
  openModal,
})

</script>

<template>

  <div >
    <!-- Modal -->
    <div v-if="visible" class="modal fade show"
         tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog"
         style="display:block">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">

            <button type="button" @click="closeModal()" class="btn-close" ></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button"  @click="closeModal()" :class="'btn btn-'+variant" >aaaa</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>