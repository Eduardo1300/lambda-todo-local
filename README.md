# Lambda ToDo API (Simulación Local)

Este proyecto es una **simulación local** de un endpoint AWS Lambda para gestionar tareas (to-do items). Permite crear y consultar tareas usando TypeScript, sin necesidad de AWS.

## Funcionalidades

- **GET**: Devuelve todas las tareas almacenadas en memoria.
- **POST**: Crea una nueva tarea. Requiere enviar el campo `titulo`.
- **IDs únicos**: Cada tarea recibe un id generado automáticamente con `uuid`.
- **Persistencia temporal**: Las tareas se guardan en memoria mientras la app está corriendo (simulación de base de datos).
- **Validación robusta**: Validación de título con longitud mínima (3) y máxima (100) caracteres.
- **Manejo de errores**: Códigos HTTP correctos y mensajes de error descriptivos.
- **Tests unitarios**: Suite de 10 tests con Vitest para garantizar calidad.

## Tecnologías usadas

- TypeScript
- Node.js
- Express.js (servidor HTTP)
- [uuid](https://www.npmjs.com/package/uuid) (para generar IDs)
- [Vitest](https://vitest.dev/) (testing)
- Estructura modular profesional para simular Lambda de AWS

## Estructura del proyecto

```text
lambda-todo/
├─ src/
│   ├─ handler.ts           # Función simulada tipo Lambda
│   ├─ service.ts           # Lógica de negocio (CRUD de tareas)
│   ├─ types.ts             # Tipos TypeScript
│   ├─ handler.test.ts      # Tests unitarios con Vitest
│   ├─ server.ts            # Servidor Express
│   ├─ local-test.ts        # Simulación local de GET/POST
│   └─ utils/
│       └─ response.ts      # Utilidades de respuesta estándar Lambda
├─ package.json             # Dependencias y scripts
├─ tsconfig.json            # Configuración de TypeScript
└─ README.md                # Este archivo
```

## Instalación y ejecución

1. **Clona el repositorio:**
	```bash
	git clone <url-del-repo>
	cd lambda-todo
	```

2. **Instala dependencias:**
	```bash
	npm install
	```

3. **Compila TypeScript a JavaScript:**
	```bash
	npm run build
	```

4. **Ejecuta los tests:**
	```bash
	npm test
	```

5. **Ejecuta el servidor local:**
	```bash
	npm start
	```

   Deberías ver en consola:
	```text
	Servidor escuchando en puerto 3000
	```

## Cómo probar con curl

**Obtener todas las tareas:**
```bash
curl https://lambda-todo-local.onrender.com/todos
```

**Crear una nueva tarea:**
```bash
curl -X POST https://lambda-todo-local.onrender.com/todos \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Mi nueva tarea"}'
```

**Validación en acción:**
```bash
# Falla: título muy corto
curl -X POST https://lambda-todo-local.onrender.com/todos \
  -H "Content-Type: application/json" \
  -d '{"titulo": "ab"}'

# Falla: título vacío
curl -X POST https://lambda-todo-local.onrender.com/todos \
  -H "Content-Type: application/json" \
  -d '{"titulo": "   "}'

# Éxito: título válido
curl -X POST https://lambda-todo-local.onrender.com/todos \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Aprender AWS Lambda"}'
```

## Mejoras implementadas

### ✅ Validación robusta del POST
- Título debe ser string (no números ni otros tipos)
- Longitud mínima: 3 caracteres
- Longitud máxima: 100 caracteres
- No permite títulos vacíos o solo espacios en blanco
- Trim automático de espacios

### ✅ Arquitectura profesional
- **handler.ts**: Lógica principal tipo Lambda
- **service.ts**: Lógica de negocio separada (CRUD)
- **utils/response.ts**: Helpers para respuestas HTTP estándar
- **server.ts**: Servidor Express que expone la API

### ✅ Testing completo
- 10 tests unitarios con Vitest
- Cubre validación, errores y casos de éxito
- Ejecuta con `npm test`

## Notas

- Este proyecto simula una función Lambda de AWS con arquitectura profesional.
- Para producción real, se podría desplegar en AWS Lambda y conectar con DynamoDB.
- Cumple con estándares de calidad: validación, tests, estructura modular y códigos HTTP correctos.

## Créditos

Proyecto desarrollado como parte de la prueba técnica de NXT Legaltech.

Inspirado en el ejemplo de AWS Lambda para gestión de tareas.

---

## Despliegue

El proyecto está desplegado en Render:
- **URL**: https://lambda-todo-local.onrender.com/
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 💬 Nota final

Proyecto realizado como simulación profesional de una función AWS Lambda con arquitectura modular, validación robusta y tests.
No requiere conexión a AWS. Se ejecuta completamente de forma local y está listo para producción.