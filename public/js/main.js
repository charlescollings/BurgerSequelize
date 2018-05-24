$(document).ready(function() {

    var burgerInput = $("#burger");
    var submitBurgerForm = $("#submitBurger");
    var burgerList = $("#burgerList");

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
    // Function to render a list of authors
    // to create an author first
    
    function renderBurgerList(data) {
        console.log(data)
        // add button to data object
      // for (var i=0; i < data.length; i++) {
        $("#burgerDisplay").append(data[data.length-1].burgerName + "<button type='button'>Devour it!</button>");

      // }

      // if (!data.length) {
      //   window.location.href = "/authors";
      // }
      // $(".hidden").removeClass("hidden");
      // var rowsToAdd = [];
      // for (var i = 0; i < data.length; i++) {
      //   rowsToAdd.push(createBurgerRow(data[i]));
      // }
      // authorSelect.empty();
      // console.log(rowsToAdd);
      // console.log(authorSelect);
      // authorSelect.append(rowsToAdd);
      // authorSelect.val(authorId);
    }

    function pageLoad() {
      $.get("/api/burgers", renderFirstBurgerList);
    }

    
    function renderFirstBurgerList(data) {
        console.log(data)
        // add button to data object

        
      for (var i=0; i < data.length; i++) {
        var devourButton = "<button type='button' value=" + data[i].burgerName + ">Devour it!</button>"
        // devourButton.value = data[i].burgerName
        console.log(devourButton)
        $("#burgerDisplay").append(data[i].burgerName + devourButton + "<br>");
      
      }

      $("button").on("click", moveBurger);

      function moveBurger(event) {
        event.preventDefault();
        // loop through data to find burgerName = this.value
        for (var n=0; n < data.length; n++) {
          if (data[n].burgerName = this.value) {
            data[n].devoured = true;
            // console.log(data[n])
          }
          $("#devouredBurgerDisplay").append(data[n].burgerName + "<br>");
        }
       
      }
    }
        
    pageLoad();

})