import express from 'express';

const app = express();

//use the envPORT or 3000 port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Runing on Port ${PORT} !`);
})
