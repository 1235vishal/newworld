// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Home from "./Pages/Home";
// import About from "./Pages/About";
// import Contact from "./Pages/Contact";
// import Footer from "./Components/Footer";
// import TrustAndCareOverview from "./Pages/Trust&CareOverview";

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/trust-care" element={<TrustAndCareOverview />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

// export default App;

// src/App.jsx
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
// Make sure your file is named TrustAndCareOverview.jsx (matching this import)
import TrustAndCareOverview from "./Pages/Trust&CareOverview";
import WhatsAppButton from "./Pages/WhatsAppButton";

const App = () => {
  return (
    <Router>
      <Navbar />
      <WhatsAppButton />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trust-care" element={<TrustAndCareOverview />} />
        {/* new lightweight page with the WhatsApp quick button */}
        <Route path="/whatsapp" element={<WhatsAppButton />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
