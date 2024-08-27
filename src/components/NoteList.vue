<template>
    <div>
      <h1 class="title">Мои заметки</h1>
      <button class="create-button button" @click="createNote">Создать новую заметку</button>
      <div v-for="note in filteredNotes" :key="note.id" class="note">
        <h2>{{ note.name }}</h2>
        <ul>
          <li v-for="todo in note.todos" :key="todo.id">
            <input type="checkbox" :id="todo.id" v-model="todo.completed">
            <label :for="todo.id">{{ todo.text }}</label>
          </li>
        </ul>
        <button class="button button_edit" @click="editNote(note)">Редактировать</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { Note } from './types'; 
  
  @Component
  export default class NoteList extends Vue {
    @Prop() notes!: Note[];
    @Prop() filteredNotes!: Note[];
    // eslint-disable-next-line no-unused-vars
    @Prop() editNote!: (note: Note) => void;
    @Prop() createNote!: () => void;
  }
  </script>

<!-- <script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    },
    filteredNotes: {
      type: Array,
      required: true
    },
    editNote: {
      type: Function,
      required: true
    },
    createNote: {
      type: Function,
      required: true
    }
  }
}
</script> -->
  