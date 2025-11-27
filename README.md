# 🍽️ Restaurante Online - Microfrontend

Sistema de pedidos online com arquitetura de microfrontends usando **Next.js** e **Module Federation**. Separa o catálogo de produtos e carrinho de compras em aplicações independentes.

## 📋 Visão Geral

Este projeto é dividido em **3 aplicações autônomas**:

- **Container**: Agrega os microfrontends e exibe a página principal
- **Catálogo**: Exibe a lista de pratos com nome, descrição e preço
- **Carrinho**: Gerencia os itens adicionados e exibe o total do pedido

### Características ✨

- ✅ Componentes bem comentados e estruturados
- ✅ Design responsivo (desktop, tablet, mobile)
- ✅ Comunicação entre microfrontends via eventos customizados
- ✅ Carrinho flutuante em tempo real
- ✅ Animações e transições suaves
- ✅ Gradientes modernos e interface intuitiva
- ✅ Suporte a Module Federation (webpack 5+)

## 📁 Estrutura do Projeto

```
seu-projeto/
│
├── catalogo/                          # Microfrontend do Catálogo
│   ├── pages/
│   │   ├── _app.js
│   │   └── index.js
│   ├── src/
│   │   ├── components/
│   │   │   └── Catalogo.jsx          # Componente principal
│   │   ├── styles/
│   │   │   ├── Catalogo.module.css   # Estilos do catálogo
│   │   │   └── globals.css
│   │   ├── data/
│   │   │   └── produtos.js           # Lista de produtos
│   │   └── index.js
│   ├── next.config.js
│   ├── package.json
│   └── README.md
│
├── carrinho/                          # Microfrontend do Carrinho
│   ├── pages/
│   │   ├── _app.js
│   │   └── index.js
│   ├── src/
│   │   ├── components/
│   │   │   └── Carrinho.jsx          # Componente principal
│   │   ├── styles/
│   │   │   ├── Carrinho.module.css   # Estilos do carrinho
│   │   │   └── globals.css
│   │   └── index.js
│   ├── next.config.js
│   ├── package.json
│   └── README.md
│
├── container/                         # Aplicação Container (Shell)
│   ├── pages/
│   │   ├── _app.js
│   │   ├── _document.js
│   │   └── index.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── Home.module.css
│   ├── public/
│   ├── next.config.js
│   ├── jsconfig.json
│   ├── package.json
│   └── README.md
│
└── README.md                          # Este arquivo
```

## 🚀 Como Começar

### Pré-requisitos

- **Node.js** v16+ 
- **npm** ou **yarn**

### Instalação

1. **Clone ou extraia o projeto**:
```bash
cd "C:\Users\Caioba\Desktop\agora vai"
```

2. **Instale dependências em cada pasta**:

```bash
# Catalogo
cd catalogo
npm install
cd ..

# Carrinho
cd carrinho
npm install
cd ..

# Container
cd container
npm install
cd ..
```

### Executar em Desenvolvimento

Abra **3 terminais diferentes** e execute:

**Terminal 1 - Catálogo (porta 3001)**:
```bash
cd "C:\Users\Caioba\Desktop\agora vai\catalogo"
npm run dev -- -p 3001
```

**Terminal 2 - Carrinho (porta 3002)**:
```bash
cd "C:\Users\Caioba\Desktop\agora vai\carrinho"
npm run dev -- -p 3002
```

**Terminal 3 - Container (porta 3000)**:
```bash
cd "C:\Users\Caioba\Desktop\agora vai\container"
npm run dev
```

Abra o navegador em [http://localhost:3000](http://localhost:3000) 🎉

## 🏗️ Arquitetura

### Module Federation

O projeto usa **Module Federation** para compartilhamento de componentes:

- **Container** importa dinamicamente:
  - `catalogo/Catalogo`
  - `carrinho/Carrinho`

- **Compartilhamento** de dependências:
  - React
  - React DOM

### Comunicação entre Microfrontends

Os componentes comunicam via **eventos customizados**:

```javascript
// Catalogo.jsx - Dispara evento
window.dispatchEvent(
  new CustomEvent("adicionarAoCarrinho", {
    detail: produto
  })
);

// Carrinho.jsx - Escuta evento
window.addEventListener("adicionarAoCarrinho", handleAdicionarAoCarrinho);
```

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "next": "^15.5.6",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@module-federation/nextjs-mf": "^8.8.49"
  }
}
```

## 🎨 Temas e Cores

**Paleta de cores utilizada**:

- **Primária**: `#667eea` (Roxo)
- **Secundária**: `#764ba2` (Roxo escuro)
- **Sucesso**: `#48bb78` (Verde)
- **Texto**: `#2d3748` (Cinza escuro)
- **Fundo**: `#f8f9fa` (Cinza claro)

## 📱 Responsividade

Todos os componentes são responsivos:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Pequenos**: < 480px

## 🔧 Configurações

### jsconfig.json (Container)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": "./*"
    }
  }
}
```

### next.config.js (Exemplo - Catalogo)

```javascript
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'catalogo',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Catalogo': './src/components/Catalogo',
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
```

## 📝 Componentes

### Catalogo.jsx

Exibe a lista de produtos com:
- Nome do prato
- Descrição detalhada
- Preço
- Botão "Adicionar ao Pedido"
- Ícone emoji decorativo
- Feedback visual ao adicionar

**Estado**:
- `itemAdicionado`: Controla o feedback visual

### Carrinho.jsx

Gerencia os itens do pedido:
- Lista de itens adicionados
- Preço unitário de cada item
- Botão para remover itens
- Total do pedido
- Botões "Continuar Comprando" e "Finalizar Pedido"

**Estado**:
- `itens`: Array com produtos no carrinho
- `mostrarDetalhes`: Controla visibilidade do carrinho

## 🎯 Funcionalidades Principais

### ✅ Adicionar Produto

1. Clique em "Adicionar" em qualquer produto
2. O item aparece no carrinho flutuante
3. Botão muda para verde com "✓ Adicionado!"
4. O total é atualizado automaticamente

### ✅ Gerenciar Carrinho

1. Clique no header do carrinho para expandir/colapsar
2. Visualize todos os itens adicionados
3. Clique no "✕" para remover itens individuais
4. Veja o total atualizado em tempo real

### ✅ Finalizar Pedido

1. Clique em "Finalizar Pedido"
2. Carrinho é limpo e colapsado
3. Pronto para novo pedido!

## 🧹 Limpeza de Cache

Se tiver problemas, limpe o cache:

```bash
# Windows CMD
rmdir /s /q .next

# Ou no PowerShell
rm -r .next -Force
```

Depois reinicie com `npm run dev`.

## 📊 Dados Padrão

O projeto vem com 6 produtos pré-configurados:

1. 🍔 Hambúrguer Artesanal - R$ 28.90
2. 🍕 Pizza Margherita - R$ 35.00
3. 🥤 Refrigerante - R$ 7.50
4. 🍟 Batata Frita Premium - R$ 12.50
5. 🥗 Salada Fresca - R$ 18.90
6. 🍦 Sorvete Artesanal - R$ 15.00

## 🚀 Próximas Melhorias

- [ ] Integração com backend (API)
- [ ] Autenticação e login
- [ ] Histórico de pedidos
- [ ] Cupons de desconto
- [ ] Filtros e busca de produtos
- [ ] Avaliações de clientes
- [ ] Múltiplos restaurantes
- [ ] Temas customizáveis

## 🐛 Troubleshooting

### Erro: "Module not found"

Verifique se os arquivos CSS estão na pasta `src/styles/`.

### Erro: "Cannot invoke constructor without new"

Atualize o `next.config.js` e use `new NextFederationPlugin()`.

### Porta já em uso

Use: `npm run dev -- -p XXXX` (substitua XXXX pela porta desejada)

### Componentes não aparecem

Certifique-se de que **todos os 3 servidores estão rodando**.

## 📖 Documentação Útil

- [Next.js Docs](https://nextjs.org/docs)
- [Module Federation](https://webpack.js.org/concepts/module-federation/)
- [React Hooks](https://react.dev/reference/react)

## 👨‍💻 Desenvolvimento

**Stack Utilizado**:
- ⚛️ React 18
- 🔷 Next.js 15
- 📦 Module Federation
- 🎨 CSS Modules
- 🔄 Webpack 5+

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👥 Contribuindo

Sinta-se à vontade para clonar, modificar e melhorar este projeto!

---

**Desenvolvido com ❤️ usando Next.js e Module Federation**

Última atualização: Novembro 2025