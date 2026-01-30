import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon not appearing
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper to update map view when position changes
function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom);
        }
    }, [center, zoom, map]);
    return null;
}

const LocationPicker = ({ onLocationSelect, initialPosition, selectedPosition }) => {
    const [position, setPosition] = useState(initialPosition || null);

    useEffect(() => {
        if (selectedPosition) {
            setPosition(selectedPosition);
        }
    }, [selectedPosition]);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setPosition(e.latlng);
                onLocationSelect(e.latlng);
            },
        });

        return position ? <Marker position={position} /> : null;
    };

    const center = position || (initialPosition || [20.5937, 78.9629]);
    const zoom = position ? 15 : 5;

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '300px', width: '100%', borderRadius: '0.5rem' }}
        >
            <ChangeView center={position} zoom={zoom} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
    );
};

export default LocationPicker;
