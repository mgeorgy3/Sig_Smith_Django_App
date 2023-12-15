import React, { Fragment } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const FX_array = [('GBP_SGD', 'GBP_SGD'), ('USD_SEK', 'USD_SEK'), ('EUR_DKK', 'EUR_DKK'), 
('CAD_CHF', 'CAD_CHF'), ('USD_CZK', 'USD_CZK'), ('USD_ZAR', 'USD_ZAR'), 
('USD_DKK', 'USD_DKK'), ('GBP_USD', 'GBP_USD'), ('USD_MXN', 'USD_MXN'),
('USD_HUF', 'USD_HUF'), ('EUR_CAD', 'EUR_CAD'), ('EUR_USD', 'EUR_USD'), 
('CAD_JPY', 'CAD_JPY'), ('NZD_HKD', 'NZD_HKD'), ('USD_HKD', 'USD_HKD'), 
('AUD_JPY', 'AUD_JPY'), ('ZAR_JPY', 'ZAR_JPY'), ('GBP_ZAR', 'GBP_ZAR'), 
('SGD_JPY', 'SGD_JPY'), ('USD_JPY', 'USD_JPY'), ('EUR_TRY', 'EUR_TRY'), 
('EUR_JPY', 'EUR_JPY'), ('AUD_SGD', 'AUD_SGD'), ('EUR_NZD', 'EUR_NZD'), 
('GBP_HKD', 'GBP_HKD'), ('CHF_JPY', 'CHF_JPY'), ('EUR_HKD', 'EUR_HKD'), 
('GBP_CAD', 'GBP_CAD'), ('USD_THB', 'USD_THB'), ('GBP_CHF', 'GBP_CHF'), 
('AUD_CHF', 'AUD_CHF'), ('NZD_CHF', 'NZD_CHF'), ('AUD_HKD', 'AUD_HKD'), 
('USD_CHF', 'USD_CHF'), ('CAD_HKD', 'CAD_HKD'), ('AUD_CAD', 'AUD_CAD'), 
('GBP_PLN', 'GBP_PLN'), ('EUR_PLN', 'EUR_PLN'), ('GBP_NZD', 'GBP_NZD'), 
('EUR_HUF', 'EUR_HUF'), ('EUR_NOK', 'EUR_NOK'), ('CHF_HKD', 'CHF_HKD'), 
('EUR_GBP', 'EUR_GBP'), ('AUD_NZD', 'AUD_NZD'), ('CAD_SGD', 'CAD_SGD'), 
('EUR_CZK', 'EUR_CZK'), ('NZD_JPY', 'NZD_JPY'), ('USD_TRY', 'USD_TRY'), 
('GBP_JPY', 'GBP_JPY'), ('SGD_CHF', 'SGD_CHF'), ('USD_CNH', 'USD_CNH'), 
('USD_NOK', 'USD_NOK'), ('NZD_SGD', 'NZD_SGD'), ('NZD_USD', 'NZD_USD'), 
('USD_CAD', 'USD_CAD'), ('AUD_USD', 'AUD_USD'), ('CHF_ZAR', 'CHF_ZAR'), ('HKD_JPY', 'HKD_JPY'), ('EUR_SEK', 'EUR_SEK'),
 ('USD_SGD', 'USD_SGD'), ('TRY_JPY', 'TRY_JPY'), ('NZD_CAD', 'NZD_CAD'), 
 ('EUR_SGD', 'EUR_SGD'), ('EUR_AUD', 'EUR_AUD'), ('GBP_AUD', 'GBP_AUD'), 
 ('USD_PLN', 'USD_PLN'), ('EUR_CHF', 'EUR_CHF'), ('EUR_ZAR', 'EUR_ZAR')]; // replace with your FX pairs
const Granularity_array = [('5 second', 'S5'), ('10 second', 'S10'), ('15 second', 'S15'), ('30 second', 'S30'), ('1 minute', 'M1'), ('2 minute', 'M2'), 
('4 minute', 'M4'), ('5 minute', 'M5'), ('10 minute', 'M10'), ('15 minute', 'M15'), ('30 minute', 'M30'), ('1 hour', 'H1'), ('2 hour', 'H2'), ('3 hour', 'H3'), ('4 hour', 'H4'), ('6 hour', 'H6'), ('8 hour', 'H8'), ('12 hour', 'H12'), ('1 day', 'D'), ('1 week', 'W'), ('1 month', 'M')];

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

export default function OANDA_FORM() {
  const [formData, setFormData] = React.useState({
    FX_Pair: 'USD_CAD',
    Granularity: 'D',
    Start_Date: null,
    End_Date: null,
  });

  const [Error, setError] = React.useState({
    is_Error: false,
    error_text: null,
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleDateTimeChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');

    console.log(JSON.stringify(formData))

    try {
      const response = await fetch('/api/post_api_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        mode: 'same-origin',
        body: JSON.stringify(formData),
        
      });

      if (response.ok) {
        // Handle successful submission, e.g., redirect or display a success message
        console.log('Form data submitted successfully');
        setError({
          ...Error,
          is_Error : false, 
          error_text : response.statusText
        })
      } else {
        // Handle errors, e.g., display an error message
        setError({
          ...Error,
          is_Error : true, 
          error_text : response.statusText
        })
        console.error('Error submitting form data:', response.statusText);

      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
    };
  
    const itemStyle = {
      color: '#ccc'

    }
  
  return (
    <form onSubmit={handleSubmit} className='custom-form'>
      <Grid  container direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={5}>
          <FormControl fullWidth>
            <InputLabel id="fx-pair-label" style={itemStyle}>FX Pair</InputLabel>
            <Select
              labelId="fx-pair-label"
              id="FX_Pair"
              value={formData.FX_Pair}
              onChange={handleChange('FX_Pair')}
              style={itemStyle}
            >
              {FX_array.map((pair) => (
                <MenuItem key={pair} value={pair}>
                  {pair}
                </MenuItem>
              ))}
            </Select>

          </FormControl>
        </Grid>
        <Grid item xs={4} >
          <FormControl fullWidth>
            <InputLabel id="granularity-label" style={itemStyle}>Granularity</InputLabel>
            <Select
              labelId="granularity-label"
              id="Granularity"
              value={formData.Granularity}
              onChange={handleChange('Granularity')}
              style={itemStyle}>
              {Granularity_array.map((granularity) => (
                <MenuItem key={granularity} value={granularity}>
                  {granularity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}>
        <InputLabel id="start_date-label" style={itemStyle}>Start Date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              textField={(props) => <TextField {...props} fullWidth label="Start_Date" />}
              value={formData.from}
              onChange={handleDateTimeChange('Start_Date')}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={8}>
        <InputLabel id="end_date-label" style={itemStyle}>End Date</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              textField={(props) => <TextField {...props} fullWidth='true' label="End_Date" />}
              value={formData.to}
              onChange={handleDateTimeChange('End_Date')}
              style={itemStyle}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} style={{alignContent : 'center'}}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
        {Error.is_Error && 
          <Grid item xs={4} style={{position: 'relative'}}>
            <span>{Error.error_text}</span>
          </Grid>}
      </Grid>
      
    </form>
  );
};
