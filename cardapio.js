










    // Função para adicionar um item ao pedido
    function adicionarAoPedido(nome, preco, imagemSrc, descricao) {
        // Verifica se o nome, preço, imagem e descrição são válidos
        if (nome && preco && !isNaN(preco) && imagemSrc && descricao) {
            // Array para armazenar os itens do pedido
            let pedido = JSON.parse(localStorage.getItem('pedido')) || [];

            // Verifica se o item já existe no pedido
            const itemExistenteIndex = pedido.findIndex(item => item.nome === nome);
            if (itemExistenteIndex !== -1) {
                // Se o item já existe, atualiza apenas a quantidade
                pedido[itemExistenteIndex].quantidade++;
            } else {
                // Se o item não existe, adiciona ao array de pedidos
                pedido.push({ nome, preco, imagemSrc, descricao, quantidade: 1 });
            }

            // Atualiza o localStorage com o pedido atualizado
            localStorage.setItem('pedido', JSON.stringify(pedido));
        } else {
            console.error('Nome, preço, imagem ou descrição inválidos.');
        }
    }

    // Adiciona evento de clique aos botões "Adicionar"
    const botoesAdicionar = document.querySelectorAll('.botao-add');
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', () => {
            // Obtém a div do item do cardápio mais próxima do botão clicado
            const blococardap = botao.closest('.blococardap');
            if (blococardap) {
                // Obtém o nome do item do cardápio
                const nomeElemento = blococardap.querySelector('h2');
                const nome = nomeElemento ? nomeElemento.textContent : null;
                // Obtém o preço do item do cardápio e converte para número
                const precoElemento = blococardap.querySelector('.preco');
                const precoTexto = precoElemento ? precoElemento.textContent : null;
                const preco = precoTexto ? parseFloat(precoTexto.replace('R$ ', '')) : null;
                // Obtém o caminho da imagem do item do cardápio
                const imagem = blococardap.querySelector('img');
                const imagemSrc = imagem ? imagem.src : null;
                // Obtém a descrição do item do cardápio
                const descricaoElemento = blococardap.querySelector('.descricao');
                const descricao = descricaoElemento ? descricaoElemento.textContent : null;
                // Chama a função para adicionar o item ao pedido
                adicionarAoPedido(nome, preco, imagemSrc, descricao);
            } else {
                console.error('Div do item do cardápio não encontrada.');
            }
        });
    });

    


