import React, { useState, useEffect } from "react";

function PesquisaContatos({ setFiltro }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFiltro(searchTerm.trim());
    }, 300); // Aguarda 300ms após a digitação
    return () => clearTimeout(timeout);
  }, [searchTerm, setFiltro]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setSearchTerm("");
    }
  };

  return (
    <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
      <input
        style={{ flex: 1, marginRight: "0.5rem", padding: "0.5rem" }}
        type="text"
        placeholder="Pesquisar por nome ou email"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        aria-label="Pesquisar contatos"
      />
      <button
        onClick={() => setSearchTerm("")}
        style={{ padding: "0.5rem", cursor: "pointer" }}
      >
        Limpar
      </button>
    </div>
  );
}

export default PesquisaContatos;
