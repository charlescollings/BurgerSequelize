$(document).ready(function() {

    var burgerInput = $("#burger");
    var submitBurgerForm = $("#submitBurger");
    var burgerList = $("#burgerList");

    var firstData = [];
    var updatedData = [];
    var devouredBurger = [];
    var devourButton = 

    $(submitBurgerForm).on("submit", handleBurgerSubmit);

    // A function for handling what happens when the form to create a new post is submitted
    function handleBurgerSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body, title, or author
        if (!burgerInput.val().trim()) {
          return;
        }
        // Constructing a newPost object to hand to the database
        var newBurger = {
          burgerName: burgerInput
            .val()
            .trim(),
          devoured: false
        };
        submitBurger(newBurger);
    }

    // Submits a new burger and shows it on left side with devour button
    function submitBurger(burger) {
        $.post("/api/burgers", burger, function() {
          getBurgers();
        });
      }
    
        // A function to get Authors and then render our list of Authors
    function getBurgers() {
      $.get("/api/burgers", renderBurgerList);
    }

    // function pageLoad(data) {
            // for (var i=0; i < data.length; i++) {
              // $("#burgerDisplay").append(data[i].burgerName + "<button type='button'>Devour it!</button>");
            // }
    // }
    
    function renderBurgerList(updatedData) {
        console.log(updatedData)
        // add button to data object
      // for (var i=0; i < data.length; i++) {
        $("#burgerDisplay").append(updatedData[updatedData.length-1].burgerName + "<button type='button'>Devour it!</button>");

    }

    function pageLoad() {
      $.get("/api/burgers", renderFirstBurgerList);
    }
      function renderFirstBurgerList(firstData) {
          console.log(firstData[0])
          // add button to data object
      
        for (var i=0; i < firstData.length; i++) {
          var devourButton = "<button type='button' value=" + firstData[i].burgerName + ">Devour it!</button>"
          // devourButton.value = data[i].burgerName
          console.log(devourButton)
          $("#burgerDisplay").append(firstData[i].burgerName + devourButton + "<br>");
          $("button").on("click", {clickedButtonBurgerName: firstData[i].burgerName}, moveBurger);
        }
      }
        function moveBurger(event) {
          event.preventDefault();
          console.log(event.data.clickedButtonBurgerName)
          // loop through data to find burgerName = this.value
          for (var n=0; n < firstData.length; n++) {
            if (firstData[n].burgerName = event.data.clickedButtonBurgerName) {
              firstData[n].devoured = true;
              $("#devouredBurgerDisplay").append(firstData[n].burgerName + "<br>");
            }
          }    
        }      
    
    pageLoad();

})