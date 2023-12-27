import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';
import Header from "./components/views/Header/Header";
import Home from "./components/pages/Home/Home";
import Ad from "./components/pages/Ad/Ad"
import AdAdd from "./components/pages/AdAdd/AdAdd"
import Remove from "./components/pages/AdRemove/AdRemove"
import Edit from './components/pages/AdEdit/AdEdit'
import Search from "./components/pages/Search/Search"
import Login from "./components/pages/Login/Login"
import Register from "./components/pages/Register/Register"
import Logout from './components/feautures/Logout/Logout'
import NotFound from "./components/views/NotFound/NotFound"
import Footer from "./components/views/Footer/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAds } from "./redux/adsRedux";


function App() {

   const dispatch = useDispatch();

   useEffect(() => dispatch(fetchAds()), [dispatch]);
  
  return (
    <Container>
      <Header />
      <Search />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ad/:id" element={<Ad />} />
        <Route path="/ad/add" element={<AdAdd />} />
        <Route path="/ad/edit/:id" element={<Edit />} />
        <Route path="/ad/remove/:id" element={<Remove />} />
        <Route path="/search/:searchPhrase" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
