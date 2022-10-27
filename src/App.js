import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './compoments/dashboard/sb-admin-2.css'
import Dashboard from './compoments/dashboard/Dashboard';
import Customers from './compoments/page/Customers';
import Employees from './compoments/page/Employees';
import Rooms from './compoments/page/Rooms';
import Transaction from './compoments/page/Transaction';
import Sidebar from './compoments/sidebar/Sidebar';

function App() {
  return (
    <div className='bg-dark'>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/rooms' element={<Rooms />} />
            <Route path='/employees' element={<Employees />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/transaction' element={<Transaction />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>

  );
}

export default App;
