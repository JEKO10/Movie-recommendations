import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../context";

//   const movies = data.Search;

const SingleMovie = () => {
  const [singleMovie, setSingleMovie] = useState([]);
  const { isLoading } = useGlobalContext();
  const { id } = useParams();

  const fetchMovie = async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=a931948e&i=${id}`
    );
    const data = await response.json();
    setSingleMovie(data);
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (singleMovie.Response === "False") {
    return (
      <div className="errorPage">
        <h1>{singleMovie.Error}</h1>
        <Link to="/" id="btn">
          back to movies
        </Link>
      </div>
    );
  }
  const { Poster: poster, Title: title, Plot: plot, Year: year } = singleMovie;
  return (
    <section className="singleMovie">
      <img src={poster} alt={title} />
      <div className="singleMovieInfo">
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to="/" id="btn">
          Back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
