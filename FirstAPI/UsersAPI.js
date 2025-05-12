// npm install express
// npm install nodemon -g

const expressU = require( "express" )

const appUser = expressU()

const port1 = 2000


const usersArray = [
    {
        id: 1,
        name: "Carlos Shangai",
        nationality: "Vietnamita",
    },
    {
        id: 2,
        name: "Teresa Vora",
        nationality: "Italiana",
    },
    {
        id: 3,
        name: "Abul Khabar",
        nationality: "Marroqui",
    },
    {
        id:4,
        name: "Cristiano Ron",
        nationality: "Portugues",
    },
    {
        id: 5,
        name: "Lucía Alarcón",
        nationality: "Española",
    },
    {
        id: 6,
        name: "William MacLeod",
        nationality: "Escocés",
    },
    {
        id: 8,
        name: "Scott McGregor",
        nationality: "Escocesa",
    },
    {
        id: 9,
        name: "Jaime Alcaraz",
        nationality: "Española"
    }

]


// API logic

appUser.get(
    "/users", ( req, resp ) => {
        
        const somePage = +req.query.somePage

        const pageSize = +req.query.pageSize

        if(  Number.isInteger( somePage )  &&  somePage > 0  &&  Number.isInteger( pageSize )  &&  pageSize > 0  ) {

            const start = ( somePage - 1 )*pageSize

            const end = start + pageSize


            resp.json( usersArray.slice( start, end ) )

        }
        else {
            resp.json( usersArray )
        }

    }
)

appUser.get( 
    "users/:id",  ( req, resp ) => {            // : dynamic router

        resp.json( usersArray.find( (p) => (
            
            p.id === +req.params.id

        )
        ) )
    }
) 

appUser.listen(
    port1, ()=> console.log(`Te escucho por el puerto ${port1} API escuchando en http://localhost:${port1}/users`)
)

// ej URL : http://localhost:2000/users?somePage=1&pageSize=3