const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoLocation=require('./utils/geolocation')
const weatherInfo = require('./utils/forcast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kylie Jenner'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kylie Jenner'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Kylie Jenner'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.place)
        return res.send({ 
            error:'Provide a valid name of the place'
        })
        geoLocation(req.query.place,(error,data)=>{
            if(error){
                res.send({
                error:error
                })
            }
            else{
                weatherInfo(data.latitude,data.longitude,data.placeName,(error,forcastData)=>{
                    //console.log("The place is "+placeName)
                    if(error){
                        res.send({
                            error:error
                        })
                    }
                    else{
                        res.send({
                            data:forcastData,
                            placeName:data.placeName
                        })
                }})
        }
        })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kylie Jenner',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kylie Jenner',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})