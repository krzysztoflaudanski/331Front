import { useSelector } from "react-redux";
import { getAllAds } from "../../../redux/adsRedux";


const AllAds = () => {

    const ads = useSelector(getAllAds)
    console.log(ads)

    return(<section id="allAdds">
        hihi
    </section>)
}

export default AllAds;