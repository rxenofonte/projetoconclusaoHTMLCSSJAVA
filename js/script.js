function convertToReal(number, options = {}) {
    const { moneySign = true } = options;

    if(Number.isNaN(number) || !number) return "need a number as the first parameter";

    if(typeof number === "string") { // n1
        number = Number(number);
    }

    let res;

    const config = moneySign ? {style: 'currency', currency: 'BRL'} : {minimumFractionDigits: 2};

    moneySign
    ? res = number.toLocaleString('pt-BR', config)
    : res = number.toLocaleString('pt-BR', config)

    const needComma = number => number <= 1000;
    if(needComma(number)) {
        res = res.toString().replace(".", ",");
    }

    return res; // n2
}

function conversao(value) {
    const inputId = `${value}-input`;
    const resultId = `${value}-result`;
    const inputValue = parseFloat(document.getElementById(inputId).value);

    if (!isNaN(inputValue)) {
        let taxaConversao;
        switch (value) {
            case 'bitcoin':
                taxaConversao = 183516.9;
                break;
            case 'ethereum':
                taxaConversao = 10295.96;
                break;
            case 'adacardano':
                taxaConversao = 1.84;
                break;
            default:
                break;
        }

        const result = inputValue * taxaConversao;
        document.getElementById(resultId).innerText = `Valor em Real: ${convertToReal(result.toFixed(2))}`;
    } else {
        document.getElementById(resultId).innerText = 'Por favor, insira uma quantidade válida.';
    }
}

const inputHandler = function(e) { 
  
  const inputs = ['bitcoin','ethereum','adacardano'];
  var pesquisarValue = e.target.value;  
  
  var resultado = inputs.filter( elemento  => (elemento.includes(pesquisarValue.toLowerCase())));
  if (resultado.length == 0){
		document.getElementById(inputs[0]).style.display = 'block';
		document.getElementById(inputs[1]).style.display = 'block';
		document.getElementById(inputs[2]).style.display = 'block';
  }
  else {
		document.getElementById(inputs[0]).style.display = 'none';
		document.getElementById(inputs[1]).style.display = 'none';
		document.getElementById(inputs[2]).style.display = 'none';
		resultado.forEach(function(nome, i) {		
			document.getElementById(nome).style.display = 'block';	  
		})		
  }
}

const pesquisarInput = document.getElementById('pesquisa-input');
pesquisarInput.addEventListener('input', inputHandler);



