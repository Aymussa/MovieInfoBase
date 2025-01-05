// Grabbing input and button elements
var movieInput = $("#movie-input");
var findMovieButton = $("#find-movie");

// Function to display movie information
function displayMovieInfo(event) {
  event.preventDefault();
  var movie = movieInput.val().trim(); // Trim whitespace from input

  if (!movie) {
    alert("Please enter a movie title.");
    return; // Stop execution if the input is empty
  }

  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=df97ab33";

  // Log the query URL for debugging
  console.log("Query URL: ", queryURL);

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    // Handle errors from the API response
    if (response.Response === "False") {
      alert("Movie not found. Please try another title.");
      return;
    }

    // Populate movie information in the UI
    $("#poster").html("<img src='" + response.Poster + "' alt='Movie Poster' />");
    $("#title").text(response.Title);
    $("#year").text(response.Year);
    $("#released").text(response.Released);
    $("#plot").text(response.Plot);
    $("#actors").text(response.Actors);
    $("#rated").text(response.Rated);
    $("#director").text(response.Director);
    $("#runTime").text(response.Runtime);
    $("#genre").text(response.Genre);
    $("#language").text(response.Language);

    // Add the movie to the "recent movies" list and render
    addRecentMovie({
      title: response.Title,
      posterURL: response.Poster,
    });
    renderRecentMovies();
  });
}

// Attach the event listener to the button
$("#find-movie").on("click", displayMovieInfo);

// Render the recent movies list
function renderRecentMovies() {
  const recentMoviesListRow = document.getElementById("recent-movies-list-row");

  // Clear the current list
  recentMoviesListRow.innerHTML = "";

  const recentMovies = getRecentMovies(); // Assuming this function fetches saved recent movies
  recentMovies.forEach((movie) => {
    const movieCardHTML = `
      <div class="col">
        <div class="card movie-card">
          <img src="${movie.posterURL}" class="card-img-top poster" alt="${movie.title} poster" />
          <div class="card-body">
            <h5 class="movie-title card-text">${movie.title}</h5>
          </div>
        </div>
      </div>`;
    recentMoviesListRow.insertAdjacentHTML("beforeend", movieCardHTML);
  });
}

// Clear and reload the recent movies list
function clearRecentMoviesAndReloadRecentMovies() {
  clearRecentMovies(); // Assuming this function clears saved recent movies
  renderRecentMovies();

  // Hide modal after clearing the list
  var myModalEl = document.getElementById("staticBackdrop");
  var modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();
}

// Render recent movies on page load
window.onload = function () {
  renderRecentMovies();
};
