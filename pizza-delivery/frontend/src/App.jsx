import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import MyOrders from "./pages/MyOrders";
import VerifyEmail from "./pages/VerifyEmail";
import AdminDashboard from "./pages/AdminDashboard";
import ManageOrders from "./pages/ManageOrders";
import ManageInventory from "./pages/ManageInventory";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
    return (
        <BrowserRouter>
            <Navbar />
        
            <Routes>
            
                <Route
                    path="/"
                    element={<Home />}
                />
                

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
		    path="/admin"
		    element={<AdminDashboard />}
		/>

		<Route
		    path="/manage-orders"
		    element={<ManageOrders />}
		/>
		<Route
		    path="/manage-inventory"
		    element={<ManageInventory />}
		/>
		<Route
		    path="/verify/:token"
		    element={<VerifyEmail />}
		/>
                <Route path="/my-orders" element={<MyOrders />}/>
				<Route
		    path="/forgot-password"
		    element={<ForgotPassword />}
		/>

		<Route
		    path="/reset-password/:token"
		    element={<ResetPassword />}
		/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
