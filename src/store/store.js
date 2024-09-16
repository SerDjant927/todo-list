import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: JSON.parse(localStorage.getItem('notes')) || [] 
  },
  mutations: {
    ADD_NOTE(state, note) {
      state.notes.push(note);
      localStorage.setItem('notes', JSON.stringify(state.notes)); 
    },
    UPDATE_NOTE(state, updatedNote) {
      const index = state.notes.findIndex(note => note.id === updatedNote.id);
      if (index !== -1) {
        Vue.set(state.notes, index, updatedNote);
        localStorage.setItem('notes', JSON.stringify(state.notes)); 
      }
    },
    DELETE_NOTE(state, noteId) {
      state.notes = state.notes.filter(note => note.id !== noteId);
      localStorage.setItem('notes', JSON.stringify(state.notes)); 
    }
  },
  actions: {
    addNote({ commit }, note) {
      commit('ADD_NOTE', note);
    },
    updateNote({ commit }, updatedNote) {
      commit('UPDATE_NOTE', updatedNote);
    },
    deleteNote({ commit }, noteId) {
      commit('DELETE_NOTE', noteId);
    },
    createNote({ commit }, note) {
      commit('ADD_NOTE', note);
    }
  },
  getters: {
    filteredNotes: (state) => {
      return state.notes.filter(note => note.todos.length > 0);
    }
  }
});
