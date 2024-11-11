
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



## Deployment

URL where the API was deployed

```bash
https://authenticated.onrender.com
```


## Run Locally

Clone project

```bash
  git clone https://github.com/diana180102/authenticated.git
```

Go to directory

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

Add file in project -> .env

`PGHOST`  Host BD

`PGPORT`  Port BD

`PGUSER`  User BD

`PGPASSWORD`  Password BD

`PGDATABASE`  Name BD

`PORT`  Port server

`JWT_SECRET`  Key secret of authentication 






# API Reference

### Upload File CSV



```http
  POST /upload
```
This endpoint the uploading of files of type

**Type content :** multipart/form-data

| Parameter Query| Type     | Description                |
| :-------- | :------- | :------------------------- |
| `file` | `file` | **Required** File type CSV to upload |
| `API_KEY`      | `string` | **Required** API_KEY/TOKEN |



 ### Allow user Login.

```http
  POST /login
```
 **email, password:** Credentials required

```http
  POST /register
```
 **name, email, password, age:** Fields requireds












## Running Tests

Run for Testing

```bash
  npm run test
  npm run test -- --watch

```

Add in script ```package.json > scripts **NODE_ENV=test**``` 

```bash
 "test": " NODE_ENV=test vitest",
 "db:migrate": "NODE_ENV=test ts-node src/db/scripts/dbMigrate.ts",
 "db:create": " NODE_ENV=test ts-node src/db/scripts/dbCreate.ts",
 "db:drop": "  NODE_ENV=test ts-node src/db/scripts/dbDrop.ts && rm -f src/db/migrations/migrations.json",

```


## Authors

- [@diana180102](https://www.github.com/diana180102)

