import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import { useMotionSystem } from "./hooks/useMotionSystem";
import About from "./pages/About";
import Capabilities from "./pages/Capabilities";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
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
        </Routes>
      </main>
      <Footer />
    </>
  );
}
