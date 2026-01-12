// 🔥 DEBUG – must appear in console
console.log("🔥 firebase.js loaded");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ YOUR FIREBASE CONFIG (OK)
const firebaseConfig = {
    apiKey: "AIzaSyBIIQhoODtl9bIH0AjLboivVfmHW-u6vrI",
    authDomain: "neonox-gas-website.firebaseapp.com",
    projectId: "neonox-gas-website",
    storageBucket: "neonox-gas-website.appspot.com",
    messagingSenderId: "117304932628",
    appId: "1:117304932628:web:282c28c56c007d5c5e6a01"
};

// 🔗 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 📌 Get form & fields (THIS WAS MISSING)
const form = document.getElementById("contactForm");
const status = document.getElementById("status");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

// 🧪 Debug
console.log("Form found:", form);

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("🚀 Submit clicked");

    try {
        await addDoc(collection(db, "contacts"), {
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            message: messageInput.value,
            createdAt: new Date()
        });

        status.style.color = "green";
        status.innerText = "Message sent successfully!";
        form.reset();

    } catch (error) {
        console.error("Firebase error:", error);
        status.style.color = "red";
        status.innerText = error.message;
    }
});