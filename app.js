
// In this assignment, I will use the giphy API to create a dynamic
// web page that populates based on the value passed into it through text

//Create an array to hold the "buttons"

$(document).ready(function(){

    var foods =[
        "Cheese", "Milk","Eggs","Bacon","Cereal"
    ];
    // This will be a function to make the buttons and add them to the page
    //

    function populateButtons(arrayToUse, classToAdd, areaToAddTo){
        $(areaToAddTo).empty();

        for (var i=0; i < arrayToUse.length; i++) {
            var a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type",arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);
        }
    }

    // Create a function that will populate the images from the Giphy API 

    $(document).on("click", ".food-button", function(){
        $("#images").empty();
        
        $(".food-button").removeClass("active");
        $(this).addClass("active");

        var type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
        
        //AJAX CALL

        $.ajax({
            url:queryURL,
            method: "GET"
        })

        .then(function(response){
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var foodDiv = $("<div class=\"food-item\">");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;

                var foodImage = $("<img>");
                foodImage.attr("src", still);
                foodImage.attr("data-still", still);
                foodImage.attr("data-animate", animated);
                foodImage.attr("data-state", "still");
                foodImage.addClass("food-image");

                foodDiv.append(p);
                foodDiv.append(foodImage);

                $("#images").append(foodDiv);

            }
        });
    });

    //Set the state from still to animated when clicking on individual images

    $(document).on("click", ".food-image", function(){
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }
          else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    });

    $("#add-food").on("click", function(event) {
        event.preventDefault();
        var newFood = $("input").eq(0).val();

        if (newFood.length > 2) {
            foods.push(newFood);

        }
        
        populateButtons(foods, "food-button", "#food-buttons");

    });


    populateButtons(foods, "food-button", "#food-buttons");


});