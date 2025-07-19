// js/config.js - API Configuration

// API Base URL - Change this based on environment
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:5000' 
    : 'https://accounting-api-akazad.onrender.com';

console.log('API Base URL:', API_BASE_URL);
console.log('Current hostname:', window.location.hostname); 