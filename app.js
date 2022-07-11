const express = require('express')
const res = require('express/lib/response')
const path = require('path')

const app = express()
const htmldir = __dirname+'/public/html/'

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res)=>{
    res.sendFile(path.join(htmldir,'index.html'))
})
app.get('/inicio', (req, res)=>{
    res.sendFile(path.join(htmldir,'inicio.html'))
})

app.get('/buscar',(req, res)=>{
    res.sendFile(path.join(htmldir,'buscar.html'))
})

app.post('/buscar',(req, res)=>{
    res.render('index.ejs', {variable: "jose"})
    console.log(req.body.Estante)
})


app.use(express.static('public'))

app.listen(3000,()=>{
    console.log('Listen at port 3000')
})