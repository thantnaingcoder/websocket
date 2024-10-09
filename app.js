let express =require('express');
let app = express();
let path = require('path');
let cors = require('cors');
let bodyParser = require('body-parser');
let { PrismaClient } = require('@prisma/client');
let prisma = new PrismaClient();
let socket = require('socket.io');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let server = app.listen(3000, () => {
    console.log('server is running on port 3000');
});

//socket setup
let io = socket(server);

io.on('connection',  (socket) => {
        socket.on('chat', async (data) => {
             await prisma.message.create({
                data: { message: data },
              });
            io.sockets.emit('chat message', data);     //receive data and resent data to client (real time)
            // socket.broadcast.emit('chat message', data);        // resent expect of sender
           
        })
})

