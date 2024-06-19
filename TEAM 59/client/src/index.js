import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {NextUIProvider} from "@nextui-org/react";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <NextUIProvider>
    <BrowserRouter>
    
    <App />
    
    </BrowserRouter>
    </NextUIProvider>
 
);

// remove the reactstrit because data can be fetched twice later on