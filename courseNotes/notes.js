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
export async function getStaticProps() {
    // get the backend file by constructing the file path and read the data. the data is then passed as a prop which can be used in the JSX. notice no useEffect() here
    // getStaticProps() mainly used for GET routes only since it's supposed to be receiving static data
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)

    return {
        props: {
            products: data.products
        },
    }

}
