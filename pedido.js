document.addEventListener('DOMContentLoaded', function() {
    // Array para armazenar os itens do pedido
    let pedido = JSON.parse(localStorage.getItem('pedido')) || [];

    // Função para atualizar a exibição do pedido na tela
    function atualizarPedido() {
        // Obtém o elemento HTML do pedido
        const pedidoDiv = document.getElementById('pedido');
        // Obtém a mensagem "Nenhum item adicionado ao pedido"
        const nenhumPedidoMensagem = document.getElementById('total-pagamento');

        // Verifica se o pedido está vazio
        if (pedido.length === 0) {
            // Se estiver vazio, exibe a mensagem "Nenhum item adicionado ao pedido"
            nenhumPedidoMensagem.innerText = "Pedido Vazio";
            nenhumPedidoMensagem.style.marginTop='10px';
            const botaopag = document.getElementById('divbotaopag');
            botaopag.style.display='none';
            pedidoDiv.style.display = 'none';
        } else {
            // Se não estiver vazio, exibe a div do pedido e atualiza seu conteúdo
            nenhumPedidoMensagem.style.display = 'none';
            pedidoDiv.style.display = 'block';

            // Limpa o conteúdo anterior do elemento
            pedidoDiv.innerHTML = '';

            // Itera sobre cada item do pedido
            pedido.forEach((item, index) => {
                // Cria uma div para representar o item do pedido
                const itemPedido = document.createElement('div');
                itemPedido.classList.add('blococardap'); // Adiciona a classe para manter o mesmo estilo
                // Cria a imagem do item do pedido
                const imagem = document.createElement('img');
                imagem.src = item.imagemSrc;
                imagem.alt = item.nome;
                itemPedido.appendChild(imagem); // Adiciona a imagem à div do item do pedido
                // Cria a div de conteúdo para o item do pedido
                const conteudo = document.createElement('div');
                conteudo.classList.add('conteudo'); // Adiciona a classe para manter o mesmo estilo
                // Cria o título do item do pedido com a quantidade
                const titulo = document.createElement('h2');
                titulo.textContent = `${item.nome} (${item.quantidade}x)`;
                conteudo.appendChild(titulo); // Adiciona o título à div de conteúdo
                // Cria a descrição do item do pedido
                const descricao = document.createElement('p');
                descricao.classList.add('descricao'); // Adiciona a classe para manter o mesmo estilo
                descricao.textContent = item.descricao;
                descricao.style.paddingBottom='10px';
                conteudo.appendChild(descricao); // Adiciona a descrição à div de conteúdo
                // Cria o preço do item do pedido
                const preco = document.createElement('span');
                preco.classList.add('preco'); // Adiciona a classe para manter o mesmo estilo
                preco.textContent = `R$ ${item.preco.toFixed(2)}`;
                conteudo.appendChild(preco); // Adiciona o preço à div de conteúdo
                // Cria o botão de remover item do pedido
                const botaoRemover = document.createElement('button');
                botaoRemover.textContent = 'Remover';
                botaoRemover.classList.add('botao-remover'); // Adiciona uma classe para estilização
                botaoRemover.style.backgroundColor = 'red'; // Define a cor de fundo como vermelha
                botaoRemover.style.padding = '7px';
                botaoRemover.style.color = 'white';
                botaoRemover.style.borderRadius='10px';
                botaoRemover.style.borderStyle='none';
                botaoRemover.style.marginLeft='10px';
                botaoRemover.addEventListener('click', () => {
                    removerDoPedido(index); // Chama a função para remover o item do pedido
                });
                conteudo.appendChild(botaoRemover); // Adiciona o botão de remover à div de conteúdo
                // Adiciona a div de conteúdo à div do item do pedido
                itemPedido.appendChild(conteudo);
                // Adiciona o item do pedido ao elemento HTML do pedido
                pedidoDiv.appendChild(itemPedido);
            });
        }
    }

    // Função para remover um item do pedido
    function removerDoPedido(index) {
        // Verifica se a quantidade do item é maior que 1
        if (pedido[index].quantidade > 1) {
            // Se for maior que 1, reduz a quantidade em 1
            pedido[index].quantidade--;
        } else {
            // Caso contrário, remove o item completamente
            pedido.splice(index, 1);
        }
        // Atualiza a exibição do pedido na tela
        atualizarPedido();
        // Atualiza o localStorage com o pedido atualizado
        localStorage.setItem('pedido', JSON.stringify(pedido));
    }

    // Chama a função para atualizar o pedido ao carregar a página
    atualizarPedido();
});
