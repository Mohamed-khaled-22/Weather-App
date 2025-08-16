import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Skeleton } from '@mui/material';

import { useContext } from 'react';
import { LoadingContext } from '../Context/LoadingContext';

export default function CopyRight() {

    const { loading } = useContext(LoadingContext);

    return (
        <Card
            variant="outlined"
            sx={{
                backgroundColor: '#1c416e',
                borderRadius: '20px',
                color: 'white',
                padding: '10px',
                boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
            }}
        >
            {loading ? (
                <Skeleton variant="rectangular" width="100%" height="100%" />
            ) : (
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: "15px",
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 2,
                    }}
                >
                    {/* Copyright Text */}
                    <Typography
                        variant="body2"
                        component="div"
                        sx={{
                            color: '#f5f5f5',
                            textAlign: 'center',
                            fontSize: '1rem', lineHeight: '2',
                        }}
                    >
                        ☀️ © 2025 <span style={{ fontWeight: 'bold', color: '#ffcc00' }}>Weatherly</span>
                        &nbsp;- Crafted with ❤️ by
                        <span style={{ fontWeight: 'bold', color: '#4fc3f7' }}> Mohamed Khaled</span>
                        &nbsp;| Powered by
                        <span style={{ fontWeight: 'bold', color: '#81d4fa' }}> OpenWeatherMap</span>
                    </Typography>
                    {/* Social Media Icons */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <IconButton component="a" href="https://www.instagram.com/mohamed_khaled_darwesh?igsh=MW9yOGIyeHZrcTRpYw==" target="_blank" sx={{ color: '#E4405F' }}>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton component="a" href="https://www.facebook.com/share/14GJkYbNSvD/" target="_blank" sx={{ color: '#1877F2' }}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton component="a" href="https://www.linkedin.com/in/mohamed-khaled-2435962bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" sx={{ color: '#0A66C2' }}>
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton component="a" href="https://github.com/Mohamed-khaled-22" target="_blank" sx={{ color: '#fff' }}>
                            <GitHubIcon />
                        </IconButton>
                        <IconButton component="a" href="https://wa.me/01030494237" target="_blank" sx={{ color: '#25D366' }}>
                            <WhatsAppIcon />
                        </IconButton>
                    </Box>


                </CardContent>

            )}


        </Card>
    );
}
