<template>
    <div class="modal" v-if="modalVisible || modalNewNoteVisible">
        <input type="text" v-model="currentNote.name" placeholder="Название заметки" class="input-field">
        <ul v-if="currentNote.todos.length > 0">
            <li v-for="todo in currentNote.todos" :key="todo.id">
                <input class="input-field" type="checkbox" :id="todo.id" v-model="todo.completed">
                <label :for="todo.id">{{ todo.text }}</label>
                <button class="button" @click="deleteTempTodo(todo)">Удалить</button>
            </li>
        </ul>
        <input type="text" placeholder="Добавить дело" v-model="localNewTodoText" class="input-field">
        <button @click="handleAddTodo" class="button">Добавить дело</button>
        <button @click="modalNewNoteVisible ? saveNewNote() : updateNote()" class="button">
            {{ modalNewNoteVisible ? 'Сохранить' : 'Обновить' }}
        </button>
        <button @click="cancelEdit" class="button">Отменить</button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Note, Todo } from './types';

@Component
export default class NoteModal extends Vue {
    @Prop() modalVisible!: boolean;
    @Prop() modalNewNoteVisible!: boolean;
    @Prop() currentNote!: Note;
    // eslint-disable-next-line no-unused-vars
    @Prop() addTodo!: (todoText: string) => void; 
    // eslint-disable-next-line no-unused-vars
    @Prop() deleteTempTodo!: (todo: Todo) => void;
    @Prop() cancelEdit!: () => void;
    @Prop() saveNewNote!: () => void; 
    @Prop() updateNote!: () => void;
    localNewTodoText: string = '';

    handleAddTodo() {
        if (this.localNewTodoText.trim() !== '') {
            this.addTodo(this.localNewTodoText); 
            this.localNewTodoText = ''; 
        }
    }
}
</script>
