import * as React from "react";
import Data_Grid from "./Data_Grid";
import {useParams, Routes, Route} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Fragment, useState, useEffect} from "react";

import { createRoot } from 'react-dom/client';
import Get_Candle_Data from "./Get_Candle_Data";

import Live_Data from "./Live_Data";
import OANDA_FORM from "./OANDA_FORM";
import Instrument_List from "./Instrument_List";


import { Account_Details } from "./account_details";

function Get_Current_Account() {
    console.log("IN GET Cuyrrent")
    const account_Dict = Account_Details()
    console.log(account_Dict.accountId)
    async function fetchdata() {
        try {
            const rp_url = '/api/get_current_user_info';
            const response = await fetch(rp_url);
            const Request_Parameters = await response.json();
            
            
        }catch(error){
            console.error("Error")
        };
        return null
    }


    const accountDetails = fetchdata()
 
}
function Get_Data(props) {
    const { data_id } = useParams(); // Using useParams hook to get the data_id from the URL
    //
    Get_Current_Account()
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

function Get_Live_Data(props) {
    //const { data_id } = useParams(); // Using useParams hook to get the data_id from the URL
    const { instrument_id } = useParams()
    return (
      <Fragment>

        <div id="chart-with-more" className="chart-with-more">
          <Live_Data instrument = {instrument_id} /> 
        </div>

        <div id='list-of-data-sets' className="list-of-data-sets">
          <Instrument_List />
        </div>
      </Fragment>
    );
  }


  function Multi_Page_App(){

    const [data_params, setDataparams] = useState([])
    const [loading, setLoading] = useState(true);
    const [instrument_id, setInstrument_id] = useState("USD_NOK");
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
          <Route path = "/live-data/:instrument_id/" element =  {<Get_Live_Data instrument = {instrument_id}/>} /> 
        </Routes>
      </Router>
    );
  };

const domNode = document.getElementById('root-for-react-everywhere');
const root = createRoot(domNode);
root.render(<Multi_Page_App />)
