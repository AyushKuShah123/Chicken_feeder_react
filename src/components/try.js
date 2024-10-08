import React, { useState, useEffect } from 'react';

const Try = () => {
    const [foodLevel, setFoodLevel] = useState(null);
    const [waterLevel, setWaterLevel] = useState(null);
    const [foodStatus, setFoodStatus] = useState('Loading...');
    const [waterStatus, setWaterStatus] = useState('Loading...');

    const apiKey = 'X5XPG566OTAC9BB7';
    const channelId = '2406785';

    // Function to fetch data from ThingSpeak
    const fetchData = () => {
        const url = `https://api.thingspeak.com/channels/${channelId}/feeds.json?results=1`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const latestFeed = data.feeds[0];

                // Update food level
                const foodLvl = latestFeed.field1 * 10;
                setFoodLevel(Math.min(foodLvl, 100));

                if (foodLvl <= 20) {
                    setFoodStatus('Food Needed');
                } else {
                    setFoodStatus('Food Available');
                }

                // Update water level
                const waterLvl = latestFeed.field2 * 10;
                setWaterLevel(Math.min(waterLvl, 100));

                if (waterLvl <= 30) {
                    setWaterStatus('Water Needed');
                } else {
                    setWaterStatus('Water Available');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    // Fetch data on component mount and every 3 seconds
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div id="container" style={containerStyle}>
            <h1 style={headingStyle}>PET FEEDER MONITOR</h1>
            <div className="subheading" style={subheadingStyle}>Status Updates</div>

            {/* Food Status */}
            <p><strong>Food Status:</strong> <span id="foodStatus">{foodStatus}</span></p>
            <div className="progress" style={progressStyle}>
                <div className="progress-bar" id="foodLevel" style={{ ...progressBarStyle, width: `${foodLevel}%`, backgroundColor: foodLevel > 50 ? '#4CAF50' : '#f44336' }}>
                    {foodLevel}%
                </div>
            </div>

            {/* Water Status */}
            <p><strong>Water Status:</strong> <span id="waterStatus">{waterStatus}</span></p>
            <div className="progress" style={progressStyle}>
                <div className="progress-bar" id="waterLevel" style={{ ...progressBarStyle, width: `${waterLevel}%`, backgroundColor: waterLevel > 50 ? '#4CAF50' : '#f44336' }}>
                    {waterLevel}%
                </div>
            </div>

            {/* Feeder Image */}
            <img
                //src="https://images.unsplash.com/photo-1583501534424-550886b77a92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc0M3wwfDF8c2VhcmNofDF8fHRyYWNrJTIwYW5kJTIwY2hpY2tlbnxlbnwwfHx8fDE2Mzg2ODk5MzE&ixlib=rb-1.2.1&q=80&w=1080"
                src="/feed.jpeg" // Local image path in the public folder
                alt="Chicken Feeder"
                id="feederImage"
                style={imageStyle}
            />
        </div>
    );
};

// Styles for the component
const containerStyle = {
    maxWidth: '800px',
    margin: 'auto',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '2px 4px 20px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
};

const headingStyle = {
    color: '#4CAF50',
    fontSize: '4em',
    textShadow: '1px 1px 0 #aaa, 2px 2px 0 #aaa, 3px 3px 0 #aaa, 4px 4px 0 #aaa',
    margin: 0,
};

const subheadingStyle = {
    fontSize: '3em',
    color: '#4CAF50',
    margin: '20px 0',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
};

const progressStyle = {
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: '20px',
    margin: '20px 0',
};

const progressBarStyle = {
    height: '30px',
    borderRadius: '20px',
    textAlign: 'center',
    color: 'white',
    lineHeight: '30px',
    transition: 'width 0.5s',
};

const imageStyle = {
    width: '75%',
    marginTop: '30px',
    borderRadius: '10px',
    transition: 'transform 0.3s, boxShadow 0.3s',
};

export default Try;
