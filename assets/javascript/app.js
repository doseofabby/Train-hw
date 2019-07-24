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
        debugger;
        // You did not made variable that grabs input value
        // first you needed to grab input value
        var trainName = $("#trainName").val().trim();
        var destination = $("#dest").val().trim();
        var time = moment($("#time").val().trim(), "HH:mm").format("X");
        var frequency = $("#freq").val().trim();

        $("#trainTable tbody").empty();


        database.ref().child('trains').push({ // push the variables to the database in a child named 'trains'
            // and then using the input value, push it as data in the database. (nameindatabase: inputvaluevariablename)
            trainName: trainName,
            destination: destination,
            time: time,
            frequency: frequency,
            // currentTime: now,
        })

        $("#trainName").val("");
        $("#dest").val("");
        $("#time").val("");
        $("#freq").val("");

        return false;

    });

    database.ref("/trains").on("child_added", function (childSnapshot) {

        console.log(childSnapshot);

        var trainName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var time = childSnapshot.val().time;
        var frequency = childSnapshot.val().frequency;




        var trainTime = moment.unix(time);
        // idk what this does really 
        var difference = moment().diff(moment(trainTime, "HH:mm"), "minutes");
        console.log(trainTime);
        console.log(difference);
        var trainRemain = difference % parseInt(frequency);
        console.log(trainRemain);
        //minutes till the next arrival
        var minUntil = parseInt(frequency) - trainRemain;

        //next arrival time
        var nextArrival = moment().add(minUntil, "minutes").format('hh:mm A');

        //adding new train to table 

        var tableRow = $("<tr>");

        tableRow.append("<td class='name'>" + trainName + "</td>");
        tableRow.append("<td class='destination'>" + destination + "</td>");
        tableRow.append("<td class='frequency'>" + frequency + "</td>");
        tableRow.append("<td class='time'>" + nextArrival + "</td>");
        tableRow.append("<td class='minutes'>" + minUntil + "</td>");

        newDiv = $("#trainTable tbody").append(tableRow);


    });
});


