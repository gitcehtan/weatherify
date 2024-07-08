
// getting the data from the frontend

const getCityName = () => {

    const btnSearch = document.getElementById('btn-search');
    const formSearch = document.getElementById('form-search');
    const searchCity = document.getElementById('search-city');
    
    formSearch.addEventListener('submit', (e)=> {
        let data = {"city": searchCity.value};
        // console.log("Data from script ",data)
        e.preventDefault();


        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            // Handle success logic here
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error logic here
        });
        fetchWeather();
    })


    
 

  
}
getCityName();
function showLoader(){
            const dataLoading = document.getElementsByClassName('data-loading')[0];
            const weatherData = document.getElementById('weather-data');
            weatherData.style.display = "none";
            dataLoading.style.display = "flex";
            setTimeout(()=> {
                dataLoading.style.display = "none";
                weatherData.style.display = "block";

            }, 1000)
}
// document.addEventListener('DOMContentLoaded', () => {

const fetchWeatherData = async() => {
    
    try {
        let response = await fetch('/data/')
        let data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }

  
}


const fetchWeather = async()=> {

    let data = await fetchWeatherData();
    
    if(data)
    {
        console.log(data);
        showLoader();
    }
    

    
        const mainWeatherData = {
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            sea_level: data.main.sea_level,
            grnd_level: data.main.grnd_level,
        }
        
        
        

       
        
        const temp = document.getElementById('temp');
        const feels_like = document.getElementById('feels_like');
        const minmaxtemp = document.getElementById('minmaxtemp');
        const pressure = document.getElementById('pressure');
        const humidity = document.getElementById('humidity');
        const sea_level = document.getElementById('sea_level');
        const grnd_level = document.getElementById('grnd_level');
        
        temp.innerText = "Temperature : ";
        feels_like.innerText = "Feels Like : ";
        minmaxtemp.innerText = "Min Max Temp : ";
        pressure.innerText = "Pressure : ";
        humidity.innerText = "Humidity : ";
        sea_level.innerText = "Sea Level : ";
        grnd_level.innerText = "Ground Level : ";
        

        const tempData = document.createTextNode(`${JsonToString(mainWeatherData.temp)}`)
        temp.appendChild(tempData);
        const feels_likeData = document.createTextNode(`${JsonToString(mainWeatherData.feels_like)}`)
        feels_like.appendChild(feels_likeData);
        const mintempData = document.createTextNode(`${JsonToString(mainWeatherData.temp_min)}`)
        const maxtempData = document.createTextNode(`${JsonToString(mainWeatherData.temp_max)}`)
        minmaxtemp.appendChild(mintempData);
        minmaxtemp.appendChild(maxtempData);
        const pressureData = document.createTextNode(`${JsonToString(mainWeatherData.pressure)}`)
        pressure.appendChild(pressureData);
        const humidityData = document.createTextNode(`${JsonToString(mainWeatherData.humidity)}`)
        humidity.appendChild(humidityData);
        const sea_levelData = document.createTextNode(`${JsonToString(mainWeatherData.sea_level)}`)
        sea_level.appendChild(sea_levelData);
        const grnd_levelData = document.createTextNode(`${JsonToString(mainWeatherData.grnd_level)}`)
        grnd_level.appendChild(grnd_levelData);

       
   
        
 

}

fetchWeather();

function JsonToString(jsonData){
    return JSON.stringify(jsonData);
}



