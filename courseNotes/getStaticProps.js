
// these two imports are used to read the file
import path from 'path'
import fs from 'fs/promises'

function Home(props) {

    // retreives data from the backend once getStaticProps() runs. Can now used to map out product data in the JSX
    const { products } = props

    return (
        <ul>
            {products.map((product) => {
                <li key={product.id}>{product.title}</li>
            })}
        </ul>
    )
}

// used to retreive product data from the backend for pre-rendering
export async function getStaticProps(/*context*/) {  // <----------------- context arg only needed if you need to grab URL params for rendering context (ex: /products/1)

    // IF YOU NEED TO GRAB URL PARAMS (*** for dynamic pages ***):
        // const { params } = context
        // const productId = params.eventId <---- this goes off of what the file name is (ex: [productId].js )


    // get the backend file by constructing the file path and read the data. the data is then passed as a prop which can be used in the JSX. notice no useEffect() here
    // getStaticProps() mainly used for GET routes only since it's supposed to be receiving static data
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)

    // if(!data) {    <----- used for the redirecting (if something goes wrong with fetching data)
    //     return {
    //         redirect: {
    //             destination: '/no-data-route'
    //         }
    //     }
    // }

    // if(data.products.length === 0) return {notFound: true}  <---- if set to true, will render your 404 page (additional arg for return obj in getStaticProps())

    return {
        props: {
            products: data.products
        },
        revalidate: 10, // <---------- THIS KEY IS SUPPOSED TO SUBSTITUTE A USE-EFFECT, when you make a request to the page, if "x" amount of time has passed since
                                        // the page has been re-generated, it will run getStaticProps() function again to retreive the LATEST DATA
                                        // this behavior can only be observed in production. the page will always have latest data when in a development server
    }

}
