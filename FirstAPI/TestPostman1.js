// GET :  http://localhost:{{port1}}/users

const dataResp = pm.response.json() ;

pm.test(
    "Scott McGregor is there?", function () {

        const isFound = dataResp.some ( (us) => us.name === "Scott McGregor" );

        pm.expect( isFound ).to.be.true ;

        console.log( "Scott McGregor is in the UserArray" )
    }
)

const expectedNames = [ "Lucía Alarcón" , "Carlos Shangai", "Steve Mussk" ]

expectedNames.forEach( n => {
    
    pm.test( `${ n } is present`, function () {
        
        const isFounded = dataResp.some( us => us.name === n );

        pm.expect( isFounded ).to.be.true ;

        console.log( `${n} está incluido en el UserArray` )

    } )

} )

dataResp.forEach( us => {
    pm.test( `id attributes are in the response`, function () {
        pm.expect( us ).to.have.property( "id" ) ;
    } )
} )


function testUserById ( id ) {
    pm.test(
        `¿ the ID ${id} is present?`, function () {
            
            const isFoundedById = dataResp.some( us => us.id === id ) ;

            pm.expect( isFoundedById ).to.be.true
        }
    )
}

testUserById(6) ;
testUserById(3) ;
testUserById(12)

/* Postman Test Result:

PASSED
Scott McGregor is there?
PASSED
Lucía Alarcón is present
PASSED
Carlos Shangai is present
FAILED
Steve Mussk is present | AssertionError: expected false to be true
PASSED
id attributes are in the response
PASSED
id attributes are in the response
PASSED
id attributes are in the response
PASSED
id attributes are in the response
PASSED
id attributes are in the response
PASSED
id attributes are in the response
PASSED
id attributes are in the response
PASSED
id attributes are in the response
PASSED
¿ the ID 6 is present?
PASSED
¿ the ID 3 is present?
FAILED
¿ the ID 12 is present? | AssertionError: expected false to be true

*/