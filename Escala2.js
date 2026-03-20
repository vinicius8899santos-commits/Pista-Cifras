const notas = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

const nomes = {
  "C":"Dó","C#":"Dó#","D":"Ré","D#":"Ré#","E":"Mi",
  "F":"Fá","F#":"Fá#","G":"Sol","G#":"Sol#",
  "A":"Lá","A#":"Lá#","B":"Si"
};

const padrao = [2,2,1,2,2,2,1];

let tomAtual = "C";

function gerarEscala(tonica){
  let escala = [];
  let index = notas.indexOf(tonica);

  escala.push(notas[index]);

  padrao.forEach(i => {
    index = (index + i) % 12;
    escala.push(notas[index]);
  });

  return escala;
}

function atualizarEscala(){
  let escala = gerarEscala(tomAtual);

  document.getElementById("tomAtual").innerText = tomAtual;
  document.getElementById("nomeEscala").innerText = `${tomAtual} (${nomes[tomAtual]})`;
  document.getElementById("notasEscala").innerText = escala.join(" - ");

  atualizarGrid();
}

function criarBotoes(){
  const grid = document.getElementById("gridTom");

  notas.forEach(nota => {
    let btn = document.createElement("button");
    btn.innerText = nota;
    btn.classList.add("btn-tom-grid");

    btn.onclick = () => {
      tomAtual = nota;
      atualizarEscala();
      fecharTom();
    };

    grid.appendChild(btn);
  });
}

function atualizarGrid(){
  const botoes = document.querySelectorAll(".btn-tom-grid");

  botoes.forEach(btn => {
    btn.classList.remove("ativo");
    if(btn.innerText === tomAtual){
      btn.classList.add("ativo");
    }
  });
}

function abrirTom(){
  document.getElementById("modalTom").classList.add("ativo");
}

function fecharTom(){
  document.getElementById("modalTom").classList.remove("ativo");
}

// iniciar
criarBotoes();
atualizarEscala();