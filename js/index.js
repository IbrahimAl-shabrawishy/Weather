
//  Today Data
const todayName=document.querySelector("#today-date-day-name");
const btnFind=document.querySelector('#btn-find');
const today_date_month=document.querySelector('#today_date_month');
const locationToday=document.querySelector('#location-today');
const degreeToday=document.querySelector('#degreeToday');
const todayConditionImage=document.querySelector("#todayConditionImage");
const statusWeather=document.querySelector('#statusWeather');
const humidity=document.querySelector('#humidity');
const wind_kph=document.querySelector('#wind_kph');
const wind_dir=document.querySelector('#wind_dir');
const today_date_day_number=document.querySelector("#today_date_day_number");

// Next Data

const next_day_name=document.getElementsByClassName('next_day_name');
const next_condition_img=document.getElementsByClassName('next_condition_img');
const next_max_temp=document.getElementsByClassName('next_max_temp');
const next_condition_text=document.getElementsByClassName('next_condition_text');
const next_min_temp=document.getElementsByClassName('next_min_temp');




// Api Key

const apiKey="20c2ee80c71a4943a17110011241110";

// Search Inputs
const searchInputFind=document.querySelector('#search-input-find');

btnFind.addEventListener("click",()=>{
    invokeFunctions(searchInputFind.value);
})














// fetch function Api Weather
async function getApiWeather(cityName)
{
    const response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3`);
    const data=await response.json();
return data;
}


// Display today date
function displayTodayDate(arr)
{

    const todayDate=new Date();
    todayName.innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"});
    today_date_day_number.innerHTML=todayDate.getDate();
    today_date_month.innerHTML=todayDate.toLocaleDateString("en-US",{month:"long"});
    locationToday.innerHTML=arr.location.name;
    degreeToday.innerHTML=arr.current.temp_c;
    todayConditionImage.setAttribute("src",arr.current.condition.icon); 
    statusWeather.innerHTML=arr.current.condition.text;
    humidity.innerHTML=arr.current.humidity+'%';
    wind_kph.innerHTML=arr.current.wind_kph+'km/h';
    wind_dir.innerHTML=arr.current.wind_dir;
    
}



// Display Next day data

function displayNextDay(arr) {
    const foreCastData = arr.forecast.forecastday;
   
    for (let i = 0; i < 2; i++) {
        const todayDate=new Date(foreCastData[i+1].date);
        next_day_name[i].innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"});
        next_max_temp[i].innerHTML = foreCastData[i + 1].day.maxtemp_c + "°C";
        next_min_temp[i].innerHTML = foreCastData[i + 1].day.mintemp_c + "°C";
        next_condition_img[i].setAttribute('src',foreCastData[i+1].day.condition.icon);
        next_condition_text[i].innerHTML = foreCastData[i + 1].day.condition.text;
     
    }
}



//Invokes Functions
async function invokeFunctions(city='Cairo')
{
let apiWeather=await getApiWeather(city);

if(!apiWeather.error)
{
    displayTodayDate(apiWeather);
    displayNextDay(apiWeather);
}



}

invokeFunctions();








