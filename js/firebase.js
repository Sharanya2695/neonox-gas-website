



// -------------------------------
// FIREBASE + EMAILJS CONFIG
// -------------------------------

// Firebase SDKs
console.log("🔥 firebase.js loaded");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// EmailJS SDK
import emailjs from "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";


// -------------------------------
// EMAILJS INITIALIZATION
// -------------------------------
// 🔴 REPLACE WITH YOUR ACTUAL PUBLIC KEY
emailjs.init("g6Hlg8TnHqgTRnAGr");


// -------------------------------
// FIREBASE CONFIG
// -------------------------------
// 🔴 KEEP YOUR ORIGINAL FIREBASE VALUES
const firebaseConfig = {
    apiKey: "AIzaSyBIIQhoODtl9bIH0AjLboivVfmHW-u6vrI",
    authDomain: "neonox-gas-website.firebaseapp.com",
    projectId: "neonox-gas-website",
    storageBucket: "neonox-gas-website.appspot.com",
    messagingSenderId: "117304932628",
    appId: "1:117304932628:web:282c28c56c007d5c5e6a01"
};


// -------------------------------
// INITIALIZE FIREBASE
// -------------------------------
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// -------------------------------
// FORM HANDLING
// -------------------------------
const form = document.getElementById("contactForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    status.style.color = "black";
    status.innerText = "Sending message...";

    try {
        // -------------------------------
        // SAVE TO FIREBASE
        // -------------------------------
        await addDoc(collection(db, "contacts"), {
            name,
            phone,
            email,
            message,
            createdAt: serverTimestamp()
        });

        // -------------------------------
        // SEND EMAIL VIA EMAILJS
        // -------------------------------
        await emailjs.send(
            "service_ipzbap7",          // SERVICE ID
            "template_nqqxrd6",         // TEMPLATE ID
            {
                name: name,
                email: email,
                message: message
            }
        );

        // -------------------------------
        // SUCCESS
        // -------------------------------
        status.style.color = "green";
        status.innerText = "Message sent successfully!";
        form.reset();

    } catch (error) {
        console.error("Error:", error);
        status.style.color = "red";
        status.innerText = "Error sending message. Please try again later.";
    }
});