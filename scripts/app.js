const cityForm = document.querySelector('form');

const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector(".card .time");
const icon = document.querySelector('.icon img')

const updateUI =(data)=>{
//  const cityDets = data.cityDets;
//  const weather = data.weather;

   const {cityDets,weather}= data;
   //this is called destructuring and is the same as above. ust a short way of doing it. 
   //its tellingto assgn the proprty of the data ,cityDetws to the variable Citydets and weather to weather
 
   //update details template
    details.innerHTML = `
                    <h5 class="my-3">${cityDets.EnglishName}</h5> 
                    <div class="my-3">${weather.WeatherText}</div>
                          <div class="display-4 my-4">
                          <span>${weather.Temperature.Metric.Value}</span>
                          <span>&deg;C</span>
                          </div>
                
 
   `;
   //updatethe icon
   const iconSrc=`img/icons/${weather.WeatherIcon}.svg`;
   icon.setAttribute('src', iconSrc );

   //update the night and day image
   let timeSrc = weather.IsDayTime?'img/day.svg':'img/night.svg';     // it is the source of the image sdepending on the time
    // if(weather.IsDayTime){
    //     timeSrc = "img/day.svg";

    // }else{                                                          //they are same and upper one is called ternary operator
    //     timeSrc = "img/night.svg";
    // }
    time.setAttribute('src',timeSrc);
   //remove the d-none class if present
   if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
   }
};

//this .Englishname is the property we get forom the api response we need to see the json object to know what proprty icnludes the data we desore

const updateCity = async (city) =>{
    const cityDets = await getCity(city); // getcity is an async fucntion so it returns promise and hence we can use await to make sure that
                                          //it waits until it gets response and pass to the citydets variable
    const weather = await getWeather(cityDets.Key);

    //we return an boject as
    // return {
    //     cityDets:cityDets,
    //     weather :weather
    // };

   //insted of this we can use
   return{ cityDets,weather };
   //this presumes that the name of the proprty and the value is the same and looks neater
};




cityForm.addEventListener('submit',e=>{
    //prevent default action so that form doesnt refresh
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();  // this is will clear the form after gettng the value above

    updateCity(city)
    .then(data=>updateUI(data)) // here the cuntion returns promise that swhy then is use d and object is returned so this 'data' 0arguent is the returened object
    .catch(err=>console.log(err));
});