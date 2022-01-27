# Node.js Mongodb Authorization with Json Web Tokens Tutorial 

Tutorial by: bezkoder

https://www.bezkoder.com/node-js-mongodb-auth-jwt/


## Technology
Express 4.17.1
bcryptjs 2.4.3
jsonwebtoken 8.5.1
mongoose 5.9.1
MongoDB

## Steps

### Create Node.js App

### Setup Express web server

### Configure MongoDB database

### Define the Mongoose Model

### Initialize Mongoose

### Configure Auth Key

jsonwebtoken functions such as verify() or sign() use algorithm that needs a secret key (as String) to encode and decode token.

### Create Middleware functions

To verify a Signup action, we need 2 functions:
– check duplications for username and email
– check if roles in the request is legal or not

### Create Controllers

There are 2 main functions for Authentication:
- signup: create new User in database (role is user if not specifying role)
- signin:

find username of the request in database, if it exists
compare password with password in database using bcrypt, if it is correct
generate a token using jsonwebtoken
return user information & access Token

### Controller for testing Authorization

There are 4 functions:
– /api/test/all for public access
– /api/test/user for loggedin users (any role)
– /api/test/mod for moderator users
– /api/test/admin for admin users

### Define Routes

When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we need to determine how the server will response by setting up the routes.

We can separate our routes into 2 part: for Authentication and for Authorization (accessing protected resources).

Authentication:

POST /api/auth/signup
POST /api/auth/signin

Authorization:

GET /api/test/all
GET /api/test/user for loggedin users (user/moderator/admin)
GET /api/test/mod for moderator
GET /api/test/admin for admin


## Conclusion

Oh yeah! Today we've learned so many interesting things about Node.js MongoDB User Authentication with JWT (JSONWebToken) in just a Node.js Express Rest Api example. You also know way to implement role-based Authorization to restrict access to protected resources.