import * as React from "react";
import Data_Grid from "./Data_Grid";
import {useParams, Routes, Route} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Fragment, useState, useEffect} from "react";

import { createRoot } from 'react-dom/client';
import Get_Candle_Data from "./Get_Candle_Data";

import Live_Data from "./Live_Data";
import OANDA_FORM from "./OANDA_FORM";


function Get_Data(props) {
    const { data_id } = useParams(); // Using useParams hook to get the data_id from the URL
    //
    return (
      <Fragment>
        <div id="chart-with-more" className="chart-with-more">
          <Get_Candle_Data containerId="container1" dataId={data_id} /> 
        </div>

        <div id='list-of-data-sets' className="list-of-data-sets">
          <Data_Grid oanda_requests = {props.oanda_requests}/>
        </div>
        <div id ='oanda_submit_form' className="oanda_submit_form">
          <OANDA_FORM className='form'/>
        </div>
      </Fragment>
    );
  }

function Get_Live_Data() {
    //const { data_id } = useParams(); // Using useParams hook to get the data_id from the URL
    //
    return (
      <Fragment>
        <Live_Data /> 
      </Fragment>
    );
  }


  function Multi_Page_App(){

    const [data_params, setDataparams] = useState([])
    const [loading, setLoading] = useState(true);
    console.log("Running Function")

    useEffect(() => {
      console.log('USe effect')
      const fetchData = async () => {
        try {
            console.log("Trying")
            
            const rp_url ='/api/fetch-params-list';
            const response =  await fetch(rp_url);
            const Param_List = await response.json();
            
            
            console.log(Param_List)
            setDataparams(Param_List)
  
        } catch (error) {
            console.error("Error", error);
            setLoading(false);
        }
      };
        console.log("running useEffect")
        
        
        fetchData();
        
        console.log("WE ARE FETCHING DATA AGAIN")
    }, []);
    
    return (
      <Router>
        <Routes>
          <Route path="/training-data" element={<><Get_Candle_Data/> <Data_Grid oanda_requests = {data_params}/><OANDA_FORM/></>} />
          <Route path="/training-data/:data_id/" element={<Get_Data oanda_requests = {data_params}/>} />
          <Route path = "/live-data" element = {<Get_Live_Data />} />
        </Routes>
      </Router>
    );
  };

const domNode = document.getElementById('root-for-react-everywhere');
const root = createRoot(domNode);
root.render(<Multi_Page_App />)
