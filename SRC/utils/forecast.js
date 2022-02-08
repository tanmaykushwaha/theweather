const request = require('postman-request')

forecast = (latitude,longitude,callback) => {
    url = 'http://api.weatherstack.com/current?access_key=5b29c0a4c666d56e4f6d655d62b79530&query='+longitude+','+latitude+''


request({url,json:true},(error,{ body }) => {
    if(error){
        callback('network error',undefined)
    }else if(body.error){
        callback('something went wrong',undefined)
    }else{
        callback(undefined,' its '+ body.current.weather_descriptions + ' It is currently ' + body.current.temperature + ' degress out. HUmidity will be around ' + body.current.humidity + ' ')
       
    }
})

}


module.exports = forecast
