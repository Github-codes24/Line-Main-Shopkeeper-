import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./pages/auth/AuthContext";
import {RecoilRoot} from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <RecoilRoot>
            <AuthProvider>
                <App />
            </AuthProvider>
        </RecoilRoot>
    </BrowserRouter>
);
