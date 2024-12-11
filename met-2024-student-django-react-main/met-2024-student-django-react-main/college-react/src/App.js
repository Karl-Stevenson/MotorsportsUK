import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './motorparts/Nav'
import Home from './motorparts/Home'
import SalesReps from './motorparts/SalesReps'
import ViewSalesReps from './motorparts/ViewSalesReps'
import CreateSalesReps from './motorparts/CreateSalesReps'
import Customer from './motorparts/Customers'
import ViewCustomer from './motorparts/ViewCustomer'
import CreateCustomer from './motorparts/CreateCustomer'
import ViewClient from './motorparts/ViewClient'
import CreateClient from './motorparts/CreateClient'
// import Nav from './course_manager/Nav'
// import Home from './course_manager/Home'
// import CourseFetcher from './course_manager/Courses';
// import CourseNew from './course_manager/CourseNew';
// import CourseEdit from './course_manager/CourseEdit';
// import CourseDelete from './course_manager/CourseDelete';
// import LecturerFetcher from './course_manager/Lecturers';
// import LecturerNew from './course_manager/LecturerNew';
// import LecturerEdit from './course_manager/LecturerEdit';
// import LecturerDelete from './course_manager/LecturerDelete';
// import StudentFetcher from './course_manager/Students';
// import StudentNew from './course_manager/StudentNew';
// import StudentEdit from './course_manager/StudentEdit';
// import StudentDelete from './course_manager/StudentDelete';
import './App.css'

// function App() {
//   return (
//     <BrowserRouter>
//       <Nav />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/courses" element={<CourseFetcher />} />
//         <Route path="/course/new" element={<CourseNew />} />
//         <Route path="/course/edit" element={<CourseEdit />} />
//         <Route path="/course/delete" element={<CourseDelete />} />
//         <Route path="/lecturers" element={<LecturerFetcher />} />
//         <Route path="/lecturer/new" element={<LecturerNew />} />
//         <Route path="/lecturer/edit" element={<LecturerEdit />} />
//         <Route path="/lecturer/delete" element={<LecturerDelete />} />
//         <Route path="/students" element={<StudentFetcher />} />
//         <Route path="/student/new" element={<StudentNew />} />
//         <Route path="/student/edit" element={<StudentEdit />} />
//         <Route path="/student/delete" element={<StudentDelete />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

function App() {
  document.title = "Motorparts CRM"
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/salesreps" element={<SalesReps />} />
        <Route path="/salesreps/:id" element={<ViewSalesReps />} />
        <Route path="/createsalesrep" element={<CreateSalesReps />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/customers/:id" element={<ViewCustomer />} />
        <Route path="/createcustomer" element={<CreateCustomer />} />
        <Route path="/clients/:id" element={<ViewClient />} />
        <Route path="/createclient/:id/" element={<CreateClient />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
