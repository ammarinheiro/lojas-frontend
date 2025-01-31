import React, { useState, useEffect } from "react";

export default function LojasApp() {
  const [loja, setLoja] = useState("");
  const [logada, setLogada] = useState(false);
  const [vendas, setVendas] = useState([]);
  const [novaVenda, setNovaVenda] = useState({ data: "", cliente: "", aparelho: "", valor: "", pagamento: "", entrega: "" });
  const [objetivos, setObjetivos] = useState({});
  const [novoObjetivo, setNovoObjetivo] = useState({ mes: "", objetivo: "" });

  useEffect(() => {
    if (logada) {
      fetch(`https://lojas-backend.onrender.com/loja/${loja}`)
        .then((res) => res.json())
        .then((data) => {
          setVendas(data.vendas || []);
          setObjetivos(data.objetivo || {});
        });
    }
  }, [logada, loja]);

  const registrarVenda = () => {
    fetch("https://lojas-backend.onrender.com/registrar-venda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loja, ...novaVenda, valor: parseFloat(novaVenda.valor) })
    }).then(() => {
      setNovaVenda({ data: "", cliente: "", aparelho: "", valor: "", pagamento: "", entrega: "" });
      setLogada(false);
    });
  };

  const definirObjetivo = () => {
    fetch("https://lojas-backend.onrender.com/definir-objetivo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loja, ...novoObjetivo, objetivo: parseFloat(novoObjetivo.objetivo) })
    }).then(() => setNovoObjetivo({ mes: "", objetivo: "" }));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-xl">
      {!logada ? (
        <div>
          <h2 className="text-xl font-bold">Login da Loja</h2>
          <input type="text" placeholder="Nome da loja" value={loja} onChange={(e) => setLoja(e.target.value)} className="border p-2 w-full mt-2" />
          <button onClick={() => setLogada(true)} className="bg-blue-500 text-white p-2 mt-2 w-full">Entrar</button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">Painel da Loja: {loja}</h2>

          <h3 className="font-bold mt-4">Registrar Venda</h3>
          {Object.keys(novaVenda).map((campo) => (
            <input key={campo} type="text" placeholder={campo} value={novaVenda[campo]} onChange={(e) => setNovaVenda({ ...novaVenda, [campo]: e.target.value })} className="border p-2 w-full mt-2" />
          ))}
          <button onClick={registrarVenda} className="bg-green-500 text-white p-2 mt-2 w-full">Salvar Venda</button>

          <h3 className="font-bold mt-4">Vendas Registradas</h3>
          <ul>
            {vendas.map((venda, index) => (
              <li key={index} className="border p-2 mt-2">{JSON.stringify(venda)}</li>
            ))}
          </ul>

          <h3 className="font-bold mt-4">Definir Objetivo</h3>
          <input type="text" placeholder="Mês" value={novoObjetivo.mes} onChange={(e) => setNovoObjetivo({ ...novoObjetivo, mes: e.target.value })} className="border p-2 w-full mt-2" />
          <input type="number" placeholder="Valor do objetivo" value={novoObjetivo.objetivo} onChange={(e) => setNovoObjetivo({ ...novoObjetivo, objetivo: e.target.value })} className="border p-2 w-full mt-2" />
          <button onClick={definirObjetivo} className="bg-yellow-500 text-white p-2 mt-2 w-full">Salvar Objetivo</button>
        </div>
      )}
    </div>
  );
}
