// ContentPage.vue
<template>
  <main class="main">
    <NoteList :filteredNotes="filteredNotes" :editNote="editNote" :createNote="createNote" />
    <NoteModal 
      :modalVisible="modalVisible" 
      :modalNewNoteVisible="modalNewNoteVisible" 
      :currentNote="currentNote"
      :addTodo="addTodo" 
      :updateNote="updateNote" 
      :deleteTempTodo="deleteTempTodo"
      :cancelEdit="cancelEdit" 
      :saveNewNote="saveNewNote" 
    />
    <ConfirmModal 
      :confirmModalVisible="confirmModalVisible" 
      :confirmCancel="confirmCancel"
      :closeConfirmModal="closeConfirmModal" 
    />
    <div class="modal-bg"></div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import NoteList from './NoteList.vue'
import NoteModal from './NoteModal.vue'
import ConfirmModal from './ConfirmModal.vue'
import { mapGetters, mapActions } from 'vuex'
import { Note, Todo } from './types'

@Component({
  components: {
    NoteList,
    NoteModal,
    ConfirmModal
  },
  computed: {
    ...mapGetters(['filteredNotes'])
  },
  methods: {
    ...mapActions(['addNote', 'updateNote', 'createNote']),
  }
})

export default class ContentPage extends Vue {
  modalVisible: boolean = false;
  modalNewNoteVisible: boolean = false;
  confirmModalVisible: boolean = false;
  newTodoText: string = '';
  currentNote: Note | null = null;

  openModal(): void {
    this.modalVisible = true;
  }

  createNote(): void {
    this.modalNewNoteVisible = true;
    this.modalVisible = false;
    this.currentNote = {
      id: Date.now(),
      name: '',
      todos: []
    };
    this.newTodoText = '';
  }

  saveNewNote(): void {
    if (this.currentNote) {
      this.$store.dispatch('addNote', this.currentNote);
      this.currentNote = null;
      this.modalNewNoteVisible = false;
      this.modalVisible = false;
    }
  }

  addTodo(todoText: string): void {
    if (todoText.trim() !== '') {
      this.currentNote!.todos.push({
        id: Date.now(),
        text: todoText,
        completed: false
      });
    }
  }

  deleteTempTodo(todo: Todo): void {
    const index = this.currentNote!.todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.currentNote!.todos.splice(index, 1);
    }
  }

  editNote(note: Note): void {
    this.currentNote = JSON.parse(JSON.stringify(note));
    this.modalVisible = true;
  }

  updateNote(): void {
    if (this.currentNote) {
      this.$store.dispatch('updateNote', this.currentNote);
      this.currentNote = null;
      this.modalVisible = false;
    }
  }

  cancelEdit(): void {
    this.confirmModalVisible = true;
  }

  confirmCancel(): void {
    this.currentNote = null;
    this.modalNewNoteVisible = false;
    this.confirmModalVisible = false;
    this.modalVisible = false;
  }

  closeConfirmModal(): void {
    this.confirmModalVisible = false;
  }

  get filteredNotes(): Note[] {
    return this.$store.getters.filteredNotes;
  }
}
</script>


<style>
*{
  box-sizing: border-box;
}
.main {
  display: flex;
  flex-direction: column;
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.create-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

.note {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
}

.edit-button {
  background-color: #008CBA;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;
}

.modal {
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 480px;
  max-width: 100%;
}

.modal.modal_cancel {
  z-index: 15;
  -webkit-box-shadow: 0px 0px 25px 15px rgba(34, 60, 80, 0.5);
  -moz-box-shadow: 0px 0px 25px 15px rgba(34, 60, 80, 0.5);
  box-shadow: 0px 0px 25px 15px rgba(34, 60, 80, 0.5);
}

.modal-bg {
  display: none;
  position: fixed;
  z-index: -1;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

.modal + .modal-bg {
  display: flex;
  z-index: 5;
  background-color: #2A3342;
  opacity: 0.8;
}

.button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: flex;
  width: max-content;
  max-width: 100%;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.button.button_edit {
  background-color: #2c3e50;
}

.input-field {
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 480px;
  max-width: 100%;
  margin: 0 auto;
  padding: 12px;
  border-radius: 8px;
  justify-content: flex-start;
  align-items: flex-start;
  -webkit-box-shadow: 0px 0px 5px 5px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 5px 5px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 5px 5px rgba(34, 60, 80, 0.2);
  max-height: 400px;
  overflow: auto;
}

ul li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 12px;
  width: 100%;

}

input {
  cursor: pointer;
}

input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}

li label {
  cursor: pointer;
  display: grid;
  grid-template-columns: 22px 1fr;
  align-items: center;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 400;
  column-gap: 8px;
}

li label::before {
  content: '';
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: url('../assets/checkbox.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  border: 1px solid #4CAF50;
}

input[type="checkbox"]:checked+label:before {
  background-color: #4CAF50;
}
</style>
