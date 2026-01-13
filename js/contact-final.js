console.log("🔥 contact.js loaded");

/* ===============================
   FIREBASE IMPORTS (ES MODULE)
   =============================== */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    addDoc,
    collection,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===============================
   EMAILJS GLOBAL SDK
   (Loaded via <script> in index.html)
   =============================== */
// global emailjs object is available

/* ===============================
   FIREBASE CONFIG
   =============================== */
const firebaseConfig = {
    apiKey: "AIzaSyBIIQhoODtl9bIH0AjLboivVfmHW-u6vrI",
    authDomain: "neonox-gas-website.firebaseapp.com",
    projectId: "neonox-gas-website",
    storageBucket: "neonox-gas-website.appspot.com",
    messagingSenderId: "117304932628",
    appId: "1:117304932628:web:282c28c56c007d5c5e6a01"
};

/* ===============================
   INITIALIZE FIREBASE
   =============================== */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ===============================
   WAIT FOR DOM
   =============================== */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("status");

    if (!form) {
        console.error("❌ contactForm not found");
        return;
    }

    console.log("✅ contactForm found");

    /* ===============================
       INIT EMAILJS
       =============================== */
    // Must match your EmailJS public key
    emailjs.init("g6Hlg8TnHqgTRnAGr"); // PUBLIC KEY

    /* ===============================
       FORM SUBMIT HANDLER
       =============================== */
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        status.style.color = "black";
        status.innerText = "Sending message...";

        try {
            /* ===============================
               SAVE TO FIRESTORE
               =============================== */
            await addDoc(collection(db, "contacts"), {
                name,
                phone,
                email,
                message,
                createdAt: serverTimestamp()
            });

            console.log("✅ Saved to Firestore");

            /* ===============================
               SEND ADMIN EMAIL
               =============================== */
            await emailjs.send(
                "service_ln9zoal",        // your EmailJS Service ID
                "template_admin123",      // your Admin Email Template ID
                {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message
                }
            );
            console.log("📧 Admin email sent");

            /* ===============================
               SEND USER CONFIRMATION EMAIL
               =============================== */
            await emailjs.send(
                "service_ln9zoal",        // same service
                "template_9cogyj7",       // your User Confirmation Template ID
                {
                    name: name,
                    email: email,
                    message: message
                }
            );
            console.log("📧 User confirmation email sent");

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