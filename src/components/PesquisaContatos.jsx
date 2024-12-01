import React, { useState, useEffect } from "react";

function PesquisaContatos({ setFiltro }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFiltro(searchTerm.trim());
    }, 300);
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
    <div>
      <input class="pesquisa-input"
        type="text"
        placeholder="Pesquisar"
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        aria-label="Pesquisar contatos"
      />
      <button
        onClick={() => setSearchTerm("")}
      >
        Limpar
      </button>
    </div>
  );
}

export default PesquisaContatos;
