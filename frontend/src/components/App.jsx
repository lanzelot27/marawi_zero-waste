import React from 'react';
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
import ManageMap from './components/ManageMap';
import ManageSchedules from './components/ManageSchedules';
import ManageResources from './components/ManageResources';
import ManagePointSystem from './components/ManagePointSystem';
import ManageMessage from './components/ManageMessage';
import ManageFeedback from './components/ManageFeedback';
import WCDashboard from './components/WCDashboard';
import WCProfile from './components/WCProfile';
import WCDash from './components/WCDash';
import WCManageMapSchedules from './components/WCManageMapSchedules'
import WCManageSchedules from './components/WCManageSchedules';
import WCResources from './components/WCResources';
import WCBiodegradables from './components/WCBiodegradables';
import WCNonBiodegradables from './components/WCNonBiodegradables';
import WCRecyclables from './components/WCRecyclables';
import WCNonRecyclables from './components/WCNonRecyclables';
import WCEwastes from './components/WCEwastes';
import WCPolicies from "./components/WCPolicies";


import WCFeedback from './components/WCFeedback';
import CommunityDashboard from './components/CommunityDashboard';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import MapSchedules from './components/MapSchedules';
import Resources from './components/Resources';
import Biodegradables from './components/Biodegradables';
import NonBiodegradables from './components/NonBiodegradables';
import Recyclables from './components/Recyclables';
import NonRecyclables from './components/NonRecyclables';
import EWastes from './components/EWastes';
import Policies from './components/Policies';
import Messages from './components/Messages';
import Feedback from './components/Feedback';


function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const showFooter = location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/admin'
    && location.pathname !== '/manage-accounts' && location.pathname !== '/manage-dashboard' && location.pathname !== '/manage-map-schedules' && location.pathname !== '/manage-map-schedules/map' && location.pathname !== '/manage-map-schedules/schedules' && location.pathname !== '/manage-resources' && location.pathname !== '/manage-point-system' && location.pathname !== '/manage-message' && location.pathname !== '/manage-feedback' && location.pathname !== '/manage-accounts/waste-collector' && location.pathname !== '/manage-accounts/community'
    && location.pathname !== '/wastecollector' 
    && location.pathname !== '/wc-profile' && location.pathname !== '/wc-dashboard' && location.pathname !== '/wc-manage-map-schedules' && location.pathname !== '/wc-manage-map-schedules/schedules' && location.pathname !== '/wc-resources' && location.pathname !== '/wc-biodegradables' && location.pathname !== '/wc-feedback'
    && location.pathname !== '/community'
    && location.pathname !== '/profile' && location.pathname !== '/dashboard' && location.pathname !== '/map-schedules' && location.pathname !== '/resources' && location.pathname !== '/biodegradables' && location.pathname !== '/non-biodegradables' && location.pathname !== '/recyclables' && location.pathname !== '/non-recyclables' && location.pathname !== '/e-wastes' && location.pathname !== '/policies'
    && location.pathname !== '/feedback' && location.pathname !== '/messages';

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
        <Route path="/manage-point-system" element={<ManagePointSystem />} />
        <Route path="/manage-message" element={<ManageMessage />} />
        <Route path="/manage-feedback" element={<ManageFeedback />} />

        {/* Waste Collector Dashboard */}
        <Route path="/wastecollector" element={<WCDashboard />} />
        <Route path="/wc-profile" element={<WCProfile />} />
        <Route path="/wc-dashboard" element={<WCDash />} />
        <Route path="/wc-manage-map-schedules" element={<WCManageMapSchedules />} />
              <Route path="/wc-manage-map-schedules/schedules" element={<WCManageSchedules />} />
        <Route path="/wc-resources" element={<WCResources />} />
              <Route path="/wc-biodegradables" element={<WCBiodegradables />} />
              <Route path="/wc-non-biodegradables" element={<WCNonBiodegradables />} />
              <Route path="/wc-recyclables" element={<WCRecyclables />} />
              <Route path="/wc-non-recyclables" element={<WCNonRecyclables />} />
              <Route path="/wc-ewastes" element={<WCEwastes />} />
              <Route path="/wc-policies" element={<WCPolicies />} />

        <Route path="/wc-feedback" element={<WCFeedback />} />
        

        {/* Community Dashboard */}
        <Route path="/community" element={<CommunityDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map-schedules" element={<MapSchedules />} />
        <Route path="/resources" element={<Resources />} />
              <Route path="/biodegradables" element={<Biodegradables />} />
              <Route path="/non-biodegradables" element={<NonBiodegradables />} />
              <Route path="/recyclables" element={<Recyclables />} />
              <Route path="/non-recyclables" element={<NonRecyclables />} />
              <Route path="/e-wastes" element={<EWastes />} />
              <Route path="/policies" element={<Policies />} />

        <Route path="/messages" element={<Messages />} />
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
