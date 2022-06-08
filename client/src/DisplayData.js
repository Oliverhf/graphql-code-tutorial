import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

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
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;


const DELETE_USER_MUTATION = gql`
    mutation DeleteUser($deleteUser: ID!) {
        deleteUser(input: $deleteUser) {
            id
        }
    }
`

export const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState("");


  // Delete User

  const [id, setId] = useState(0)

  // Create User States
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(20);
  const [nationality, setNationality] = useState("");

  const { data, loading, error, refetch} = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION)

  if (loading) {
    return <h1>Data Is loading...</h1>;
  }

  if (data) {
    console.log(data);
  }

  if (error) {
    console.log(error);
  }

  if (movieError) {
    console.log(movieError);
  }
  

  return (
    <div>
      <div>
      <input
          type="number"
          placeholder="id..."
          onChange={(e) => setId(parseInt(e.target.value))}
        />
         <button 
            onClick={() => 
                {deleteUser({ variables: {
                deleteUser: {id}
                }})

                refetch()
                }
            }
        >
            Delete User
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
        <button 
            onClick={() => 
                {createUser({ variables: {
                input: {name, username, age, nationality}
                }})

                refetch()
                }
            }
        >
            Create User
        </button>
      </div>

      {data &&
        data.users.map((user) => (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <strong>Id: {user.id}</strong>
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
              },
            })
          }
        >
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h1>MovieName: {movieSearchedData.movie.name}</h1>
              <h1>
                YearOfPublication: {movieSearchedData.movie.yearOfPublication}
              </h1>
            </div>
          )}

          {movieError && <h1>There was an error fetching the data</h1>}
        </div>
      </div>
    </div>
  );
};
