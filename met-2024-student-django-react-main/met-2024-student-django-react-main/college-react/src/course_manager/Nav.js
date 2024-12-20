import { Link } from 'react-router-dom';

function Nav(props) {
  return (
    <center>
      <nav className="bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center space-x-4">
        <Link to="/" className="font-medium text-end px-3 py-2 text-white rounded-lg hover:bg-slate-100 hover:text-slate-900">Home</Link> 
        {/* <Link to="/courses" className="font-medium text-end px-3 py-2 text-white rounded-lg hover:bg-slate-100 hover:text-slate-900">Courses</Link>
        <Link to="/lecturers" className="font-medium text-end px-3 py-2 text-white rounded-lg hover:bg-slate-100 hover:text-slate-900">Lecturers</Link>
        <Link to="/students" className="font-medium text-end px-3 py-2 text-white rounded-lg hover:bg-slate-100 hover:text-slate-900">Students</Link> */}
        <Link to="/customers" className="font-medium text-end px-3 py-2 text-white rounded-lg hover:bg-slate-100 hover:text-slate-900">Customers</Link>
        <Link to="/clients" className="font-medium text-end px-3 py-2 text-white rounded-lg hover:bg-slate-100 hover:text-slate-900">Clients</Link>
        <Link to="/locations" className="font-medium text-end px-3 py-2 text-white rounded-lg hover:bg-slate-100 hover:text-slate-900">Locations</Link>
        <Link to="/salesreps" className="font-medium text-end px-3 py-2 text-white rounded-lg hover:bg-slate-100 hover:text-slate-900">Sales Reps</Link>
      </nav>
      </center>
  );
}

export default Nav;
