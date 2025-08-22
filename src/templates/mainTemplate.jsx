import Footer from '../component/footer'
import Navbar from '../component/navbar'
import NavHome from '../component/navbar/navHome'

function MainTemplate({ children, isShowFooter = false }) {

    return (
        <div>
            {/* <Navbar /> */}
            <NavHome />
            {children}
            {isShowFooter && (<Footer />)}
        </div>
    )
}

export default MainTemplate