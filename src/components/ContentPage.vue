<template>
  <main class="main">
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
    <div class="modal" v-if="modalNewNoteVisible">
      <input type="text" v-model="currentNote.name" placeholder="Название заметки" class="input-field">
      <ul v-if="currentNote.todos.length > 0">
        <li v-for="todo in currentNote.todos" :key="todo.id">
          <input class="input-field" type="checkbox" :id="todo.id" v-model="todo.completed">
          <label :for="todo.id">{{ todo.text }}</label>
          <button class="button" @click="deleteTempTodo(todo)">Удалить</button>
        </li>
      </ul>
      <input type="text" placeholder="Добавить дело" v-model="newTodoText" class="input-field">
      <button @click="addTodo" class="button">Добавить дело</button>
      <button @click="saveNewNote" class="button">Сохранить</button>
      <button @click="cancelEdit" class="button">Отменить изменение</button>
    </div>
    <div v-if="modalVisible" class="modal">
      <input class="input-field" type="text" v-model="currentNote.name" placeholder="Название заметки">
      <ul>
        <li v-for="todo in currentNote.todos" :key="todo.id">
          <input class="input-field" type="checkbox" :id="todo.id" v-model="todo.completed">
          <label :for="todo.id">{{ todo.text }}</label>
          <button class="button" @click="deleteTempTodo(todo)">Удалить</button>
        </li>
      </ul>
      <input class="input-field" type="text" placeholder="Добавить дело" v-model="newTodoText">
      <button class="button" @click="addTodo">Добавить дело</button>
      <button class="button" @click="updateNote">Сохранить</button>
      <button class="button" @click="cancelEdit">Отменить редактирование</button>
    </div>
    <div v-if="confirmModalVisible" class="modal modal_cancel">
      <h2>Отменить редактирование?</h2>
      <button class="button" @click="confirmCancel">Да</button>
      <button class="button" @click="closeConfirmModal">Нет</button>
    </div>
    <div class="modal-bg"></div>
  </main>
</template>

<script>
export default {
  name: 'ContentPage',
  data() {
    return {
      modalVisible: false,
      modalNewNoteVisible: false,
      confirmModalVisible: false,
      newNoteName: '',
      newTodoText: '',
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      currentNote: null
    };
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    addTodo() {
      if (this.newTodoText.trim() !== '') {
        this.currentNote.todos.push({
          id: Date.now(),
          text: this.newTodoText,
          completed: false
        });
        this.newTodoText = '';
      }
    },
    deleteTempTodo(todo) {
      const index = this.currentNote.todos.indexOf(todo);
      this.currentNote.todos.splice(index, 1);
    },

    createNote() {
      this.modalNewNoteVisible = true;
      this.currentNote = {
        name: '',
        todos: []
      };
      this.newTodoText = '';
    },
    editNote(note) {
      this.currentNote = { ...note };
      this.currentNote.todos = [...note.todos];
      console.log(this.currentNoteTempTodos);
      this.modalVisible = true;
    },
    updateNote() {
      const index = this.notes.findIndex(note => note.id === this.currentNote.id);
      this.notes[index].todos = this.currentNote.todos;
      this.currentNote = null;
      this.modalVisible = false;
      this.saveNotes();
    },
    cancelEdit() {
      this.confirmModalVisible = true;
    },
    confirmCancel() {
      this.currentNote.todos = this.currentNoteTempTodos;
      this.modalNewNoteVisible = false;
      this.confirmModalVisible = false;
      this.modalVisible = false;
    },
    closeConfirmModal() {
      this.confirmModalVisible = false;
    },
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    saveNewNote() {
      this.notes.push(this.currentNote);
      this.modalNewNoteVisible = false;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    loadFromLocalStorage() {
      const savedNotes = localStorage.getItem('notes');
      if (savedNotes) {
        this.notes = JSON.parse(savedNotes);
      }
    }
  },

  computed: {
    filteredNotes() {
      return this.notes.filter(note => note.todos.length > 0);
    }
  },
  mounted() {
    this.loadFromLocalStorage();
  }
};
</script>

<style scoped>
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

.modal+.modal-bg {
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
  display: flex;
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
