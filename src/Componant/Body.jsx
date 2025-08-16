import Country from "./Country"
import Details from "./Details"
import Map from "./Map"
import CopyRight from "./CopyRight"

// material ui
import Grid from '@mui/material/Grid';

// react 
import { useContext } from 'react';

// context
import { WeatherData } from "../Context/WeatherDataContext";


export default function Body() {

    const [data,] = useContext(WeatherData);

    return (

        <div className="body" style={{ display: 'grid', gap: '20px' }} >

            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>

                <Grid size={{ xs: 12, md: 8 }} >

                    <Country data={data} />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }} >

                    <Details data={data} />

                </Grid>

            </Grid>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>

                <Grid size={{ xs: 12, md: 8 }} >

                    <Map data={data} />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }} >

                    <CopyRight />

                </Grid>

            </Grid>



        </div>
    )
}