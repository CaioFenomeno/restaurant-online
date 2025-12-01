"use client";

import dynamic from "next/dynamic";

const Catalogo = dynamic(() => import("../src/components/Catalogo"), {
  ssr: false,
});

export default function CatalogoPage() {
  return <Catalogo />;
}
