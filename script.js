// Lista de palavras que podem aparecer no jogo.
const palavras = [
    "javascript",
    "html",
    "css",
    "internet",
    "navegador",
    "programacao",
    "computador",
    "algoritmo",
    "teclado",
    "mouse"
];

// Variaveis utilizadas durante a partida.
let palavraSecreta;
let letrasCorretas = [];
let letrasUsadas = [];
let tentativas = 6;
let jogoFinalizado = false;

// Localizando os elementos do HTML.
const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

// Inicia uma nova partida.
function iniciarJogo() {
    const indice = Math.floor(Math.random() * palavras.length);

    palavraSecreta = palavras[indice];
    tentativas = 6;
    letrasCorretas = [];
    letrasUsadas = [];
    jogoFinalizado = false;

    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "";
    mensagem.textContent = "Boa sorte!";
    inputLetra.value = "";
    inputLetra.disabled = false;
    botaoTentar.disabled = false;

    atualizarPalavra();
}

// Mostra as letras que o jogador ja acertou.
function atualizarPalavra() {
    let exibicao = "";

    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (letrasCorretas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }

    elementoPalavra.textContent = exibicao;
}

// Verifica se todas as letras foram descobertas.
function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (!letrasCorretas.includes(letra)) {
            return false;
        }
    }

    return true;
}

// Verifica a letra digitada.
function verificarLetra() {
    if (jogoFinalizado) {
        return;
    }

    const letra = inputLetra.value.toLowerCase();

    if (letra === "") {
        mensagem.textContent = "Digite uma letra.";
        return;
    }

    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Voce ja utilizou essa letra.";
        inputLetra.value = "";
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        mensagem.textContent = "Voce acertou!";
    } else {
        tentativas--;
        mensagem.textContent = "Voce errou!";
    }

    atualizarPalavra();

    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ");

    if (venceu()) {
        mensagem.textContent = "Parabens! Voce venceu!";
        jogoFinalizado = true;
    } else if (tentativas === 0) {
        mensagem.textContent = "Voce perdeu! A palavra era " + palavraSecreta;
        jogoFinalizado = true;
    }

    if (jogoFinalizado) {
        inputLetra.disabled = true;
        botaoTentar.disabled = true;
    }

    inputLetra.value = "";
}

// Evento de clique no botao Tentar.
botaoTentar.addEventListener("click", verificarLetra);

// Desafio extra: tambem permite tentar apertando Enter.
inputLetra.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        verificarLetra();
    }
});

// Evento de clique no botao Nova partida.
botaoReiniciar.addEventListener("click", iniciarJogo);

// Comeca o jogo quando a pagina abre.
iniciarJogo();
