// js/firebase.js
// Utilize os módulos da Firebase (SDK v9+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Configuração do Firebase - substitua pelos seus dados
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para salvar tarefas em um dia específico
export async function salvarTarefa(dia, tarefas) {
  try {
    await setDoc(doc(db, "tarefas", dia), { tarefas });
    console.log("Tarefas salvas com sucesso!");
  } catch (e) {
    console.error("Erro ao salvar as tarefas: ", e);
  }
}

// Função para carregar tarefas de um dia específico
export async function carregarTarefa(dia) {
  try {
    const docRef = doc(db, "tarefas", dia);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Dados encontrados:", docSnap.data());
      return docSnap.data().tarefas;
    } else {
      console.log("Nenhuma tarefa encontrada para esse dia.");
      return null;
    }
  } catch (e) {
    console.error("Erro ao carregar as tarefas: ", e);
    return null;
  }
}
