import express, { request, response } from "express";
import { query, validationResult, body } from "express-validator";

const app = express();

app.use(express.json());

const logginMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

//use the envPORT or 3000 port
const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "Ema", displayName: "Ema322" },
  { id: 2, username: "Carlos", displayName: "Carlos2" },
  { id: 3, username: "Carmen", displayName: "Carmencha" },
  { id: 4, username: "Antonio", displayName: "Tono" },
  { id: 5, username: "Zara", displayName: "Zarita" },
  { id: 6, username: "Bernardo", displayName: "Beni" },
  { id: 7, username: "Emani", displayName: "Emita" },
];

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello" });
});

//request
app.get(
    "/api/users", 
    query('filter')
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10})
    .withMessage('Must be al least 3-10 characters'),
    (request, response) => {
        const result = validationResult(request);
        console.log(result);
  const {
    query: { filter, value },
  } = request;
  if (filter && value)
    return response.send(
      mockUsers.filter((user) => user[filter].includes(value))
    );
  return response.send(mockUsers);
});


//Middleware
app.use(logginMiddleware, (request, response, next) =>{
    console.log("Finished Logging...");
    next();
});


const resolvewIndexByUserId = (request, response, next) => {
    const {
        params: { id },
      } = request;
      const parsedId = parseInt(id);
      if (isNaN(parsedId)) return response.sendStatus(400);
      const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
      if (findUserIndex === -1) return response.sendStatus(404);
      request.findUserIndex = findUserIndex;
      next();
};

//POST
app.post("/api/users",body(), (request, response) => {
  console.log(request.body);
  const { body } = request;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return response.status(201).send(newUser);
});

app.get("/api/users/:id",resolvewIndexByUserId, (request, response) => {
    const {findUserIndex} = request;
    const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

app.get("/api/products", (request, response) => {
  response.send([{ id: 23, productName: "Mouse", prize: 33 }]);
});

app.get("/api/test", (request, response) => {});

//put method
app.put("/api/users/:id",resolvewIndexByUserId, (request, response) => {
  const {body, findUserIndex} = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

//patch method
app.patch("/api/users/:id",resolvewIndexByUserId, (request, response) => {
  const {body, findUserIndex} = request;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

//delete
app.delete("/api/users/:id",resolvewIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Runing on Port ${PORT} !`);
});
