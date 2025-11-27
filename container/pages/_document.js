/**
 * Document customizado
 * Define a estrutura HTML base
 */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta name="description" content="Seu Restaurante Online" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}