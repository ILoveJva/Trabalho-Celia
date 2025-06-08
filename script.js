class Produto {
    static ultimoCodigo = 0;
    static nomes = [];
    constructor(nome, valor) {
        Produto.ultimoCodigo += 1;
        this.cod_produto = Produto.ultimoCodigo;
        this.nome = nome;
        this.valor = valor;
        this.quantidade = 0;
    }
    gerarlayout(classname) {
        let sectionSalgados = document.querySelector(`section.${classname}`);
            /*<div class="item">*/ let divprincipal = document.createElement('div'); divprincipal.setAttribute("class", "item");
            /*<div class="item__cima">*/ let divfilho1 = document.createElement('div'); divfilho1.setAttribute("class", "item__cima");
            /*<img src="paodebatata.jpg" alt="">*/ let img = document.createElement('img'); img.setAttribute("src", `${this.nome}.jpg`); divfilho1.appendChild(img);
            /*</div>*/ divprincipal.appendChild(divfilho1);
            /* <div class="item__baixo"> */ let divfilho2 = document.createElement("div"); divfilho2.setAttribute("class", "item__baixo");
            /* <h3>R$ 6,50</h3>*/ let h3mostrarpreco = document.createElement("h3"); h3mostrarpreco.innerText = `R$${this.valor}`;
            /* <input type="button" value="Adicionar ao Carrinho" onclick="addPDB()"> */ let inputadicionar = document.createElement("input"); inputadicionar.setAttribute("type", "button"); inputadicionar.setAttribute("value", "Adicionar ao Carrinho"); inputadicionar.setAttribute("onclick", `add(${this.cod_produto})`); divfilho2.appendChild(h3mostrarpreco); divfilho2.appendChild(inputadicionar);
            /* </div> */ divprincipal.appendChild(divfilho2);
            /* </div> */ sectionSalgados.appendChild(divprincipal);
    }
    addCarrinho(produto) {
        // criar carrinho 
        console.log(`Metodo -> addCarrinho`);
        produto.quantidade++;
        if (!carrinhoexiste) {
            let divcarrinho = document.createElement('div'); divcarrinho.setAttribute('class', 'carrinho');
            main.appendChild(divcarrinho);
            carrinhoexiste = true;
        }
        let divcarrinho = document.querySelector('div.carrinho');
        if (!produtojadicionada) {
            console.log("Produto nao adicinado");
            produtojadicionada = true;
            let divproduto = document.createElement('div');
            divproduto.setAttribute('class', 'carrinho--produto');
            divproduto.setAttribute('id', `produto${this.cod_produto}`);
            let h2mostrarnome = document.createElement("h2"); h2mostrarnome.setAttribute('id', `mostrarnome${this.cod_produto}`)
            let pmostrarpreco = document.createElement("p");
            let buttonremover = document.createElement('button');
            buttonremover.innerText = 'x'; buttonremover.setAttribute('onclick', `removerItem(${this.cod_produto})`)
            pmostrarpreco.setAttribute("id", `mostrarpreco${produto.cod_produto}`)
            h2mostrarnome.innerHTML = `${produto.nome}`;
            pmostrarpreco.innerHTML = `R$${produto.valor} - ${produto.quantidade}`;
            divproduto.appendChild(buttonremover); divproduto.appendChild(h2mostrarnome); divproduto.appendChild(pmostrarpreco);
            divcarrinho.insertBefore(divproduto, divcarrinho.firstChild);
        } else {
            console.log("Produto já adicionado");
            let pmostrarpreco = document.querySelector(`p#mostrarpreco${produto.cod_produto}`);
            pmostrarpreco.innerHTML = "";
            pmostrarpreco.innerHTML = `R$${produto.valor} - ${produto.quantidade}`;
        }
        if (!finalizarcompra) {
            finalizarcompra = true;
            let inputbuttonflzc = document.createElement('input');
            inputbuttonflzc.setAttribute('type', 'button'); inputbuttonflzc.setAttribute('value', 'Finalizar Compra'); inputbuttonflzc.setAttribute('onclick', 'finalizarCompra()');
            inputbuttonflzc.setAttribute('id', 'fc');
            divcarrinho.appendChild(inputbuttonflzc);
        }
        console.log("Fim medoto addCarrinho");
    }
    adicionar(produto) {
        console.log(`Metodo -> adicionar ${produto}`);
        console.log(`Produto: ${produto.nome}\nValor R$${produto.valor} \nCódigo: ${produto.cod_produto}`)
        if (!nomesP.includes(produto.nome)) {
            nomesP.push(produto.nome);
            objetosnoCarrinho.push(produto);
            valoresP.push(produto.valor);
            produtojadicionada = false;
        }
        console.log(nomesP);
        this.addCarrinho(produto);
    }
}

function iniciar() {
    console.log("Funcao Iniciar")
    finalizarcompra = false;
    carrinhoexiste = false;
    produtojadicionada = false;
    main = document.querySelector('main');
    soma = 0;
    senha = 1;
    objetosnoCarrinho = [];
    nomesP = [];
    valoresP = [];
    carrinho = [];
    nomesProdutos = ['Pão De Queijo', 'Pão De Batata', 'Enroladinho De Presunto e Queijo', 'Coxinha', 'Esfiha', 'Quibe', 'Empada', 'Pastel', 'Coca Cola', 'Guarana', 'Guaraviton', 'Gatorade'];
    valorProdutos = [6, 6.5, 6.5, 6, 6.5, 6, 6.5, 10, 5, 5, 6, 9];
    alterarestoque();
}
function alterarestoque() {
    console.log("Funcao Alterar Estoque");
    let j = 0
    produtos = [];
    arrayParaGuardarOsObjetos = [];
    // Salgados
    while (j < valorProdutos.length) {
        if (j < 8) {
            const novoProduto = new Produto(nomesProdutos[j], valorProdutos[j]);
            produtos.push(novoProduto);
            arrayParaGuardarOsObjetos.push(novoProduto);
            novoProduto.gerarlayout('salgados');
        } else if (j >= 8) {
            const novoProduto = new Produto(nomesProdutos[j], valorProdutos[j]);
            produtos.push(novoProduto);
            arrayParaGuardarOsObjetos.push(novoProduto);
            novoProduto.gerarlayout('bebidas')
        }
        j++;
    }
}
function add(cod) {
    console.log(`Funcao ADD${cod}`);
    produtoatual = produtos.find(Produto => Produto.cod_produto == cod);
    produtoatual.adicionar(produtoatual);
}
function removerItem(cod) {
    console.log(`Funcao removerItem() -> ${cod}`); console.log(nomesP);
    produtoatual = produtos.find(Produto => Produto.cod_produto == cod);
    divcarrinho = document.querySelector('div.carrinho');
    divproduto = document.querySelector(`div#produto${produtoatual.cod_produto}.carrinho--produto`);
    pmostrarpreco = document.querySelector(`p#mostrarpreco${cod}`);
    if (produtoatual.quantidade == 1) {
        divcarrinho.removeChild(divproduto);
        const index = nomesP.findIndex(p => p === produtoatual.nome);
        if (index !== -1) {
            nomesP.splice(index, 1);
            objetosnoCarrinho.splice(index, 1);
            console.log(`Produto "${produtoatual.nome}" removido.`);
            produtojadicionada = false;
        }
        if (nomesP.length < 1) {
            inputbuttonflzc = document.querySelector('input#fc');
            divcarrinho.removeChild(inputbuttonflzc);
            finalizarcompra = false;
        }
        produtoatual.quantidade--;
        produtojadicionada = false;

    } else {
        produtoatual.quantidade--;
        pmostrarpreco.innerHTML = `R$${produtoatual.valor} - ${produtoatual.quantidade}`;
    }
    console.log('Fim removerITEM')
    console.log(nomesP);
}
function finalizarCompra() {
    console.log('Funcao finalizarCompra()');
    let divfinazarCompra = document.createElement('div');
    divfinazarCompra.setAttribute('id', 'finalizarCompra');
    divfinazarCompra.innerHTML = `
        <button id="voltar" onclick="voltarfc()">&LeftArrow;</button>
        <h1>Finalizar Compra</h1>
        <h2>Pedido</h2>
    `
    main.appendChild(divfinazarCompra);
    let total = 0;
    
    k = 0;
    while (k < objetosnoCarrinho.length) {
        console.log(objetosnoCarrinho[k]);
        objeto = objetosnoCarrinho[k];
        pmostrarpedido = document.createElement('p'); pmostrarpedido.setAttribute('id', 'mostrarpedido');
        pmostrarpedido.innerHTML = `${objeto.cod_produto}: ${objeto.nome} - R$<span id="preco">${objeto.valor}</span> x <span id="quantidade">${objeto.quantidade}</span>`;
        divfinazarCompra.appendChild(pmostrarpedido);
        console.log(objeto.valor); console.log(objeto.quantidade); 
        total += objeto.valor * objeto.quantidade;
        k++;
    }
    h3total = document.createElement('h3');
    h3total.innerHTML = `Total a pagar: ${total}`;
    divfinazarCompra.appendChild(h3total);
    divfinazarCompra.innerHTML += `<button onclick="pagar()">Pagar</button>`
}
function voltarfc() {
    main.removeChild(document.querySelector('div#finalizarCompra'));
}
function pagar() {
    alert(`Sua senha é ${senha} diriga-se ao caixa para pagar.`)
    senha++;
    main.removeChild(document.querySelector('div#finalizarCompra'));
    main.removeChild(document.querySelector('div.carrinho'));
    finalizarcompra = false;
    carrinhoexiste = false;
    produtojadicionada = false;
    objetosnoCarrinho = [];
    nomesP = [];
}