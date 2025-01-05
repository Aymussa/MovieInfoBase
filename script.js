//function to display movie information on
var movieInput = $("#movie-input")
var findMovieButton = $("#find-movie")
function displayMovieInfo(event) {
  event.preventDefault()
  var movie = movieInput.val()
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=df97ab33"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response)
    $('#poster').html("<img src =' " + response.Poster + "' />");
    $("#title").text(response.Title) 
    $("#year").text(response.Year) 
    $("#released").text(response.Released) 
    $("#plot").text(response.Plot) 
    $("#actors").text(response.Actors) 
    $("#rated").text(response.Rated) 
    $("#director").text(response.Director) 
    $("#runTime").text(response.Runtime) 
    $("#genre").text(response.Genre) 
    $("#language").text(response.Language) 
    //Below functions are for recent movies
    addRecentMovie({
      title: response.Title,
      posterURL: response.Poster
    });
    renderRecentMovies();
  });

}

$("#find-movie").on("click", displayMovieInfo)

//Below code is for recent movies
function renderRecentMovies() {
  const recentMoviesListRow = document.getElementById("recent-movies-list-row");

  recentMoviesListRow.innerHTML = "";
  const recentMovies = getRecentMovies();
  recentMovies.forEach((movie) => {
    const movieCardHTML = `<div class="col">
      <div class="card movie-card">
        <img src="${movie.posterURL}" class="card-img-top poster" alt="${
      movie.title + " poster"
    }" />
        <div class="card-body">
          <h5 class="movie-title card-text">${movie.title}</h5>
        </div>
      </div>
    </div>`;
    recentMoviesListRow.insertAdjacentHTML("beforeend", movieCardHTML);
  });
}

window.onload = function () {
  renderRecentMovies();
};

function clearRecentMoviesAndReloadRecentMovies() {
  clearRecentMovies();
  renderRecentMovies();

  var myModalEl = document.getElementById("staticBackdrop");
  var modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();
}
  
