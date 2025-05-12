// npm install node-fetch@2
// npm install dotenv

require('dotenv').config() ;

const expressGoldEu = require( 'express' ) ;
const appGoldEu = expressGoldEu( ) ;

const fetchFunction = require( 'node-fetch' ) ;

const port2 = 2400

console.log("Token cargado:", process.env.GOLDAPI_TOKEN);


appGoldEu.get(
    '/myGoldEuAPI/gold-euro',  async ( myReq, myResp ) => {

        try {

            const decimalPrecision = parseInt( myReq.query.decimalPrecision ) || 2 ;

            // usd-eu fetching
            const usdToEuResponse = await fetchFunction( 'https://api.frankfurter.app/latest?from=EUR&to=USD' )

                if( !usdToEuResponse.ok ) {
                    throw new Error(` API externa respondió con error: ${usdToEuResponse.status} `)
                }

                const dataUsd = await usdToEuResponse.json()

                const euPriceInDollar = parseFloat( dataUsd.rates.USD ).toFixed( decimalPrecision ) 

            
            // gold fetching
            const goldInUsdResponse = await fetchFunction( 'https://www.goldapi.io/api/XAU/USD', {
                
                headers: {
                    "x-access-token": process.env.GOLDAPI_TOKEN,
                    "Content-Type": process.env.GOLDAPI_CONTENT_TYPE,
                }
            } )

                if( !goldInUsdResponse.ok ) {
                    throw new Error(`GoldAPI respondió con error: ${goldInUsdResponse.status}`)

                }

                const dataGold = await goldInUsdResponse.json()

                const gold24kInUsd = dataGold.price_gram_24k
                const gold22kInUsd = dataGold.price_gram_22k

                // Convert to Euro

                //const decimalPrecision = parseInt( myReq.query.decimalPrecision ) || 2 ;


                const gold24kInEuro = parseFloat( ( gold24kInUsd/euPriceInDollar ) ).toFixed( decimalPrecision )
                const gold22kInEuro = parseFloat( ( gold22kInUsd/euPriceInDollar ) ).toFixed( decimalPrecision )

                
                const convertObject = {
                    AlertAclaration: 'The developer of this API is not responsible for the accuracy, timeliness, or reliability of the exchange rates provided. Data is retrieved from external sources.',
                    SourceDollar: 'Frankfurter API',
                    SourceGold: 'GoldApi',
                    EuPriceInDollar: '$' + euPriceInDollar,
                    Gold24kPriceInEuro: '€' + gold24kInEuro,
                    Gold22kPriceInEuro: '€' + gold22kInEuro,
                }

                myResp.status(200).json( convertObject )
        }

        catch (err) {
            console.error("this error in the API", err.message)

            myResp.status(500).json(
            {
                err:"can't get price data",
                message: err.message,
            }
        )
        }
 
    } )

appGoldEu.listen( port2, ()=> {
    console.log( ` \n API escuchando en http://localhost:${port2}/myGoldEuAPI/gold-euro ` )
} )

