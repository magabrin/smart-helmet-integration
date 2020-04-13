import React, { useState, useEffect, useRef }  from 'react';
import '../App.css';
import "../../node_modules/video-react/dist/video-react.css";


function CrashComponent() {
    const [crashData, setcrashData] = useState([]);
    const [showVideo, setShowVideo] = useState(false);
    const [videoSrc, setVideoSrc] = useState("");
    const playerRef = useRef(null);

    useEffect(() => {
        if (crashData.length === 0) {
            fetchCrashes();
        }
    });

    const fetchCrashes = async () => {
        console.log('fetching crash data...');
        try {
            let url;
            if (process.env.REACT_APP_MODE === 'local') {
                url = 'http://localhost:3031/';
            } else {
                url = 'http://13.59.245.151:3031/';
            }
            const response = await fetch(url + 'crash');
            console.log(response);
	        setcrashData(await response.json());
              
        } catch (error) {
            console.log(error);            
        }
    }

    const renderCrashData = () => {
        try {
            if (crashData.length > 0) {
                return (<ul className="myul">
                    {crashData.map(file => { 
                        return (<li key={JSON.stringify(file)}>
                                    <div>                                        
                                        {JSON.stringify(file)}
                                    </div>
                                </li>) })}
                </ul>);
            } else {
                return (<div>No Crashes</div>);
            }            

        } catch (error) {
            return (<div>No Crashes</div>);
        }
       
    }




    return (
        <div className="App-header">
            <h3>Concushion Crash Data</h3>
            <button onClick={fetchCrashes} className="btn-gradient blue">Refresh</button>
            <div style={{width: "80%"}}>
                {renderCrashData()}
     
            </div>
            
        </div>
    );
}

export default CrashComponent;
