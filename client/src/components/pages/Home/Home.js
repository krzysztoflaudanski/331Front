import { Container } from "react-bootstrap"
import AllAds from "../../feautures/AllAds/AllAds"
import SearchForm from "../../feautures/SearchForm/SearchForm"


const Home = () => {
    return (
        <Container>
            <SearchForm />
            <AllAds />
        </Container>
    )
}

export default Home