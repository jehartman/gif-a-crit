
var animals = ["cat", "doberman", "bird"];
var animal;

$(document).ready(function() {

  $("#slideshow > div:gt(0)").hide();

  setInterval(function() { 
    $('#slideshow > div:first')
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('#slideshow');
  },  6000);

//fetches gifs from giphy, pushes to html, and creates still/animate toggle
  function fetchGifs () {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=36a7c06c6a1549e4b4fd0dba9159d4f1&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
      }).done(function(response) {
        $("#animal-view").text(JSON.stringify(response));
        var results = response.data;

        // push to array and push to html with ratings
        for (i=0; i<results.length; i++) {
          var upperCaseRating = results[i].rating.toUpperCase();
          var r = ("<p>Rating: " + upperCaseRating + "</p>");
          var animalDiv = $("<div class='animalImage'></div>");
          $(animalDiv).append(r);
          $("#animalGifs").prepend(animalDiv);
          var fixedHeight = results[i].images.fixed_height.url;
          var fixedHeightStill = results[i].images.fixed_height_still.url;
          var animalImage = $("<img src=" + fixedHeightStill + " data-still=" + fixedHeightStill + " data-animate=" + fixedHeight +" data-state='still' class='gif'>");
          $(animalDiv).append(animalImage);
        }

          //animates and stills on click
          $(".gif").on("click", function () {
            var state = $(this).attr("data-state");
            var animateURL = $(this).attr("data-animate");
            var stillURL = $(this).attr("data-still");
            if (state === "still") {
              $(this).attr("src", animateURL);
              $(this).attr("data-state", "animate");
            }
            else {
              $(this).attr("src", stillURL);
              $(this).attr("data-state", "still");
            }
          });
        });
      }

//adds new animal buttons and clears previous gifs
  $("#addAnimal").on("click", function(event) {
    event.preventDefault();
    //empties previous gifs from div
    $("#animalGifs").html("");
    animal = $("#animal-input").val().trim();

    //creates dedicated animal gif button
    function createButton () {
      animal = animal.toUpperCase ();
      $("#animalButtons").append("<button type='button' class='btn btn-primary starterGif' id='" + animal.toLowerCase() +"'>" + "See " + animal + " gifs</button>");
      animals.push(animal);
    }
    createButton ();
    fetchGifs ();
  });

  //fires when one of the prebuilt buttons is clicked
    $(document).on("click", ".starterGif", function () {
      event.preventDefault();
      //empties previous gifs from div
      $("#animalGifs").html("");
      animal = this.id;
      fetchGifs();
    });
  });
