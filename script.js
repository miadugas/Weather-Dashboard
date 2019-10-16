
//Load screen
var myVar;

function myFunction() {
myVar = setTimeout(showPage, 2000);
}

function showPage() {
document.getElementById("loader").style.display = "none";
document.getElementById("myDiv").style.display = "block";
}

// Current local time
function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var ampm = "";
    m = checkTime(m);

    if (h > 12) {
    h = h - 12;
    ampm = " PM";
    } else if (h == 12){
        h = 12;
    ampm = " AM";
    } else if (h < 12){
        ampm = " AM";
    } else {
        ampm = "PM";
    };

if(h==0) {
    h=12;
}
    
    document.getElementById('display').innerHTML = h+":"+m+ampm;
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// Display the date
function startDate() {
    var d = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    document.getElementById("date").innerHTML = days[d.getDay()]+" | "+[d.getMonth()+1]+"/"+d.getDate()+"/"+d.getFullYear();
    }

// Time of Day Greeting
var thehours = new Date().getHours();
	var themessage;
	var morning = ('Good Morning');
	var afternoon = ('Good Afternoon');
	var evening = ('Good Evening');

	if (thehours >= 0 && thehours < 12) {
		themessage = morning; 
	} else if (thehours >= 12 && thehours < 17) {
		themessage = afternoon;
	} else if (thehours >= 17 && thehours < 24) {
		themessage = evening;
	}

    $('.greeting').append(themessage);
    
//submit button
$("#submitWeather").click(function(){

var city = $("#city").val();
    
// Openweather API
var URL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=03ad99cae7c389645ceff85905e3eb2f";



if(city != " "){

//AJAX call
$.ajax ({
    url: URL,
    success: function (result){

    // get rid of once done ?????
    console.log(result);  
    console.log(result.name);

// pass in my returned data in this method
        var widget = show(result);

        $("#show").html(widget);
        $("#city").val(" ");
        $("#location").text(result.name);
}

});

}else{
    
    $("#error").alert("Field cannot be empty");


}

});

function show(result){


    
    return "<h2 style='font-weight:bold'; 'class='text-center'>Current Weather for " + result.name + ", " + result.sys.country +"</h2>" +
            "<h3><strong>Temperature</strong>: "+ result.main.temp +"&deg;F</h3>" +

            "<h3><strong>Weather</strong>: "+ result.weather[0].main +"</h3>" +

            "<h3><strong>Description</strong>: <img src=http://openweathermap.org/img/wn/"+ result.weather[0].icon + ".png>" + result.weather[0].description +"</h3>" +

            "<h3><strong>Humidity</strong>: "+ result.main.humidity +"%</h3>" +

            // !error to fix= conversion to MPH
            "<h3><strong>Wind Speed</strong>: "+ result.wind.speed.imperial +"MPH</h3>" +
            //!to direction
            "<h3><strong>Wind Direction</strong>: "+ result.wind.deg +"</h3>";

        





}


// // Location output 
//     //?Geolocation could go here
//     $("#location").text(result.name);

//     // Display temperature & formula to covert temp to Fahrenheit
//     let imperial = Math.round(result.main.temp * (9/5) -459.67);
//     let Fahrenheit = imperial.toString();
//     $("#temperature").text(Fahrenheit);




//     //formula for MPH conversion
//     let windSpeed = Math.round(result.wind.speed / .44704);

//     //Display Wind
//     $("#wind").text(windSpeed);

//     //Sky Conditions
//     $("#sky").text(result.weather[0].description);

//     //Humidity
//     $("#humid").text(result.main.humidity)
//     //!UV Index goes here, another API call? 


;
