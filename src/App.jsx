import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import ContatoForm from "./components/Contatoform";
import ListaContatos from "./components/ListaContatos";
import PesquisaContatos from "./components/PesquisaContatos";

function App() {
  const [contatos, setContatos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [contatoAtual, setContatoAtual] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContatos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contatos"));
        setContatos(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar contatos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContatos();
  }, []);

  const getContatosFiltrados = () => {
    return contatos.filter(
      (contato) =>
        contato.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        contato.email.toLowerCase().includes(filtro.toLowerCase())
    );
  };

  const contatosFiltrados = getContatosFiltrados();

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Agenda de Contatos</h1>
      <PesquisaContatos setFiltro={setFiltro} />
      <ContatoForm
        contatoAtual={contatoAtual}
        setContatos={setContatos}
        setContatoAtual={setContatoAtual}
      />
      {loading ? (
        <p>Carregando contatos...</p>
      ) : contatosFiltrados.length === 0 ? (
        <p>Nenhum contato encontrado.</p>
      ) : (
        <ListaContatos
          contatos={contatosFiltrados}
          setContatos={setContatos}
          setContatoAtual={setContatoAtual}
        />
      )}
    </div>
  );
}

export default App;
