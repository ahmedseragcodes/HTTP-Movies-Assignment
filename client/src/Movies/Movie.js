import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ movieList, setMovieList, addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history=useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  //HANDLES CLICK ON EDIT BUTTON OF A SPECIFIC MOVIE
  const handleEditClick= () =>{
    history.push(`/update-movie/${params.id}`)
  }

  //HANDLES DELETE CLICK ON A SPECIFIC MOVIE

  const handleDelete=()=>{
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then((res)=>{
      console.log("HANDLE DELETE SUCCEEDED", res)
      setMovieList(
        movieList.filter((movie)=>{
          return movie.id !== params.id;
        })
      )
      history.push("/")
      
    })
    .catch((err)=>{
      console.log("HANDLE DELETE FAILED", err);
    })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);


  //UI START 

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={handleEditClick}>Edit Movie</button>
      <button onClick={handleDelete} >Delete Movie</button>
    </div>
  );
}

export default Movie;
