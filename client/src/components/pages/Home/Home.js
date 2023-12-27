import { Container } from "react-bootstrap"
import AllAds from "../../feautures/AllAds/AllAds"
import Search from "../Search/Search"


const Home = () => {
    return (
        <Container>
            <Search />
            <AllAds />
        </Container>
    )
}

export default Home