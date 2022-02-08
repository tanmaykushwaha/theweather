const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// define path for express config
const publicdirectory = path.join(__dirname , '../public')
const viewpath = path.join(__dirname , '../templates/views' )
const partialspath = path.join(__dirname , '../templates/partials')

// Setup Handelbar engine and view location
app.set('views', viewpath )
app.set('view engine','hbs')
hbs.registerPartials(partialspath)
app.use(express.static(publicdirectory))


//setup static directory to serve
app.get('', (req, res) => {
    res.render('index',{
        title:'weather',
        name :'tanmay'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        about:'Tanmay',
        title:'About me'
        
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        help:'HELP PAGE',
        title:'Help'
        
    })
})
app.get('/weather',(req,res) => {
    console.log(req.query)
    if(!req.query.address){
return res.send({
    error : 'you must provide search term'
})
 }
    else{
        const address = req.query.address
        geocode(address,(error,{latitude , longitude , location } = {}) => {
            if (error){
                 return res.send(error)
            }
            forecast(latitude,longitude, (error, forecastdata) => {
                if (error){
                    return res.send(error)
                        }else{
                            res.send({
                                forecast : forecastdata,location,
                                location : location,
                                address: req.query.address
                            })
                        }
                     
                        
              })
        
        })
    }
})

app.get('/help/*',(req,res) => {

    res.render('notfound',{
        error:'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('notfound',{
        error:'Page Not Found'
    })
})

app.listen(3000,() =>{
    console.log('express is running on 3000')
})