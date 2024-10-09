   ------------------ client ------------

<script    //cdn link to header
      src="https://cdn.socket.io/4.7.5/socket.io.min.js"
      integrity="sha384-2huaZvOR9iDzHqslqwpR87isEmrfxqyWOF7hr7BY6KG0+hVKLoEXMPUJw3ynWuhO"
      crossorigin="anonymous"></script>

 <script>
      const socket = io("http://localhost:3000/");
     
       socket.emit("chat", input.value); //send data to server
      

   
      socket.on("chat message", function (msg) {   // receive data
                  console.log(msg)
      
      });
    </script>



-----------------server ------------------

 npm i socket.io

let express =require('express');
let app = express();
let socket = require('socket.io');

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
           
        })
})





