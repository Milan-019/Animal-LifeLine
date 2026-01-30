import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LocationPicker from '../components/LocationPicker';
import { classifyImage } from '../services/aiService';

const CreateReport = () => {
    // ... state ...
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [gettingLocation, setGettingLocation] = useState(false);
    const [detectedSpecies, setDetectedSpecies] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(file);

        // AI Detection
        setAnalyzing(true);
        try {
            // Create a temp image element to pass to detection
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.onload = async () => {
                const predictions = await classifyImage(img);
                if (predictions && predictions.length > 0) {
                    const bestGuess = predictions[0];
                    setDetectedSpecies(`${bestGuess.className} (${(bestGuess.probability * 100).toFixed(0)}%)`);
                    // Auto-fill title if empty
                    if (!title) {
                        setTitle(`Report: ${bestGuess.className}`);
                    }
                } else {
                    setDetectedSpecies('Could not detect animal');
                }
                setAnalyzing(false);
            };
        } catch (err) {
            console.error("AI Error:", err);
            setAnalyzing(false);
        }
    };
    // ... existing ...

    const handleLocationSelect = (latlng) => {
        setLatitude(latlng.lat);
        setLongitude(latlng.lng);
        console.log("Location selected from map:", latlng);
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setGettingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setLatitude(lat);
                setLongitude(lng);
                console.log("User location extracted:", lat, lng);
                setGettingLocation(false);
            },
            (error) => {
                console.error("Error getting location:", error);
                alert("Unable to retrieve your location. Please ensure location permissions are granted.");
                setGettingLocation(false);
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('location', location);
        if (latitude) formData.append('latitude', latitude);
        if (longitude) formData.append('longitude', longitude);

        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.post('/api/reports', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Report submitted successfully");
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to submit report');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container animate-fade-in" style={{ paddingTop: '120px', paddingBottom: '40px', maxWidth: '800px' }}>
            <h1 className="page-title">Report an Animal</h1>
            <div className="glass-card" style={{ padding: '40px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Title (e.g., Injured Dog)</label>
                        <input
                            type="text"
                            className="form-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Location (e.g., Main St, near Park)</label>
                        <input
                            type="text"
                            className="form-input"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <div className="mobile-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <label className="form-label" style={{ marginBottom: 0 }}>Pin Location</label>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={getCurrentLocation}
                                disabled={gettingLocation}
                                style={{ padding: '5px 15px', fontSize: '0.9rem' }}
                            >
                                {gettingLocation ? 'Getting Location...' : '📍 Use My Current Location'}
                            </button>
                        </div>
                        <LocationPicker
                            onLocationSelect={handleLocationSelect}
                            selectedPosition={latitude && longitude ? { lat: latitude, lng: longitude } : null}
                        />
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '5px' }}>
                            {latitude && longitude ? `Selected: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}` : 'Click on the map or use the button to set location'}
                        </p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-textarea"
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Upload Image</label>
                        <input
                            type="file"
                            className="form-input"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        {analyzing && <p style={{ color: 'var(--color-primary)', marginTop: '5px' }}>🤖 AI is analyzing image...</p>}
                        {detectedSpecies && !analyzing && <p style={{ color: '#34d399', marginTop: '5px' }}>✅ AI Detected: {detectedSpecies}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Report'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateReport;
