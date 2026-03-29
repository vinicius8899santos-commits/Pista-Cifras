function pintarCifras() {
  const cifras = document.querySelectorAll(".cifra");

  cifras.forEach(pre => {

    let linhas = pre.innerText.split("\n");

    let resultado = linhas.map(linha => {

      // verifica se é linha de acorde
      let linhaLimpa = linha.trim();

      let ehAcorde = /^([A-G](#)?(m|2|7|9|maj7|sus4)?(\/[A-G](#)?)?\s*)+$/.test(linhaLimpa);

      if(ehAcorde && linhaLimpa !== ""){
        return linha.replace(
          /([A-G](#)?(m|2|7|9|maj7|sus4)?(\/[A-G](#)?)?)/g,
          '<span class="acorde">$1</span>'
        );
      }

      return linha; // NÃO pinta letra
    });

    pre.innerHTML = resultado.join("\n");
  });
}

window.onload = pintarCifras;



