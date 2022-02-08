 console.log('client side server is running')
// fetch('http://localhost:3000/weather?address=bostoiin').then((response) => {
//     response.json().then((data) => {
//         if(data.error){
//                 console.log(data.error)
//         }
        
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
      
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message01 =document.querySelector('#message01')
const message02 = document.querySelector('#message02')


//message01.textContent = 'Loading....'
weatherform.addEventListener('submit',(e) =>{
    e.preventDefault()
  const location = search.value
    console.log(location)

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            message01.textContent = data.error
            message02.textContent = ''
                console.log(data.error)
        }
        
        else{
            message01.textContent = data.location
            message02.textContent = data.forecast
            console.log(data.location)
        }
      
    })
})

})