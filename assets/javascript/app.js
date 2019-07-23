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
        var time = $("#time").val().trim();
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

        // time clock
        var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
        // the time difference between current time and the first train
        var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
        var remainder = difference % frequency;
        var minUntilTrain = frequency - remainder;
        var nextTrain = moment()
            .add(minUntilTrain, "minutes")
            .format("hh:mm a");

        var newTrain = {
            name: trainName,
            destination: destination,
            time: time,
            frequency: frequency,
            min: minUntil,
            next: nextTrain
        };

        //adding new train to table 

        var tableRow = $("<tr>");

        tableRow.append("<td class='name'>" + trainName + "</td>");
        tableRow.append("<td class='destination'>" + destination + "</td>");
        tableRow.append("<td class='frequency'>" + frequency + "</td>");
        tableRow.append("<td class='time'>" + nextArrival + "</td>");
        tableRow.append("<td class='minutes'>" + minUntil + "</td>");

        newDiv = $("#trainTable").append(tableRow);


    });
});


