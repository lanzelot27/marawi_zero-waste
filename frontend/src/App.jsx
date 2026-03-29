import { AuthProvider } from "./AuthContext";
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Info from './pages/Info';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ManageAccounts from './components/ManageAccounts';
import MAWasteCollector from './components/MAWasteCollector';
import MACommunity from './components/MACommunity';
import ManageDashboard from './components/ManageDashboard';
import ManageMapSchedules from './components/ManageMapSchedules';

import MapSchedules from './components/MapSchedules';
import Map from './components/Map';
import Schedules from './components/Schedules';

import ManageMap from './components/ManageMap';
import ManageSchedules from './components/ManageSchedules';
import ManageResources from './components/ManageResources';
import ManageBiodegradables from './components/ManageBiodegradables'
import ManageNonBiodegradables from './components/ManageNonBiodegradables'
import ManageRecyclables from './components/ManageRecyclables';
import ManageNonRecyclables from './components/ManageNonRecyclables'
import ManageEWastes from './components/ManageEWastes'
import ManagePolicies from './components/ManagePolicies'
import ManageEvents from './components/ManageEvents'
import ManagePointSystem from './components/ManagePointSystem';
import ManagePoints from './components/ManagePoints';
import ManageProof from './components/ManageProof';
import ManageMessage from './components/ManageMessage';
import ManageFeedback from './components/ManageFeedback';
import WCDashboard from './components/WCDashboard';
import WCProfile from './components/WCProfile';
import WCDash from './components/WCDash';
import WCManageMapSchedules from './components/WCManageMapSchedules'
import WCMap from './components/WCMap';
import WCManageSchedules from './components/WCManageSchedules';
import WCResources from './components/WCResources';
import WCBiodegradables from './components/WCBiodegradables';
import WCNonBiodegradables from './components/WCNonBiodegradables';
import WCRecyclables from './components/WCRecyclables';
import WCNonRecyclables from './components/WCNonRecyclables';
import WCEwastes from './components/WCEwastes';
import WCPolicies from "./components/WCPolicies";
import WCEvents from "./components/WCEvents";
import WCPointSystem from "./components/WCPointSystem";
import WCFeedback from './components/WCFeedback';



import CommunityDashboard from './components/CommunityDashboard';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';

import Resources from './components/Resources';
import Biodegradables from './components/Biodegradables';
import NonBiodegradables from './components/NonBiodegradables';
import Recyclables from './components/Recyclables';
import NonRecyclables from './components/NonRecyclables';
import EWastes from './components/EWastes';
import Policies from './components/Policies';
import Events from './components/Events';

import PointSystem from './components/PointSystem';
import Feedback from './components/Feedback';

import LandingNavbar from "./components/LandingNavbar";


function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
function AppContent() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on app load and when location changes
  useEffect(() => {
    const token = localStorage.getItem('token'); // Replace with your auth logic
    setIsLoggedIn(!!token); // Set to true if token exists
  }, [location]);
  const showFooter = location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/admin'
  && location.pathname !== '/admin'
  && location.pathname !== '/manage-accounts' && location.pathname !== '/manage-accounts/waste-collector' && location.pathname !== '/manage-accounts/community' 
  && location.pathname !== '/manage-dashboard' && location.pathname !== '/manage-map-schedules' && location.pathname !== '/manage-map-schedules/map' && location.pathname !== '/manage-map-schedules/schedules'
  && location.pathname !== '/manage-resources' && location.pathname !== '/manage-point-system' && location.pathname !== '/manage-message' && location.pathname !== '/manage-feedback' 
   && location.pathname !== '/wastecollector' 
   && location.pathname !== '/manage-points'  && location.pathname !== '/manage-proof' 
    && location.pathname !== '/manage-resources' && location.pathname !== '/manage-resources/biodegradables' && location.pathname !== '/manage-resources/non-biodegradables' && location.pathname !== '/manage-resources/recyclables' && location.pathname !== '/manage-resources/non-recyclables' && location.pathname !== '/manage-resources/ewastes' && location.pathname !== '/manage-resources/policies' && location.pathname !== '/manage-resources/events'
  && location.pathname !== '/wc-profile' && location.pathname !== '/wc-dashboard' && location.pathname !== '/wc-manage-map-schedules' && location.pathname !== '/wc-map' && location.pathname !== '/wc-manage-map-schedules/schedules' 
  && location.pathname !== '/wc-resources' && location.pathname !== '/wc-biodegradables' && location.pathname !== '/wc-non-biodegradables' && location.pathname !== '/wc-recyclables' && location.pathname !== '/wc-non-recyclables' && location.pathname !== '/wc-ewastes' && location.pathname !== '/wc-policies' && location.pathname !== '/wc-events'
  && location.pathname !== '/wc-point-system' && location.pathname !== '/wc-feedback'
  && location.pathname !== '/community'
  && location.pathname !== '/profile' && location.pathname !== '/dashboard' && location.pathname !== '/map-schedules' && location.pathname !== '/map-schedules/map' && location.pathname !== '/map-schedules/schedules'  
  && location.pathname !== '/resources' && location.pathname !== '/biodegradables' && location.pathname !== '/non-biodegradables' && location.pathname !== '/recyclables' && location.pathname !== '/non-recyclables' && location.pathname !== '/e-wastes' && location.pathname !== '/policies' && location.pathname !== '/events'
  && location.pathname !== '/point-system' && location.pathname !== '/feedback';

  return (
    <main className="bg-primary text-tertiary">
      
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Info />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manage-accounts" element={<ManageAccounts />} />
             <Route path="/manage-accounts/waste-collector" element={<MAWasteCollector />} />
             <Route path="/manage-accounts/community" element={<MACommunity />} />
        <Route path="/manage-dashboard" element={<ManageDashboard />} />
        <Route path="/manage-map-schedules" element={<ManageMapSchedules />} />
              <Route path="/manage-map-schedules/map" element={<ManageMap />} />
              <Route path="/manage-map-schedules/schedules" element={<ManageSchedules />} />
        
        <Route path="/manage-resources" element={<ManageResources />} />
              <Route path="/manage-resources/biodegradables" element={<ManageBiodegradables />} />
              <Route path="/manage-resources/non-biodegradables" element={<ManageNonBiodegradables />} />
              <Route path="/manage-resources/recyclables" element={<ManageRecyclables />} />
              <Route path="/manage-resources/non-recyclables" element={<ManageNonRecyclables />} />
              <Route path="/manage-resources/ewastes" element={<ManageEWastes />} />
              <Route path="/manage-resources/policies" element={<ManagePolicies />} />
              <Route path="/manage-resources/events" element={<ManageEvents />} />
        <Route path="/manage-point-system" element={<ManagePointSystem />} />
              <Route path="/manage-points" element={<ManagePoints />} />
              <Route path="/manage-proof" element={<ManageProof />} />
        <Route path="/manage-message" element={<ManageMessage />} />
        <Route path="/manage-feedback" element={<ManageFeedback />} />

        {/* Waste Collector Dashboard */}
        
        <Route path="/wastecollector" element={<WCDashboard />} />
        <Route path="/wc-profile" element={<WCProfile />} />
        <Route path="/wc-dashboard" element={<WCDash />} />
        <Route path="/wc-manage-map-schedules" element={<WCManageMapSchedules />} />
              <Route path="/wc-manage-map-schedules/wc-map" element={<WCMap />} />
              <Route path="/wc-manage-map-schedules/schedules" element={<WCManageSchedules />} />
        <Route path="/wc-resources" element={<WCResources />} />
              <Route path="/wc-biodegradables" element={<WCBiodegradables />} />
              <Route path="/wc-non-biodegradables" element={<WCNonBiodegradables />} />
              <Route path="/wc-recyclables" element={<WCRecyclables />} />
              <Route path="/wc-non-recyclables" element={<WCNonRecyclables />} />
              <Route path="/wc-ewastes" element={<WCEwastes />} />
              <Route path="/wc-policies" element={<WCPolicies />} />
              <Route path="/wc-events" element={<WCEvents />} />
        <Route path="/wc-point-system" element={<WCPointSystem />} />
        <Route path="/wc-feedback" element={<WCFeedback />} />
        
       
        

        {/* Community Dashboard */}
        <Route path="/community" element={<CommunityDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map-schedules" element={<MapSchedules />} />
        <Route path="/map-schedules/schedules" element={<Schedules />} />
        <Route path="/map-schedules/map" element={<Map />} />
        
        <Route path="/resources" element={<Resources />} />
              <Route path="/biodegradables" element={<Biodegradables />} />
              <Route path="/non-biodegradables" element={<NonBiodegradables />} />
              <Route path="/recyclables" element={<Recyclables />} />
              <Route path="/non-recyclables" element={<NonRecyclables />} />
              <Route path="/e-wastes" element={<EWastes />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/events" element={<Events />} />
              

        <Route path="/point-system" element={<PointSystem />} />
        <Route path="/feedback" element={<Feedback />} />

      </Routes>
      {showFooter && <Footer />}
    </main>
  );
}



export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
