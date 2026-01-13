console.log("🔥 firebase-v2.js loaded");

/* Firebase */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    addDoc,
    collection,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* EmailJS – ES module compatible */
import * as emailjs from "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";

/* Firebase config */
const firebaseConfig = {
    apiKey: "AIzaSyBIIQhoODtl9bIH0AjLboivVfmHW-u6vrI",
    authDomain: "neonox-gas-website.firebaseapp.com",
    projectId: "neonox-gas-website",
    storageBucket: "neonox-gas-website.appspot.com",
    messagingSenderId: "117304932628",
    appId: "1:117304932628:web:282c28c56c007d5c5e6a01"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("status");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        status.innerText = "Sending...";

        try {
            /* Firestore */
            await addDoc(collection(db, "contacts"), {
                name, phone, email, message,
                createdAt: serverTimestamp()
            });

            /* EmailJS (NO init – correct usage) */
            await emailjs.send(
                "service_ipzbap7",
                "template_nqqxrd6",
                { name, email, message },
                "g6Hlg8TnHqgTRnAGr"
            );

            status.style.color = "green";
            status.innerText = "Message sent successfully!";
            form.reset();

        } catch (err) {
            console.error(err);
            status.style.color = "red";
            status.innerText = "Error sending message.";
        }
    });
});