const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require("./routes.js");
const http = require("http").Server(app);
// const io = require("socket.io")(http);
const secret = process.argv[2];

app.use(router);

//missisng socket io section


app.use(router);
http.listen(process.env.PORT || 8080, ()=>{
    console.log('server listening on port')
});