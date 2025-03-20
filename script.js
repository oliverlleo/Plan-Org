// js/script.js

// Importa as funções do Firebase
import { salvarTarefa, carregarTarefa } from "./firebase.js";

document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todos os checkboxes de tarefa
  const taskCheckboxes = document.querySelectorAll('.task-checkbox');
  const xpDisplay = document.getElementById('xpAtual');
  const progressoXP = document.getElementById('progressoXP');
  const tituloNivel = document.getElementById('tituloNivel');
  
  // Variáveis de XP e níveis (exemplo)
  let xpTotal = 0;
  const xpParaProximoNivel = 100; // Valor base para o primeiro nível
  
  // Atualiza a barra de progresso e título do nível
  function atualizarNivel() {
    const nivel = Math.floor(xpTotal / xpParaProximoNivel) + 1;
    let titulo = '';
    
    // Exemplo de títulos para diferentes níveis
    if (nivel === 1) titulo = 'Aprendiz';
    else if (nivel === 2) titulo = 'Profissional';
    else if (nivel === 3) titulo = 'Mestre';
    else if (nivel === 4) titulo = 'Lorde';
    else titulo = 'Lenda';
    
    tituloNivel.textContent = titulo;
    // Calcula a porcentagem para a barra de progresso
    const xpNoNivel = xpTotal % xpParaProximoNivel;
    const porcentagem = (xpNoNivel / xpParaProximoNivel) * 100;
    progressoXP.style.width = porcentagem + '%';
    xpDisplay.textContent = `XP: ${xpTotal}`;
  }
  
  // Evento para cada checkbox
  taskCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const xpValor = parseInt(this.dataset.xp, 10);
      if (this.checked) {
        xpTotal += xpValor;
      } else {
        xpTotal -= xpValor;
        if(xpTotal < 0) xpTotal = 0;
      }
      atualizarNivel();
    });
  });
  
  // Função para salvar as tarefas no Firebase
  const btnSalvarTarefas = document.getElementById('salvarTarefas');
  if(btnSalvarTarefas){
    btnSalvarTarefas.addEventListener('click', async function() {
      // Usa a data selecionada como chave
      const dataSelecionada = document.getElementById('dataSelecionada').value;
      let tarefas = [];
      taskCheckboxes.forEach(checkbox => {
        tarefas.push({ id: checkbox.parentElement.textContent.trim(), concluida: checkbox.checked });
      });
      
      await salvarTarefa(dataSelecionada, tarefas);
      alert("Tarefas salvas no Firebase!");
    });
  }
  
  // Carregar tarefas salvas quando a data for alterada
  const inputData = document.getElementById('dataSelecionada');
  if(inputData){
    inputData.addEventListener('change', async function() {
      const dataSelecionada = this.value;
      const tarefasSalvas = await carregarTarefa(dataSelecionada);
      if (tarefasSalvas) {
        taskCheckboxes.forEach((checkbox, index) => {
          if (tarefasSalvas[index]) {
            checkbox.checked = tarefasSalvas[index].concluida;
          }
        });
      }
    });
  }
  
  // Inicializa a visualização do XP
  atualizarNivel();
});
