/**
 * Página principal do Container
 * Agrega os micro-frontends de Catálogo e Carrinho
 */
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';

// Carregamento dinâmico dos micro-frontends
const Catalogo = dynamic(() => import('catalogo/Catalogo'), { ssr: false });
const Carrinho = dynamic(() => import('carrinho/Carrinho'), { ssr: false });

export default function Home() {
  return (
    <main className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.appTitle}> Seu Restaurante Online</h1>
        <p className={styles.appSubtitle}>
          Peça agora e aproveite as melhores ofertas
        </p>
      </header>

      {/* Container dos micro-frontends */}
      <div className={styles.container}>
        <Catalogo />
      </div>

      {/* Carrinho flutuante */}
      <Carrinho />
    </main>
  );
}