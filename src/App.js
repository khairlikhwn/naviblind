// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import * as cocossd from "@tensorflow-models/coco-ssd"
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();
    const net = await cocossd.load();
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      // e.g. const obj = await net.detect(video);
      const obj = await net.detect(video);
      console.log(obj);
      let textContainer = document.getElementById("text-container")
      textContainer.textContent = "";
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      //
      

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  
      drawRect(obj, ctx);
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            top:0,
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 380,
            height: 285,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            top:0,
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 380,
            height: 285,
          }}
        />
        <div id="text-container"></div>
      </header>
    </div>
  );
}

export default App;
