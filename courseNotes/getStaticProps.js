// Import the required modules to read files.
import path from 'path'
import fs from 'fs/promises'

// The Home component receives data from the backend through props and maps it to JSX for rendering.
function Home(props) {
    // Retrieve product data obtained from getStaticProps and map it to the JSX.
    const { products } = props

    return (
        <ul>
            {products.map((product) => {
                // Use the 'key' attribute to provide a unique identifier for each list item.
                <li key={product.id}>{product.title}</li>
            })}
        </ul>
    )
}

// This function is used to retrieve product data from the backend for pre-rendering.
export async function getStaticProps() {
    // Construct the file path to the backend data and read it.
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)

    // Check for data availability, redirects, or not found scenarios.
    // Example redirect:
    // if (!data) {
    //     return {
    //         redirect: {
    //             destination: '/no-data-route'
    //         }
    //     }
    // }
    // Example not found:
    // if (data.products.length === 0) {
    //     return { notFound: true }
    // }

    return {
        props: {
            // Pass the product data as a prop to the Home component.
            products: data.products
        },
        // The 'revalidate' option specifies the time interval (in seconds) for revalidating the data.
        revalidate: 10,
        // The 'revalidate' option helps ensure that the page has the latest data when making a request.
        // It acts as a substitute for a useEffect and is only observed in production builds.
        // In development, the page always uses the latest data from the server.
    }
}

// export default function Home
