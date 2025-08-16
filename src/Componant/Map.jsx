import Skeleton from '@mui/material/Skeleton';
import { useContext } from 'react';
import { LoadingContext } from '../Context/LoadingContext';


import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: iconUrl,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView(coords, 10);
    return null;
}

export default function Map({ data }) {
    const lat = data?.coord?.lat;
    const lon = data?.coord?.lon;
    const { loading } = useContext(LoadingContext);

    return (
        <div style={{ height: '300px', padding: '10px', width: '100%', borderRadius: '20px', overflow: 'hidden', boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)' }}>
            {loading ? (
                <Skeleton variant="rectangular" width="100%" height="100%" />
            ) : (
                lat !== undefined && lon !== undefined ? (
                    <MapContainer
                        center={[lat, lon]}
                        zoom={10}
                        style={{ height: '100%', width: '100%', borderRadius: '20px' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                        />
                        <Marker position={[lat, lon]}>
                            {data?.name && <Popup>{data.name}</Popup>}
                        </Marker>

                        <ChangeMapView coords={[lat, lon]} />
                    </MapContainer>
                ) : null
            )}
        </div>
    );
}
