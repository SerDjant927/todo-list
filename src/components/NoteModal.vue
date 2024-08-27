<template>
    <div class="modal" v-if="modalVisible">
        <input type="text" v-model="currentNote.name" placeholder="Название заметки" class="input-field">
        <ul>

            <li v-for="todo in currentNote.todos" :key="todo.id">

                <input class="input-field" type="checkbox" :id="todo.id" v-model="todo.completed">
                <label :for="todo.id">{{ todo.text }}</label>
                <button class="button" @click="deleteTempTodo(todo)">Удалить</button>
            </li>
        </ul>
        <input type="text" placeholder="Добавить дело" v-model="newTodoText" class="input-field">
        <button @click="addTodo" class="button">Добавить дело</button>
        <button @click="saveNote" class="button">Сохранить</button>
        <button @click="cancelEdit" class="button">Отменить</button>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Note, Todo } from './types'; 
//import { Note } from './types'; 
@Component
export default class NoteModal extends Vue {
    @Prop() modalVisible!: boolean;
    @Prop() currentNote!: Note;
    @Prop() newTodoText!: string;
    @Prop() addTodo!: () => void;
    @Prop() saveNote!: () => void;
    // eslint-disable-next-line no-unused-vars
    @Prop() deleteTempTodo!: (todo: Todo) => void;
    @Prop() cancelEdit!: () => void;
}
</script>