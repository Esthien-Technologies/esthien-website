import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import { useMotionSystem } from "./hooks/useMotionSystem";
import About from "./pages/About";
import Capabilities from "./pages/Capabilities";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import SecurityAlert from "./pages/SecurityAlert";
import Vision from "./pages/Vision";

export default function App() {
  const location = useLocation();
  useMotionSystem(location.pathname);

  useEffect(() => {
    document.title = "Esthien Labs";
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main className="site-main">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/error" element={<ErrorPage code="500" title="Something slipped out of phase." body="The site reached a safe fallback state. Try the previous page or return home." />} />
          <Route path="/security-alert" element={<SecurityAlert />} />
          <Route path="/system-lockdown" element={<SecurityAlert />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
