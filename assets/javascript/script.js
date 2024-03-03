import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyCzAFtgFwvxbvW6xe7uYdMubdPO4JoYtWc",
//   authDomain: "rockpaperscissors-1d8da.firebaseapp.com",
//   projectId: "rockpaperscissors-1d8da",
//   storageBucket: "rockpaperscissors-1d8da.appspot.com",
//   messagingSenderId: "301698218341",
//   appId: "1:301698218341:web:2c3a60a46a2b0d493c098c",
//   measurementId: "G-C5N5XSPK7K"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDdA6aeQq6g-DXeBRo_UXuPf5gsvefy_Qk",
  authDomain: "chatbot-3410b.firebaseapp.com",
  databaseURL: "https://chatbot-3410b-default-rtdb.firebaseio.com",
  projectId: "chatbot-3410b",
  storageBucket: "chatbot-3410b.appspot.com",
  messagingSenderId: "918085028143",
  appId: "1:918085028143:web:cf530fa8d4053b005539da",
  measurementId: "G-XF1MWZ2PXJ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;

