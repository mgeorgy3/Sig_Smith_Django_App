import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import { createChart } from 'lightweight-charts';
import Candle_Data from "./Candle_Data";

export default class Outer_Candle_Data extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div>
            </div>
        );
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const appDiv = document.getElementById("container1");
    
    if (appDiv) {
        const root = createRoot(appDiv); // createRoot(container!) if you use TypeScript
        root.render(<Candle_Data containerId = "container1"/>);
    } else {
        console.error("Element with id 'container1' not found in the DOM.");
    }
    
    const appDiv2 = document.getElementById("container2");
    
    if (appDiv2) {
        const root = createRoot(appDiv2); // createRoot(container!) if you use TypeScript
        root.render(<Candle_Data containerId = "container2"/>);
        } else {
        console.error("Element with id 'container2' not found in the DOM.");
        }

    const appDiv3 = document.getElementById("container3");
    
    if (appDiv3) {
        const root = createRoot(appDiv3); // createRoot(container!) if you use TypeScript
        root.render(<Candle_Data containerId = "container3"/>);
        } else {
        console.error("Element with id 'container3' not found in the DOM.");
        }
    })
