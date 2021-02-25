import axios from "axios";
import React from "react";

class UpdateMovie extends React.Component {
    constructor(){
        super();
        this.state= {
            movieTitle: test,
            movieDirector: test, 
            movieScore: test,
            movieStars: test,
        }
    }


    onEditSubmit= (event) =>{
        event.preventDefault();
        axios.post(`http://localhost:5000/api/movies/${this.props.movie.id}`)
    }

    render(){
        return (
            <div>
                <form>
                    <label htmlFor="movieTitle">Enter New Movie Title:
                        <input type="text" name="movieTitle" id="movieTitle" value={this.state.movieTitle} placeholder="Enter New Movie Title" />
                    </label>
                    <label htmlFor="movieDirector">Enter New Movie Title:
                        <input type="text" name="movieDirector" id="movieDirector" value={this.state.movieDirector} placeholder="Enter New Movie Title" />
                    </label>
                    <label htmlFor="movieScore">Enter New Movie Title:
                        <input type="number" name="movieScore" id="movieScore" value={this.state.movieScore} placeholder="Enter New Movie Title" />
                    </label>
                    <label htmlFor="movieStars">Enter New Movie Title:
                        <input type="text" name="movieStars" id="movieStars" value={this.state.movieStars} placeholder="Enter New Movie Title" />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
    
    
}

export default UpdateMovie;