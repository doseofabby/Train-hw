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

    // submit btn
    $("#submit").on("click", function (event) {
        event.preventDefault();


        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();

        var time = moment($("#time").val().trim(), "hh:mm").subtract(1, "years").format("X");

        var frequency = $("#frequency").val().trim();

        //current time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // console.log(trainName);
        // console.log(destination);
        // console.log(firstTime);
        // console.log(frequency);
        // console.log(currentTime);



        //gathers together all our new train info
        var newTrain = {

            train: trainName,
            trainGoing: destination,
            trainComing: time,
            everyXMin: frequency
        };


        //uploads newTrain to firebase
        database.ref().push(newTrain);

        $("#trainName").val("");
        $("#destination").val("");
        $("#time").val("");
        $("#frequency").val("");

        return false;

    });

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().train;
        var destination = childSnapshot.val().trainGoing;
        var time = childSnapshot.val().trainComing;
        var frequency = childSnapshot.val().everyXMin;

        console.log(trainName);
        console.log(destination);
        console.log(time);
        console.log(frequency);


        var trainTime = moment.unix(firstTime).format("hh:mm");
        // idk what this does really 
        var difference = moment().diff(moment(trainTime), "minutes");

        var trainRemain = difference % frequency;

        //minutes till the next arrival
        var minUntil = frequency - trainRemain;

        //next arrival time
        var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

        //adding new train to table 

        newDiv = $("#trainTable").append("<tr>");
        newDiv.append("<td id='name'>" + name + "</td>");
        newDiv.append("<td id='destination'>" + destination + "</td>");
        newDiv.append("<td id='frequency'>" + frequency + "</td>");
        newDiv.append("<td id='arrival'>" + arrival + "</td>");
        newDiv.append("<td id='minutes'>" + minutes + "</td>");


    });
});


