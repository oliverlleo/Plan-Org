export function updateAvatarDisplay() {
  const xpDisplay = document.getElementById('xpDisplay');
  const xpBar = document.getElementById('xpBar');
  const levelName = document.getElementById('levelName');
  
  let xpTotal = parseInt(localStorage.getItem('xpTotal')) || 0;
  
  // Define os níveis com XP mínimo necessário
  const levels = [
    { name: 'Aprendiz', xp: 0 },
    { name: 'Profissional', xp: 100 },
    { name: 'Mestre', xp: 250 },
    { name: 'Lorde', xp: 500 },
    { name: 'Lenda', xp: 1000 }
  ];
  
  let currentLevel = levels[0];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xpTotal >= levels[i].xp) {
      currentLevel = levels[i];
      break;
    }
  }
  
  // Calcula a progressão para o próximo nível (se houver)
  let nextLevelXp = 0;
  for (let i = 0; i < levels.length; i++) {
    if (xpTotal < levels[i].xp) {
      nextLevelXp = levels[i].xp;
      break;
    }
  }
  if (nextLevelXp === 0) nextLevelXp = xpTotal; // Caso esteja no nível máximo
  
  let xpInCurrentLevel = xpTotal - currentLevel.xp;
  let xpNeeded = nextLevelXp - currentLevel.xp;
  let percent = xpNeeded ? (xpInCurrentLevel / xpNeeded) * 100 : 100;
  
  if (xpDisplay) xpDisplay.textContent = 'XP: ' + xpTotal;
  if (levelName) levelName.textContent = currentLevel.name;
  if (xpBar) xpBar.style.width = percent + '%';
}

// Atualiza o avatar quando a página de avatar for carregada
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('xpDisplay')) {
    updateAvatarDisplay();
  }
});
