const search = document.getElementById("search-bar");
const searchList = document.getElementById("search-list");
const finalResult = document.getElementById("result-grid");

// To load Movies
async function loadMovies(searchTerm) {
  let url = ` https://omdbapi.com/?s=${searchTerm}&page=1&apikey=503dc36f `;

  const res = await fetch(url);
  const data = await res.json();
  //   console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}

// To find the movie
function findMovies() {
  let searchTerm = search.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

// Display thumbnail list item
function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[i].imdbID;
    movieListItem.classList.add("search-list-item");
    if (movies[i].Poster != "N/A") moviePoster = movies[i].Poster;
    else moviePoster = "image_not_found.png";

    movieListItem.innerHTML = ` 
         <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
         </div>
    <div class = "search-item-info">
        <h3>${movies[i].Title}</h3>
        <p>${movies[i].Year}</p>
    </div>`;

    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      // console.log(movie.dataset.id);
      searchList.classList.add("hide-search-list");
      search.value = "";
      const result = await fetch(
        `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=503dc36f`
      );
      const movieDetails = await result.json();
      // console.log(movieDetails);
      displayMovieDetails(movieDetails);
    });
  });
}

// Display movie information in DOM
function displayMovieDetails(details) {
  finalResult.innerHTML = `
 <div class="image">
           <img class="movie-poster" src="${
             details.Poster != "N/A" ? details.Poster : "image_not_found.png"
           }" alt = "movie poster" />
        </div>
        <div class="movie-info">
          <h3 class="movie-title"> ${details.Title}</h3>
          <ul class="movie-misc-info">
            <li class="year"><span>Year:</span> ${details.Year}</li>
            <li class="rated"><span>Ratings:</span> ${details.Rated}</li>
            <li class="released"><span>Released:</span> ${details.Released}</li>
          </ul>
          <p class="genre"><span>Genre:</span> ${details.Genre}</p>
          <p class="writer">
            <span>Writer:</span> ${details.Writer}
          </p>
          <p class="actors">
            <span>Actors:</span> ${details.Actors}
          </p>
          <p class="plot">
            <span>Plot:</span> ${details.Plot}
          </p>
          <p class="language"><span>Language:</span> ${details.Language}</p>
          <p class="awards">
            <span><i class="fas fa-award"></i></span> ${details.Awards}
          </p>
        </div>
  `;
}

window.addEventListener("click", (event) => {
  if (event.target.className != "search-bar") {
    searchList.classList.add("hide-search-list");
  }
});

//array for watchlater list
const watchLater = [];

const addToFav = document.getElementById("save-later");

//To add in watchlater
addToFav.addEventListener("click", () => {
  const favMovieTitle = document.querySelector(".movie-title").textContent;
  const favMovieImage = document.querySelector(".movie-poster").src;
  const favMoviePlot = document.querySelector(".plot").textContent;
  const favMovieContent = {
    title: favMovieTitle,
    poster: favMovieImage,
    plot: favMoviePlot,
  };
  watchLater.push(favMovieContent);
  alert("Movie added to watch list");
  console.log(watchLater);
  localStorage.setItem("favourites", JSON.stringify(watchLater));
});

const watchList = document.getElementById("save");
