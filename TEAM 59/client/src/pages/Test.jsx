import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useAudioRecorder, AudioRecorder } from "react-audio-voice-recorder";
import { useParams } from "react-router-dom";
const Test = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [test, setTest] = useState([]);
  const [ind, setInd] = useState(0);
  const [loading, setLoading] = useState(true);
  const mediaRecorderRef = useRef(null);
  const timeoutIDRef = useRef(null);
  const {_id}=useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/test/get");
        const test1 = data.allTest;
        const arr = test1.map((i) => ({ lvl: i.lvl, content: i.content }));
        setTest(arr);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    return () => {
      // Cleanup media recorder and timeout on unmount
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
      clearTimeout(timeoutIDRef.current);
    };
  }, []);

  const handleNext = () => {
    if (ind < test.length - 1) {
      setInd((prevInd) => prevInd + 1);
    }
    setRecording(false);
    setAudioBlob(null);
    setAudioUrl("");
  };
  const recorderControls = useAudioRecorder()
  const addAudioElement = async (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
    
    const formData = new FormData();
    formData.append('file', blob, "audio.webm");
    formData.append('text' , test[ind].content);

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
      });
      console.log(response.data);
      
      
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
}

  return (
    <div className="bg-blue-400">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center h-screen p-4">
            <div className="bg-white shadow-2xl sh p-8 w-full max-w-lg rounded-lg shadow-lg text-center">
              <h1 className="text-3xl font-bold mb-4">VOPA Assesment</h1>
              <p className="text-lg mb-4">{test[ind].content}</p>
              {audioUrl && (
                <audio controls className="my-4 w-full">
                  <source src={audioUrl} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              )}
              <div className="flex justify-center">
                <AudioRecorder
                  downloadFileExtension="mp3"
                  onRecordingComplete={(blob) => addAudioElement(blob)}
                  recorderControls={recorderControls}
                  showVisualizer={true}
                />
                <button
                  onClick={recorderControls.stopRecording}
                    className="bg-red-400 rounded-lg px-4 py-2 ml-2 "
                >
                  Stop Recording
                </button>
              </div>
              <div>
        
                <button
                  onClick={handleNext}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
