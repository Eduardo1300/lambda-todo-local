
# 📘 Lambda ToDo API (Simulación Local)

Este proyecto simula un endpoint estilo AWS Lambda usando **TypeScript + Node.js**, permitiendo crear y consultar tareas (to-do items) sin depender de AWS. Incluye validación, arquitectura modular y tests unitarios.

---

## 🚀 Demo en Render

- **Base URL:** [https://lambda-todo-local.onrender.com/](https://lambda-todo-local.onrender.com/)

### Endpoints

- `GET /todos` – Lista todas las tareas
- `POST /todos` – Crea una nueva tarea (campo requerido: `titulo`)

---

## 🧠 Características principales

- Almacenamiento temporal en memoria (simulación de Lambda stateless)
- IDs únicos generados con `uuid`
- Validación completa del campo `titulo` (mínimo 3, máximo 100)
- Manejo correcto de errores y códigos HTTP
- 10 tests unitarios con Vitest
- Arquitectura modular que replica la estructura de una Lambda real

---

## 📁 Estructura del proyecto

```text
lambda-todo/
├─ src/
│   ├─ handler.ts        # Lógica principal tipo Lambda
│   ├─ service.ts        # CRUD de tareas
│   ├─ types.ts          # Tipos TS
│   ├─ handler.test.ts   # Tests con Vitest
│   ├─ server.ts         # Servidor Express
│   └─ utils/
│       └─ response.ts   # Respuestas estándar
```

---

## ⚙️ Instalación y ejecución local

```bash
git clone <url-del-repo>
cd lambda-todo
npm install
npm run build
npm start
```

Servidor local: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Tests

```bash
npm test
```

---

## 🔍 Ejemplos

### GET
```bash
curl http://localhost:3000/todos
```

### POST
```bash
curl -X POST https://lambda-todo-local.onrender.com/todos \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Mi nueva tarea"}'

{"id":"7f91a00a-0c6a-43cb-9ebc-10cfed60a57f","titulo":"Mi nueva tarea","completada":false}

```

---

## 📌 Notas

- Los datos se almacenan en memoria (comportamiento similar a una Lambda real).
- Para persistencia, podría integrarse DynamoDB o MongoDB.

---

## 👤 Autor

Proyecto desarrollado como parte de la Prueba Técnica – NXT Abogados (Parte 2)

**Christopher Eduardo Valdivia Baca – Lima, Perú**
