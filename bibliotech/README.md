# BiblioTech API REST

API REST para administrar autores, libros, usuarios y préstamos de una biblioteca.

## Integrantes

- Agregar nombre y apellido de los integrantes.

## Instalación

1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Crear el archivo `.env` a partir de `.env.example`.
4. Escribir la conexión de MongoDB Atlas en `MONGO_URL` y una clave en `JWT_SECRET`.
5. Ejecutar `npm run dev`.

## Variables de entorno

```env
PORT=3000
MONGO_URL=conexion_de_mongodb_atlas
JWT_SECRET=clave_secreta_para_los_tokens
```

## Endpoints

| Método | Ruta | Acceso |
| --- | --- | --- |
| GET | /api/authors | Público |
| GET | /api/authors/:id | Público |
| POST | /api/authors | ADMIN |
| PUT | /api/authors/:id | ADMIN |
| DELETE | /api/authors/:id | ADMIN |
| GET | /api/books | Público |
| GET | /api/books/available | Público |
| GET | /api/books/:id | Público |
| POST | /api/books | ADMIN |
| PUT | /api/books/:id | ADMIN |
| DELETE | /api/books/:id | ADMIN |
| POST | /api/auth/register | Público |
| POST | /api/auth/login | Público |
| GET | /api/auth/me | Token |
| GET | /api/users | ADMIN |
| PATCH | /api/users/:id/role | ADMIN |
| POST | /api/loans | Token |
| GET | /api/loans/me | Token |
| PATCH | /api/loans/:id/return | Token |
| GET | /api/loans | ADMIN |
| GET | /api/loans/overdue | ADMIN |
