import * as React from "react";
import Data_Grid from "./Data_Grid";
import {useParams, Routes, Route} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Fragment } from "react";

import { createRoot } from 'react-dom/client';
import Get_Candle_Data from "./Get_Candle_Data";

import Live_Data from "./Live_Data";
import OANDA_FORM from "./OANDA_FORM";


function Get_Data() {
    const { data_id } = useParams(); // Using useParams hook to get the data_id from the URL
    //
    return (
      <Fragment>
        <div id="chart-with-more" className="chart-with-more">
          <Get_Candle_Data containerId="container1" dataId={data_id} /> 
        </div>

        <div id='list-of-data-sets' className="list-of-data-sets">
          <Data_Grid />
        </div>
        <div id ='oanda_submit_form' className="oanda_submit_form">
          <OANDA_FORM className='form'/>
        </div>
      </Fragment>
    );
  }

function Get_Live_Data() {
    const { data_id } = useParams(); // Using useParams hook to get the data_id from the URL
    //
    return (
      <Fragment>
        {console.log(data_id)}
        <div className="container1"></div>
        <Live_Data containerId="container1" dataId={data_id} /> 
      </Fragment>
    );
  }


  const Multi_Page_App = () => {
    
    return (
      <Router>
        <Routes>
          <Route path="/training-data" element={<><Data_Grid/><OANDA_FORM/></>} />
          <Route path="/training-data/:data_id/" element={<Get_Data />} />
          <Route path = "/live-data/:data_id/" element = {<Get_Live_Data />} />
        </Routes>
      </Router>
    );
  };

const domNode = document.getElementById('root-for-react-everywhere');
const root = createRoot(domNode);
root.render(<Multi_Page_App />)
