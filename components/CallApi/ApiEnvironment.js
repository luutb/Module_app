const key = '3fad5db1-51ee-4f4d-a5bf-bc6797d0eb4b';


  export function getHeader(more ={}){

    return {
   ...more,
      'Content-Type': 'application/json',
      
    }

  }
  export function ApiTest (data){
       let query = this.makeParam(data);
       console.log('vi tri', query)
     
       
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
    export function getRank(){
        
        return fetch("https://website-api.airvisual.com/v1/countries/rankings?perPage=100&page=1&display=full&units.temperature=celsius&units.distance=kilometer&AQI=US&language=en",{
            method: 'GET',
            headers: this.getHeader({"Token":"Hall"}),       
                
        }).then((response)=> response.json())
    }


   // http://api.airvisual.com/v2/states?country={}&key=fad5db1-51ee-4f4d-a5bf-bc6797d0eb4b
   export function getRankCity(country){
    return fetch("http://api.airvisual.com/v2/states?country="+country+"&key=3fad5db1-51ee-4f4d-a5bf-bc6797d0eb4b",{
        method: 'GET',
        headers: this.getHeader({"Token":"Hall"}),       
            
    }).then((response)=> response.json())
   }
  // http://api.airvisual.com/v2/cities?state=Chiang%20Mai&country=Thailand&key=3fad5db1-51ee-4f4d-a5bf-bc6797d0eb4b

  export function getDataCity(value){
      console.log(value)
    return fetch("http://api.airvisual.com/v2/cities?state="+value.state+"&country="+value.country+"&key=3fad5db1-51ee-4f4d-a5bf-bc6797d0eb4b",{
        method: 'GET',
        headers: this.getHeader({"Token":"Hall"}),       
            
    }).then((response)=> response.json())
  }
  //https://staging-website-api.airvisual.net/v1/cities/5bc8230f41fdcdf1939e901a?fields=fires,analysis&units.temperature=celsius&units.distance=kilometer&AQI=US&language=en

  export function setId(id){
    console.log(id)
  return fetch("https://staging-website-api.airvisual.net/v1/cities/"+id+"?fields=fires,analysis&units.temperature=celsius&units.distance=kilometer&AQI=US&language=vi",{
      method: 'GET',
      headers: this.getHeader({"Token":"Hall"}),       
          
  }).then((response)=> response.json())
}