// Função principal que calcula se o herói completa a jornada
function calculateJourney(path, initialEnergy) {
    // Cria uma cópia da energia inicial para não modificar o parâmetro original
    let currentEnergy = initialEnergy;

    // Percorre cada etapa do caminho
    for (let i = 0; i < path.length; i++) {
        // Subtrai a energia gasta na etapa atual
        currentEnergy -= path[i];

        // Se a energia for zero ou negativa antes do fim do caminho, retorna false
        if (currentEnergy <= 0 && i < path.length - 1) {
            return false;
        }
    }

    // Se chegou até o fim com energia positiva (ou zero no último passo), retorna true
    return true;
}

// Função para limpar os campos
function clearFields() {
    document.getElementById('path').value = '';
    document.getElementById('energy').value = '';
    document.getElementById('result').textContent = '-';
    document.getElementById('result').style.color = '#4fc3f7';
}

// Função para lidar com o clique no botão de cálculo
function handleCalculate() {
    // Obtém os valores dos inputs
    const pathInput = document.getElementById('path').value;
    const energyInput = document.getElementById('energy').value;
    const resultElement = document.getElementById('result');

    try {
        // Converte a string do caminho para um array de números
        const path = pathInput.split(',')
            .map(item => item.trim())
            .filter(item => item !== '')
            .map(Number);

        // Valida os inputs
        if (path.length === 0 || path.some(isNaN)) {
            throw new Error('Por favor, insira um caminho válido (números separados por vírgulas)');
        }

        if (!energyInput || isNaN(energyInput)) {
            throw new Error('Por favor, insira uma energia inicial válida');
        }

        const initialEnergy = Number(energyInput);

        // Calcula o resultado da jornada
        const result = calculateJourney(path, initialEnergy);

        // Exibe o resultado com estilo apropriado
        if (result) {
            resultElement.textContent = '✅ O herói completou a jornada!';
            resultElement.style.color = '#4caf50'; // Verde para sucesso
        } else {
            resultElement.textContent = '❌ O herói não completou a jornada!';
            resultElement.style.color = '#f44336'; // Vermelho para falha
        }
    } catch (error) {
        // Exibe mensagens de erro
        resultElement.textContent = error.message;
        resultElement.style.color = '#ff9800'; // Laranja para erro
    }
}

// Configura os eventos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const backBtn = document.getElementById('backBtn');

    calculateBtn.addEventListener('click', handleCalculate);
    backBtn.addEventListener('click', clearFields);

    // Permite calcular também pressionando Enter
    document.getElementById('energy').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleCalculate();
        }
    });
});