//function to display movie information on
var movieInput = $("#movie-input");  // Get the movie input element
var findMovieButton = $("#find-movie"); // Get the find movie button

// Queue to track the sequence of searched movies
let moviesQueue = []; 

function displayMovieInfo(event) {
  event.preventDefault();
  
var movie = movieInput.val()
 if (!movie.trim()) {
    alert("Please enter a movie title!"); // Alert if input is empty
    return;
 }
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=df97ab33";

  
  // Fetch movie data from the API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    if (response.Response === "True") {
      // If valid response, fetch the movie data
    console.log(response);
    $('#poster').html(`<img src="${response.Poster}" alt="${response.Title} Poster" />`);
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
    
    // Add the movie to the queue
    moviesQueue.push(response);
    
    //Below functions are for recent movies
    
    // Only add to the recent list after a second movie is searched
    if (moviesQueue.length > 1) {
      addRecentMovie(moviesQueue[0]); // Add the first movie (previously searched) to the recent list
      renderRecentMovies(); // Re-render recent movies list
      moviesQueue.shift(); // Remove the first movie from the queue
     }
   } else {
     alert("Movie not found. Please try another movie title.");
    }
  });
}

$("#find-movie").on("click", displayMovieInfo);

// Local Storage Handling
function getRecentMovies() {
  return JSON.parse(localStorage.getItem("recentMovies")) || [];
}
 
function addRecentMovie(movie) {
  const recentMovies = getRecentMovies();
  recentMovies.push({
    Title: movie.Title,
    Poster: movie.Poster, // Store the correct poster URL
  });

  if (recentMovies.length > 5) {
    recentMovies.shift();
  }

  localStorage.setItem("recentMovies", JSON.stringify(recentMovies));
}

  
//Below code is for recent movies
function renderRecentMovies() {
  const recentMoviesListRow = document.getElementById("recent-movies-list-row");
  recentMoviesListRow.innerHTML = "";
  
  const recentMovies = getRecentMovies();
  recentMovies.reverse();
  
  recentMovies.forEach((movie) => {
    const movieCardHTML = `
    <div class="col">
      <div class="card movie-card">
        <img src="${movie.Poster}" class="card-img-top poster" alt="${movie.Title + " poster"}" />
        <div class="card-body">
          <h5 class="movie-title card-text">${movie.Title}</h5>
        </div>
      </div>
    </div>`;
    recentMoviesListRow.insertAdjacentHTML("beforeend", movieCardHTML);
  });
}

// Below code is for clearing Recent Movies
function clearRecentMoviesAndReloadRecentMovies() {
  localStorage.removeItem("recentMovies"); // Clear from local storage
  renderRecentMovies();

  var myModalEl = document.getElementById("staticBackdrop");
  var modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();
}
  window.onload = function () {
  renderRecentMovies();
};
  
