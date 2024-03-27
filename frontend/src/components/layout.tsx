import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import React from "react";

export const Layout = ()=>{
    return(
       <React.Fragment>            
            <Header />
            <Outlet></Outlet>
        </React.Fragment>
        
    )
}