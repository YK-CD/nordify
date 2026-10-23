# nordify

Transforme qualquer imagem na paleta Nord com Floyd–Steinberg dithering.

## Sobre

**nordify** é um site 100% client-side que converte suas imagens para usar apenas as 16 cores da [paleta Nord](https://www.nordtheme.com/). Utiliza o algoritmo Floyd–Steinberg dithering para obter transições mais suaves entre as cores.

## Features

- 🖼️ Upload por arrastar e soltar ou clique
- 🎨 Usa todas as 16 cores da paleta Nord
- ✨ Floyd–Steinberg dithering para melhor resultado
- 💾 Download apenas em PNG
- 🔒 100% client-side - sua imagem nunca sai do navegador
- ⚡ Rápido e sem dependências

## Como usar

1. Abra o `index.html` no seu navegador
2. Arraste uma imagem ou clique para selecionar
3. Aguarde o processamento
4. Baixe o resultado em PNG

## Tecnologias

- HTML5, CSS3, JavaScript (Vanilla)
- Canvas API
- FileReader API

## Paleta Nord

- **Polar Night**: `#2e3440`, `#3b4252`, `#434c5e`, `#4c566a`
- **Snow Storm**: `#d8dee9`, `#e5e9f0`, `#eceff4`
- **Frost**: `#8fbcbb`, `#88c0d0`, `#81a1c1`, `#5e81ac`
- **Aurora**: `#bf616a`, `#d08770`, `#ebcb8b`, `#a3be8c`, `#b48ead`

## Desenvolvimento

Todo o processamento é feito no navegador usando Canvas. O algoritmo Floyd–Steinberg distribui o erro de quantização para pixels vizinhos, criando um efeito de dithering característico.

## Licença

MIT
