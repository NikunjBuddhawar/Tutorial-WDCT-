
        function showSearchBar(btn) {
            document.getElementById("search-container").style.display = "flex";
            document.getElementById("btn-container").style.display = "none";
        }

        function openDropdown() {
            document.getElementById("dropdown").style.display = "flex";
            document.querySelector('.dropdown-btn').style.display = 'flex';
            document.getElementById("btn-container").style.display = "none";
        }

        function showMovieDetails(movieData) {
            const contentDiv = document.getElementById("content");
            contentDiv.innerHTML = `
                <h1>${movieData.Title}</h1>
                <h3>Director: ${movieData.Director}</h3>
                <p>Release Date: ${movieData.Released}</p>
                <p>Plot: ${movieData.Plot}</p>
                <p>Rating: ${movieData.imdbRating}</p>
                <p>Cast: ${movieData.Actors}</p>
            `;
        }

        function showMoviesByGenre(movieData) {
            const contentDiv = document.getElementById("content");
            let moviesHTML = '<div class="movies-container">';
            movieData.Search.forEach(movie => {
                moviesHTML += `
                    <div class="movie">
                        <img src="${movie.Poster}" alt="${movie.Title}">
                        <h3>${movie.Title}</h3>
                    </div>
                `;
            });
            moviesHTML += '</div>';
            contentDiv.innerHTML = moviesHTML;
        }

        function searchMovie() {
            const searchTerm = document.querySelector('.search-input').value;
            const omdbApiKey = '72b882da'; // Replace this with your OMDB API key
            const omdbUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${searchTerm}`;
    
            // Make an AJAX request to OMDB API
            fetch(omdbUrl)
                .then(response => response.json())
                .then(data => {
                    // Check if the response has an error
                    if (data.Response === "False") {
                        alert(data.Error);
                    } else {
                        // Display movie details
                        showMovieDetails(data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    alert('Error fetching data. Please try again.');
                });
        }
        function searchGenre() {
            const selectedGenre = document.querySelector('.dropdown select').value;
            const omdbApiKey = '72b882da'; // Replace this with your OMDB API key
            const omdbUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&type=movie&s=${selectedGenre}&page=1&limit=15`;
    
            // Make an AJAX request to OMDB API
            fetch(omdbUrl)
                .then(response => response.json())
                .then(data => {
                    // Check if the response has an error
                    if (data.Response === "False") {
                        alert(data.Error);
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


