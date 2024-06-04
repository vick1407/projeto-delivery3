


document.addEventListener('DOMContentLoaded', function() {

    let pedido = JSON.parse(localStorage.getItem('pedido')) || [];

 
    function atualizarPedido() {
    
        const pedidoDiv = document.getElementById('pedido');
        const totalPagamento = document.getElementById('total-pagamento');
        const botaopag = document.getElementById('divbotaopag');

        if (pedido.length === 0) {
            
            botaopag.remove()
            pedidoDiv.style.display = 'none';
            totalPagamento.style.display='block'
            totalPagamento.style.marginTop='10px'
            totalPagamento.innerHTML='Pedido vazio'
        } 
        else {
            pedidoDiv.style.display = 'block';
            totalPagamento.style.display='block'
            pedidoDiv.innerHTML = '';
            pedido.forEach((item, index) => {
            const itemPedido = document.createElement('div');
            itemPedido.classList.add('blococardap');
            const imagem = document.createElement('img');
            imagem.src = item.imagemSrc;
            imagem.alt = item.nome;
            itemPedido.appendChild(imagem);
            const conteudo = document.createElement('div');
            conteudo.classList.add('conteudo'); 
            const titulo = document.createElement('h2');
            titulo.textContent = `${item.nome} (${item.quantidade}x)`;
            conteudo.appendChild(titulo); 
            const descricao = document.createElement('p');
            descricao.classList.add('descricao');
            descricao.textContent = item.descricao;
            descricao.style.paddingBottom = '10px';
            descricao.style.width='100%'
            conteudo.appendChild(descricao); 
            const preco = document.createElement('span');
            preco.classList.add('preco');
            preco.textContent = `R$ ${item.preco.toFixed(2)}`;
            conteudo.appendChild(preco); 
            const botaoRemover = document.createElement('button');
            botaoRemover.id ='botaorem'
            botaoRemover.textContent = 'Remover';
            botaoRemover.classList.add('botao-remover'); 
            botaoRemover.style.backgroundColor = 'red'; 
            botaoRemover.style.padding = '7px';
            botaoRemover.style.color = 'white';
            botaoRemover.style.borderRadius = '10px';
            botaoRemover.style.fontWeight='bolder'
            botaoRemover.style.borderStyle = 'none';
            botaoRemover.style.marginLeft = '10px';
                botaoRemover.addEventListener('click', () => {
                    removerDoPedido(index); 
                });
                conteudo.appendChild(botaoRemover);
                itemPedido.appendChild(conteudo);
                pedidoDiv.appendChild(itemPedido);
            });

            calcularTotalPagamento(pedido);
        }
    }


    function calcularTotalPagamento(pedido) {
        let total = 0;
        pedido.forEach(item => {
            total += item.preco * item.quantidade;
        });
        const totalPagamento = document.getElementById('total-pagamento');
        if (pedido.length === 0) {
            totalPagamento.innerHTML = '';
        } else {
            totalPagamento.innerHTML = `Total de R$ ${total.toFixed(2)}`;
        }
    }

    
    function removerDoPedido(index) {
        if (pedido[index].quantidade > 1) {
            pedido[index].quantidade--;
        } else {
            pedido.splice(index, 1);
        }
        atualizarPedido();
        localStorage.setItem('pedido', JSON.stringify(pedido));
    }
    atualizarPedido();
});
