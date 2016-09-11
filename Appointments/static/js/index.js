var reqLat, reqLng;

function updateLocation(userId, lat, lng) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        //  if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        //    alert("efefaewa fe ");
        //  }
    };
    xmlHttp.open("GET", "/user/location/?userid=" + userId + "&lat=" + lat + "&lng=" + lng, true);
    xmlHttp.send();
}


function newEventRequest(userId, eventname, lat, lng) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        //  if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        //    alert("efefaewa fe ");
        //  }
    };
    xmlHttp.open("GET", "/user/event/?userid=" + userId +"&eventname="+ eventname+ "&lat=" + lat + "&lng=" + lng, true);
    xmlHttp.send();
}

function newEventConfirmation(){
  $("#newEventsCreator").append("");
}
