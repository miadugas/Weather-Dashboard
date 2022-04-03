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

// set a few variables
var currentCity = "Denver";
var searchHistory = [];
var storedCities = JSON.parse(sessionStorage.getItem("userSearches"));

$(document).ready(function () {
    // past searches to html
        function displayCities() {
            $("#pastCities").empty();
            if (storedCities !== null) {
                searchHistory = storedCities;
                for (var i = 0; i < searchHistory.length; i++) {
                    $("#pastCities").append('<li>' + searchHistory[i] + '</li>');
                }
                currentCity = searchHistory[searchHistory.length - 1];
    
            }
        };
        displayCities();
    
    // variables for the API's
        const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=03ad99cae7c389645ceff85905e3eb2f";
        const queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=03ad99cae7c389645ceff85905e3eb2f";
    
    
    //call grabbing current weather & assigning variables to UV requirements for that call
        $.ajax({
            url: queryURLCurrent,
            method: "GET"
        }).then(function (response) {
    // more variables required for the UV index & URL
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            const uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=03ad99cae7c389645ceff85905e3eb2f=" + lat + "&lon=" + lon;
            $('#currentCityJumbo').text(response.name + ", " + response.sys.country + " (" + moment().format('dddd MMMM Do') + ")");
            $('#currentWind').text("Wind Speed: " + response.wind.speed + " MPH");
            $('#currentHum').text("Humidity: " + response.main.humidity + "%");
            $('#currentTemp').text("Temperature: " + response.main.temp + " ˚F");
            $("#currentIcon").attr("src","https://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png");
    
    //call for UV index & color code the Index
            $.ajax({
                url: uvQueryURL,
                method: "GET"
            }).then(function (response) {
    
                $('#currentUV').text(response.value);
                if(response.value<3) {
                    $('#currentUV').add("h5").css('background-color', 'green');
                }else if (response.value>=3 && response.value<6) {
                    $('#currentUV').add("h5").css('background-color', 'orange');
                }else{
                    $('#currentUV').add("h5").css('background-color', 'red');
                }
    
            });
    
        });
    
    //call for 5 day forecast
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
    // day 1 of five day
            for (var i = 0; i < response.list.length; i++) {
                if (response.list[i].dt_txt === (moment().add(1, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                    $("#day1Temp").text("Temp: " + response.list[i].main.temp + " ˚F");
                    $("#day1Hum").text("Humidity: " + response.list[i].main.humidity + "%");
                    $("#day1Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[i].weather[0].icon+"@2x.png");
                }
            }                  
    // day 2 of five day
            for (var j = 0; j < response.list.length; j++) {
                if (response.list[j].dt_txt === (moment().add(2, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                    $("#day2Temp").text("Temp: " + response.list[j].main.temp + " ˚F");
                    $("#day2Hum").text("Humidity: " + response.list[j].main.humidity + "%");
                    $("#day2Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[j].weather[0].icon+"@2x.png");
                }
            }
    // day 3 of five day
            for (var k = 0; k < response.list.length; k++) {
                if (response.list[k].dt_txt === (moment().add(3, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                    $("#day3Temp").text("Temp: " + response.list[k].main.temp + " ˚F");
                    $("#day3Hum").text("Humidity: " + response.list[k].main.humidity + "%");
                    $("#day3Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[k].weather[0].icon+"@2x.png");
                }
            }
    // day 4 of five day
            for (var l = 0; l < response.list.length; l++) {
                if (response.list[l].dt_txt === (moment().add(4, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                    $("#day4Temp").text("Temp: " + response.list[l].main.temp + " ˚F");
                    $("#day4Hum").text("Humidity: " + response.list[l].main.humidity + "%");
                    $("#day4Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[l].weather[0].icon+"@2x.png");
                }
            }
    // day 5 of five day
            for (var m = 0; m < response.list.length; m++) {
                if (response.list[m].dt_txt === (moment().add(5, 'day').format('YYYY-MM-DD') + " 12:00:00")) {
                    $("#day5Temp").text("Temp: " + response.list[m].main.temp + " ˚F");
                    $("#day5Hum").text("Humidity: " + response.list[m].main.humidity + "%");
                    $("#day5Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[m].weather[0].icon+"@2x.png");
                }
            }
    
        });
    
      //setting item for temp storage I prefer this since it clears after the session expires
        function refreshStorage(name) {
            searchHistory.push(name);
            sessionStorage.setItem("userSearches", JSON.stringify(searchHistory));
            storedCities = JSON.parse(sessionStorage.getItem("userSearches"));
            displayCities();
        }
        //listening for the search button click & push input to storage
        $("#searchBtn").click(function (event) {
            event.preventDefault();
            currentCity = $("#userSearch").val();
            $("#userSearch").val('');
            const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=03ad99cae7c389645ceff85905e3eb2f";
            const queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=03ad99cae7c389645ceff85905e3eb2f";
    // call for user input
            $.ajax({
                url: queryURLCurrent,
                method: "GET"
            }).then(function (response) {
    
                $('#currentCityJumbo').text(response.name + ", " + response.sys.country + " (" + moment().format('dddd MMMM Do') + ")");
    //assign variables for the UV index
                const lat = response.coord.lat;
                const lon = response.coord.lon;
                const uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=03ad99cae7c389645ceff85905e3eb2f&lat=" + lat + "&lon=" + lon;
                $('#currentWind').text("Wind Speed: " + response.wind.speed + " MPH");
                $('#currentHum').text("Humidity: " + response.main.humidity + "%");
                $('#currentTemp').text("Temperature: " + response.main.temp + " ˚F");
                $("#currentIcon").attr("src","https://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png");
    
                refreshStorage(response.name)
    
                $.ajax({
                    url: uvQueryURL,
                    method: "GET"
                }).then(function (response) {
    
                    $('#currentUV').text(response.value);
                    if(response.value<4) {
                        $('#currentUV').add("h5").css('background-color', 'green','low');
                    }else if (response.value>=4 && response.value<7) {
                        $('#currentUV').add("h5").css('background-color', 'orange','moderate');
                    }else{
                        $('#currentUV').add("h5").css('background-color', 'red', 'high');
                    }
    
                });
    
            });
    //5 day 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
    // day 1 of five day
        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt === (moment().add(1, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day1Temp").text("Temp: " + response.list[i].main.temp + " ˚F");
                $("#day1Hum").text("Humidity: " + response.list[i].main.humidity + "%");
                $("#day1Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[i].weather[0].icon+"@2x.png");
            }
        }                  
    // day 2 of five day
        for (var j = 0; j < response.list.length; j++) {
            if (response.list[j].dt_txt === (moment().add(2, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day2Temp").text("Temp: " + response.list[j].main.temp + " ˚F");
                $("#day2Hum").text("Humidity: " + response.list[j].main.humidity + "%");
                $("#day2Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[j].weather[0].icon+"@2x.png");
            }
        }
    // day 3 of five day
        for (var k = 0; k < response.list.length; k++) {
            if (response.list[k].dt_txt === (moment().add(3, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day3Temp").text("Temp: " + response.list[k].main.temp + " ˚F");
                $("#day3Hum").text("Humidity: " + response.list[k].main.humidity + "%");
                $("#day3Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[k].weather[0].icon+"@2x.png");
            }
        }
    // day 4 of five day
        for (var l = 0; l < response.list.length; l++) {
            if (response.list[l].dt_txt === (moment().add(4, 'day').format('YYYY-MM-DD') + " 21:00:00")) {
                $("#day4Temp").text("Temp: " + response.list[l].main.temp + " ˚F");
                $("#day4Hum").text("Humidity: " + response.list[l].main.humidity + "%");
                $("#day4Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[l].weather[0].icon+"@2x.png");
            }
        }
    // day 5 of five day
        for (var m = 0; m < response.list.length; m++) {
            if (response.list[m].dt_txt === (moment().add(5, 'day').format('YYYY-MM-DD') + " 12:00:00")) {
                $("#day5Temp").text("Temp: " + response.list[m].main.temp + " ˚F");
                $("#day5Hum").text("Humidity: " + response.list[m].main.humidity + "%");
                $("#day5Icon").attr("src","https://openweathermap.org/img/wn/"+response.list[m].weather[0].icon+"@2x.png");
            }
        }
    
    });
            
    
        })
    
    });

//trigger click on click of search button
    $("#find").click(function() {
        $("#geocomplete").trigger("geocode");
    });  

//trigger click on change of gender
    $("#gender input[type=radio]").change(function(){
    $("#geocomplete").trigger("geocode");
});

//handle weather information from API.
function callResult (data) {
    console.log(data,data.currently.icon);

    var gender = $("#gender input[name='gender']:checked").attr('value');
    var currentTemp = data.currently.temperature; //details
    var summary = data.currently.summary; //details
    var humidity = data.currently.humidity; //range 0 to 1
    var weatherType = data.currently.icon; // clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
    var tempRange = "";

    if (currentTemp<0){
    tempRange = "below-0";
    } else if (currentTemp <= 20 && currentTemp > 0) {
    tempRange = "0-20";
    } else if (currentTemp <= 40 && currentTemp > 20) {
    tempRange = "20-40";
    } else if ( currentTemp > 40) {
    tempRange = "above-40";
    } 

    //get dress recommendation
    var dressObj = dresStyle[weatherType][gender]["temp"][tempRange];

    //render weather information and dress recommendation.
    showDressSuggestions(dressObj, '#result_id', {
    temp: currentTemp,
    humidity: humidity,
    summary: summary,
    currentWeather: weatherType
    });
}

function showDressSuggestions(obj, parentEl, weatherObj){
    var mainImgs = obj.imgs; //imgs are array
    var accessoriesImgs = obj.accessories; //accessories are arr of imgs
    var explanation = obj.explanation; //explanation is string
    var currentTemp = weatherObj.temp;
    var currentWeatherCond = weatherObj.currentWeather
    
    //template to render.
    var resultStrcture = '\
    <div class="container">\
    <div class="row justify-content-center weather-detail">\
        <p class="weather-info"><span style="color: #007bff"><i class="fas fa-thermometer-empty"></i></span>  Temperature : ' + currentTemp + ' &#8451; </p>\
        <p class="weather-info"><span style="color: #007bff"><i class="fab fa-cloudversify"></i></span>  Weather Condition : ' + currentWeatherCond + '</p>\
    </div>\
    <div class="row">\
        <div class="col-sm-4 hero-img">\
        <img class="img-fluid" src="imgs/' + mainImgs[0] +' ">\
        </div>\
        <div class="col-sm-8 accessories">\
        <div class="row justify-content-center">\
            <div class="col-sm-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[0]+'">\
            </div>\
            <div class="col-sm-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[1]+'">\
            </div>\
            <div class="col-sm-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[2]+'">\
            </div>\
        </div>\
        <div class="row justify-content-center">\
            <div class="col-sm-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[3]+'">\
            </div>\
            <div class="col-sm-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[4]+'">\
            </div>\
        </div>\
        </div>\
    </div>\
    <div class="row">\
        <div class="col align-self-center explanation">\
        <p class="text-justify">' + explanation + '</p>\
        </div>\
    </div>\
    </div>';

    //empty parent before appending
    $(parentEl).empty();
    $(parentEl).append(resultStrcture)
}