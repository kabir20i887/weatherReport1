
let input = document.querySelector('.inp')

document.querySelector('.weather').addEventListener('submit',(e)=>{
    e.preventDefault()


    let location = input.value
    let url =fetch(`/weather?place=${location}`)
   let elem= document.querySelector('.para')
if(location){
    let text='loading...'
elem.textContent=text
url.then(res=>{
res.json().then(data=>{
if(data.error){
    document.querySelector('.para').insertAdjacentHTML('beforeend',data.error)   
}else{
   elem.textContent=''
 text = ` From ${data.place} <br>The temperatue of today is: ${data.data}. <br>Right now ,the weather : ${data.weather}  `
elem.insertAdjacentHTML('beforeend',text)

}
     
    
 
})
})
    
}
})
