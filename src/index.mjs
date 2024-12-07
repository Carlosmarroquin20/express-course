import express, { request, response } from 'express';

const app = express();

//use the envPORT or 3000 port
const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.status(201).send({ msg: "Hello"});
});

//request
app.get('/api/users', (request, response) => {
    response.send([
        { id:1, username: "Ema", displayName: "Ema322"},
        { id:2, username: "Carlos", displayName: "Carlos2"},
        { id:3, username: "Carmen", displayName: "Carmencha"}]);
});

app.get('/api/products', (request, response) => {
    response.send([{id: 23, productName: "Mouse", prize: 33}]);
})

app.get('/api/test', (request, response) => {

});


app.listen(PORT, () => {
    console.log(`Runing on Port ${PORT} !`);
});
