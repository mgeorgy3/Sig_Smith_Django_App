import React, { Component } from "react";
import { createRoot } from 'react-dom/client';


export default class Chart_Form extends Component {
    constructor(props) {
      super(props);
      this.state = {
        /*isGoing: true,
        numberOfGuests: 2
        */
       FX_Pair: "",
       Granularity: "M2",
       Start_Date: "11/02/2023",
       End_Date: "11/06/2023"
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      //const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value    });
    }
  
    render() {
      return (

        <form>
          <label>
            FX_Pair:
            <input
              name="FX_Pair"            type="string"
              value={this.state.FX_Pair}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Granularity:
            <input
              name="Granularity"            type="string"
              value={this.state.Granularity}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Start Date:
            <input
              name="Start_Date"            type="string"
              value={this.state.Start_Date}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            End Date:
            <input
              name="End_Date"            type="string"
              value={this.state.End_Date}
              onChange={this.handleInputChange} />
          </label>
        </form>
      );
    }
  }

const FormDiv = document.getElementById("make_charts_form");

const root = createRoot(FormDiv); // createRoot(container!) if you use TypeScript
root.render(<Chart_Form tab="home" />);