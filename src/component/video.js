import React, { Component } from "react";


export default function Vid() {
  

    return (
        <div>
        {/* <div className="">
          <video src={Video} autoPlay="true" />
          <small>Welcome to</small> <br />
          Profile Pulse         https://youtu.be/WZipC2ofBMw                    ===== className : logoanime
        </div> */}

      <div className="">
      <video loop autoPlay="true" width="750" height="500" controls >
      <source src={"../video/trap.mp4"} type="video/mp4"/>
      </video>
      </div>    
      </div>
      // trap.mp4
      //"../video/vidd.mp4"
    );
  }
  