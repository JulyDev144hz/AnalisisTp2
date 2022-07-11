const express = require('express')
const res = require('express/lib/response')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')



app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'public/html/index.html'))
})
app.get('/inicio', (req, res)=>{
    res.sendFile(path.join(__dirname,'public/html/inicio.html'))
})

app.get('/prueba',(req, res)=>{
    res.render('index.ejs', {variable: "jose"})
})


app.use(express.static('public'))

app.listen(3000,()=>{
    console.log('Listen at port 3000')
})