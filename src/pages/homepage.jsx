import Banner1 from "../component/banner1"
import Banner2 from "../component/banner2"
import Banner3 from "../component/banner3"
import Banner4 from "../component/banner4"
import Banner5 from "../component/banner5"
import Banner6 from "../component/banner6"
import Banner7 from "../component/banner7"
import Navbar from "../component/navbar"

function Homepage() {
    return (
        <div>
            <Navbar />
            <Banner1 />
            <Banner5 />
            <Banner2 />
            <Banner4 />
            <Banner3 />
            <Banner6 />
            <Banner7 />
        </div>
    )
}

export default Homepage