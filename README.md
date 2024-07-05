
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
Cierre de session, en caso de querer a acceder a alguna funcionaldiad deberas volver a loguearte

```http
  DELETE /session/logout
```


- Authorization: Bearer <tu_token_de_autorización>


Se debera enviar el token proporcionado al loguearse, de esta forma se podra hacer uso de la funcionaldiad y se podra cerrar la session.


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
----
#### Edit Password:
Este endpoint te permite cambiar la contraseña en caso de que el usuario la desee cambiar.
Se debera proporcionar recibido al loguearse.

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
----
### Categorias

#### Get categorys :
Este endpoint permite obtener todas las categorias de un usario   en particular. 
Se debera estar logueado para acceder a esta funcionaldiad.


- Authorization: Bearer <tu_token_de_autorización>



```http
  GET /category/all
```

 ----
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

----

#### Get categorys :
Este endpoint permite obtener todas las categorias de un usario   en particular. 
Se debera estar logueado para acceder a esta funcionaldiad.


- Authorization: Bearer <tu_token_de_autorización>



```http
  GET /category/all
```

---
 #### Delete category:
Este endpoint te permite eliminar una  categoria  previamente creada asociada a un usuario.
Se debera proporcionar el token entregado al loguearse.

```http
  PUT /category/delete/:idCategory
```

- Authorization: Bearer <tu_token_de_autorización>


----
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
```json
{
"name": "products",
}
```
