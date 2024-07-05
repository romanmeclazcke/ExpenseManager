
# Expense manager

Este proyecto consta de un gestor de gastos/ingresos, para que todos puedan organizar su vida economica.
Se podrian realizar distintas acciones que se veran a lo largo de la documentacion.
## EndPoints

### Session:

#### Login :
Loguearse en la apliacacion para poder hacer uso de todas las funcionalidades.
 
```http
  POST /session/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email  ` | `string` | **Required**. Your emails  |
| `password  ` | `string` | **Required**. Your password  |


#### Example : 

```json
{
  "username": "lautaro@gmail.com",
  "password": "lautaro123"
}
```

--------
#### Logout: 
Cierre de session, en caso de querer a acceder a alguna funcionalidad deberas volver a loguearte

```http
  DELETE /session/logout
```


- Authorization: Bearer <tu_token_de_autorización>


Se debera enviar el token proporcionado al loguearse, de esta forma se podra hacer uso de la funcionalidad y se podra cerrar la session.


----
### User

#### Create User:
Este endpoint permite crear un nuevo usuario.

```http
  POST /user/new
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email  ` | `string` | **Required**. User email  |
| `name  ` | `string` | **Required**. User name   |
| `lastname  ` | `string` | **Required**. User lastname  |
| `password  ` | `string` | **Required**. User password  |


#### Example : 
```json
{
"email": "lautaro@gmail.com",
"name": "Lautaro",
"lastname": "Perez",
"password": "LautaroPerez123"
}
```
---
#### Edit Password:
Este endpoint te permite cambiar la contraseña en caso de que el usuario la desee cambiar.

```http
  PATCH /user/editpassword
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `password  ` | `string` | **Required**. User password  |
| `newPassword  ` | `string` | **Required**. User new password   |
| `confirmNewPassword  ` | `string` | **Required**. confirm new password 

- Tanto la newPassword como confirmNewPassword, deberan ser identicas. Por otro lado, el password, debera tener el mismo valor con el que el usuario se registro.
#### Example : 
```json
{
"password": "LautaroPerez123",
"newPassword": "LautraoPerez1234?_",
"confirmNewPassword": "LautraoPerez1234?_",
}
```
---
### Categorias

#### Get categorys :
Este endpoint permite obtener todas las categorias de un usario   en particular. 
Se debera estar logueado para acceder a esta funcionalidad.


- Authorization: Bearer <tu_token_de_autorización>



```http
  GET /category/all
```
 ---
 #### Create category:
Este endpoint te permite crear una nueva categoria asociada a un usuario.
Se debera proporcionar el token entregado al loguearse.
```http
  POST /category/new
```

- Authorization: Bearer <tu_token_de_autorización>

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name  ` | `string` | **Required**. name of category  |


#### Example : 
```json
{
"name": "clothes",
}
```


---
 #### Delete category:
Este endpoint te permite eliminar una  categoria  previamente creada asociada a un usuario.
Se debera proporcionar el token entregado al loguearse.

```http
  PUT /category/delete/:idCategory
```

- Authorization: Bearer <tu_token_de_autorización>


---
 #### Edit category:
Este endpoint te permite editar una  categoria previamente creada.
Se debera proporcionar el token entregado al loguearse.

```http
  PATCH /category/edit/:idCategory
```

- Authorization: Bearer <tu_token_de_autorización>

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name  ` | `string` | **Required**. new name of category  |


#### Example : 
```http
  PATCH /category/edit/1
```

```json
{
"name": "clothes",
}
```


---
### Expense

#### Get expenses :
Este endpoint permite obtener todos los gastos de un usuario en particular.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.


- Authorization: Bearer <tu_token_de_autorización>



```http
  GET /expense/all
```

 ---
 #### Get expense by id:
Este endpoint te permite obtener un gasto en particular a partir de su id.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  GET /expense/:id
```

---
 #### Get summary expense :
Este endpoint te permite obtener la suma de los gastos por mes.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  GET /expense/summary
```

- Authorization: Bearer <tu_token_de_autorización>


---
 #### Get expense by category:
Este endpoint te permite obtener todos los gastos de un usuario pertenecientes a una categoria en particular.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  GET /expense/category/:idCategory
```

- Authorization: Bearer <tu_token_de_autorización>


---
 #### Create expense:
Este endpoint te permite crear un nuevo gasto.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  POST /expense/new
```

- Authorization: Bearer <tu_token_de_autorización>

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `price  ` | `Integer` | **Required**. Price of expense  |
| `date  ` | `Date` | **Required**. Date of expense  |
| `description  ` | `String` | **Required**. Description of expense  |
| `category  ` | `integer` | **Required**. id of category  |

#### Example : 
```json
{
"price": 1000,
"date": "10/10/2004",
"desciption": "T-shirt",
"category": "1",

}
```

---
 #### Delete expense:
Este endpoint te permite eliminar un gasto  previamente creado, el gasto debe pertenecer al usuario logueado
Se debera proporcionar el token entregado al loguearse.

```http
  PUT /expense/delete/:id
```

- Authorization: Bearer <tu_token_de_autorización>

---
 #### Edit expense:
Este endpoint te permite editar un nuevo gasto, previamente creado.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  PATCH /edit/:id
```

- Authorization: Bearer <tu_token_de_autorización>

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `price  ` | `Integer` | **Required**.  New price of expense  |
| `date  ` | `Date` | **Required**.  New date of expense  |
| `description  ` | `String` | **Required**.  New description of expense  |
| `category  ` | `integer` | **Required**. New id of category  |


#### Example : 

```http
  PATCH /edit/1
``` 
```json
{
"price": 3000,
"date": "10/10/2004",
"desciption": "T-shirt", 
"category": "2",

}
```
---
### Income

#### Get incomes :
Este endpoint permite obtener todos los ingresos de un usuario en particular.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.


- Authorization: Bearer <tu_token_de_autorización>



```http
  GET /income/all
```

 ---
 #### Get income by id:
Este endpoint te permite obtener un ingreso en particular a partir de su id.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  GET /income/:id
```
---
 #### Get summary income :
Este endpoint te permite obtener la suma de los ingresos por mes.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  GET /income/summary
```

- Authorization: Bearer <tu_token_de_autorización>


---
 #### Get income by category:
Este endpoint te permite obtener todos los ingresos de un usuario pertenecientes a una categoria en particular.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  GET /income/category/:idCategory
```

- Authorization: Bearer <tu_token_de_autorización>


---
 #### Create income:
Este endpoint te permite crear un nuevo ingreso.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  POST /income/new
```

- Authorization: Bearer <tu_token_de_autorización>

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `price  ` | `Integer` | **Required**. Income price  |
| `date  ` | `Date` | **Required**. Income date  |
| `description  ` | `String` | **Required**. Income description  |
| `category  ` | `integer` | **Required**. income category id  |

#### Example : 
```json
{
"price": 950,
"date": "10/10/2004",
"desciption": "clothing for sale",
"category": "1",

}
```

---
 #### Delete income:
Este endpoint te permite eliminar un ingreso  previamente creado, el gasto debe pertenecer al usuario logueado.
Se debera proporcionar el token entregado al loguearse.

```http
  PUT /income/delete/:id
```

- Authorization: Bearer <tu_token_de_autorización>

---
 #### Edit income:
Este endpoint te permite editar un ingreso, previamente creado.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  PATCH /income/edit/:id
```

- Authorization: Bearer <tu_token_de_autorización>

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `price  ` | `Integer` | **Required**.  New price of income  |
| `date  ` | `Date` | **Required**.  New date of income  |
| `description  ` | `String` | **Required**.  New description of income  |
| `category  ` | `integer` | **Required**. New id of income  |


#### Example : 

```http
  PATCH /income/edit/1
``` 
```json
{
"price": 3000,
"date": "10/10/2004",
"desciption": "T-shirt", 
"category": "2",

}
```


### Saving goals:

#### Get saving goals :
Este endpoint permite obtener todas las metas de ahorro del usario logeado.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.


- Authorization: Bearer <tu_token_de_autorización>



```http
  GET /goals/all
```

 ---
 #### Get saving goals by id:
Este endpoint te permite obtener una meta de ahorro en particular a partir de su id.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  GET /goals/:id
```


---
 #### Create saving goal:
Este endpoint te permite crear una nueva meta de ahorro.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  POST /goals/new
```

- Authorization: Bearer <tu_token_de_autorización>

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name  ` | `String` | **Required**. Goal name  |
| `endDate  ` | `Date` | **Required**. end date  |
| `ultimateGoal  ` | `Integer` | **Required**. final amount  |

#### Example : 
```json
{
"name": "Vacation",
"endDate": "1/12/2025",
"ultimateGoal":10000,
}
```

---
 #### Delete saving goal:
Este endpoint te permite eliminar una meta de ahorro, previamente creada, la meta debe pertenecer al usuario logueado.
Se debera proporcionar el token entregado al loguearse.

```http
  PUT /goals/delete/:id
```

- Authorization: Bearer <tu_token_de_autorización>

---
 #### Edit saving goal:
Este endpoint te permite editar una meta, previamente creado.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  PATCH goals/edit/:id
```

- Authorization: Bearer <tu_token_de_autorización>

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name  ` | `String` | **Required**. Goal name  |
| `endDate  ` | `Date` | **Required**. end date  |
| `ultimateGoal  ` | `Integer` | **Required**. final amount  |


#### Example : 

```http
  PATCH /edit/1
``` 
```json
{
"name": "Vacation",
"endDate": "10/12/2025",
"ultimateGoal": 23000, 
}
```

---
 #### Edit  current amount saving goal:
Este endpoint te permite editar el  monto actual de la meta previamente creada.
Se debera estar logueado y proporcionar el token para acceder a esta funcionalidad.

```http
  PATCH goals/edit/amountcurrent/:id
```

- Authorization: Bearer <tu_token_de_autorización>

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `amountCurrent  ` | `Integer` | **Required**. new currentAmount   |


#### Example : 

```http
  PATCH /edit/1
``` 
```json
{
"amountCurrent": 200,
}
```
