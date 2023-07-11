import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const KEY = "c1608533";

export default function MovieDetails({
  watchedMovies,
  selectedId,
  onCloseMovie,
  onAddWatched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const currMovie = watchedMovies
    .filter((movie) => selectedId === movie.imdbId)
    .at(0);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `${movie.Title} | FilmFolio`;

    // Cleanup
    return () => {
      document.title = "FilmFolio";
    };
  }, [movie.Title]);

  useEffect(() => {
    function callBack(e) {
      if (e.code === "Escape") onCloseMovie();
    }

    document.addEventListener("keydown", callBack);

    return function () {
      document.removeEventListener("keydown", callBack);
    };
  }, [onCloseMovie]);

  function handleAdd() {
    const newWatched = {
      imdbId: selectedId,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbRating: +movie.imdbRating,
      runtime: +movie.Runtime.split(" ").at(0),
      userRating,
    };
    onAddWatched(newWatched);
    onCloseMovie();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Name} movie`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {/* {console.log(movie)} */}
              {currMovie ? (
                <p>You rated this movie {currMovie.userRating} ⭐</p>
              ) : (
                <StarRating
                  defaultRating={currMovie?.userRating || 0}
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
              )}
              {userRating > 0 && currMovie?.imdbId !== selectedId && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>
              Directed by <strong>{movie.Director}</strong>
            </p>
          </section>
        </>
      )}
    </div>
  );
}
