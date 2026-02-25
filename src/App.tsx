import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import { Home, MyInfo, People, Hiring, Reports, Files, Payroll, Settings, Inbox, NewEmployeePage, DatePickerDemo, CreateJobOpening, JobAIPrototype } from './pages';
import { JobOpeningDetail } from './pages/JobOpeningDetail';
import { Chat } from './pages/Chat';
import { ChatTransitionsDemo } from './pages/ChatTransitionsDemo';
import { TextReflowDemo } from './pages/TextReflowDemo';
import { TextReflowDemo2 } from './pages/TextReflowDemo2';
import { ChatProvider } from './contexts/ChatContext';
import { NavigationTestLanding, PanelsNav, DropdownNav, TabsNav } from './pages/NavigationTest';

function App() {
  return (
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          {/* Chat routes - Full page, no AppLayout */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:conversationId" element={<Chat />} />

          {/* Demo routes for testing transitions */}
          <Route path="/chat-transitions-demo" element={<ChatTransitionsDemo />} />
          <Route path="/text-reflow-demo" element={<TextReflowDemo />} />
          <Route path="/text-reflow-demo-2" element={<TextReflowDemo2 />} />
          <Route path="/datepicker-demo" element={<DatePickerDemo />} />
          <Route path="/job-ai-prototype" element={<JobAIPrototype />} />

          {/* Navigation Test Prototypes - Full page, no AppLayout */}
          <Route path="/nav-test" element={<NavigationTestLanding />} />
          <Route path="/nav-test/panels" element={<PanelsNav />} />
          <Route path="/nav-test/dropdowns" element={<DropdownNav />} />
          <Route path="/nav-test/tabs" element={<TabsNav />} />

          {/* Regular routes with AppLayout */}
          <Route
            path="/*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/my-info" element={<MyInfo />} />
                  <Route path="/people" element={<People />} />
                  <Route path="/people/new" element={<NewEmployeePage />} />
                  <Route path="/hiring" element={<Hiring />} />
                  <Route path="/hiring/job/:id" element={<JobOpeningDetail />} />
                  <Route path="/hiring/new" element={<CreateJobOpening />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/files" element={<Files />} />
                  <Route path="/payroll" element={<Payroll />} />
                  <Route path="/inbox" element={<Inbox />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChatProvider>
  );
}

export default App;
