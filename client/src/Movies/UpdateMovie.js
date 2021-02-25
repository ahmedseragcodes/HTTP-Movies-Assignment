import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

const initialUpdatedMovieState= {
            title: "",
            director: "", 
            metascore: "",
            stars: [],
}


const UpdateMovie = (props)=>{

const [movie, setUpdatedMovie]=useState(initialUpdatedMovieState);


const history=useHistory();
const params=useParams();


//GETS MOVIE BEING EDITED RIGHT WHEN COMPONENT LOADS 
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${params.id}`)
        .then((res)=>{
            console.log("UPDATE MOVIE COMP LOADED SUCCESS", res)
            setUpdatedMovie(
                res.data
            )
        })
        .catch((err)=>{
            console.log("UPDATE MOVIE COMP LOADED FAIL", err)
        })
    },[])

//HANDLES CHANGES BEING MADE ON INPUT FORM TO UPDATE RESPECTIVE MOVIE
    const updateFormChangeHandler = (event) => {
        const {name, value}=event.target;

        setUpdatedMovie({
            ...movie, [name]: value
        })
    }

//HANDLES SUBMISSION OF MOVIE UPDATES TO STATE AND TO SERVER 
    const onEditSubmit= (event) =>{
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
        .then((res)=>{
            console.log("SUBMITTED EDITED MOVIE SUCCESS", res)
            setUpdatedMovie(res.data);
            history.push(`/movies/${params.id}`);
        })
        .catch((err)=>{
            console.log("FAILED TO SUBMIT EDITED MOVIE", err);
        })
    }

        return (
            <UpdateMovieContainer>
                <form onSubmit={onEditSubmit} >
                    <label htmlFor="title">Enter A New Movie Title:
                        <input type="text" name="title" id="title" value={movie.title} onChange={updateFormChangeHandler} placeholder="Enter A New Movie Title" />
                    </label>
                    <label htmlFor="director">Enter A New Movie Director:
                        <input type="text" name="director" id="director" value={movie.director} onChange={updateFormChangeHandler} placeholder="Enter A New Movie Director" />
                    </label>
                    <label htmlFor="metascore">Enter A New Movie Score:
                        <input type="number" name="metascore" id="metascore" value={movie.metascore} onChange={updateFormChangeHandler} placeholder="Enter A New Movie Score" />
                    </label>
                    <label htmlFor="stars">Enter New Movie Stars:
                        <input type="text" name="stars" id="stars" value={movie.stars} onChange={updateFormChangeHandler} placeholder="Enter New Movie Stars" />
                    </label>
                    <button>Submit</button>
                </form>
            </UpdateMovieContainer>
        )
    
}

const UpdateMovieContainer = styled.div`
select, input {
    margin: 1rem;
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;
}
`

export default UpdateMovie;