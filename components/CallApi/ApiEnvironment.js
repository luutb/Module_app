const key = '3fad5db1-51ee-4f4d-a5bf-bc6797d0eb4b';


  export function getHeader(more ={}){

    return {
   ...more,
      'Content-Type': 'application/json',
      
    }

  }
  export function ApiTest (data){
       let query = this.makeParam(data);
       
    return fetch('http://api.airvisual.com/v2/nearest_city'+query,{
        method: 'GET',
        headers: this.getHeader({"Token":"Hall"}),       
              
    }).then((response) =>  response.json())
     
   
}

export function ApiChart (){
 
 return fetch('https://staging-website-api.airvisual.net/v1/stations/xwhjsLNx625vYS3cZ/measurements?units.temperature=celsius&units.distance=kilometer&AQI=US&language=en',{
     method: 'GET',
     headers: this.getHeader({"Token":"Hall"}),       
           
 }).then((response) =>  response.json())
  

}


    export function Test (){
       
        
    return fetch('https://tygia.com/json.php?ran=0&rate=1&gold=0&bank=VIETCOM&date=now',{
        method: 'GET',
        headers: this.getHeader({"Token":"Hall"}),       
            
    }).then((response) =>  response.text())
    
    }

   export function makeParam(parms){
      let query = "";
      for (var k in parms){
          if (query.length<1){
              query+= "?"+k+"="+parms[k];
          }
          else
          {
              query+="&"+k+"="+parms[k];
          }
      }
      return query;
}
    export function getCity(location){  
        
        return fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+location.lat+","+location.lon+"&key=AIzaSyBDQHOnkXBu5C_CVGOuQ9F8UN2y09m6RL8",{
            method: 'GET',
            headers: this.getHeader({"Token":"Hall"}),       
                
        }).then((response)=> response.json())
    }

