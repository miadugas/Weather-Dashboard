
var currentTime = new Date().getHours();
if (7 <= currentTime && currentTime < 20) {
    if (document.body) {
        document.body.background = "http://itsnotch.com/tumblr/images/daytime_bg.jpg";
    }
}
else {
    if (document.body) {
        document.body.background = "http://itsnotch.com/tumblr/images/nighttime_bg.jpg";
    }
}

if (h > 12) {
if (document.body) {
    document.body.background = "./assets/sunrise.jpg";
} else if (h == 12){
        if (document.body) {
            document.body.background = "./assets/afternoon.jpg";
} else {
    if (document.body) {
        document.body.background = "./assets/nightsky.jpg";

        f(h==0) {
            h=12;
        }

    ;