# Node.js Mongodb Authorization with Json Web Tokens (jwt)

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

# jwt Refresh Tokens

https://www.bezkoder.com/jwt-refresh-token-node-js-mongodb/

We’re gonna add Token Refresh to this Node.js & JWT Project.
The final result can be described with following requests/responses:

– Send /signin request, return response with refreshToken.
– Access resource successfully with accessToken.
– When the accessToken is expired, user cannot use it anymore.
– Send /refreshtoken request, return response with new accessToken.
– Access resource successfully with new accessToken.
– Send an expired Refresh Token.
– Send an inexistent Refresh Token.

## How to Expire JWT Token in Node.js

The Refresh Token has different value and expiration time to the Access Token.
Regularly we configure the expiration time of Refresh Token longer than Access Token’s

## Create Refresh Token Model

This Mongoose model has one-to-one relationship with User model. It contains expiryDate field which value is set by adding config.jwtRefreshExpiration value above.

There are 2 static methods:

createToken: use uuid library for creating a random token and save new object into MongoDB database
verifyExpiration: compare expiryDate with current Date time to check the expiration

## Node.js Express Rest API for JWT Refresh Token

Let’s update the payloads for our Rest APIs:
– Requests:

{ refreshToken }
– Responses:

Signin Response: { accessToken, refreshToken, id, username, email, roles }
Message Response: { message }
RefreshToken Response: { new accessToken, refreshToken }
In the Auth Controller, we:

update the method for /signin endpoint with Refresh Token
expose the POST API for creating new Access Token from received Refresh Token

In refreshToken() function:

Firstly, we get the Refresh Token from request data
Next, get the RefreshToken object {id, user, token, expiryDate} from raw Token using RefreshToken model static method
We verify the token (expired or not) basing on expiryDate field. If the Refresh Token was expired, remove it from MongoDB database and return message
Continue to use user _id field of RefreshToken object as parameter to generate new Access Token using jsonwebtoken library
Return { new accessToken, refreshToken } if everything is done
Or else, send error message


## Define Route for JWT Refresh Token API

Finally, we need to determine how the server with an endpoint will response by setting up the routes.

## Conclusion
Today we’ve learned JWT Refresh Token implementation in just a Node.js example using Express Rest Api and MongoDB. You also know how to expire the JWT Token and renew the Access Token.