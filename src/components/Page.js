import React from "react";
import Navbar from "./Navbar";

const page = ({ children }) => (
  <div className="container">
    <Navbar />
    <div className="jumbotron" style={{backgroundColor:'white'}}>
    {children}
    </div>
    
  </div>
);
export default page