"use client";

import dynamic from "next/dynamic";

const Carrinho = dynamic(() => import("../src/components/Carrinho"), {
  ssr: false,
});

export default function CarrinhoPage() {
  return <Carrinho />;
}
