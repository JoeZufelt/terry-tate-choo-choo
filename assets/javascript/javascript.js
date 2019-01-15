
//  Initialize Firebase
var config = {
    apiKey: "AIzaSyCd-M0Rlzaexs19jFwYqaFgk-3rUHJBwJk",
    authDomain: "terrytateofficetrainschedule.firebaseapp.com",
    databaseURL: "https://terrytateofficetrainschedule.firebaseio.com",
    projectId: "terrytateofficetrainschedule",
    storageBucket: "",
    messagingSenderId: "11062811662"
  };
  firebase.initializeApp(config);
 
  var database = firebase.database();
 console.log(database);
 
 $(document).ready(function(){

    // var newUser = {
    //     newName: "",
    //     newDestination: "",
    //     newTime: "",
    //     newFrequency: "",
    // }
 
 $("#add-train").on("click", function(event){
 
     event.preventDefault();
 
     var newUser = {
         newName: $("#nameOfTrain").val().trim(),
         newDestination: $("#destination").val().trim(),
         newTime: $("#trainTime").val().trim(),
         newFrequency: $("#frequency").val().trim(),
 
     }
 
     database.ref().push(newUser);
 
     $("#nameOfTrain").val("");
     $("#destination").val("");
     $("#trainTime").val("");
     $("#frequency").val("");
 
    
    // var trainTimeConverted = moment(newUser.newTime, "hh:mm").subtract(1, "years");
    // var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    // var tRemainder = diffTime % newUser.newFrequency;
    // var tMinutesTillTrain = newUser.newFrequency - tRemainder;
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // var nextTrainConverted = moment(nextTrain).format("hh:mm");
    // var newRow = $("<tr>");
    // newRow.append("<td>"+ newUser.newName + "</td>").append("<td>"+ newUser.newDestination + "</td>").append("<td>" + newUser.newFrequency + "</td>").append("<td>"+ nextTrainConverted + "</td>").append("<td>"+ tMinutesTillTrain + "</td>");
    // $("#train-table").append(newRow);
 
 });

 database.ref().on("child_added", function(childSnapshot){

        var trainTimeConverted = moment(childSnapshot.val().newTime, "hh:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
        var tRemainder = diffTime % childSnapshot.val().newFrequency;
        var tMinutesTillTrain = childSnapshot.val().newFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextTrainConverted = moment(nextTrain).format("hh:mm");
        var newRow = $("<tr>");
        newRow.append("<td>"+ childSnapshot.val().newName + "</td>").append("<td>"+ childSnapshot.val().newDestination + "</td>").append("<td>" + childSnapshot.val().newFrequency + "</td>").append("<td>"+ nextTrainConverted + "</td>").append("<td>"+ tMinutesTillTrain + "</td>");

        $("#train-table").append(newRow);
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
 });