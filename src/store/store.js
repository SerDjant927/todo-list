import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: []
  },
  mutations: {
    ADD_NOTE(state, note) {
      state.notes.push(note);
    },
    UPDATE_NOTE(state, updatedNote) {
      const index = state.notes.findIndex(note => note.id === updatedNote.id);
      if (index !== -1) {
        Vue.set(state.notes, index, updatedNote);
      }
    },
    DELETE_NOTE(state, noteId) {
      state.notes = state.notes.filter(note => note.id !== noteId);
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
    }
  },
  getters: {
    filteredNotes: (state) => {
      return state.notes.filter(note => note.todos.length > 0);
    }
  }
});
