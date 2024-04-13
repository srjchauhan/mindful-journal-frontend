import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm/SignupForm";
import Dashboard from "./components/Dashboard/Dashboard";
import { ChakraProvider } from "@chakra-ui/react";
import JournalHistory from "./components/JournalHistory/JournalHistory";
import Header from "./components/Header/Header";
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BrowserRouter>
          <Header>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/userJournal" element={<JournalHistory />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<div>404: Not Found</div>} />
            </Routes>
          </Header>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
