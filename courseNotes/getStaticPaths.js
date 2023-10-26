// Import the required modules to read files.
import path from 'path'
import fs from 'fs/promises'

// The ProductDetails component receives the product information as a prop and renders it.
function ProductDetails(props) {
    // Destructure the 'singleProductInfo' prop for easy access.
    const { loadedProduct } = props

    return (
        <ul>
            <li>{loadedProduct.name}</li>
            <li>{loadedProduct.price}</li>
        </ul>
    )
}

// This function is used to fetch and provide data for the ProductDetails component.
export async function getStaticProps(context) { // context arg used here to grab the URL params...
    // If you need to grab URL parameters (for dynamic pages), you can access them from the 'context' object.
    const { params } = context
    const productId = params.productId // Extract the 'productId' parameter from the URL.

    // Define the file path to read data from a JSON file.
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')

    // Read the JSON data from the file and parse it.
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)

    // Find the product that matches the specified 'productId'.
    const product = data.products.find(product => product.id === productId)

    // Return the product data as props for rendering.
    return {
        props: {
            loadedProduct: product
        },
        // The 'revalidate' option sets the time interval (in seconds) for revalidating the data.
        revalidate: 10, // Example: Revalidate the page every 10 seconds.
    }
}

// This function is used in Next.js to specify which dynamic routes should be pre-rendered at build time.
export async function getStaticPaths() {
    return {
        paths: [
            // The 'paths' array should contain objects with 'params' key-value pairs.
            // Each 'params' object represents a specific route to be pre-rendered.

            // In this example, we're pre-rendering product pages for three specific product IDs.
            // You can dynamically generate these based on your data if you have a large number of products.

            { params: { productId: '1' } },
            { params: { productId: '2' } },
            { params: { productId: '3' } }
        ],
        // By setting 'fallback' to false, Next.js will return a 404 error for routes not defined in 'paths'.
        // If you want to handle undefined routes differently, you can set 'fallback' to 'blocking' or 'true'.
        // - 'blocking' will generate the page on the first request and cache it for future requests.
        // - 'true' will allow undefined routes to be generated on-the-fly but might show loading spinners to users.
        fallback: false
    };
}


    // export default function ProductDetails  (commented out to avoid conflicts with other files)
