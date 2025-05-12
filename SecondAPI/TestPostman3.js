// GET : http://localhost:2400/myGoldEuAPI/gold-euro?decimalPrecision=4

//Snipped Test
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200)
});

const data = pm.response.json();

pm.test("The response has the 3 fields of price ", function () {
    pm.expect(data).to.have.property('Gold24kPriceInEuro')
    pm.expect(data).to.have.property('Gold22kPriceInEuro')
    pm.expect(data).to.have.property("EuPriceInDollar")
});


const priceFields = ['EuPriceInDollar', 'Gold24kPriceInEuro', 'Gold22kPriceInEuro'];

const decimalQuantity = parseInt( pm.request.url.query.get( 'decimalPrecision' ) )

if( !decimalQuantity.ok ) {
    priceFields.forEach( (f) => {
        pm.test( 
        `The ${f} field has ${decimalQuantity} decimals of precision`, function () {

            const value = data[f].match(/[\d.]+/g)?.[0]  || '' 

            const decimals = value.split('.')[1] || ''
            // value.split('.') Convierte el número(con decimal) en una lista con los 2 numeros separada por el punto decimal. El [1] invoca el element despues del entero que esta en [0]

            pm.expect( decimals.length ).to.eql(decimalQuantity) //cuenta cuántos digitos hay después del punto decimal.

        }
        ) 
    } )
}
else{
    return
}

/* Test Results:

PASSED
Status code is 200
PASSED
The response has the 3 fields of price
PASSED
The EuPriceInDollar field has 4 decimals of precision
PASSED
The Gold24kPriceInEuro field has 4 decimals of precision
PASSED
The Gold22kPriceInEuro field has 4 decimals of precision

*/