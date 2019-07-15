console.log("JS LOADING")
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


const message_box_1 = document.querySelector('#box1')
const message_box_2 = document.querySelector('#box2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const place = search.value
    message_box_1.textContent='Fetching weather report...'
    message_box_2.textContent=''
    fetch('http://localhost:3000/weather?place='+place).then((res)=>{
        res.json().then((data)=>{
                if(data.error){
                    message_box_1.textContent=data.error
                }else{
                   console.log(data)
                   message_box_1.textContent=data.placeName
                   message_box_2.textContent=data.data
                }
            })
        })
    })