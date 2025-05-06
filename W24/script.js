// Movie data
const movies = [
    {
        title: "Dune: Part Two",
        poster: "images/dune.jpeg",
        genre: "Sci-Fi",
        summary: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
        review: "An epic continuation that delivers on every front. Director Denis Villeneuve crafts a visually stunning and emotionally resonant sci-fi masterpiece.",
        rating: 4.8
    },
    {
        title: "Everything Everywhere All at Once",
        poster: "images/everything.jpg",
        genre: "Drama/Sci-Fi",
        summary: "A middle-aged Chinese immigrant is swept up in an insane adventure where she alone can save existence by exploring other universes.",
        review: "A genre-defying masterpiece that combines martial arts, existential philosophy, and family drama. Michelle Yeoh delivers a career-defining performance.",
        rating: 4.9
    },
    {
        title: "The Batman",
        poster: "images/batman.jpg",
        genre: "Action/Crime",
        summary: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
        review: "Matt Reeves delivers a noir detective story that finally embraces Batman's title as the World's Greatest Detective. Robert Pattinson's brooding take feels fresh yet faithful.",
        rating: 4.5
    },
    {
        title: "Oppenheimer",
        poster: "images/openheimmer.jpg",
        genre: "Biography/Drama",
        summary: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        review: "Christopher Nolan's masterful biopic is a technical achievement and devastating character study. Cillian Murphy disappears into the role of Oppenheimer.",
        rating: 4.7
    },
    {
        title: "Parasite",
        poster: "images/parasite.jpg",
        genre: "Thriller/Drama",
        summary: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        review: "Bong Joon-ho's social satire is a perfect film in every sense. Sharp, funny, terrifying, and ultimately heartbreaking.",
        rating: 4.9
    }
];

// Generate star rating
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) starsHTML += '★';
    if (halfStar) starsHTML += '★';
    for (let i = 0; i < emptyStars; i++) starsHTML += '☆';

    return starsHTML;
}

// Display movie cards
function displayMovies() {
    const container = $('#movie-container');
    if (!container.length) return; // Don't run if no movie-container

    container.empty(); // Clear previous movies

    movies.forEach(movie => {
        const movieCard = $(`
            <div class="movie-card">
                <img class="movie-poster" src="${movie.poster}" alt="${movie.title}">
                <div class="movie-info">
                    <h2 class="movie-title">${movie.title}</h2>
                    <span class="movie-genre">${movie.genre}</span>
                    <p class="movie-summary">${movie.summary}</p>
                    <p class="movie-review">${movie.review}</p>
                    <div class="movie-rating">${generateStarRating(movie.rating)} <span class="rating-value">${movie.rating}/5</span></div>
                </div>
            </div>
        `);
        container.append(movieCard);
    });
}

// On page load
$(document).ready(function() {
    displayMovies();

    // Add new review (only on home page where form exists)
    $('#submit-review').click(function() {
        const newMovie = {
            title: $('#movie-title').val(),
            genre: $('#movie-genre').val(),
            poster: $('#movie-poster').val(),
            summary: $('#movie-summary').val(),
            review: $('#movie-review').val(),
            rating: parseFloat($('#movie-rating').val())
        };

        if (!newMovie.title || !newMovie.genre || !newMovie.poster || !newMovie.summary || !newMovie.review || isNaN(newMovie.rating)) {
            alert("Please fill out all fields properly!");
            return;
        }

        movies.push(newMovie); // Add new movie
        alert('Review added successfully! Go to Reviews page to see it.');
        
        // Clear form
        $('#add-review-form input, #add-review-form textarea').val('');
    });
});
