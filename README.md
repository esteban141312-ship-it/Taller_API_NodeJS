BiblioTech API

Integrantes:

Joan Esteban Buitrago,
Rey Sebastian Diaz,
Elder Jhonatan

Descripción:
API REST para la gestión de biblioteca.


Instalación
npm install

Variables de entorno
PORT= MONGO_URL= JWT_SECRET=

Ejecución
npm run dev


Endpoints principales
Auth
POST /api/auth/register POST /api/auth/login GET /api/auth/me

Authors
GET /api/authors POST /api/authors

Books
GET /api/books POST /api/books

Users
GET /api/users PATCH /api/users/:id/role

Loans
POST /api/loans GET /api/loans/me PATCH /api/loans/:id/return