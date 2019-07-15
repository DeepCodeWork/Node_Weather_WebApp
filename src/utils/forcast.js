const request = require('request')
const chalk = require('chalk')

const forcast = (latitude,longitude,place_name,callback)=>{
    const darkSky = 'https://api.darksky.net/forecast/4c799e075a3cd1c759c093e125fdc408/'+latitude+','+longitude
    request({url:darkSky,json:true},(res_error,{body,error})=>{
        if(res_error){
            callback("Cannot connect to darksky services",undefined)
        }else if(error){
            callback("Cannot find this place",undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
       }
    })
}

module.exports=forcast;