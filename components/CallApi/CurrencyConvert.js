
 export function getHeader(more ={}){

    return {
   ...more,
      'Content-Type': 'application/json',
      
    }

  }

export function ConvertCurr (){
       
  return fetch('https://tygia.com/json.php?ran=0&rate=1&gold=0&bank=VIETCOM&date=now',{
    method: 'GET',
    headers: this.getHeader({"Token":"Hall"}),       
        
})
.then(async (response) => {
    var text =  await  response.text();
    text = text.replace("﻿"," ");
    return new Promise((reslove)=>{
        reslove(JSON.parse(text))
    }) 
  })
    
}
