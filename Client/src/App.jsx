// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Hero from "./Components/Hero";
// import PlatformFeatures from "./Components/PlateformFeautures";
// import CryptoSection from "./Components/CryptoSection";
// import SecuritySection from "./Components/SecuritySection";
// import WalletSection from "./Components/WalletSection";
// import ExperiencedSection from "./Components/ExperiencedSection";
// import BuildingTrust from "./Components/BuildingTrust";
// import EndSection from "./Components/EndSection";
// import Dashboard from "./Components/Dashboard";

// const Layout = ({ children }) => {
//   const location = useLocation();
//   return (
//     <>
//       {location.pathname !== "/dashboard" && <Navbar />}
//       {children}
//     </>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 <Hero />
//                 <PlatformFeatures />
//                 <CryptoSection />
//                 <SecuritySection />
//                 <WalletSection />
//                 <ExperiencedSection />
//                 <BuildingTrust />
//                 <EndSection />
//               </>
//             }
//           />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './Components/Loginpage';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import CryptoSection from './Components/CryptoSection';
import BuildingTrust from './Components/BuildingTrust';
import ExperiencedSection from './Components/ExperiencedSection';
import SecuritySection from './Components/SecuritySection';
import PlateformFeautures from './Components/PlateformFeautures';
import WalletSection from './Components/WalletSection';
import EndSection from './Components/EndSection';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <PlateformFeautures />
              <CryptoSection />
              <BuildingTrust />
              <ExperiencedSection />
              <SecuritySection />
              <WalletSection />
              <EndSection />
            </>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

