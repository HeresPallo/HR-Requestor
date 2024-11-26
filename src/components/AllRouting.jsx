
import { Route, Routes } from "react-router-dom";
import NextofKin from './NextofKin/NextofKin';
import Insurance from './Insurance/Insurance';
import NotFound from './NotFound/NotFound';
import Fiber from "./Fiber/Fiber";
import Home from "./Overview/Home";
import Phone from "./PhoneClaim/Phone";
import IDCard from "./ID Cards/IDCards";
import DashboardLayout from './Admin/DashboardLayout';
import NextofKinAdmin from "./Admin/NextofKinAdmin";
import OverviewAdmin from "./Admin/OverviewAdmin";
import FiberAdmin from "./Admin/FiberAdmin";
import PhoneClaimAdmin from "./Admin/PhoneClaimAdmin";
import InsuranceAdmin from "./Admin/InsuranceAdmin";
import IDCardAdmin from "./Admin/IDCardAdmin";
import PerDiemSection from "./Per Diem/PerDiemSection";
import PerDiemAdmin from "./Admin/Overview/PerDiemAdmin";




const AllRouting = () => {
    return (

<Routes>
            {/* User Routes */}
            <Route className="bg-orange-500" path="/" element={<Home/>}/>
            <Route path="/perdiem" element={<PerDiemSection/>}/>
            <Route path="/nextofkin" element={<NextofKin/>}/>
            <Route path="/phoneclaim" element={<Phone/>}/>
            <Route path="/insurance" element={<Insurance/>}/>
            <Route path="/idcard" element={<IDCard/>}/>
            <Route path="/fiber" element={<Fiber/>}/>

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
        <Route path="/admin/overview" element={<OverviewAdmin/>}/>
        <Route path="/admin/perdiem" element={<PerDiemAdmin/>}/>
        <Route path="/admin/nextofkin" element={<NextofKinAdmin/>}/>
        <Route path="/admin/fiber" element={<FiberAdmin/>}/>
        <Route path="/admin/phoneclaim" element={<PhoneClaimAdmin/>}/>
        <Route path="/admin/insurance" element={<InsuranceAdmin/>}/>
        <Route path="/admin/idcard" element={<IDCardAdmin/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
            </Routes>
    )
}

export default AllRouting;