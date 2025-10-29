// ========================================
// FRONTEND - DASHBOARD RESPONSÁVEL
// ========================================
// Este arquivo contém a lógica específica do dashboard do responsável

// Variáveis globais
let currentAccessibilityMode = 'nenhum';
let fontSize = 100;

// Função para mostrar seções do responsável
function showResponsavelSection(section) {
    // Esconder todas as seções
    document.querySelectorAll('[id$="Section"]').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Remover classe active de todos os itens do menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(`responsavel${section.charAt(0).toUpperCase() + section.slice(1)}Section`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Adicionar classe active ao item do menu
    event.target.closest('.menu-item').classList.add('active');
}

// Funções de acessibilidade são importadas do common.js

// Função para destacar simulado do responsável
function destacarSimuladoResponsavel(numero) {
    // Remover classe active de todos os botões
    document.querySelectorAll('.simulado-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adicionar classe active ao botão clicado
    document.querySelector(`[data-simulado="${numero}"]`).classList.add('active');
    
    // Mostrar/ocultar colunas baseado na seleção
    const headers = document.querySelectorAll('.tab-header');
    const cells = document.querySelectorAll('.grade-cell');
    
    if (numero === 0) {
        // Mostrar todas as colunas
        headers.forEach((header, index) => {
            if (index === 0) return; // Pular o header "Disciplina"
            header.style.display = 'block';
            header.classList.remove('active');
        });
        
        // Remover destaque de todas as células
        cells.forEach(cell => {
            cell.classList.remove('destaque-col-1', 'destaque-col-2', 'destaque-col-3', 'destaque-col-4');
        });
        
        showAlert('Visualizando todos os simulados', 'success');
    } else {
        // Mostrar apenas a coluna selecionada
        headers.forEach((header, index) => {
            if (index === 0) return; // Pular o header "Disciplina"
            
            if (index === numero) {
                header.style.display = 'block';
                header.classList.add('active');
            } else {
                header.style.display = 'none';
                header.classList.remove('active');
            }
        });
        
        // Destacar coluna correspondente
        cells.forEach(cell => {
            // Remover todas as classes de destaque
            cell.classList.remove('destaque-col-1', 'destaque-col-2', 'destaque-col-3', 'destaque-col-4');
            
            // Adicionar classe de destaque para a coluna selecionada
            if (cell.parentElement.children[numero] === cell) {
                cell.classList.add(`destaque-col-${numero}`);
            }
        });
        
        showAlert(`Visualizando Simulado ${numero}`, 'success');
    }
}

// Funções auxiliares da toolbar
function adjustFontSize(delta) {
    if (typeof fontSize === 'undefined') {
        window.fontSize = 100;
    }
    fontSize = Math.max(80, Math.min(120, fontSize + delta * 10));
    document.documentElement.style.fontSize = fontSize + '%';
    showAlert(`Tamanho da fonte: ${fontSize}%`, 'success');
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const isActive = document.body.classList.contains('high-contrast');
    showAlert(isActive ? 'Alto contraste ativado' : 'Alto contraste desativado', 'success');
}

function toggleDyslexiaFont() {
    document.body.classList.toggle('dyslexia-font');
    const isActive = document.body.classList.contains('dyslexia-font');
    showAlert(isActive ? 'Fonte para dislexia ativada' : 'Fonte padrão restaurada', 'success');
}

function toggleReducedMotion() {
    document.body.classList.toggle('reduced-motion');
    const isActive = document.body.classList.contains('reduced-motion');
    showAlert(isActive ? 'Animações reduzidas' : 'Animações restauradas', 'success');
}

// Função para exportar boletim do filho em PDF
function exportBoletimFilhoPDF() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        showAlert('Erro: Usuário não encontrado!', 'error');
        return;
    }

    const currentUser = JSON.parse(userData);
    showAlert('Gerando PDF do boletim...', 'success');
    
    // Dados do boletim do filho
    const disciplinas = [
        { nome: 'Frequência', bim1: '88%', bim2: '95%', bim3: '90%', bim4: '92%' },
        { nome: 'Português', bim1: '8.2', bim2: '9.0', bim3: '8.5', bim4: '9.2' },
        { nome: 'Matemática', bim1: '9.1', bim2: '9.5', bim3: '8.8', bim4: '9.3' },
        { nome: 'Ciências', bim1: '8.0', bim2: '8.5', bim3: '9.0', bim4: '8.7' },
        { nome: 'História', bim1: '7.8', bim2: '8.2', bim3: '8.0', bim4: '8.3' },
        { nome: 'Comportamento', bim1: 'Excelente', bim2: 'Excelente', bim3: 'Bom', bim4: 'Excelente' }
    ];
    
    const observacoes = [
        {
            disciplina: '📚 Matemática',
            professor: 'Prof. Carlos Silva',
            data: '15/10/2024',
            texto: 'Aluna demonstra excelente desempenho em todas as atividades. Participa ativamente das aulas e auxilia os colegas. Recomendo continuar incentivando a prática diária de exercícios.'
        },
        {
            disciplina: '📖 Português',
            professor: 'Profa. Ana Costa',
            data: '12/10/2024',
            texto: 'Ótimo progresso na leitura e interpretação de textos. Sugiro aumentar o hábito de leitura em casa para continuar desenvolvendo as habilidades linguísticas.'
        },
        {
            disciplina: '🔬 Ciências',
            professor: 'Prof. Roberto Mendes',
            data: '10/10/2024',
            texto: 'Demonstra curiosidade e interesse pelos temas científicos. Participação ativa nos experimentos em laboratório. Continuar estimulando a curiosidade científica.'
        }
    ];
    
    // Criar conteúdo HTML para o PDF
    let htmlContent = `
        <html>
        <head>
            <style>
                body { 
                    font-family: 'Segoe UI', Arial, sans-serif; 
                    padding: 40px; 
                    background: #f8f9fa; 
                }
                .container { 
                    background: white; 
                    padding: 40px; 
                    border-radius: 15px; 
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); 
                }
                h1 { 
                    color: #D4AF37; 
                    text-align: center; 
                    margin-bottom: 10px; 
                    font-size: 32px;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
                }
                .subtitle { 
                    color: #C19A2B; 
                    text-align: center;
                    margin-bottom: 30px; 
                    font-size: 16px; 
                }
                .info-section { 
                    background: linear-gradient(135deg, #f5f3e8, #ede8d5); 
                    padding: 20px; 
                    border-radius: 12px; 
                    margin-bottom: 25px;
                    border-left: 5px solid #D4AF37;
                }
                .info-section p { 
                    margin: 8px 0; 
                    color: #555; 
                }
                table { 
                    width: 100%; 
                    border-collapse: separate; 
                    border-spacing: 0; 
                    margin-top: 25px;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.08);
                }
                th { 
                    background: linear-gradient(135deg, #D4AF37, #C19A2B); 
                    color: white; 
                    padding: 15px 12px; 
                    text-align: center;
                    font-weight: 600;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                th:first-child {
                    text-align: left;
                }
                td { 
                    border-bottom: 1px solid #e0e0e0; 
                    padding: 14px 12px;
                    background: white;
                    color: #333;
                    text-align: center;
                }
                td:first-child {
                    text-align: left;
                    font-weight: 600;
                    color: #C19A2B;
                }
                tr:nth-child(even) td { 
                    background: #fafafa; 
                }
                tr:last-child td { 
                    border-bottom: none; 
                }
                
                .observacoes-section {
                    margin-top: 40px;
                }
                
                .observacoes-title {
                    color: #D4AF37;
                    font-size: 22px;
                    margin-bottom: 20px;
                    border-bottom: 3px solid #D4AF37;
                    padding-bottom: 10px;
                }
                
                .observacao-box {
                    background: linear-gradient(135deg, #f5f3e8, #ede8d5);
                    padding: 20px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    border-left: 5px solid #2196F3;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
                }
                
                .obs-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                
                .obs-disciplina {
                    font-weight: bold;
                    color: #2196F3;
                    font-size: 16px;
                }
                
                .obs-data {
                    color: #888;
                    font-size: 13px;
                }
                
                .obs-professor {
                    color: #C19A2B;
                    font-weight: 600;
                    margin-bottom: 10px;
                    font-size: 14px;
                }
                
                .obs-texto {
                    color: #555;
                    line-height: 1.6;
                    font-size: 14px;
                }
                
                .footer { 
                    margin-top: 40px; 
                    text-align: center; 
                    font-size: 12px; 
                    color: #888;
                    padding-top: 30px;
                    border-top: 2px solid #D4AF37;
                }
                .footer p { 
                    margin: 5px 0; 
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📋 Boletim Escolar</h1>
                <div class="subtitle">Sistema Escolar JK - Visualização Responsável</div>
                
                <div class="info-section">
                    <p><strong>👤 Estudante:</strong> ${currentUser.alunoVinculado?.nome || 'Não informado'}</p>
                    <p><strong>🎫 Matrícula:</strong> ${currentUser.alunoVinculado?.matricula || 'Não informado'}</p>
                    <p><strong>🔒 CPF (Protegido):</strong> ${mascararCPF(currentUser.alunoVinculado?.cpf)}</p>
                    <p><strong>🏫 Turma:</strong> ${currentUser.alunoVinculado?.serie}ª Série ${currentUser.alunoVinculado?.turma}</p>
                    <p><strong>👨‍👩‍👧 Responsável:</strong> ${currentUser.name}</p>
                    <p><strong>📅 Data de Emissão:</strong> ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Disciplina</th>
                            <th>1º Bimestre</th>
                            <th>2º Bimestre</th>
                            <th>3º Bimestre</th>
                            <th>4º Bimestre</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${disciplinas.map(disc => `
                            <tr>
                                <td>${disc.nome}</td>
                                <td>${disc.bim1}</td>
                                <td>${disc.bim2}</td>
                                <td>${disc.bim3}</td>
                                <td>${disc.bim4}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="observacoes-section">
                    <h3 class="observacoes-title">📝 Observações dos Professores</h3>
                    ${observacoes.map(obs => `
                        <div class="observacao-box">
                            <div class="obs-header">
                                <span class="obs-disciplina">${obs.disciplina}</span>
                                <span class="obs-data">${obs.data}</span>
                            </div>
                            <div class="obs-professor">${obs.professor}</div>
                            <div class="obs-texto">${obs.texto}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="footer">
                    <p><strong>Sistema Escolar JK - Gestão Acadêmica</strong></p>
                    <p>Boletim gerado para o responsável</p>
                    <p>${new Date().toLocaleString('pt-BR')}</p>
                </div>
            </div>
        </body>
        </html>
    `;
    
    // Criar e fazer download do PDF
    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
        showAlert('PDF gerado! Use a opção "Salvar como PDF" na janela de impressão.', 'success');
    }, 500);
}

// Função para editar perfil do responsável
function editResponsavelProfile() {
    showAlert('Modo de edição do perfil ativado!', 'success');
    // Aqui seria implementada a lógica de edição
}

// Função para salvar perfil do responsável
function saveResponsavelProfile() {
    showAlert('Perfil do responsável salvo com sucesso!', 'success');
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const currentUser = verificarTipoUsuario('responsavel');
    if (!currentUser) return;

    // Atualizar informações do perfil do responsável
    const nomeElement = document.getElementById('responsavelPerfilNome');
    const cpfElement = document.getElementById('responsavelPerfilCpf');
    if (nomeElement) nomeElement.textContent = currentUser.name;
    if (cpfElement) {
        const cpfMascarado = mascararCPF(currentUser.cpfResponsavel || currentUser.cpf);
        cpfElement.textContent = `CPF: ${cpfMascarado}`;
    }
    
    // Buscar aluno vinculado
    let alunoVinculado = null;
    if (currentUser.cpfAlunoVinculado) {
        // Buscar nos usuários cadastrados
        const todosUsuarios = Object.values(users);
        alunoVinculado = todosUsuarios.find(u => u.type === 'aluno' && u.cpfAluno === currentUser.cpfAlunoVinculado);
    }
    
    // Se tiver dados salvos do aluno vinculado, usar
    if (currentUser.alunoVinculado) {
        alunoVinculado = currentUser.alunoVinculado;
    }
    
    // Atualizar informações do aluno vinculado na tela
    if (alunoVinculado) {
        // Header do boletim
        const filhoNomeEl = document.getElementById('responsavelFilhoNome');
        const filhoInfoEl = document.getElementById('responsavelFilhoInfo');
        if (filhoNomeEl) filhoNomeEl.textContent = alunoVinculado.nome || alunoVinculado.name;
        if (filhoInfoEl) filhoInfoEl.textContent = `Matrícula: ${alunoVinculado.matricula} • Turma: ${alunoVinculado.serie}ª${alunoVinculado.turma}`;
        
        // Seção de perfil - dados do aluno
        const alunoNomeEl = document.getElementById('alunoVinculadoNome');
        const alunoMatriculaEl = document.getElementById('alunoVinculadoMatricula');
        const alunoCpfEl = document.getElementById('alunoVinculadoCpf');
        const alunoNascimentoEl = document.getElementById('alunoVinculadoNascimento');
        const alunoTurmaEl = document.getElementById('alunoVinculadoTurma');
        
        if (alunoNomeEl) alunoNomeEl.textContent = alunoVinculado.nome || alunoVinculado.name;
        if (alunoMatriculaEl) alunoMatriculaEl.textContent = alunoVinculado.matricula;
        if (alunoCpfEl) {
            const cpfAlunoMascarado = mascararCPF(alunoVinculado.cpf || alunoVinculado.cpfAluno);
            alunoCpfEl.textContent = cpfAlunoMascarado;
        }
        if (alunoNascimentoEl) {
            const dataNasc = alunoVinculado.dataNascimento;
            if (dataNasc) {
                const dataFormatada = new Date(dataNasc + 'T00:00:00').toLocaleDateString('pt-BR');
                alunoNascimentoEl.textContent = dataFormatada;
            }
        }
        if (alunoTurmaEl) alunoTurmaEl.textContent = `${alunoVinculado.serie}ª Série ${alunoVinculado.turma}`;
    } else {
        showAlert('Atenção: Nenhum aluno vinculado encontrado!', 'error');
    }
    
    // Toggle do menu de acessibilidade
    const accessibilityToggle = document.querySelector('.accessibility-toggle');
    const accessibilityOptions = document.getElementById('accessibilityOptions');
    
    if (accessibilityToggle) {
        accessibilityToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            accessibilityOptions.classList.toggle('show');
        });
    }
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.accessibility-menu')) {
            accessibilityOptions.classList.remove('show');
        }
    });
    
    // Fechar legendas ao clicar no overlay
    document.addEventListener('click', function(e) {
        const daltonismoLegend = document.getElementById('daltonismoLegend');
        const pbLegend = document.getElementById('pbLegend');
        const legendToggle = document.querySelector('.legend-toggle');
        const pbLegendToggle = document.querySelector('.pb-legend-toggle');
        
        if (daltonismoLegend && daltonismoLegend.classList.contains('show')) {
            if (!daltonismoLegend.contains(e.target) && e.target !== legendToggle && !legendToggle.contains(e.target)) {
                daltonismoLegend.classList.remove('show');
            }
        }
        
        if (pbLegend && pbLegend.classList.contains('show')) {
            if (!pbLegend.contains(e.target) && e.target !== pbLegendToggle && !pbLegendToggle.contains(e.target)) {
                pbLegend.classList.remove('show');
            }
        }
    });
    
    // Fechar legendas com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const daltonismoLegend = document.getElementById('daltonismoLegend');
            const pbLegend = document.getElementById('pbLegend');
            if (daltonismoLegend) daltonismoLegend.classList.remove('show');
            if (pbLegend) pbLegend.classList.remove('show');
        }
    });
    
    // Funcionalidade dos botões da toolbar
    const toolbar = document.querySelector('.bd-toolbar');
    if (toolbar) {
        toolbar.addEventListener('click', function(e) {
            const btn = e.target.closest('.bd-btn');
            if (!btn) return;
            
            const action = btn.dataset.action;
            
            switch(action) {
                case 'font-dec':
                    adjustFontSize(-1);
                    break;
                case 'font-inc':
                    adjustFontSize(1);
                    break;
                case 'contrast':
                    toggleHighContrast();
                    break;
                case 'dyslexia':
                    toggleDyslexiaFont();
                    break;
                case 'reduce-motion':
                    toggleReducedMotion();
                    break;
                case 'print':
                    exportBoletimFilhoPDF();
                    break;
            }
        });
    }
});

// Exportar funções para uso global
window.showResponsavelSection = showResponsavelSection;
window.destacarSimuladoResponsavel = destacarSimuladoResponsavel;
window.adjustFontSize = adjustFontSize;
window.toggleHighContrast = toggleHighContrast;
window.toggleDyslexiaFont = toggleDyslexiaFont;
window.toggleReducedMotion = toggleReducedMotion;
window.exportBoletimFilhoPDF = exportBoletimFilhoPDF;
window.editResponsavelProfile = editResponsavelProfile;
window.saveResponsavelProfile = saveResponsavelProfile;
