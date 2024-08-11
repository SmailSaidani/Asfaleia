import React,{ useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";



export default function Loader() {
  

  return (
    <div className="Loader">
      <ClipLoader color="blue" size={100} />
    </div>
  );
}
