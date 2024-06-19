import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import LandingPage from "./pages/LandingPage";
import ClassList from "./pages/ClassList";
import AddStudent from "./pages/AddStudent";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css';
import Language from "./pages/Language";

import StudentTable from "./pages/StudentTable";
import Test from "./pages/Test";
import AddTest from "./pages/AddTest";
import Suggestions from "./pages/suggestion";
function App() {
  return (
    <div className="App">
        
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/language" element={<Language/>}/>
        <Route path="/class" element={<ClassList/>}/>
        <Route path="/studentlist/:class" element={<StudentTable/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test/:studentId" element={<Test />} />
        <Route path="/addStudent" element={<AddStudent/>}/>
        <Route path="/addTest" element={<AddTest/>}/>
        <Route path="/suggestion" element={<Suggestions/>}/>
      </Routes>
    </div>
  );
}

export default App;
