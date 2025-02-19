<!-- How to set up -->
make the file .env outside in src
add this in .env file

PORT=5000
MONGO_URI=mongodb://localhost:27017/category_management
JWT_SECRET=Dgbbsff145FrhhsjQals
JWT_EXPIRES_IN=1d
NODE_ENV=test 


download this file as a zip and extract all.
open in visual studio this file.
you must have mongodb and docker setup in your system

<!-- run the project -->
write comand npm i if here coming error then write npm i --force
then npm run dev 
project will start 

<!-- for jest test -->
connect to mongodb
then write command npm jest

<!-- Sample API responses -->
open the postman, past url and click on body then click on raw

<!-- // Register api   -->
POST :  http://localhost:5000/api/auth/register
in body raw section write like this 

{
  "name": "safvantest",
  "email": "safvantest@example.com",
  "password": "123456"
}

you got response like this 
{
    "message": "User registered successfully",
    "user": {
        "id": "67b5f4291697e21628a2be0d",
        "name": "safvantest",
        "email": "safvantest@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjVmNDI5MTY5N2UyMTYyOGEyYmUwZCIsImlhdCI6MTczOTk3Nzc2OSwiZXhwIjoxNzQwMDY0MTY5fQ.GGq4N79a0ayKtTUsPDEOO76tDjV7UCQCIR6bDoZaOqI"
}

so here we got the token , copy this token and in postman go to authorization thne bearer token past this token on there
if you going to register with same its will come this message: "User already exists" 

<!-- // Login api   -->
POST : http://localhost:5000/api/auth/login
in body raw section write like this 

{
  "name": "safvantest",
  "email": "safvantest@example.com",
  "password": "123456"
}

you got response like this 
{
    "message": "Login successful",
    "user": {
        "id": "67b5f4291697e21628a2be0d",
        "name": "safvantest",
        "email": "safvantest@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjVmNDI5MTY5N2UyMTYyOGEyYmUwZCIsImlhdCI6MTczOTk3ODAyNywiZXhwIjoxNzQwMDY0NDI3fQ.sgkZ9T1Ru1sHdoUp9TAYxFAFJz7ZkfEK_DV2G3wj9ys"
}

<!-- Create Category api -->
POST : http://localhost:5000/api/category
in body raw section write like this 

{
  "name": "safvantest"
}

you got response like this 
{
    "name": "safvantest",
    "parent": null,
    "status": "active",
    "_id": "67b5f5b81697e21628a2be13",
}

<!-- Get All category api -->
GET : http://localhost:5000/api/category
just send this without any body 

you get response all in tree formate

<!-- category update -->
PUT : http://localhost:5000/api/category/65d51b2f9a9b312e9c123456(id from category _id)
in body json you write this 

{
  "status": "inactive"
}

so here will update that value

<!-- category delete -->
DELETE  : http://localhost:5000/api/category/65d51b2f9a9b312e9c123456(id from category _id)

direct send it will be deleted 

note : add,update,get,delete if you remove the token this crud will not work 

<!-- it's Dockerize  -->
we make Dockerfile file and followed by docker

.dockerignore file docker will ignore means unnecessary files will not copy in container

docker-compose.yml file for multi-container setup because we using MongoDB

if you have docker simply build here like this docker-compose up --build

run docker ps in there you got the container id then run docker logs (container id)

you get all thing in there 
