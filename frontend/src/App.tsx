import React from 'react';
import logo from './assets/vector/logo.svg';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />

            <Hero title="Very Long New Plugin Name" subtitle="A new plugin with a very long name" href="" image_url="/logo512.png" />

            <div className="content">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </div>

            <Footer />
        </div>
    );
}

export default App;
