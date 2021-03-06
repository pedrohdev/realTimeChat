const express = require('express')
const handlebars = require('express-handlebars')

const app = express()
const port = 3000
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})

app.use(express.static('public'))

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: './views/layouts',
    partialsDir: './views/partials'
}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('chat')
})

io.on('connection', socket => {
    socket.on('send', data => {
        io.emit('received', data)
    })
})

server.listen(process.env.PORT || port)
