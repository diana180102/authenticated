
# Postable - RESTful API para Gestión de Posts
RESTful API for allow users register data por middle of  upload a file csv to USERS with role ADMIN.


## Tech Stack

**Lenguage:**  TypeScript.

**Server:** Node, Express, 

**Database:** PostgreSQL, 

**Authentication/Authorization:** JWT.

**Multer:** Allows management of upload Files

**Papaparse:** Allows convert files csv in JSON for his manipulation and transformation

**Migrates:**  Implementación con umzug.

**Arquitectura:** Tres capas (routers, servicios, acceso a datos). 

**Testing:** Vitest, Supertest



## Run Locally

Clonar  proyecto

```bash
  git clone https://github.com/codeableorg/postable-diana180102.git
```

Ir a directorio de proyecto

```bash
  cd postable-diana180102.git
```

# Install dependences

```bash
  npm install
```
Typescript
```bash
  npm install ts-node typescript @types/node --save-dev
  npm install typescript --save-dev 
  tsc --init  
```
Environment variables
```bash
  npm i dotenv
```
Node-posgress
```bash
  npm i pg
```
Node Express
```bash
  npm install express
  npm install -D @types/express@4.16.1
 
```

Bcrypt password encryption

```bash
   npm install bcrypt  
```

JWT Token
```bash
  npm install jsonwebtoken
  npm i @types/jsonwebtoken
```

Zod Schema
```bash
 npm i zod
```

Multer for upload of files
```bash
 npm i multer
```

Papaparse for parsear files csv
```bash
 npm install papaparse
```


Start Server

```bash
  npm run dev
```

Run migrations

```bash
  npm run db:create //Para crear solo BD
  npm run db:drop //Para borrar solo BD
  npm run db:migrate // Inyectar datos
  npm run db:reset // Para ejecutar todo

```



## Environment Variables

Para ejecutar este proyecto, deberá agregar las siguientes variables de entorno a su archivo .env

`PGHOST`  Host de la base de datos

`PGPORT`  Puerto de la base de datos

`PGUSER`  Usuario de la base de datos

`PGPASSWORD`  Password de la base de datos

`PGDATABASE`  Nombre de la base de datos

`PORT`  Puesto de servidor para ejecutar proyecto

`JWT_SECRET`  Clave secreta para la autenticación 






# API Reference

### Upload File CSV



```http
  POST /upload
```
This endpoint the uploading of files of type

**Type content :** multipart/form-data

| Parameter Query| Type     | Description                |
| :-------- | :------- | :------------------------- |
| `file` | `file` | **Requiere** File type CSV to upload |
| `API_KEY`      | `string` | **Requiere** API_KEY/TOKEN |



 ### Allow user Login.

```http
  POST /login
```
 **email, password:** Credenciales requeridas para el inicio de sesión..












## Running Tests

Para ejecutar pruebas, ejecute el siguiente comando

```bash
  npm run test
  npm run test -- --watch

```

Agregar en script ```package.json > scripts **NODE_ENV=test**``` 

```bash
 "test": " NODE_ENV=test vitest",
 "db:migrate": "NODE_ENV=test ts-node src/db/scripts/dbMigrate.ts",
 "db:create": " NODE_ENV=test ts-node src/db/scripts/dbCreate.ts",
 "db:drop": "  NODE_ENV=test ts-node src/db/scripts/dbDrop.ts && rm -f src/db/migrations/migrations.json",

```


## Authors

- [@diana180102](https://www.github.com/diana180102)

