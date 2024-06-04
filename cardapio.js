
    function adicionarAoPedido(nome, preco, imagemSrc, descricao) {
        if (nome && preco && !isNaN(preco) && imagemSrc && descricao) {
            let pedido = JSON.parse(localStorage.getItem('pedido')) || [];

 
            const itemExistenteIndex = pedido.findIndex(item => item.nome === nome);
            if (itemExistenteIndex !== -1) {
                pedido[itemExistenteIndex].quantidade++;
            } else {
                pedido.push({ nome, preco, imagemSrc, descricao, quantidade: 1 });
            }

            localStorage.setItem('pedido', JSON.stringify(pedido));
        } else {
            console.error('Nome, preço, imagem ou descrição inválidos.');
        }
    }

    const botoesAdicionar = document.querySelectorAll('.botao-add');
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', () => {
            const blococardap = botao.closest('.blococardap');
            if (blococardap) {
                const nomeElemento = blococardap.querySelector('h2');
                const nome = nomeElemento ? nomeElemento.textContent : null;
                const precoElemento = blococardap.querySelector('.preco');
                const precoTexto = precoElemento ? precoElemento.textContent : null;
                const preco = precoTexto ? parseFloat(precoTexto.replace('R$ ', '')) : null;
                const imagem = blococardap.querySelector('img');
                const imagemSrc = imagem ? imagem.src : null;
                const descricaoElemento = blococardap.querySelector('.descricao');
                const descricao = descricaoElemento ? descricaoElemento.textContent : null;
                adicionarAoPedido(nome, preco, imagemSrc, descricao);
            } else {
                console.error('Div do item do cardápio não encontrada.');
            }
        });
    });

    


