
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// 

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// react
import { useContext, useEffect, useState } from 'react';

// context
import { SearchTitleContext } from '../Context/SearchContext';
import { LoadingContext } from '../Context/LoadingContext';
import { WeatherData } from '../Context/WeatherDataContext';

// external liberaries
import axios from 'axios';




export default function Header() {

    const [searchTitle, setSearchTitle] = useContext(SearchTitleContext);
    const [, setData] = useContext(WeatherData);
    const { setLoading } = useContext(LoadingContext);

    // dialog
    const [open, setOpen] = useState(false);
    const [dialogMessages, setDialogMessages] = useState({ Title: '', Message: '' });


    function handelSearchClick() {

        if (searchTitle.trim() === localStorage.getItem('searchTitle')) {
            return;
        }
        // trim the search title to remove extra spaces
        setSearchTitle(searchTitle.trim());

        setLoading(true);


        // Make a request for a user with a given ID
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTitle}&appid=836da1dc3e7ba5f5b0fe356f9d08f7ba&units=metric`)
            .then(function (response) {
                // handle success
                setData(response.data);
                localStorage.setItem('searchTitle', searchTitle);
                setLoading(false);
            })
            .catch(function (error) {
                // handle error
                setLoading(false);
                setDialogMessages({ Title: 'Invalid Name', Message: 'please enter a valid city or country name.' });
                setOpen(true);
            })

    };


    const handleClose = () => {
        if (dialogMessages.Message === "There is a connection error") {
            setOpen(false);
            window.close()
        }
        setOpen(false);
        setSearchTitle('');
    };

    useEffect(() => {

        // Make a request for a user with a given ID
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTitle}&appid=836da1dc3e7ba5f5b0fe356f9d08f7ba&units=metric`)
            .then(function (response) {
                // handle success
                setData(response.data);
                // setIconCode(response.data.weather[0].icon);
            })
            .catch(function (error) {
                // handle error
                setDialogMessages({ Title: 'Error', Message: 'There is a connection error' });
                setOpen(true);
            })

    }, []);

    return (
        <>
            <div className="header">

                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center', }}>

                    <Grid size={{ xs: 12, s: 2, md: 3 }} >

                        <div className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ marginRight: '10px' }}>
                                <img style={{ width: '60px' }} src={process.env.PUBLIC_URL + '/image/weather.png'} alt="not found" />
                            </div>
                            <Typography sx={{ color: 'white', fontWeight: '600' }} variant="h5" >
                                Weatherly
                            </Typography>
                        </div>

                    </Grid>

                    <Grid size={{ xs: 12, s: 10, md: 9 }} >

                        <div className="search-area" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <input value={searchTitle} onChange={(e) => { setSearchTitle(e.target.value) }} style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)', fontSize: '18px', color: 'white', backgroundColor: '#1c416e', borderRadius: '20px', flex: '1', padding: '20px', marginRight: '20px', outline: 'none', border: 'none' }} type="text" placeholder='Search for a country or city' autoComplete='off' />
                            <Button onClick={() => { handelSearchClick() }} sx={{
                                "&.Mui-disabled": { color: "white", backgroundColor: "gray", opacity: .8, }, borderRadius: '20px', height: '56px'
                            }} variant="contained" disabled={searchTitle.trim().length === 0}>Search</Button>
                        </div>

                    </Grid>

                </Grid>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {`${dialogMessages.Title}`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {dialogMessages.Message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>

        </>
    );
}