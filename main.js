function showMovieDetails(movieData) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `
        <h1>${movieData.title}</h1>
        <h3>Director: Not available</h3>
        <p>Release Date: ${movieData.release_date}</p>
        <p>Plot: ${movieData.overview}</p>
        <p>Rating: ${movieData.vote_average}</p>
    `;
}

function showMoviesByGenre(movieData) {
    const contentDiv = document.getElementById("content");
    let moviesHTML = '<div class="movies-container">';
    movieData.results.forEach(movie => {
        moviesHTML += `
            <div class="movie">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            </div>
        `;
    });
    moviesHTML += '</div>';
    contentDiv.innerHTML = moviesHTML;
}

function searchMovie() {
    const searchTerm = document.querySelector('.search-input').value;
    const tmdbApiKey = '0f6fa0419888feaea4091402edef2200';
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${searchTerm}`;

    // Make an AJAX request to TMDB API
    fetch(tmdbUrl)
        .then(response => response.json())
        .then(data => {
            // Check if the response has an error
            if (data.errors && data.errors.length > 0) {
                alert(data.errors[0].message);
            } else {
                // Display movie details
                showMovieDetails(data.results[0]);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again.');
        });
}
function searchGenre() {
    const selectedGenre = document.querySelector('.dropdown select').value;
    const tmdbApiKey = '0f6fa0419888feaea4091402edef2200'; 
    const tmdbUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_genres=${selectedGenre}`;

    // Make an AJAX request to TMDB API
    fetch(tmdbUrl)
        .then(response => response.json())
        .then(data => {
            // Check if the response has an error
            if (data.errors && data.errors.length > 0) {
                alert(data.errors[0].message);
            } else {
                // Display movies by genre
                showMoviesByGenre(data);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Error fetching data. Please try again.');
        });
}
