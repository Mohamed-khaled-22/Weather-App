import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import AvTimerOutlinedIcon from '@mui/icons-material/AvTimerOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import WbTwilightOutlinedIcon from '@mui/icons-material/WbTwilightOutlined';
import Skeleton from '@mui/material/Skeleton';

import { useContext } from 'react';
import { LoadingContext } from '../Context/LoadingContext';

export default function Details({ data }) {
  const { loading } = useContext(LoadingContext);

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: '#1c416e',
        borderRadius: '20px',
        color: 'white',
        padding: '20px 10px',
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)'
      }}
    >
      {loading ? (
        <div>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="rectangular" width={300} height={100} />
          <Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 2 }} />
        </div>
      ) : (
        <>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: "30px" }}>
            <Typography variant='h6' sx={{ color: 'white', textTransform: 'capitalize' }}>
              weather details
            </Typography>

            <Typography variant='ul' sx={{ listStyle: 'none', margin: '0', padding: '0' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '9px' }}>
                <div style={{ color: '#aac7de', display: 'flex', textTransform: 'capitalize' }}>
                  <WaterDropOutlinedIcon style={{ marginRight: '10px' }} /> humidity
                </div>
                <div>{data?.main?.humidity}%</div>
              </li>

              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '9px' }}>
                <div style={{ color: '#aac7de', display: 'flex', textTransform: 'capitalize' }}>
                  <AirOutlinedIcon style={{ marginRight: '10px' }} /> wind
                </div>
                <div>{data?.wind?.speed} km/h</div>
              </li>

              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '9px' }}>
                <div style={{ color: '#aac7de', display: 'flex', textTransform: 'capitalize' }}>
                  <AvTimerOutlinedIcon style={{ marginRight: '10px' }} /> pressure
                </div>
                <div>{data?.main?.pressure} hPa</div>
              </li>

              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '9px' }}>
                <div style={{ color: '#aac7de', display: 'flex', textTransform: 'capitalize' }}>
                  <VisibilityOutlinedIcon style={{ marginRight: '10px' }} /> visibility
                </div>
                <div>{data?.visibility} m</div>
              </li>

              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '9px' }}>
                <div style={{ color: '#aac7de', display: 'flex', textTransform: 'capitalize' }}>
                  <ThermostatOutlinedIcon style={{ marginRight: '10px' }} /> Max Temp
                </div>
                <div>{data?.main?.temp_max}°C</div>
              </li>

              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '9px' }}>
                <div style={{ color: '#aac7de', display: 'flex', textTransform: 'capitalize' }}>
                  <AcUnitOutlinedIcon style={{ marginRight: '10px' }} /> Min Temp
                </div>
                <div>{data?.main?.temp_min}°C</div>
              </li>

              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '9px' }}>
                <div style={{ color: '#aac7de', display: 'flex', textTransform: 'capitalize' }}>
                  <WbSunnyOutlinedIcon style={{ marginRight: '10px' }} /> sunrise
                </div>
                <div>
                  {new Date(data?.sys?.sunrise * 1000).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })}
                </div>
              </li>

              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '9px' }}>
                <div style={{ color: '#aac7de', display: 'flex', textTransform: 'capitalize' }}>
                  <WbTwilightOutlinedIcon style={{ marginRight: '10px' }} /> sunset
                </div>
                <div>
                  {new Date(data?.sys?.sunset * 1000).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })}
                </div>
              </li>
            </Typography>
          </CardContent>

          <CardActions>
            <Button size="small" sx={{ color: '#aac7de' }}>Learn More</Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}
