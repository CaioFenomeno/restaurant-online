"use client";

import { useState } from "react";
import styles from "../styles/Catalogo.module.css";

/**
 * Componente Catálogo
 * Exibe a lista de produtos com nome, descrição e botão de adicionar ao carrinho
 * Comunica com o carrinho através de eventos customizados
 */
export default function Catalogo() {
  // Estado para feedback visual ao adicionar item
  const [itemAdicionado, setItemAdicionado] = useState(null);

  // Dados dos produtos
  const produtos = [
    {
      id: 1,
      nome: "Hambúrguer Artesanal",
      descricao: "Pão integral, carne 180g, queijo meia cura, alface fresca",
      preco: 28.90,
    },
    {
      id: 2,
      nome: "Pizza Margherita",
      descricao: "Molho de tomate, mozzarela fresca, tomate e manjericão",
      preco: 35.00,
    },
    {
      id: 3,
      nome: "Refrigerante",
      descricao: "Bebida gelada 350ml - Escolha o sabor",
      preco: 7.50,
    },
    {
      id: 4,
      nome: "Batata Frita Premium",
      descricao: "Batata palha crocante com sal refinado",
      preco: 12.50,
    },
    {
      id: 5,
      nome: "Salada Fresca",
      descricao: "Alface, tomate, pepino, cenoura com molho vinagrete",
      preco: 18.90,
    },
    {
      id: 6,
      nome: "Sorvete Artesanal",
      descricao: "Sorvete caseiro - Sabores variados",
      preco: 15.00,
    },
  ];

  /**
   * Função para adicionar produto ao carrinho
   * Dispara evento customizado com dados do produto
   * @param {Object} produto - Produto a ser adicionado
   */
  const adicionarAoCarrinho = (produto) => {
    // Dispara evento customizado com detalhes do produto
    window.dispatchEvent(
      new CustomEvent("adicionarAoCarrinho", {
        detail: produto,
      })
    );

    // Mostra feedback visual
    setItemAdicionado(produto.id);
    setTimeout(() => setItemAdicionado(null), 2000);
  };

  return (
    <section className={styles.catalogo}>
      <div className={styles.header}>
        <h2 className={styles.titulo}>🍽️ Cardápio</h2>
        <p className={styles.subtitulo}>
          Escolha seus pratos favoritos e aproveite!
        </p>
      </div>

      <div className={styles.grid}>
        {produtos.map((produto) => (
          <article
            key={produto.id}
            className={`${styles.card} ${
              itemAdicionado === produto.id ? styles.adicionado : ""
            }`}
          >
            {/* Ícone decorativo do produto */}
            <div className={styles.icon}>
              {produto.id === 1 && "🍔"}
              {produto.id === 2 && "🍕"}
              {produto.id === 3 && "🥤"}
              {produto.id === 4 && "🍟"}
              {produto.id === 5 && "🥗"}
              {produto.id === 6 && "🍦"}
            </div>

            {/* Informações do produto */}
            <div className={styles.content}>
              <h3 className={styles.nomeProduto}>{produto.nome}</h3>
              <p className={styles.descricao}>{produto.descricao}</p>

              <div className={styles.footer}>
                <span className={styles.preco}>
                  R$ {produto.preco.toFixed(2)}
                </span>
                <button
                  className={styles.botao}
                  onClick={() => adicionarAoCarrinho(produto)}
                  aria-label={`Adicionar ${produto.nome} ao carrinho`}
                >
                  {itemAdicionado === produto.id ? "✓ Adicionado!" : "Adicionar"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}