import Menu from '../components/Menu/Menu';
import Settings from '../components/Settings/Settings';
import { SideBar } from '../components/SideBar/SideBar';
import AddAccount from '../components/Accounts/AddAccount';
import { ToastContainer } from 'react-toastify';
import SeasonBanner from '../components/SeasonBanner/SeasonBanner';
import { Outlet } from "react-router-dom";
import CardLookup from '../components/CardLookup/CardLookup';
import Footer from '../components/Footer/Footer';

const Layout = () => {

    return (
        <>
            <AddAccount />
            <Settings />
            <Menu />
            <SideBar />
            <div className="w3-main" style={{marginTop:'43px'}}>
                <SeasonBanner />
                <ToastContainer
                    limit={10}
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
            <Outlet/> {/**The update page/route is showing becuase of this */}
            <CardLookup/>
            <Footer />
        </>
    )
    
}

export default Layout;