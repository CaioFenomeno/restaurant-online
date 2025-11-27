"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/Carrinho.module.css";

/**
 * Componente Carrinho
 * Gerencia os itens adicionados e exibe o total do pedido
 * Escuta eventos de adição de produtos do catálogo
 */
export default function Carrinho() {
  // Estado para armazenar os itens do carrinho
  const [itens, setItens] = useState([]);
  // Estado para controlar a visibilidade do carrinho
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  /**
   * Hook para gerenciar o listener de eventos
   * Adiciona listener quando componente monta e remove quando desmonta
   */
  useEffect(() => {
    /**
     * Função callback para adicionar itens ao carrinho
     * @param {CustomEvent} e - Evento com detalhes do produto
     */
    function handleAdicionarAoCarrinho(e) {
      setItens((prev) => [...prev, { ...e.detail, timestamp: Date.now() }]);
    }

    // Registra o listener
    window.addEventListener("adicionarAoCarrinho", handleAdicionarAoCarrinho);

    // Cleanup: remove listener ao desmontar
    return () => {
      window.removeEventListener(
        "adicionarAoCarrinho",
        handleAdicionarAoCarrinho
      );
    };
  }, []);

  /**
   * Calcula o total do pedido
   * @returns {number} Soma dos preços de todos os itens
   */
  const calcularTotal = () => {
    return itens.reduce((total, item) => total + (item.preco || 0), 0);
  };

  /**
   * Remove um item do carrinho pelo index
   * @param {number} index - Índice do item a remover
   */
  const removerItem = (index) => {
    setItens((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Limpa todos os itens do carrinho
   */
  const limparCarrinho = () => {
    setItens([]);
    setMostrarDetalhes(false);
  };

  return (
    <aside className={styles.carrinho}>
      {/* Cabeçalho do carrinho */}
      <button
        className={styles.header}
        onClick={() => setMostrarDetalhes(!mostrarDetalhes)}
      >
        <h2 className={styles.titulo}>🛒 Seu Pedido</h2>
        <div className={styles.resumo}>
          <span className={styles.quantidade}>{itens.length}</span>
          <span className={styles.total}>
            R$ {calcularTotal().toFixed(2)}
          </span>
        </div>
      </button>

      {/* Detalhes do carrinho */}
      {mostrarDetalhes && (
        <div className={styles.detalhes}>
          {itens.length === 0 ? (
            <p className={styles.vazio}>
              Seu carrinho está vazio. Adicione itens do cardápio!
            </p>
          ) : (
            <>
              {/* Lista de itens */}
              <ul className={styles.lista}>
                {itens.map((item, index) => (
                  <li key={item.timestamp} className={styles.item}>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemNome}>{item.nome}</span>
                      <span className={styles.itemPreco}>
                        R$ {item.preco?.toFixed(2)}
                      </span>
                    </div>
                    <button
                      className={styles.btnRemover}
                      onClick={() => removerItem(index)}
                      aria-label={`Remover ${item.nome} do carrinho`}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              {/* Rodapé com total e ações */}
              <div className={styles.rodape}>
                <div className={styles.totalWrapper}>
                  <span className={styles.labelTotal}>Total:</span>
                  <span className={styles.valorTotal}>
                    R$ {calcularTotal().toFixed(2)}
                  </span>
                </div>

                <div className={styles.acoes}>
                  <button
                    className={styles.btnContinuar}
                    onClick={() => setMostrarDetalhes(false)}
                  >
                    Continuar Comprando
                  </button>
                  <button
                    className={styles.btnFinalizar}
                    onClick={limparCarrinho}
                  >
                    Finalizar Pedido
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </aside>
  );
}