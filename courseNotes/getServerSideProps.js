function UserProfilePage(props) {
    return <h1>{props.username}</h1>
}

// function used for SSR rendering that can receive data from backend to prerender data... context arg in this case allows full access to the request object
export async function getServerSideProps(context) {

    // same format as Express.js
    const { params, req, res } = context

    // same structure as the getStaticProps() return object except no 'revalidate' key, since SSR will pre-render the page for every request made regardless
    return {
        props: {
            username: 'Max'
        }
    }
}

// export default UserProfilePage




//---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// getServerSideProps() for Dynamic Pages...

// The UserIdPage component receives the 'id' from getServerSideProps and renders it.
function UserIdPage(props) {
    return <h1>{props.id}</h1>
}

export default UserIdPage

// This function fetches dynamic data for the UserIdPage component.
export async function getServerSideProps(context) {
    const { params } = context
    const userId = params.userId  // Ensure the parameter matches the dynamic file name (ex --> [userId].js).

    return {
        props: {
            id: userId
        }
    }
}

// Note that you don't need getStaticPaths() for this to work. This is because getServerSideProps runs during production for each request to the page,
// allowing you to always have the latest data from your backend on the HTML page before its sent to the client, making it accessible to screen readers.
