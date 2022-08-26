
import './App.css';
import 'w3-css/w3.css';
import React from 'react'
import Home from './views/Home';
import NetIncome from './views/NetIncom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate 
} from 'react-router-dom';
import Layout from './views/Layout';


const App = () => {
  

  return (
      <Router>
          <Routes>
            {/**When updating routes path, don't forget to update the paths in sidebar as well */}
              <Route  exact path='/splinterlands-multiple-accounts-stracker-v4/' element={<Layout/>}>
                <Route index element={<Home />} />
                <Route exact path="/splinterlands-multiple-accounts-stracker-v4/net-income" element={<NetIncome />} />
                <Route exact path="/splinterlands-multiple-accounts-stracker-v4/pagenotfound" element={<p>Page not found</p>}>Page not found.</Route>
                <Route path="*" element={<Navigate replace to="/splinterlands-multiple-accounts-stracker-v4/pagenotfound"/>}></Route>
              </Route>
          </Routes>
      </Router>
  );
}

export default App;
