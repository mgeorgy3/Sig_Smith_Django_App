import React, { Component, Fragment, useState, useEffect} from "react";

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { ButtonBase } from "@mui/material";
import Button from '@mui/material/Button';

import { Link, useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Data_Grid(props) {

    const [data_params, setDataparams] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const rp_url ='/api/fetch-params-list';
                const response =  await fetch(rp_url);
                const Param_List = await response.json();
                
                
                console.log(Param_List)
                setDataparams(Param_List)
                setLoading(false);

            } catch (error) {

                console.error("Error", error);
                setLoading(false);
            }
        };
        fetchData();

    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    //const navigate = useNavigate()

    return (
        <Box sx={{ flexGrow: 1 }}>
        
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {console.log("HELO")}
            {Array.from(data_params).map((params, index) => (
              <a href={'/training-data/' + params.id + '/'}>
              <Button >
              <Grid xs={2} sm={4} md={4} key={index}>
                <Item>{params.FX_Pair}</Item>
              </Grid>
              </Button >
              </a>
            ))}
          </Grid>
          
        </Box>
      );
    }

  //import { Grid, Typography } from "@material-ui/core";