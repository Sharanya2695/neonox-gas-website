/**************************************************
 * DEBUG – CONFIRM FILE LOADS
 **************************************************/
console.log("🔥 firebase.js loaded");

/**************************************************
 * FIREBASE IMPORTS
 **************************************************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    addDoc,
    collection,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**************************************************
 * EMAILJS IMPORT (NO DEFAULT EXPORT)
 **************************************************/
import * as emailjs from "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";

/**************************************************
 * FIREBASE CONFIG
 **************************************************/
const firebaseConfig = {
    apiKey: "AIzaSyBIIQhoODtl9bIH0AjLboivVfmHW-u6vrI",
    authDomain: "neonox-gas-website.firebaseapp.com",
    projectId: "neonox-gas-website",
    storageBucket: "neonox-gas-website.appspot.com",
    messagingSenderId: "117304932628",
    appId: "1:117304932628:web:282c28c56c007d5c5e6a01"
};

/**************************************************
 * INITIALIZE FIREBASE
 **************************************************/
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**************************************************
 * WAIT FOR DOM
 **************************************************/
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM fully loaded");

    const form = document.getElementById("contactForm");
    const status = document.getElementById("status");

    if (!form) {
        console.error("❌ contactForm not found");
        return;
    }
    console.log("✅ contactForm found");

    /**************************************************
     * FORM SUBMIT HANDLER
     **************************************************/
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("📨 Form submit triggered");

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        status.style.color = "black";
        status.innerText = "Sending message...";

        try {
            /**************************************************
             * SAVE TO FIRESTORE
             **************************************************/
            console.log("💾 Saving to Firestore...");
            await addDoc(collection(db, "contacts"), {
                name,
                phone,
                email,
                message,
                createdAt: serverTimestamp()
            });
            console.log("✅ Firestore save success");

            /**************************************************
             * SEND EMAIL VIA EMAILJS (CORRECT WAY)
             **************************************************/
            console.log("📧 Sending email...");
            await emailjs.send(
                "service_ipzbap7",        // SERVICE ID
                "template_nqqxrd6",       // TEMPLATE ID
                {
                    name,
                    email,
                    message
                },
                "g6Hlg8TnHqgTRnAGr"       // PUBLIC KEY
            );
            console.log("✅ Email sent successfully");

            status.style.color = "green";
            status.innerText = "Message sent successfully!";
            form.reset();

        } catch (error) {
            console.error("❌ ERROR:", error);
            status.style.color = "red";
            status.innerText = "Error sending message. Please try again later.";
        }
    });
});