import { Container } from "react-bootstrap"
import SearchForm from "../../feautures/SearchForm/SearchForm"
import SearchResults from "../../feautures/SearchResults/SearchResults"

const Search = () => {
    return (
        <Container>
            <SearchForm />
            <SearchResults />
        </Container>
    )
}

export default Search