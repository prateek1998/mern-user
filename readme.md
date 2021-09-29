
  
# Mern  User Module Docs 
In this documentation, I will explain you how to setup the frontend server and backend server and how to use this rest api in more convient way.
## [](https://github.com/prateek1998/mern-user#installation)Installation

### [](https://github.com/prateek1998/event-workshop-backend#install-via-npm)Install via NPM

## Frontend
```shell
cd frontend && npm install
npm start
```
Now your service is running on '[http://localhost:3000](http://localhost:3000/)'.
## Backend 
```shell
cd backend && npm install
```
**To run Development  environment**
```shell
npm run dev
```
**To run Production environment**

```shell
npm run start
```
Now your service is running on '[http://localhost:5000](http://localhost:5000/)'.

## Project Directory Structure

```
├── backend
│	└── config
│	│	└── index.js
│	├── controllers
│	│	└── users.controller.js
│	├── helpers
│		└── index.js
│	├── models
│	│	└── User.model.js
│	├── postman-api-docs
│	│	└── mern-user-directory-module.postman_collection.json
│	├── routes
│	│	└── index.js
│	│	└── user.routes.js
│	├── .env.prod
│	├── .gitignore
│	├── index.js
│	├── package-lock.json
│	├── package.json
├── frontend(react folder structure)
└── readme.md
```
## Changing the Port No
open config folder where you will find  the index.js file then simply change the port no.
```javascript
PORT: process.env.PORT || 5000
```
## Changing the Database Url
open config folder where you will find  the index.js file then simply change the port no.
```javascript
uri: process.env.NODE_ENV ||mongodb://localhost/merndev
```

## JSON Objects returned by API:

Make sure the right content type like  `Content-Type: application/json; charset=utf-8`  is correctly returned.
## Endpoints:

### Create Event

`POST /api/user/data`

Example request body:
```
{
	"name":"prateek saini",
	"email":"demo@mail.com",
	"phone":7011152170
}
```
Required fields:  `name`,  `email`, `phone`.

Example response body:
```
{	
	"success": 1,
	message": "User added successfully",
	"data": {
		"id": "6154c93fa7ecf3815a58e8e9",
		"name": "prateek saini",
		"phone": 7011152170
	}
}
```
### Get User By ID

`GET //api/user/data/:id`

Example response body:
```
{	
	"status": 1,
	"data":{
		"_id": "6154c93fa7ecf3815a58e8e9",
		"name": "prateek saini",
		"email": "demo@mail.com",
		"phone": 7011152170,
		"joined_date": "2021-09-29T20:14:55.192Z",
		"updated_at": "2021-09-29T20:14:55.196Z",
	}
}
```
### Fetching All Events

`GET /api/user/datas`

Example response body:
```
{
	"status": 1,
	"total records": 2,
	"data":{
		{	
			"_id": "6154c93fa7ecf3815a58e8e9",
			"name": "prateek saini",
			"email": "demo@mail.com",
			"phone": 7011152170,
			"joined_date": "2021-09-29T20:14:55.192Z",
			"updated_at": "2021-09-29T20:14:55.196Z",
		},
		{
			"_id": "6154c93fa7ecf3815a58e8e9",
			"name": "prateek saini",
			"email": "demo@mail.com",
			"phone": 7011152170,
			"joined_date": "2021-09-29T20:14:55.192Z",
			"updated_at": "2021-09-29T20:14:55.196Z",
		}
	}
}
```

### Update User Details

`PUT /api/user/data`

Example request body:
```
{
	"id": "6153631845c217234a29add9",
	"name": "Prateek Demo",
}
```
Required fields:  `id`.

Example response body:
```
{	
	"success": 1,
	message": "User updated successfully",
	"data": {
		"id": "6154c93fa7ecf3815a58e8e9",
		"name": "Prateek Demo",
		"phone": 7011152170
	}
}
```
### Delete User by Id

`DELETE //api/user/data/:id`

Example request body:
```
{
	"id": "6021250578846f0664647dc1",
}
```
Required fields:  `id`.

Example response body:
```
{	
	"success": 1,
	message": "User deleted successfully",
	"data": {
		"_id": "6154c93fa7ecf3815a58e8e9",
		"name": "prateek saini",
		"email": "demo@mail.com",
		"phone": 7011152170,
		"joined_date": "2021-09-29T20:14:55.192Z",
		"updated_at": "2021-09-29T20:14:55.196Z",
	}
}
```
### Delete All Event

`DELETE //api/user/datas`

Example response body:
```
{
	"status": 1,
	"message": "All Users Successfully Deleted "
}
```

## Test API 
To test this Api, there is a folder named postman where you get the postman collection json file. You can simply import this Json file in your postman application and easily test the apis.