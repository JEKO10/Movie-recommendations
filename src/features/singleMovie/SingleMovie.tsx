import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { getMovie, toggleModal, toggleCategory } from "./singleMovieSlice";
import { setQuery } from "../navbar/navbarSlice";
import { RxCross2 } from "react-icons/rx";

const SingleMovie = () => {
  const { movieInfo, isModalOpen, category } = useAppSelector(
    (store) => store.singleMovie
  );
  const {
    title,
    tagline,
    backdrop_path,
    belongs_to_collection,
    genres,
    budget,
    imdb_id,
    overview,
    popularity,
    poster_path,
    production_companies,
    production_countries,
    release_date,
    revenue,
    runtime,
    spoken_languages,
    vote_average,
    credits,
    keywords,
  } = movieInfo;
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const posterUrl = "https://image.tmdb.org/t/p/w1280/";

  const director = credits?.crew.find((person) => person.job === "Director");
  const posterRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    dispatch(getMovie(id));
    dispatch(setQuery("singleMovie"));
    document.addEventListener("click", clickOutside, true);
    console.log(movieInfo);
  }, [id]);

  const clickOutside = (e) => {
    if (!posterRef.current?.contains(e.target)) {
      dispatch(toggleModal(false));
    } else {
      dispatch(toggleModal(true));
    }
  };

  return (
    <>
      <section className="singleMovie">
        <div
          className="banner"
          style={{ backgroundImage: `url('${posterUrl + backdrop_path}')` }}
        ></div>
        <article className="wrapper">
          <img
            src={posterUrl + poster_path}
            alt="POSTER"
            onClick={() => dispatch(toggleModal(true))}
          />
          <article className="info">
            <div className="name">
              <h2>{title}</h2>
              <h4>{release_date?.slice(0, 4)}</h4>
              <h4>
                Directed by
                <Link to={`/person/${director?.id}/`}>{director?.name}</Link>
              </h4>
            </div>
            <div className="overview">
              <h4>{tagline}</h4>
              <p>{overview}</p>
              <h3>{runtime} min</h3>
            </div>
          </article>
        </article>
        <article className="details">
          <ul className="options">
            <li
              onClick={(e) => {
                dispatch(toggleCategory(e.currentTarget.textContent));
              }}
              className={category === "cast" ? "active" : ""}
            >
              cast
            </li>
            <li
              onClick={(e) => {
                dispatch(toggleCategory(e.currentTarget.textContent));
              }}
              className={category === "crew" ? "active" : ""}
            >
              crew
            </li>
            <li
              onClick={(e) => {
                dispatch(toggleCategory(e.currentTarget.textContent));
              }}
              className={category === "genres" ? "active" : ""}
            >
              genres
            </li>
            <li
              onClick={(e) => {
                dispatch(toggleCategory(e.currentTarget.textContent));
              }}
              className={category === "details" ? "active" : ""}
            >
              details
            </li>
          </ul>
          {category === "genres" ? (
            <div>
              <div>
                <p>Genres</p>
                <ul>
                  {genres?.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p>Themes</p>
                <ul>
                  {keywords?.keywords?.map((keyword) => (
                    <li key={keyword.id}>{keyword.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : category === "cast" ? (
            <div>
              <ul>
                {credits?.cast?.map((cast) => (
                  <li key={cast.id}>{cast.name}</li>
                ))}
              </ul>
            </div>
          ) : category === "crew" ? (
            <div>
              <ul>
                {credits?.crew?.map((crew) => (
                  <li key={crew.id}>{crew.name}</li>
                ))}
              </ul>
            </div>
          ) : category === "details" ? (
            <div className="details">
              <div>
                <p>Budget</p>
                <div className="line"></div>
                <ul>
                  <li>{budget} $</li>
                </ul>
              </div>
              <div>
                <p>Revenue</p>
                <ul>
                  <li>{revenue} $</li>
                </ul>
              </div>
              <div>
                <p>Languages</p>
                <ul>
                  {spoken_languages.map((language) => (
                    <li key={language.english_name}>{language.english_name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p>Popularity</p>
                <ul>
                  <li>{popularity}</li>
                </ul>
              </div>
              <div>
                <p>Rating</p>
                <ul>
                  <li>{vote_average} / 10</li>
                </ul>
              </div>
              <div>
                {production_countries.length > 1 ? (
                  <p>Countries</p>
                ) : (
                  <p>Country</p>
                )}
                <ul>
                  {production_countries.map((country) => (
                    <li key={country.name}>{country.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p>Production</p>
                <ul>
                  {production_companies.map((production) => (
                    <li key={production.id}>{production.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
        </article>
      </section>

      <div className={`${isModalOpen ? "open" : ""} posterModal`}>
        <RxCross2 onClick={() => dispatch(toggleModal(false))} />
        <img src={posterUrl + poster_path} alt="POSTER" ref={posterRef} />
      </div>
    </>
  );
};

export default SingleMovie;
