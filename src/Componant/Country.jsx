import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { LoadingContext } from '../Context/LoadingContext';

export default function Country({ data }) {
    const [daily, setDaily] = useState([]);
    const { loading, setLoading } = useContext(LoadingContext);

    const city = data?.name;
    const apiKey = "836da1dc3e7ba5f5b0fe356f9d08f7ba";

    const [lat, lon] = data?.coord ? [data.coord.lat, data.coord.lon] : [null, null];
    const iconCode = data?.weather ? data.weather[0].icon : null;

    // get daily forecast
    useEffect(() => {
        if (city && lat && lon) {
            setLoading(true);
            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                .then(response => {
                    const forecastList = response.data.list;
                    const dailyForecasts = [];
                    const seenDates = new Set();

                    forecastList.forEach(item => {
                        const date = item.dt_txt.split(' ')[0];
                        if (!seenDates.has(date)) {
                            dailyForecasts.push(item);
                            seenDates.add(date);
                        }
                    });

                    setDaily(dailyForecasts);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [city, lat, lon, setLoading]);

    // Create boxes for daily forecasts
    const boxes = daily.slice(1).map((e) => (
        <div
            key={`${e.dt}-${e.main.temp}`}
            className="box"
            style={{
                boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.5)',
                backgroundColor: '#224773',
                borderRadius: '20px',
                color: 'white',
                padding: '10px',
                fontWeight: '500',
                fontSize: '18px'
            }}
        >
            <p style={{ margin: '5px 0 0' }}>
                {new Date(e.dt * 1000).toLocaleDateString("en-US", {
                    hour: 'numeric',
                    minute: 'numeric',
                    weekday: 'long'
                })}
            </p>
            <img
                src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`}
                alt="weather"
                onError={(e) => e.target.style.display = "none"}
            />
            <p style={{ margin: '0 0 5px' }}> {Math.round(e.main.temp)}°C</p>
        </div>
    ));

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
                <CardContent>
                    <Skeleton variant="text" width={200} height={40} />
                    <Skeleton variant="rectangular" width="100%" height={100} sx={{ mt: 1 }} />
                    <Skeleton variant="rectangular" width="100%" height={150} sx={{ mt: 2 }} />
                </CardContent>
            ) : (
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: "30px" }}>
                    <Typography
                        component="div"
                        className="country-temp-container"
                        sx={{
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-evenly'
                        }}
                    >
                        <div className="temp-img">
                            {iconCode && (
                                <img
                                    style={{ width: '200px' }}
                                    src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
                                    alt="weather"
                                    onError={(e) => e.target.style.display = "none"}
                                />
                            )}
                        </div>

                        <div className="country-temp">
                            <Typography variant="h6" component="div">
                                {data?.name}{data?.sys ? `, ${data.sys.country}` : ''}
                            </Typography>

                            <Typography variant="h1" component="div">
                                {data?.main && (
                                    <>
                                        {Math.round(data.main.temp)}
                                        <span style={{ fontSize: '40px', position: 'relative', top: '-30px' }}>°C</span>
                                    </>
                                )}
                            </Typography>

                            <Typography variant="h5" component="div">
                                {data?.weather && data.weather[0].description}
                            </Typography>
                        </div>

                        <div className="date">
                            {data?.dt && (
                                <p style={{ maxWidth: '180px' }}>
                                    {new Date(data.dt * 1000).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            )}
                        </div>
                    </Typography>

                    <Typography
                        component="div"
                        className="boxes"
                        sx={{
                            color: 'white',
                            textAlign: 'center',
                            display: 'grid',
                            gap: '10px'
                        }}
                    >
                        {boxes}
                    </Typography>
                </CardContent>
            )}
        </Card>
    );
}