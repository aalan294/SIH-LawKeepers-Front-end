import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home'

// Admin
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminLogin from './Pages/Admin/AdminLogin';
import RegJudge from './Pages/Admin/Register/RegJudge';
import RegLawyer from './Pages/Admin/Register/RegLawyer';
import RegPolice from './Pages/Admin/Register/RegPolice';
import UpdJudge from './Pages/Admin/Update/UpdJudge';
import UpdLawyer from './Pages/Admin/Update/UpdLawyer';
import UpdPolice from './Pages/Admin/Update/UpdPolice';

// Defender
import DefCaseDet from './Pages/Defender/DefCaseDet';
import DefDashboard from './Pages/Defender/DefDashboard';
import DefLogin from './Pages/Defender/DefLogin';
import LawyerList from './Pages/Defender/LawyerList';

// Judge
import JudCase from './Pages/Judge/JudCase';
import JudDashboard from './Pages/Judge/JudDashboard';
import JudLogin from './Pages/Judge/JudLogin';

// Lawyer
import LawCase from './Pages/Lawyer/LawCase';
import LawDashboard from './Pages/Lawyer/LawDashboard';
import LawLogin from './Pages/Lawyer/LawLogin';
import Requests from './Pages/Lawyer/Requests';

// Police
import Action from './Pages/Police/Action';
import NewCase from './Pages/Police/NewCase';
import PolDashboard from './Pages/Police/PolDashboard';
import PolLogin from './Pages/Police/PolLogin';
import UpdateCase from './Pages/Police/UpdateCase';
import LawCaseDet from './Pages/Lawyer/LawCaseDet';
import JudCaseDet from './Pages/Judge/JudCaseDet';
import VedioCall from './Pages/VedioCall';

const App = () => {
  const contract = '0xA4bd3b69114E22096CbF24D285Ae0c56e3025186'
  useEffect(()=>{
    localStorage.setItem('SIH-contract', JSON.stringify(contract));
  })
  return (
    <>
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        <Route path="/video-call" element={<VedioCall/>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/register/judge" element={<RegJudge />} />
        <Route path="/admin/register/lawyer" element={<RegLawyer />} />
        <Route path="/admin/register/police" element={<RegPolice />} />
        <Route path="/admin/update/judge" element={<UpdJudge />} />
        <Route path="/admin/update/lawyer" element={<UpdLawyer />} />
        <Route path="/admin/update/police" element={<UpdPolice />} />

        {/* Defender Routes */}
        <Route path="/user/login" element={<DefLogin />} />
        <Route path="/user/dashboard" element={<DefDashboard />} />
        <Route path="/user/case-details/:id" element={<DefCaseDet />} />
        <Route path="/user/lawyer-list" element={<LawyerList />} />

        {/* Judge Routes */}
        <Route path="/judge/login" element={<JudLogin />} />
        <Route path="/judge/dashboard" element={<JudDashboard />} />
        <Route path="/judge/case" element={<JudCase />} />
        <Route path="/judge/case-details/:id" element={<JudCaseDet/>} />

        {/* Lawyer Routes */}
        <Route path="/lawyer/login" element={<LawLogin />} />
        <Route path="/lawyer/dashboard" element={<LawDashboard />} />
        <Route path="/lawyer/case" element={<LawCase />} />
        <Route path="/lawyer/requests" element={<Requests />} />
        <Route path="/lawyer/case-details/:id" element={<LawCaseDet/>} />

        {/* Police Station Routes */}
        <Route path="/police/login" element={<PolLogin />} />
        <Route path="/police/dashboard" element={<PolDashboard />} />
        <Route path="/police/new-case" element={<NewCase />} />
        <Route path="/police/update-case" element={<UpdateCase />} />
        <Route path="/police/action" element={<Action />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
