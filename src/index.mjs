import express from 'express';

const app = express();

app.use(express.json())

//use the envPORT or 3000 port
const PORT = process.env.PORT || 3000;

const mockUsers = [
    { id:1, username: "Ema", displayName: "Ema322"},
    { id:2, username: "Carlos", displayName: "Carlos2"},
    { id:3, username: "Carmen", displayName: "Carmencha"},
    { id:4, username: "Antonio", displayName: "Tono"},
    { id:5, username: "Zara", displayName: "Zarita"},
    { id:6, username: "Bernardo", displayName: "Beni"},
    { id:7, username: "Emani", displayName: "Emita"},
];

app.get("/", (request, response) => {
    response.status(201).send({ msg: "Hello"});
});

//request
app.get('/api/users', (request, response) => {
    console.log(request.query);
    const { query: {filter, value},} = request;
    if (filter && value) return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
    );
    return response.send(mockUsers);
});  

//POST
app.post('/api/users', (request, response) => {
    console.log(request.body)
    const { body } = request;
    const newUser = { id: mockUsers[mockUsers.length -1].id + 1, ...body};
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
})

app.get('/api/users/:id', (request, response) => {
    console.log(request.params); 
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if (isNaN(parsedId)) 
        return response.status(400).send({msg: "Bad Request, Invalid ID"});
    const findUser = mockUsers.find((user) => user.id === parsedId);
    if (!findUser) return response.sendStatus(404);
    return response.send(findUser);
});

app.get('/api/products', (request, response) => {
    response.send([{id: 23, productName: "Mouse", prize: 33}]);
});


app.get('/api/test', (request, response) => {
});

//put method
app.put('/api/users/:id', (request, response) => {
    const { body, params: {id}} = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return response.sendStatus(404);
    mockUsers[findUserIndex] = {id: parsedId, ...body  };
    return response.sendStatus(200);
});

//patch method
app.patch('/api/users/:id', (request, response) => {
    const { body, params: {id}} = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return response.sendStatus(404);
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body};
    return response.sendStatus(200);
});

//delete
app.delete('/api/users/:id', (request, response) => {
  const {
     params: { id },  
    } = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return response.sendStatus(404);
    mockUsers.splice(findUserIndex, 1);
    return response.sendStatus(200);
});



app.listen(PORT, () => {
    console.log(`Runing on Port ${PORT} !`);
});
