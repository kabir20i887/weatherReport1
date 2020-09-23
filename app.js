const express = require('express');
//to find the path
const geocoding = require('../weather/app')
const path = require('path')
const app = express()
const fileDir=__dirname;
//to find the path to edit
const port= process.env.PORT ||3000
const newPath= path.join(fileDir,'/templates')
const otherPath= path.join(fileDir,'/parcials')
const forecast = require('../weather/forecast')

const hbs = require('hbs')
console.log(otherPath)
//making a static file
app.use(express.static(newPath))

//using to use common
hbs.registerPartials(otherPath)


//setting the templates
app.set('view engine','hbs')
app.set('views',newPath)





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
