import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyCzAFtgFwvxbvW6xe7uYdMubdPO4JoYtWc",
  authDomain: "rockpaperscissors-1d8da.firebaseapp.com",
  projectId: "rockpaperscissors-1d8da",
  storageBucket: "rockpaperscissors-1d8da.appspot.com",
  messagingSenderId: "301698218341",
  appId: "1:301698218341:web:2c3a60a46a2b0d493c098c",
  measurementId: "G-C5N5XSPK7K"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;