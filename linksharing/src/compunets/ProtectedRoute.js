
import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ProtectedRoute = ({element: Element, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)

    
      if (loading) {
        return(
            <p>loading</p>
     
        )
      }
        return (
      
        <Route
        {...rest}
        element={(props) => {
          if (isAuthenticated) {
            return (
            
          <Element {...props} />
    
            );
    
          } else {
        <Navigate to="/login" replace={true} />
          }
        }}
      />
   
      );
}

export default ProtectedRoute;