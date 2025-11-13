import { v4 as uuidv4 } from "uuid";
import { ToDoItem } from "./types";

const fakeDatabase: ToDoItem[] = [];

const TITULO_MIN_LENGTH = 3;
const TITULO_MAX_LENGTH = 100;

export const validateTitulo = (titulo: any): string | null => {
  if (!titulo || typeof titulo !== "string") {
    return "El campo 'titulo' debe ser una cadena de texto";
  }

  const trimmedTitulo = titulo.trim();

  if (trimmedTitulo.length === 0) {
    return "El título no puede estar vacío";
  }

  if (trimmedTitulo.length < TITULO_MIN_LENGTH) {
    return `El título debe tener mínimo ${TITULO_MIN_LENGTH} caracteres`;
  }

  if (trimmedTitulo.length > TITULO_MAX_LENGTH) {
    return `El título no puede exceder ${TITULO_MAX_LENGTH} caracteres`;
  }

  return null;
};

export const getAllTodos = (): ToDoItem[] => {
  return fakeDatabase;
};

export const createTodo = (titulo: string): ToDoItem => {
  const newItem: ToDoItem = {
    id: uuidv4(),
    titulo: titulo.trim(),
    completada: false,
  };

  fakeDatabase.push(newItem);
  return newItem;
};

export const getTodoById = (id: string): ToDoItem | undefined => {
  return fakeDatabase.find((item) => item.id === id);
};

export const markTodoComplete = (id: string): ToDoItem | null => {
  const todo = fakeDatabase.find((item) => item.id === id);
  if (todo) {
    todo.completada = true;
    return todo;
  }
  return null;
};

export const deleteTodo = (id: string): boolean => {
  const index = fakeDatabase.findIndex((item) => item.id === id);
  if (index > -1) {
    fakeDatabase.splice(index, 1);
    return true;
  }
  return false;
};
