import React from 'react';
import gauriImg from '../assets/Gauri.jpg';

const animals = [
    { id: 1, img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80", size: 120, top: "10%", left: "10%", delay: "0s", name: "Bella" },
    { id: 2, img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80", size: 100, top: "20%", left: "80%", delay: "1.5s", name: "Luna" },
    { id: 3, img: gauriImg, size: 140, top: "50%", left: "40%", delay: "2s", name: "Gauri" },
    { id: 4, img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80", size: 110, top: "70%", left: "15%", delay: "0.5s", name: "Max" },
    { id: 5, img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80", size: 90, top: "60%", left: "75%", delay: "3s", name: "Rocky" },
    { id: 6, img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80", size: 130, top: "15%", left: "50%", delay: "1s", name: "Charlie" },
    { id: 7, img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80", size: 100, top: "80%", left: "60%", delay: "2.5s", name: "Milo" },
    { id: 8, img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80", size: 150, top: "35%", left: "20%", delay: "4s", name: "Daisy" },
    { id: 9, img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80", size: 80, top: "40%", left: "90%", delay: "1.2s", name: "Simba" }, // Cat
    { id: 10, img: "https://images.unsplash.com/photo-1555169062-013468b47731?auto=format&fit=crop&q=80", size: 110, top: "85%", left: "35%", delay: "3.5s", name: "Coco" }, // Bird
];

const FloatingBubbles = () => {
    return (
        <div style={{ position: 'relative', height: '600px', width: '100%', overflow: 'hidden', background: 'transparent' }}>
            <div style={{ textAlign: 'center', paddingTop: '50px', position: 'relative', zIndex: 10 }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Meet Our Friends</h2>
                <p style={{ color: 'var(--color-text-muted)' }}>They are waiting for a loving home.</p>
            </div>

            {animals.map((animal) => (
                <div
                    key={animal.id}
                    className="floating-bubble"
                    style={{
                        position: 'absolute',
                        top: animal.top,
                        left: animal.left,
                        width: `${animal.size}px`,
                        height: `${animal.size}px`,
                        borderRadius: '50%',
                        backgroundImage: `url(${animal.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '4px solid rgba(255,255,255,0.2)',
                        animationDelay: animal.delay,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    }}
                    title={`Meet ${animal.name}`}
                >
                    {/* Tooltip on hover (optional css based) */}
                </div>
            ))}
        </div>
    );
};

export default FloatingBubbles;
