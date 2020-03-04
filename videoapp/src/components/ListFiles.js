import React, { useState, useEffect, useRef }  from 'react';
import '../App.css';
import "../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import { play } from 'video-react/lib/actions/player';

function ListFiles() {
    const [fileList, setFileList] = useState([]);
    const [showVideo, setShowVideo] = useState(false);
    const [videoSrc, setVideoSrc] = useState("");
    const playerRef = useRef(null);

    useEffect(() => {
        if (fileList.length === 0) {
            fetchFiles();
        }
    });

    const fetchFiles = async () => {
        console.log('fetching files...');
        try {
            const response = await fetch('http://3.15.207.49:3031/list');  // 'http://localhost:3031/list');
            console.log(response);
	    setFileList(await response.json());
              
        } catch (error) {
            console.log(error);            
        }
    }

    const renderFiles = () => {
        try {
            if (fileList.length > 0) {
                return (<ul className="myul">
                    {fileList.map(file => { 
                        return (<li key={file}>
                                    <div>
                                        <button className="btn-gradient blue mini" onClick={() => {downloadFile(file)}}>download</button>
                                        {file}
                                    </div>
                                </li>) })}
                </ul>);
            } else {
                return (<div>No Files</div>);
            }            

        } catch (error) {
            return (<div>No Files</div>);
        }
       
    }

    const downloadFile = async (filename) => {
        console.log('downloading files...');
        try {
            const response = await fetch('http://3.15.207.49:3031/download?'+ new URLSearchParams({ filename }));
            // 1. Convert the data into 'blob'
            const blob = await response.blob();        
            // 2. Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            // link.setAttribute('download', `sample.${this.state.file}`);
            link.setAttribute('download', `${filename}`);
            // 3. Append to html page
            document.body.appendChild(link);
            // 4. Force download
            link.click();
            // 5. Clean up and remove the link
            link.parentNode.removeChild(link);
            // setVideoSrc(`~/Downloads/${filename}`);
            setShowVideo(true);  
            
            const video_url = URL.createObjectURL(blob);
            await setVideoSrc(video_url);
            playerRef.current.load();

        } catch (error) {
            console.log(error);            
        }
    }

    const renderVideo = () => {        
        return (
            <Player
                ref={playerRef}
                key="Player"
                playsInline
                poster="pug2.png"
                src={videoSrc}
            >
                {/* <source src="C:\\Users\\mattg\\Downloads\\sample_iTunes.mov" /> */}
                {/* <source src={videoSrc} /> */}
            </Player>
        )
    }

    // if (showVideo) {
    //     playerRef.current.load();
    // }

    return (
        <div className="App-header">
            <h3>Concushion Video Files</h3>
            <button onClick={fetchFiles} className="btn-gradient blue">Refresh</button>
            <div style={{width: "80%"}}>
                {renderFiles()}
                {showVideo ? renderVideo() : <div></div>}                
            </div>
            
        </div>
    );
}

export default ListFiles;
