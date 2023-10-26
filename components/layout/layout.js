import MainHeader from "./main-header"

function Layout(props) {
    return (
        <>
            <MainHeader />
            {/* optional for clearness ----> can wrap props.children inside of a <main></main> tag */}
            {props.children}
        </>
    )
}

export default Layout
