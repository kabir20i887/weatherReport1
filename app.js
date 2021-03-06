const express = require('express');
const request = require('request')

//to find the path
const path = require('path')
const app = express()
const fileDir=__dirname;
//to find the path to edit
const port= process.env.PORT || 3000
const newPath= path.join(fileDir,'/templates')
const otherPath= path.join(fileDir,'/parcials')

const hbs = require('hbs')
console.log(otherPath)
//making a static file
app.use(express.static(newPath))

//using to use common
hbs.registerPartials(otherPath)


//setting the templates
app.set('view engine','hbs')
app.set('views',newPath)

const forecast = (location,callback)=>{
  const url = 'http://api.weatherstack.com/current?access_key=75c64c5add6c510efe40b099825a4a01&query='+location+'';
  request({url:url,json:true},(rej,res)=>{
      if(rej){
          callback('conection error please retry :(',undefined)
      }else if(res.body.error){
  callback('Please specify a valid location',undefined)
      }else{
         callback(undefined,{
           temperature:res.body.current.temperature,
        weather:res.body.current.weather_descriptions[0],
  
         })
         console.log(url)
  
      }
  })
  }

  const geocoding = (location,data)=>{
      const geocodingURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(location)+".json?access_token=pk.eyJ1Ijoia2FiaXI3IiwiYSI6ImNrZmM3M244MDFjeWYyc2xjMXQ5cG8xczAifQ.u_MdsPGQ0YVfyEKn9leuFA";
      request({url:geocodingURL,json:true},(rej,res)=>{
          if(rej){
              data('check your internet connection',undefined)
          }else if(res.body.error){
      data(res.body.error.info,undefined)
          }else{
              data(undefined,
                  {
                     latitude: res.body.features[0].center[1],
                     longitude:res.body.features[0].center[0],
                     location:res.body.features[0].place_name,
  
                  }
  
                     )
          }
      })
  }
  


app.get('',(req,res)=>{
   res.render('index')
})

//the weather for a location 
app.get('/weather',(req,res)=>{

if(req.query.place){
  geocoding(req.query.place,(error,data)=>{
 if(error){
   console.log('error')
 }else{
     forecast(req.query.place, (error1, data2) => {
if(error1){
  res.send({
          
  error:'please search a valid location'
  })
}else{
  res.send({
          
    place:data.location,
    data:data2.temperature,
    weather:data2.weather,
  
  })
}

     
     
       })
      }
      
 })

}else{
  res.send({
    error:'please provide a location'
  })

}

})
// about page
app.get('/about',(req,res)=>{
   res.render('about',{
     about:'about'

   })
 })
 app.get('/help',(req,res)=>{
  res.render('help')
    
 })
 app.get('/help/*',(req,res)=>{
   res.render('help')
     
  })
 app.get('*',(req,res)=>{
   res.render('error')
     
  })
app.listen(port,()=>{
    console.log(`here is it ${port}!`)
})
