$(".display-4").fadeIn(3000);

$(".pp").slideDown(1000);

$(".first-p").toggle(2000);
$(".second-p").fadeIn(2000);
$(".third-p").fadeIn(3000);
$(".fourth-p").toggle(2000);

$(".search-button").on("click", function() {
    console.log($("#input-keyword").val());
    $.ajax({
        url: "http://www.omdbapi.com/?&apikey=894fcdb5&s=" + $("#input-keyword").val(),
        success: (result) => {
            console.log(result);
            if (result.Response == 'False') {
                console.log('Error')
                $('.movie-container').html(`<h1>${result.Error}</h1>`)
            }
            const movies = result.Search;
            let cards = "";
            movies.forEach((movie) => {
                cards += showCards(movie);
            });

            $(".movie-container").html(cards);

            $(".modal-detail-btn").on("click", function() {
                console.log($(this).data('imdbid'));
                $.ajax({
                    url: "http://www.omdbapi.com/?&apikey=894fcdb5&i=" + $(this).data('imdbid'),
                    success: (movie) => {
                        const movieDetail = showMovieDetail(movie);

                        $(".modal-body").html(movieDetail);
                    },
                });

            });
        },
        error: (e) => {
            console.log(e.responseText);
        },
    });
});

function showCards(movie) {
    return `<div class="col-md-4 my-3 mr-10">
            <div class="card">
                <img src="${movie.Poster}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-btn" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid = "${movie.imdbID}">Show Detail</a>
                </div>
            </div>
        </div>`;
}

function showMovieDetail(movie) {
    return `
      <div class="container-fluid">
             <div class="row">
                 <div class="col-md-3">
                     <img src="${movie.Poster}" alt="" class="img-fluid">
                 </div>
                 <div class="col-md">
                     <ul class="list-group">
                         <li class="list-group-item"><h4>${movie.Title}</h4></li>
                         <li class="list-group-item text-lg-start"><strong>Director:</strong> ${movie.Director}</li>
                         <li class="list-group-item text-lg-start"><strong>Actors: </strong>${movie.Actors}</li>
                         <li class="list-group-item text-lg-start"><strong>Plot: </strong>${movie.Plot}</li>
                       </ul>
                 </div>
             </div>
         </div>
      `;
}

// Count without space
// var field = document.getElementById("field");
// var wordCount = document.getElementById("charNum");

// field.addEventListener("keyup",function(){
// 	var characters = field.value.split('');
//   	wordCount.innerText = characters.filter( item => {
// 		return (item != ' ');
// 	}).length + '/100';
// });

// Count with space
function countChar(val) {
    var len = val.value.length;
    if (len >= 101) {
      val.value = val.value.substring(0, 100);
    } else {
      $('#charNum').text(len + '/100');
    }
  };



