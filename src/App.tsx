import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationTestLanding, PanelsNav, DropdownNav, TabsNav } from './pages/NavigationTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Navigation Test Prototypes */}
        <Route path="/" element={<NavigationTestLanding />} />
        <Route path="/panels" element={<PanelsNav />} />
        <Route path="/dropdown" element={<DropdownNav />} />
        <Route path="/tabs" element={<TabsNav />} />

        {/* Redirect old paths */}
        <Route path="/nav-test" element={<Navigate to="/" replace />} />
        <Route path="/nav-test/panels" element={<Navigate to="/panels" replace />} />
        <Route path="/nav-test/dropdowns" element={<Navigate to="/dropdown" replace />} />
        <Route path="/nav-test/tabs" element={<Navigate to="/tabs" replace />} />

        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
