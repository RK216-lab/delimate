// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBR_tS9B2FcQLsDU2Mbiezj29lhiijgkNQ",
    authDomain: "delimate-rk.firebaseapp.com",
    projectId: "delimate-rk",
    storageBucket: "delimate-rk.firebasestorage.app",
    messagingSenderId: "698442193271",
    appId: "1:698442193271:web:678b118002a66b3ec8a972",
    measurementId: "G-91G80CMZG3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

export { db };

// SHA-256 ハッシュ関数
export async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  return Array.from(new Uint8Array(hashBuffer))
              .map(b => b.toString(16).padStart(2,'0'))
              .join('');
}

// Firestore から家族コード取得
export async function getFamilyDoc(famcode) {
  const ref = doc(db, "families", famcode);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

// Firestore に家族コード作成
export async function createFamilyDoc(famcode, hashedPassword) {
  await setDoc(doc(db, "families", famcode), { password: hashedPassword });
}
