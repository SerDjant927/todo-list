export interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  export interface Note {
    id: number;
    name: string;
    todos: Todo[];
  }
  