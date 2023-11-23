import React, { Component } from "react";
import Candle_Data from "./Candle_Data";
import Get_Candle_Data from "./Get_Candle_Data";
import {BrowserRouter as Router, Routes, Route, Link, Redirect,} from "react-router-dom"
import { createRoot } from 'react-dom/client';

export default class Outer_Candle_Data extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return (
            <Router>
                <Routes>
                    <Route path="/charts" element={<Candle_Data containerId = "container1"/>} />
                    <Route path="/view_data/<str:data_id>/" element={<Get_Candle_Data containerId= "container1" dataId = {data_id}/>} />
                </Routes>
          </Router>
        );
    }
}

const domNode = document.getElementById('react_charts');
const root = createRoot(domNode);
root.render(<Outer_Candle_Data/>)




// document.addEventListener("DOMContentLoaded", function () {

//     const appDiv = document.getElementById("container1");
    
//     if (appDiv) {
//         const root = createRoot(appDiv); // createRoot(container!) if you use TypeScript
//         root.render(<Candle_Data containerId = "container1"/>);
//     } else {
//         console.error("Element with id 'container1' not found in the DOM.");
//     }
    
//     const appDiv2 = document.getElementById("container2");
    
//     if (appDiv2) {
//         const root = createRoot(appDiv2); // createRoot(container!) if you use TypeScript
//         root.render(<Candle_Data containerId = "container2"/>);
//         } else {
//             console.log("WTF")
//         console.error("Element with id 'container2' not found in the DOM.");
//         }

//     // const appDiv3 = document.getElementById("container3");
    
//     // if (appDiv3) {
//     //     const root = createRoot(appDiv3); // createRoot(container!) if you use TypeScript
//     //     root.render(<Candle_Data containerId = "container3"/>);
//     //     } else {
//     //     //console.error("Element with id 'container3' not found in the DOM.");
//     //     }
    
//     const get_container = document.getElementById("get_container");

//     if (get_container) {
//         root.render(<Get_Candle_Data containerId = "get_container"/>);
//         } else {
//         console.error("Element with id 'get_container' not found in the DOM.");
//         }

        
//     })
