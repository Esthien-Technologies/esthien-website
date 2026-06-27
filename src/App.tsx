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

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Esthien Labs | Custom FPGA Chipsets for Physical Intelligence",
    description:
      "Esthien Labs builds custom FPGA chipsets, edge AI hardware, bionic-arm control systems, prosthetics electronics, automotive radar, ADAS, and safety-critical embedded systems.",
  },
  "/about": {
    title: "About Esthien Labs | FPGA Chipsets and Physical Intelligence",
    description:
      "Esthien Labs is a deep-tech company focused on FPGA-based chipsets, custom silicon paths, edge AI, control systems, medical assistive devices, and automotive sensing.",
  },
  "/vision": {
    title: "Esthien Labs Vision | Custom Chipsets for Physical AI",
    description:
      "The Esthien Labs vision is to develop FPGA-based edge AI and custom chipsets that improve safety, capability, and reliability in medical and automotive systems.",
  },
  "/capabilities": {
    title: "Esthien Labs Capabilities | FPGA, Edge AI, Bionic Arms, Radar",
    description:
      "Explore Esthien Labs capabilities across FPGA chipset architecture, edge AI, embedded control, bionic arms, prosthetics, automotive radar, ADAS, and sensor fusion.",
  },
  "/contact": {
    title: "Contact Esthien Labs | Partnerships and Technical Inquiries",
    description:
      "Contact Esthien Labs for partnerships, collaborations, investors, customers, assistive medical systems, automotive sensing, FPGA chipsets, and edge AI hardware.",
  },
};

export default function App() {
  const location = useLocation();
  useMotionSystem(location.pathname);

  useEffect(() => {
    const meta = pageMeta[location.pathname] || pageMeta["/"];
    document.title = meta.title;

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) {
      description.content = meta.description;
    }
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
