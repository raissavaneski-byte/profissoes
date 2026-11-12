// =========================================
// 1. MENU RESPONSIVO (MOBILE)
// =========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// =========================================
// 2. EXPLORADOR DE ÁREAS DE ATUAÇÃO
// =========================================
const areasData = [
  {
    id: 'clinica',
    nome: 'Psicologia Clínica',
    descricao:
      'Atendimento psicoterapêutico individual, de casais ou famílias. Utiliza abordagens científicas (como TCC, Psicanálise e Humanismo) para tratar ansiedade, depressão, luto e promover autoconhecimento.',
    locais: 'Consultórios particulares, clínicas integradas, UBS e atendimento online.',
    salario: 'R$ 3.800 a R$ 9.500'
  },
  {
    id: 'organizacional',
    nome: 'Organizacional (RH)',
    descricao:
      'Atua na saúde mental do trabalhador, recrutamento e seleção, liderança, clima organizacional e prevenção da Síndrome de Burnout dentro das empresas.',
    locais: 'Empresas privadas, consultorias de RH e startups.',
    salario: 'R$ 4.500 a R$ 11.000'
  },
  {
    id: 'escolar',
    nome: 'Psicologia Escolar',
    descricao:
      'Acompanha processos de aprendizagem, combate o bullying, orienta professores e famílias e apoia a inclusão de estudantes neurodivergentes.',
    locais: 'Escolas públicas e privadas, universidades e secretarias de educação.',
    salario: 'R$ 3.500 a R$ 6.800'
  },
  {
    id: 'hospitalar',
    nome: 'Psicologia Hospitalar',
    descricao:
      'Acolhe pacientes internados, familiares e equipes médicas diante de cirurgias, diagnósticos graves, UTI e cuidados paliativos.',
    locais: 'Hospitais gerais, maternidades e centros oncológicos.',
    salario: 'R$ 4.000 a R$ 7.500'
  },
  {
    id: 'juridica',
    nome: 'Psicologia Jurídica',
    descricao:
      'Elabora perícias e laudos psicológicos para processos de guarda, adoção, sistema prisional e mediação de conflitos familiares.',
    locais: 'Tribunais de Justiça, Defensorias Públicas e Varas da Infância.',
    salario: 'R$ 5.500 a R$ 12.000'
  },
  {
    id: 'esportiva',
    nome: 'Psicologia do Esporte',
    descricao:
      'Prepara atletas de alto rendimento para lidar com pressão competitiva, foco, recuperação de lesões e trabalho em equipe.',
    locais: 'Clubes esportivos, confederações e centros olímpicos.',
    salario: 'R$ 4.200 a R$ 10.000'
  }
];

const areaTabs = document.getElementById('areaTabs');
const areaPanel = document.getElementById('areaPanel');

function renderArea(area) {
  areaPanel.innerHTML = `
    <div>
      <h3>${area.nome}</h3>
      <p>${area.descricao}</p>
    </div>
    <div class="area-meta">
      <p><strong>Onde atua:</strong> ${area.locais}</p>
      <p><strong>Faixa salarial:</strong> ${area.salario}</p>
    </div>
  `;
}

areasData.forEach((area, index) => {
  const btn = document.createElement('button');
  btn.className = `area-tab ${index === 0 ? 'active' : ''}`;
  btn.textContent = area.nome;
  btn.type = 'button';

  btn.addEventListener('click', () => {
    document.querySelectorAll('.area-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderArea(area);
  });

  areaTabs.appendChild(btn);
});

renderArea(areasData[0]);

// =========================================
// 3. LINHA DO TEMPO INTERATIVA (HISTÓRIA)
// =========================================
document.querySelectorAll('.timeline-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    item.classList.toggle('active');
  });
});

// =========================================
// 4. GRÁFICOS COM CHART.JS (MERCADO)
// =========================================
const salaryDatasets = {
  junior: [2800, 3200, 2700, 3100, 4200],
  pleno: [4500, 5600, 4100, 4800, 7200],
  senior: [8500, 10800, 6500, 7400, 11500]
};

const salaryCtx = document.getElementById('salaryChart').getContext('2d');
const salaryChart = new Chart(salaryCtx, {
  type: 'bar',
  data: {
    labels: ['Clínica', 'Organizacional', 'Escolar', 'Hospitalar', 'Jurídica'],
    datasets: [{
      label: 'Média Salarial (R$)',
      data: salaryDatasets.pleno,
      backgroundColor: '#2d5a4c',
      borderRadius: 8
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

document.getElementById('salaryFilter').addEventListener('change', (e) => {
  salaryChart.data.datasets[0].data = salaryDatasets[e.target.value];
  salaryChart.update();
});

const regionCtx = document.getElementById('regionChart').getContext('2d');
new Chart(regionCtx, {
  type: 'doughnut',
  data: {
    labels: ['Sudeste (52%)', 'Sul (17%)', 'Nordeste (17%)', 'Centro-Oeste (9%)', 'Norte (5%)'],
    datasets: [{
      data: [52, 17, 17, 9, 5],
      backgroundColor: ['#2d5a4c', '#7c6a99', '#5e8c7d', '#a393bf', '#9dbdb2']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

// =========================================
// 5. QUIZ INTERATIVO (MITO OU VERDADE)
// =========================================
const quizQuestions = [
  {
    pergunta: '“O psicólogo pode receitar medicamentos controlados para ansiedade.”',
    resposta: false,
    explicacao: 'MITO! Apenas médicos (como psiquiatras) prescrevem remédios. O psicólogo atua com psicoterapia e avaliação psicológica.'
  },
  {
    pergunta: '“Fazer terapia não serve apenas para quem está em crise; ajuda no autoconhecimento e prevenção.”',
    resposta: true,
    explicacao: 'VERDADE! A psicoterapia desenvolve inteligência emocional, melhora relacionamentos e previne transtornos futuros.'
  },
  {
    pergunta: '“O psicólogo tem obrigação ética de manter sigilo profissional sobre o que é dito em sessão.”',
    resposta: true,
    explicacao: 'VERDADE! O sigilo é garantido pelo Código de Ética Profissional do Psicólogo, salvo situações extremas de risco à vida.'
  },
  {
    pergunta: '“Psicólogos só trabalham dentro de consultórios particulares.”',
    resposta: false,
    explicacao: 'MITO! Eles atuam em hospitais, escolas, empresas, clubes esportivos, tribunais, CRAS e CAPS.'
  }
];

let currentQ = 0;
let score = 0;
const quizContainer = document.getElementById('quizContainer');

function renderQuiz() {
  if (currentQ >= quizQuestions.length) {
    quizContainer.innerHTML = `
      <h3>Quiz Concluído! 🎉</h3>
      <p style="margin: 1rem 0;">Você acertou <strong>${score} de ${quizQuestions.length}</strong> perguntas sobre Psicologia!</p>
      <button class="btn btn-primary" onclick="restartQuiz()">Jogar Novamente</button>
    `;
    return;
  }

  const q = quizQuestions[currentQ];
  quizContainer.innerHTML = `
    <div class="quiz-progress">Pergunta ${currentQ + 1} de ${quizQuestions.length}</div>
    <h3 class="quiz-question">${q.pergunta}</h3>
    <div class="quiz-options">
      <button class="quiz-btn" onclick="checkAnswer(true)">Verdade</button>
      <button class="quiz-btn" onclick="checkAnswer(false)">Mito</button>
    </div>
    <div id="quizFeedback"></div>
  `;
}

window.checkAnswer = function(userChoice) {
  const q = quizQuestions[currentQ];
  const isCorrect = userChoice === q.resposta;
  if (isCorrect) score++;

  const feedback = document.getElementById('quizFeedback');
  feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`;
  feedback.innerHTML = `
    <p><strong>${isCorrect ? 'Acertou!' : 'Quase lá!'}</strong> ${q.explicacao}</p>
    <button class="btn btn-primary" style="margin-top: 0.9rem;" onclick="nextQuestion()">
      ${currentQ + 1 < quizQuestions.length ? 'Próxima Pergunta →' : 'Ver Resultado'}
    </button>
  `;

  document.querySelectorAll('.quiz-btn').forEach(btn => btn.disabled = true);
};

window.nextQuestion = function() {
  currentQ++;
  renderQuiz();
};

window.restartQuiz = function() {
  currentQ = 0;
  score = 0;
  renderQuiz();
};

renderQuiz();