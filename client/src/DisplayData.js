import React, { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      age
      name
      nationality
      username
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      isInTheaters
    }
  }
`;


const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
        name
        yearOfPublication
    }
  }

`


export const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState("");

  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) {
    return <h1>Data Is loading...</h1>;
  }

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }


  if(movieError) {
      console.log(movieError)
  }

  return (
    <div>
      {data &&
        data.users.map((user) => (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Username: {user.username}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Nationality: {user.nationality}</h1>
          </div>
        ))}

      {movieData &&
        movieData.movies.map((movie) => {
          {
            console.table(movie);
          }
          return (
            <div key={movie.id}>
              <h1>Name: {movie.name}</h1>
              <p>ID: {movie.id}</p>
              <p>isInTheaters: {String(movie.isInTheaters)}</p>
            </div>
          );
        })}

      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(e) => setMovieSearched(e.target.value)}
        />
        <button 
            onClick={() => 
                fetchMovie({
                    variables: {
                        name: movieSearched,
                    }
                })
            }
        >Fetch Data</button>
        <div>
            {movieSearchedData && 
             <div>
                    <h1>
                        MovieName: {movieSearchedData.movie.name}
                    </h1>
                    <h1>
                        YearOfPublication: {movieSearchedData.movie.yearOfPublication}
                    </h1>
             </div>    
            }

            {movieError &&
            <h1>There was an error fetching the data</h1>
            
            }
        </div>
      </div>
    </div>
  );
};