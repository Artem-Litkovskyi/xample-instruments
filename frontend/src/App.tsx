import React from 'react';
import logo from './assets/vector/logo.svg';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import CategoryCard from "./components/CategoryCard";
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />

            <Hero title="Very Long New Plugin Name" subtitle="A new plugin with a very long name" href="" image_url="/logo512.png" />

            <div className="content">
                <div className="content-grid">
                    <CategoryCard
                        title="Discover instruments"
                        href="/products?instruments"
                        image_url="/logo512.png"
                    />
                    <CategoryCard
                        title="Discover audio effects"
                        href="/products?effects"
                        image_url="/logo512.png"
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default App;
