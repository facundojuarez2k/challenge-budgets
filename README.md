# QuickBudget
## Descripción
_Esta aplicación conforma la solución al challenge propuesto por [Alkemy.org](https://alkemy.org) para la aceleración de Node.js + React (Enero 2022)._

## Requisitos
- Node.js 16+

## Instrucciones para ejecución local
1. Clonar el repositorio
2. Instalar dependencias:
   - API:
     ```
     cd challenge-budgets/api
     npm install
     ```
   - Cliente:
     ```
     cd challenge-budgets/client 
     npm install
     ```
3. Configurar variables de entorno:

   - Crear archivo _.env_ en el directorio _challenge-budgets/api_ e insertar las lineas:
     ```
     TOKEN_KEY=SECRET_KEY
     TOKEN_EXPIRATION_TIME=45m
     ```
     Reemplazar _SECRET_KEY_ por cualquier cadena de caracteres
4. (Opcional) Configurar una base de datos diferente a sqlite:
   - Modificar el archivo _challenge-budgets/api/config/config.json_ ([Referencia](https://sequelize.org/master/manual/migrations.html#configuration))
   - Aplicar migraciones:
     ```
     cd challenge-budgets/api
     npx sequelize-cli db:migrate
     ```
5. Iniciar servidores de prueba:
   - API:
     ```
     cd challenge-budgets/api
     npm start
     ```
   - Cliente:
     ```
     cd challenge-budgets/client
     npm start
     ```
6. Acceder a la página: _http://localhost:3000_

Por defecto, la API utiliza el puerto **8000** y el cliente el puerto **3000**

## API Endpoints:

<table>
  <thead>
    <tr>
      <th>URL</th>
      <th>Método HTTP</th>
      <th>Requiere autenticación</th>
      <th>Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>v1/auth/token</td>
      <td>POST</td>
      <td>No</td>
      <td>Recibe las credenciales del usuario y retorna un token JWT</td>
    </tr>
    <tr>
      <td>v1/auth/token/test</td>
      <td>GET</td>
      <td>No</td>
      <td>Verifica la validez del token en el encabezado</td>
    </tr>
    <tr>
      <td>v1/users</td>
      <td>POST</td>
      <td>No</td>
      <td>Crea un usuario nuevo</td>
    </tr>
    <tr>
      <td>v1/categories</td>
      <td>GET</td>
      <td>Si</td>
      <td>Lista todas las categorías</td>
    </tr>
    <tr>
      <td>v1/categories</td>
      <td>POST</td>
      <td>Si</td>
      <td>Crea una nueva categoría</td>
    </tr>
    <tr>
      <td>v1/operations</td>
      <td>GET</td>
      <td>Si</td>
      <td>Lista todas las operaciones del usuario</td>
    </tr>
    <tr>
      <td>v1/operations</td>
      <td>POST</td>
      <td>Si</td>
      <td>Crea una nueva operación asociada al usuario</td>
    </tr>
    <tr>
      <td>v1/operations/{id}</td>
      <td>GET</td>
      <td>Si</td>
      <td>Retorna la operación con id {id}</td>
    </tr>
    <tr>
      <td>v1/operations/{id}</td>
      <td>PUT</td>
      <td>Si</td>
      <td>Modifica la operación con id {id}</td>
    </tr>
    <tr>
      <td>v1/operations/{id}</td>
      <td>DELETE</td>
      <td>Si</td>
      <td>Elimina la operacion con id {id}</td>
    </tr>
    <tr>
      <td>v1/operations/balance</td>
      <td>GET</td>
      <td>Si</td>
      <td>Retorna la suma de todas las operaciones asociadas al usuario</td>
    </tr>
  </tbody>

</table>

Tanto las solicitudes como las respuestas utilizan el formato JSON

Para acceder a las rutas protegidas, es necesario establecer el encabezado 'Authorization' en la solicitud:
```
Authorization: Bearer <TOKEN>
```
donde TOKEN corresponde al token JWT devuelto por los endpoints de autenticación (_/v1/auth/token_ y _/v1/users_).

### v1/auth/token [POST]
###### Cuerpo de la solicitud:
```
{
  "email": "EMAIL_USUARIO",
  "password": "CONTRASEÑA"
}
```
###### Respuesta:
```
{
  "usedId": ...,
  "token": ...,
  "expiration": ...   // Unix timestamp representando la fecha de expiración del token
}
```

### v1/auth/token/test [GET]
Retorna código de estado 200 si el header 'Authorization' contiene un token válido.

### v1/users [POST]
###### Cuerpo de la solicitud:
```
{
  "email": "EMAIL_USUARIO",
  "password": "CONTRASEÑA"
}
```
###### Respuesta:
```
{
  "token": ...
  "expiration": ...   // Unix timestamp representando la fecha de expiración del token
}
```

### v1/categories [GET]
###### Respuesta:
```
[
  {
    "name": "..."
  },
  ...
]
```

### v1/categories [POST]
###### Cuerpo de la solicitud:
```
{
    "name": "NOMBRE_CATEGORIA"
}
```
###### Respuesta:
```
{
    "name": "NOMBRE_CATEGORIA"
}
```

### v1/operations [GET]

La URL acepta los parámetros (query params):
- **limit**: Valor entero que fija el numero máximo de operaciones a incluir en la respuesta
- **type**: Filtra por tipo de operacion. Valores posibles: IN, OUT
- **category**: Filtra por categoría
- **sortBy**: Ordena los resultados según la columna especificada. Valores posibles: concept, amount, type, date, categoryName
- **sortOrder**: Define el orden de los resultados: ascendente (ASC) o descendente (DESC). Por defecto utiliza DESC
- **search**: Retorna los resultados tales que los valores de las columnas _concept_ o _categoryName_ coinciden con el valor del parámetro

Por ejemplo: `/v1/operations?limit=15&sortBy=type`

###### Respuesta:
```
[
  {
    "id": 1,
    "concept": "",
    "amount": "",
    "type": "",
    "date": "",
    "categoryName": "",
    "updatedAt": "",
    "createdAt": ""
  },
  ....
]
```

### v1/operations [POST]
###### Cuerpo de la solicitud:
```
{
    "amount": 2000.99,            // Formatos aceptados: xxxxx.yy, xxxxx.y, xxxxx
    "concept": "CONCEPTO..",      // Concepto de la operación
    "categoryName": "CATEGORIA",  // Nombre de la categoría
    "date": "2022-01-24",         // Fecha en formato YYYY-MM-DD
    "type": "IN"                  // Tipo de operación: IN: Ingreso, OUT: Egreso
}
```
###### Respuesta:
```
{
    "id": 2,
    "concept": "CONCEPTO..",
    "amount": "2000.99",
    "type": "IN",
    "date": "2022-01-24",
    "categoryName": "CATEGORIA",
    "updatedAt": "2022-01-24T23:15:03.022Z",
    "createdAt": "2022-01-24T23:15:03.022Z"
}
```

### v1/operations/{id} [GET]

###### Respuesta:
```
{
  "id": 1,
  "concept": "",
  "amount": "",
  "type": "",
  "date": "",
  "categoryName": "",
  "updatedAt": "",
  "createdAt": ""
}
```

### v1/operations/{id} [PUT]
###### Cuerpo de la solicitud:
```
{
    "amount": 2000.99,            // Formatos aceptados: xxxxx.yy, xxxxx.y, xxxxx
    "concept": "CONCEPTO..",      // Concepto de la operación
    "categoryName": "CATEGORIA",  // Nombre de la categoría
    "date": "2022-01-24",         // Fecha en formato YYYY-MM-DD
}
```
###### Respuesta:
```
{
  "id": 1,
  "concept": "",
  "amount": "",
  "type": "",
  "date": "",
  "categoryName": "",
  "updatedAt": "",
  "createdAt": ""
}
```

### v1/operations/{id} [DELETE]
Retorna código de estado 204 al eliminar la operación.

### v1/operations/balance [GET]
###### Respuesta:
```
{
    "total": 2500,      // Ingresos - Egresos
    "in": 3000,         // Ingresos
    "out": 500          // Egresos
}
```

### Formato de respuesta de error
```
{
    "code": "",
    "message": ""
}
```

<table>
  <thead>
    <tr>
      <th>code</th>
      <th>Significado</th>
      <th>Código de estado HTTP</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AUTH001</td>
      <td>El token de autorización es inválido o ha expirado</td>
      <td>401</td>
    </tr>
    <tr>
      <td>AUTH002</td>
      <td>El usuario asociado al token existe</td>
       <td>401</td>
    </tr>
    <tr>
      <td>AUTH003</td>
      <td>Las credenciales provistas son inválidas</td>
       <td>400</td>
    </tr>
    <tr>
      <td>ERRVAL001</td>
      <td>Los datos en el cuerpo de la solicitud no son válidos. <b>Añade el campo 'errors' al cuerpo de la respuesta</b></td>
       <td>422</td>
    </tr>
    <tr>
      <td>ACC001</td>
      <td>El usuario intenta acceder a un recurso sobre el cual no tiene autorización</td>
       <td>403</td>
    </tr>
    <tr>
      <td>RSRC001</td>
      <td>El recurso no existe</td>
       <td>404</td>
    </tr>
    <tr>
      <td>RSRC002</td>
      <td>El recurso ya existe en el sistema.</td>
       <td>409</td>
    </tr>
  </tbody>
</table>
