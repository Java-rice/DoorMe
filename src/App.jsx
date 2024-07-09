import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Landing from "./pages/landing/Landing";
import About from "./pages/about/About";
import Login from "./pages/login/Login"; // Correct file import
import Register from "./pages/register/Register"; // Correct file import
import How from "./pages/howitworks/How"
import Profile from './pages/profile/Profile';
import Success from './pages/success/Success';
import TransitionWrapper from "./components/transition/TransitionWrapper";
import ScrollToTop from "./components/scrollbehavior/ScrollToTop";
import TermsOfService from "./pages/termsofservice/Termsofservice";
import PrivacyPolicy from "./pages/privacypolicy/Privacypolicy";
import CookiePolicy from "./pages/cookiepolicy/Cookiepolicy";
import SafetyGuidelines from "./pages/safetyguidelines/Safetyguidelines";
import ViewDorm from "./pages/viewdorm/ViewDorm";
import FindDorms from "./pages/finddorms/FindDorms";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <TransitionWrapper>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/HowItWorks" element={<How />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/TermsOfService" element={<TermsOfService />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/CookiePolicy" element={<CookiePolicy />} />
          <Route path="/SafetyGuidelines" element={<SafetyGuidelines />} />
          <Route path="/ViewDorm" element={<ViewDorm />} />
          <Route path="/FindDorms" element={<FindDorms />} />
          <Route path="/Success" element={<Success />} />
        </Routes>
      </TransitionWrapper>
      <Footer />
    </Router>
  );
};

export default App;
