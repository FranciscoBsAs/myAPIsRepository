// GET :  http://localhost:{{port1}}/users?somePage=1&pageSize=6

const dataResp = pm.response.json() ;

//  access to URL query-param and it has to be in Inter format
const pageSize = parseInt( pm.request.url.query.get( 'pageSize' ) )

pm.test( ` Returns up to ${pageSize} number of users `,  function () {
    
    pm.expect( dataResp.length ).to.be.at.most( pageSize )  // .most(InterNumber)


} )

/* Assertion test result :

PASSED Returns up to 6 number of users

*/