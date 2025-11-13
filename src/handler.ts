import { getAllTodos, createTodo, validateTitulo } from "./service";
import {
  successResponse,
  badRequest,
  methodNotAllowed,
  serverError,
} from "./utils/response";

export const handler = async (event: any) => {
  const method = event.httpMethod;

  try {
    if (method === "GET") {
      const todos = getAllTodos();
      return successResponse(todos);
    }

    if (method === "POST") {
      const body = JSON.parse(event.body || "{}");
      const { titulo } = body;

      // Validar título
      const validationError = validateTitulo(titulo);
      if (validationError) {
        return badRequest(validationError);
      }

      // Crear nueva tarea
      const newTodo = createTodo(titulo);
      return successResponse(newTodo);
    }

    return methodNotAllowed();
  } catch (error: any) {
    console.error("Error en handler:", error);
    return serverError(error.message || "Error interno del servidor");
  }
};
