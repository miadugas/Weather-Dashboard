
//Load screen
var myVar;

function myFunction() {
myVar = setTimeout(showPage, 2000);
}

function showPage() {
document.getElementById("loader").style.display = "none";
document.getElementById("myDiv").style.display = "block";
}


// Openweather API
var URL = "http://api.openweathermap.org/data/2.5/weather?q=Denver&APPID=03ad99cae7c389645ceff85905e3eb2f";

$.ajax ({
    url: URL,
    success: function (result){
    // !get rid of once dome
    console.log(result);  
    console.log(result.name);

    // Location output 
    //!Geolocation could go here
    $("#location").text(result.name);

    // Display temperature & formula to covert temp to Fahrenheit
    let imperial = Math.round(result.main.temp * (9/5) -459.67);
    let Fahrenheit = imperial.toString();
    $("#temperature").text(Fahrenheit);

    //formula for MPH conversion
    let windSpeed = Math.round(result.wind.speed / .44704);
    //Display Wind
    $("#wind").text(windSpeed);
    //Sky Conditions
    $("#sky").text(result.weather[0].description);
    //Humidity
    $("#humid").text(result.main.humidity)
    //!UV Index goes here, another API call 




}

})

