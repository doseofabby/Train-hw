var config = {
    apiKey: "AIzaSyBxn0sA29XV4rU4wm1awUR0z6rUy_Hr0VQ",
    authDomain: "trainschedule-d7573.firebaseapp.com",
    databaseURL: "https://trainschedule-d7573.firebaseio.com",
    projectId: "trainschedule-d7573",
    storageBucket: "",
    messagingSenderId: "431908732558",
    appId: "1:431908732558:web:c2dbe6fb8cba5204"
};

firebase.initializeApp(config);
var database = firebase.database();

$(document).ready(function () {

    // var now = moment();
    // submit btn
    $("#submit").on("click", function (event) {
        event.preventDefault();

        // You did not made variable that grabs input value
        // first you needed to grab input value
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var time = $("#time").val().trim();
        var frequency = $("#frequency").val().trim();
        

        database.ref().child('trains').push({ // push the variables to the database in a child named 'trains'
            // and then using the input value, push it as data in the database. (nameindatabase: inputvaluevariablename)
            trainName: trainName,
            destination: destination,
            time: time,
            frequency: frequency,
            // currentTime: now,
        })

        $("#trainName").val("");
        $("#destination").val("");
        $("#time").val("");
        $("#frequency").val("");

        return false;

    });

    database.ref().on("child_added", function (snapshot,childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var time = childSnapshot.val().time;
        var frequency = childSnapshot.val().frequency;

        console.log(trainName);
        console.log(destination);
        console.log(time);
        console.log(frequency);


        var trainTime = moment.unix(time).format("hh:mm");
        // idk what this does really 
        var difference = moment().diff(moment(trainTime), "minutes");

        var trainRemain = difference % frequency;

        //minutes till the next arrival
        var minUntil = frequency - trainRemain;

        //next arrival time
        var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

        //adding new train to table 

        newDiv = $("#trainTable").append("<tr>");
        newDiv.append("<td id='name'>" + trainName + "</td>");
        newDiv.append("<td id='destination'>" + destination + "</td>");
        newDiv.append("<td id='frequency'>" + frequency + "</td>");
        newDiv.append("<td id='arrival'>" + nextArrival + "</td>");
        newDiv.append("<td id='minutes'>" + minUntil + "</td>");


    });
});


