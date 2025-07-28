import Footer from '../component/footer'
import Navbar from '../component/navbar'
// import Navbar from '../component/navbar/Navbar';

function MainTemplate({ children, isShowFooter = false }) {
    return (
        <div>
            <Navbar />
            {children}
            {isShowFooter && (<Footer />)}
        </div>
    )
}

export default MainTemplate