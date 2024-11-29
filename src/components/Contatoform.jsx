import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

function ContatoForm({ contatoAtual, setContatos, setContatoAtual }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contatoAtual) {
      setNome(contatoAtual.nome);
      setEmail(contatoAtual.email);
      setTelefone(contatoAtual.telefone);
    } else {
      setNome("");
      setEmail("");
      setTelefone("");
    }
  }, [contatoAtual]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (contatoAtual) {
        const contatoRef = doc(db, "contatos", contatoAtual.id);
        await updateDoc(contatoRef, { nome, email, telefone });
        setContatos((prev) =>
          prev.map((contato) =>
            contato.id === contatoAtual.id ? { ...contato, nome, email, telefone } : contato
          )
        );
      } else {
        const docRef = await addDoc(collection(db, "contatos"), { nome, email, telefone });
        setContatos((prev) => [...prev, { id: docRef.id, nome, email, telefone }]);
      }
    } catch (error) {
      console.error("Erro ao salvar contato:", error);
    } finally {
      setLoading(false);
      setContatoAtual(null);
      setNome("");
      setEmail("");
      setTelefone("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : contatoAtual ? "Atualizar" : "Adicionar"} Contato
      </button>
    </form>
  );
}

export default ContatoForm;
