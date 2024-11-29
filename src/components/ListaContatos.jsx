import React, { useState } from "react";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

function ListaContatos({ contatos, setContatos, setContatoAtual }) {
  const [loading, setLoading] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este contato?")) {
      setLoading(id);
      try {
        const contatoRef = doc(db, "contatos", id);
        await deleteDoc(contatoRef);
        setContatos((prevContatos) => prevContatos.filter((contato) => contato.id !== id));
      } catch (error) {
        console.error("Erro ao excluir contato:", error);
      } finally {
        setLoading(null);
      }
    }
  };

  const handleEdit = (contato) => {
    setContatoAtual(contato);
  };

  return (
    <ul>
      {contatos.map((contato) => (
        <li key={contato.id}>
          <span>{contato.nome}</span> - <span>{contato.email}</span> -{" "}
          <span>{contato.telefone}</span>
          <button onClick={() => handleEdit(contato)} disabled={loading === contato.id}>
            Editar
          </button>
          <button
            onClick={() => handleDelete(contato.id)}
            disabled={loading === contato.id}
          >
            {loading === contato.id ? "Excluindo..." : "Excluir"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ListaContatos;
