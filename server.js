require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended:true}))
// app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

const PORT = process.env.PORT;
const API_KEY = process.env.WEATHER_API_KEY;

let city = "Delhi";


const getCoordinates = async()=>{

   if(city != '')
   {
    try {
        
        const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)

        const data = await result.json();

       return data;

    } catch (error) {
        
        console.log(error);
    }
   }
   else{
     console.log("Please eneter your city name");
   }

}

const callWeatherApiCoordinate = async()=>{
    const Coordinates = await getCoordinates();
    const LatLong = {
        lat: Coordinates[0].lat,
        lon: Coordinates[0].lon
    }
    // console.log(Coordinates[0].lat);
    // console.log(Coordinates[0].lon);
    // console.log(LatLong);

    return LatLong;
}



const getWeatherDetails = async()=>{
   const LatLong = await callWeatherApiCoordinate();
   
   try {
     const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LatLong.lat}&lon=${LatLong.lon}&appid=${API_KEY}&units=metric`);

     const WeatherDetails = await result.json();

    //  console.log(WeatherDetails)

    return WeatherDetails;

   } catch (error) {
    console.log(error);
   }

}

app.get('/', (req, res) => {
    
    res.sendFile(__dirname + '/index.html');
});
 
app.post('/', (req, res) => {

    const data = req.body;
    console.log(data);
    city = data.city;
    res.json({ message: 'Data received successfully', receivedData: data });
    
  });
   
  

app.get('/data/', async(req,res)=> {
         
        
        
        const finalData = await getWeatherDetails();
        res.json(finalData);
    
})

app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT} `);
}) 