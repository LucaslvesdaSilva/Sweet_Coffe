document.querySelectorAll(".card").forEach(card => {
    const buttons = card.querySelectorAll(".btn");
    const minus = buttons[0];
    const plus = buttons[1];
    const count = card.querySelector(".count");
    
    let botaoAdicionar = card.querySelector(".adicionar-carrinho");
    
    if (!botaoAdicionar) {
        botaoAdicionar = document.createElement("button");
        botaoAdicionar.className = "adicionar-carrinho";
        botaoAdicionar.textContent = "Adicionar ao Carrinho";
        card.appendChild(botaoAdicionar);
    }

    let value = 0;
    
    const nomeElement = card.querySelector("br");
    const nome = nomeElement ? nomeElement.nextSibling.textContent.trim() : card.dataset.nome;
    const precoElement = card.querySelector(".price");
    const preco = precoElement ? parseFloat(precoElement.textContent.replace('$', '').trim()) : parseFloat(card.dataset.preco);

    minus.addEventListener("click", () => {
        if (value > 0) {
            value--;
            count.textContent = value;
        }
    });

    plus.addEventListener("click", () => {
        value++;
        count.textContent = value;
    });

    botaoAdicionar.addEventListener("click", () => {
        if (value > 0) {
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            const index = carrinho.findIndex(i => i.nome === nome);

            if (index !== -1) {
                carrinho[index].quantidade += value;
            } else {
                carrinho.push({ 
                    nome: nome, 
                    preco: preco, 
                    quantidade: value 
                });
            }

            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            alert(`${value}x ${nome} adicionado ao carrinho!`);
            
            value = 0;
            count.textContent = value;
        } else {
            alert("Escolha a quantidade antes de adicionar.");
        }
    });

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const itemSalvo = carrinho.find(i => i.nome === nome);
    if (itemSalvo) {
        value = itemSalvo.quantidade;
        count.textContent = value;
    }
});