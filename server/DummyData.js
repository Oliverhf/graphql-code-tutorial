const UserList = [
    {
      id: 1,
      name: "John",
      username: "john",
      age: 20,
      nationality: "CANADA",
      friends: [
        {
            id: 2,
            name: "Oliver",
            username: "Oliverhf",
            age: 23,
            nationality: "BRAZIL", 
        },
        {
            id: 3,
            name: "Sarah",
            username: "sarah",
            age: 25,
            nationality: "UNITED_STATES",
        },
      ]  
    },
    {
        id: 2,
        name: "Oliver",
        username: "Oliverhf",
        age: 23,
        nationality: "BRAZIL", 
    },
    {
        id: 3,
        name: "Sarah",
        username: "sarah",
        age: 25,
        nationality: "UNITED_STATES",
        friends: [
            {
                id: 2,
                name: "Oliver",
                username: "Oliverhf",
                age: 23,
                nationality: "BRAZIL", 
            },
        ]
    },
    {
        id: 4,
        name: "Julio",
        username: "julio123",
        age: 60,
        nationality: "GERMANY",
    },
    {
        id: 5,
        name: "Gustavo",
        username: "gustavo2019",
        age: 5,
        nationality: "CHILE",  
    }
]

const MovieList = [
    {
        id: 1,
        name: "Public Enemies",
        yearOfPublication: 2009,
        isInTheaters: false,
    },
    {
        id: 2,
        name: "Interstellar",
        yearOfPublication: 2007,
        isInTheaters: true,
    },
    {
        id: 3,
        name: "Superbad",
        yearOfPublication: 2009,
        isInTheaters: true,
    },
    {
        id: 4,
        name: "Oliver The Movie",
        yearOfPublication: 2019,
        isInTheaters: false,
    },
    

]

module.exports = {UserList, MovieList}