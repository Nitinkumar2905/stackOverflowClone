import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AllQuestions from "./components/AllQuestions";
import Tags from "./components/Tags";
import { Toaster } from "react-hot-toast";
import AskQuestion from "./components/AskQuestion";
import ParticularQuestion from "./components/ParticularQuestion";


function App() {

  return (
    <Router>
      <Toaster position="top-center" toastOptions={{ duration: 500 }}
        reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route exact index element={<Home />} />
        <Route path="/" element={<Home />}>
          <Route path="/home" element={<AllQuestions />} />
          <Route path="/questions" element={<AllQuestions />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/questions/:id" element={<ParticularQuestion />} />
        </Route>
        <Route path="/askQuestion" element={<AskQuestion />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
