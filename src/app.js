const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoLocation=require('./utils/geolocation')
const weatherInfo = require('./utils/forcast')

const port = process.env.PORT || 3000

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
        title: 'BBC Weather',
        name: 'Deep kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Deep kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Deep kumar'
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
        name: 'Deep kumar',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Deep kumar',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port+'.')
})