
console.log(hello);

$(document).ready(function () {

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

    // button to submit the user given info
    $("#submit").on("click", function (event) {
        event.preventDefault(); //no button reset

        //set user input values to variables
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();

        //converts user input to usable info
        var time = moment($("#time").val().trim(), "hh:mm").subtract(1, "years").format("X");

        var frequency = $("#frequency").val().trim();

        //current time
        var currentTime = moment();
        console.log("currentTime: " + moment(currentTime).format("hh:mm"));

        console.log(trainName);
        console.log(destination);
        console.log(time);
        console.log(frequency);
        console.log(currentTime);



        //gathers together all our new train info
        var newTrain = {

            train: trainName,
            trainGoing: destination,
            trainComing: time,
            everyXMin: frequency
        };


        //uploads newTrain to firebase
        database.ref().push(newTrain);
        //*push* adds to info already in firebase. *set* overwrites preexisting info

        //clears elements before adding new text
        $("#traiName").val("");
        $("#destination").val("");
        $("#time").val("");
        $("#frequency").val("");

        //supposed to prevent from moving to a new page... idk how
        return false;

    }); //end of onclick

    database.ref().on("child_added", function(snapshot){
        var name = snapshot.val().trainName;
        var destination = snapshot.val().trainDestination;
        var frequency = snapshot.val().trainFrequency;
        var trainTime = snapshot.val().trainArrival;
    
        console.log("train",trainTime);
    
        var remainder = moment().diff(moment().unix(trainTime), "minutes") % frequency;
        var minutes = frequency - remainder;
        var arrival = moment().add(minutes, "m").format("HH:mm");
        
        if (minutes ===1){
            alert("Final Boarding Call for "+ name);
        }
        //append following information to new row in table
        newDiv = $("tbody").append("<tr>");
        newDiv.append("<td id='trainName'>" + name + "</td>");
        newDiv.append("<td id='destination'>" + destination + "</td>");
        newDiv.append("<td id='time'>" + time + "</td>");
        newDiv.append("<td id='frequency'>" + frequency + "</td>");
        
    
    })

 
});
