const request = require('request')

const geoLocation = (place,callback)=>{
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(place)+ '.json?access_token=pk.eyJ1IjoibWFraW5nb3V0IiwiYSI6ImNqeHQ5MmxtNDAzY20zaHBmM3k5aGZweTMifQ.M5tACNbS7yVwA2r93-wWCg'
    request({url:geoUrl,json:true},(error,response)=>{
        if(error){
            callback("Cannot connect to Geolocation services",undefined)
        }else if(response.body.features.length===0){
            callback("Cannot find the place",undefined)
        }else{
            callback(undefined,{
                latitude :response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                placeName: response.body.features[0].place_name
        })}
    })
}




module.exports = geoLocation