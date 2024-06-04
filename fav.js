const grid = document.querySelector(".grid-container");

const favMovieContent = JSON.parse(localStorage.getItem("favourites"));

// Displaying fav movie
function addMovieToFavouritePage() {
  for (let i = 0; i < favMovieContent.length; i++) {
    let poster = favMovieContent[i].poster;
    let title = favMovieContent[i].title;
    let plot = favMovieContent[i].plot;
    let movieCard = document.createElement("div");
    movieCard.classList.add("grid-item");
    movieCard.innerHTML = `<img src="${poster}" />
    <h2>${title}</h2>
    <p>
      ${plot}
    </p>
  `;
    grid.appendChild(movieCard);
  }
}

addMovieToFavouritePage();
