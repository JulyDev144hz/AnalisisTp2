const mysql = require('mysql')

class database{
    constructor(){
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
        })
    }

    connect(){
        this.connection.connect((err)=>{
            if (err) throw err;
            console.log('Connected')
        })
    }

    query(query){
        return new Promise((resolve, reject)=>{
            this.connection.query(query, (err, rows, fields)=>{
                if (!err){
                    resolve(rows);
                }else{
                    resolve(1);
                }
            })
        })
        
    }

}
const db = new database()
db.connect()
//db.query('select * from deposito').then((datos)=> console.log(datos))
db.query(`create database if not exists depositos`)
db.query(`use depositos`)
db.query(`
    create table if not exists deposito(
        estante int(2),
        fila int(1),
        columna int(1),
        producto varchar(40),
        cantidad int(8)
    )`
)

const express = require('express')
const body_parser= require('body-parser')
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
    res.render('buscar.ejs', {title : "Buscar:", exito : 3})
})

app.get('/ingresar',(req, res)=>{
    res.render('buscar.ejs', {title : "Ingreso:", exito: 3})
})


app.post('/ingresar',(req, res)=>{
    //console.log(`${req.body.estante},${req.body.fila}, ${req.body.columna},${req.body.producto},${req.body.cantidad}`)
    //res.render('buscar.ejs',{title:"Ingreso:", exito: 2})
    db.query(`insert into deposito(estante, fila, columna, producto, cantidad) values(${req.body.estante},${req.body.fila}, ${req.body.columna},"${req.body.producto}",${req.body.cantidad}) `).then((err)=>{
        
        if (err === 1){
            res.render('buscar.ejs',{title:"Ingreso:", exito: 2})

        }else{
            res.render('buscar.ejs',{title:"Ingreso:", exito: 1})
        }
    })
    
        
    
})

app.post('/buscar',(req, res)=>{
    db.query(`select * from deposito where estante = ${req.body.estante} and fila = ${req.body.fila} and columna = ${req.body.columna} `).then((row)=>{
        if (row[0]){
            let contenido = row[0].producto
            let cantidad = row[0].cantidad
            res.render('pallets.ejs', {
                pos: [req.body.estante, req.body.fila, req.body.columna],
                contenido : contenido,
                cantidad : cantidad,
                vacio : true
            })
        }else{
            res.render('pallets.ejs', {
                pos: [req.body.estante, req.body.fila, req.body.columna],
                vacio : false
            })
        }
        
    })


    
    //console.log(req.body)
})


app.use(express.static('public'))

app.listen(3000,()=>{
    console.log('Listen at port 3000')
})