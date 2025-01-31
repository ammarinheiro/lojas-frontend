async function carregarDados() {
    const resposta = await fetch("https://lojas-backend.onrender.com/estatisticas");
    const dados = await resposta.json();

    document.getElementById("root").innerHTML = `
        <h1>Dashboard de Vendas</h1>
        <p>Total de Vendas: <strong>R$${dados.totalVendas}</strong></p>
        <ul>
            ${Object.keys(dados.vendasPorLoja).map(loja => `
                <li>${loja}: <strong>R$${dados.vendasPorLoja[loja]}</strong></li>
            `).join('')}
        </ul>
    `;
}

carregarDados();
