<template>
    <div v-if="confirmModalVisible" class="modal modal_cancel">
      <h2>Отменить редактирование?</h2>
      <button class="button" @click="confirmCancel">Да</button>
      <button class="button" @click="closeConfirmModal">Нет</button>
    </div>
  </template>
  
  <script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  
  @Component
  export default class ConfirmModal extends Vue {
    @Prop() confirmModalVisible!: boolean;
    @Prop() confirmCancel!: () => void;
    @Prop() closeConfirmModal!: () => void;
  }
  </script>
  