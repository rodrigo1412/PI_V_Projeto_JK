// ========================================
// FRONTEND - DASHBOARD PROFESSOR
// ========================================
// Este arquivo contém a lógica específica do dashboard do professor

// Função para mostrar seções do professor
function showProfessorSection(section) {
    // Esconder todas as seções
    document.querySelectorAll('[id$="Section"]').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Remover classe active de todos os itens do menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(`professor${section.charAt(0).toUpperCase() + section.slice(1)}Section`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Adicionar classe active ao item do menu
    event.target.closest('.menu-item').classList.add('active');
}

// Funções de acessibilidade são importadas do common.js

// Funções de legenda são importadas do common.js

// Função para gerenciar turma
function gerenciarTurma(turmaId) {
    showAlert(`Abrindo gerenciamento da turma ${turmaId}...`, 'success');
    
    // Criar modal para gerenciar turma
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h2>Gerenciar Turma ${turmaId}</h2>
                <button class="modal-close" onclick="fecharModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="turma-info-header">
                    <p><strong>Turma:</strong> ${turmaId}</p>
                    <p><strong>Disciplina:</strong> Matemática</p>
                    <p><strong>Total de Alunos:</strong> 25</p>
                </div>
                
                <div class="alunos-table-container">
                    <table class="alunos-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Matrícula</th>
                                <th>Frequência</th>
                                <th>Nota 1</th>
                                <th>Nota 2</th>
                                <th>Média</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>João Silva</td>
                                <td>2025001</td>
                                <td class="edit-cell" onclick="editarNota('${turmaId}', 'João Silva', 'frequencia', this)">95%</td>
                                <td class="edit-cell" onclick="editarNota('${turmaId}', 'João Silva', 'nota1', this)">8.5</td>
                                <td class="edit-cell" onclick="editarNota('${turmaId}', 'João Silva', 'nota2', this)">9.0</td>
                                <td>8.8</td>
                                <td>
                                    <button class="btn-small btn-edit" onclick="editarAluno('${turmaId}', 'João Silva')">Editar</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Maria Santos</td>
                                <td>2025002</td>
                                <td class="edit-cell" onclick="editarNota('${turmaId}', 'Maria Santos', 'frequencia', this)">88%</td>
                                <td class="edit-cell" onclick="editarNota('${turmaId}', 'Maria Santos', 'nota1', this)">7.5</td>
                                <td class="edit-cell" onclick="editarNota('${turmaId}', 'Maria Santos', 'nota2', this)">8.0</td>
                                <td>7.8</td>
                                <td>
                                    <button class="btn-small btn-edit" onclick="editarAluno('${turmaId}', 'Maria Santos')">Editar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-save" onclick="salvarTurma('${turmaId}')">Salvar Alterações</button>
                    <button class="btn btn-edit" onclick="exportarTurma('${turmaId}')">Exportar Relatório</button>
                    <button class="btn" onclick="fecharModal()">Fechar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Função para editar nota
function editarNota(turmaId, alunoNome, campo, elemento) {
    const valorAtual = elemento.textContent;
    const novoValor = prompt(`Editar ${campo} para ${alunoNome}:`, valorAtual);
    
    if (novoValor !== null && novoValor !== valorAtual) {
        elemento.textContent = novoValor;
        elemento.style.backgroundColor = '#fff3cd';
        showAlert(`${campo} atualizado para ${alunoNome}`, 'success');
    }
}

// Função para editar aluno
function editarAluno(turmaId, alunoNome) {
    showAlert(`Editando dados do aluno ${alunoNome}`, 'success');
    // Aqui seria implementada a lógica de edição completa do aluno
}

// Função para salvar turma
function salvarTurma(turmaId) {
    showAlert(`Dados da turma ${turmaId} salvos com sucesso!`, 'success');
    fecharModal();
}

// Função para exportar turma
function exportarTurma(turmaId) {
    showAlert(`Exportando relatório da turma ${turmaId}...`, 'success');
    // Aqui seria implementada a lógica de exportação
}

// Função para gerenciar disciplina
function gerenciarDisciplina(disciplinaNome) {
    showAlert(`Abrindo gerenciamento da disciplina ${disciplinaNome}...`, 'success');
    
    // Criar modal para gerenciar disciplina
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h2>Gerenciar Disciplina: ${disciplinaNome}</h2>
                <button class="modal-close" onclick="fecharModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="disciplina-tabs">
                    <button class="tab-btn active" onclick="mostrarTabDisciplina('info')">Informações</button>
                    <button class="tab-btn" onclick="mostrarTabDisciplina('turmas')">Turmas</button>
                    <button class="tab-btn" onclick="mostrarTabDisciplina('conteudo')">Conteúdo</button>
                    <button class="tab-btn" onclick="mostrarTabDisciplina('avaliacoes')">Avaliações</button>
                </div>
                
                <div class="tab-content active" id="info-tab">
                    <h3>Informações da Disciplina</h3>
                    <div class="disciplina-info-grid">
                        <div class="info-card">
                            <h3>Dados Básicos</h3>
                            <div class="info-item">
                                <strong>Nome:</strong> ${disciplinaNome}
                            </div>
                            <div class="info-item">
                                <strong>Status:</strong> <span class="status-ativa">Ativa</span>
                            </div>
                            <div class="info-item">
                                <strong>Carga Horária:</strong> 80 horas
                            </div>
                        </div>
                        
                        <div class="info-card">
                            <h3>Estatísticas</h3>
                            <div class="info-item">
                                <strong>Turmas:</strong> 3
                            </div>
                            <div class="info-item">
                                <strong>Alunos:</strong> 75
                            </div>
                            <div class="info-item">
                                <strong>Média Geral:</strong> 8.2
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-content" id="turmas-tab">
                    <h3>Turmas da Disciplina</h3>
                    <div class="turmas-list">
                        <div class="turma-badge">1º Ano A - 25 alunos</div>
                        <div class="turma-badge">2º Ano B - 20 alunos</div>
                        <div class="turma-badge">3º Ano A - 30 alunos</div>
                    </div>
                </div>
                
                <div class="tab-content" id="conteudo-tab">
                    <h3>Conteúdo Programático</h3>
                    <div class="conteudos-list">
                        <div class="conteudo-card">
                            <div class="conteudo-header">
                                <h3>Álgebra Linear</h3>
                                <span class="status-badge status-concluído">Concluído</span>
                            </div>
                            <div class="conteudo-body">
                                <p class="conteudo-descricao">Fundamentos de álgebra linear e suas aplicações.</p>
                                <div class="conteudo-dates">
                                    <span>Início: 15/08/2024</span>
                                    <span>Fim: 30/09/2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-content" id="avaliacoes-tab">
                    <h3>Avaliações</h3>
                    <div class="avaliacoes-list">
                        <div class="avaliacao-item">
                            <strong>Prova 1:</strong> 25/09/2024 - Peso: 30%
                        </div>
                        <div class="avaliacao-item">
                            <strong>Prova 2:</strong> 15/11/2024 - Peso: 30%
                        </div>
                        <div class="avaliacao-item">
                            <strong>Trabalho:</strong> 20/12/2024 - Peso: 40%
                        </div>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-save" onclick="salvarConfigDisciplina('${disciplinaNome}')">Salvar Configurações</button>
                    <button class="btn" onclick="fecharModal()">Fechar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Função para mostrar tab da disciplina
function mostrarTabDisciplina(tabName) {
    // Remover classe active de todos os tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Adicionar classe active ao tab selecionado
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Função para salvar configurações da disciplina
function salvarConfigDisciplina(disciplinaNome) {
    showAlert(`Configurações da disciplina ${disciplinaNome} salvas!`, 'success');
    fecharModal();
}

// Função para gerenciar conteúdo
function gerenciarConteudo(disciplina) {
    showAlert(`Abrindo gerenciamento de conteúdo para ${disciplina}...`, 'success');
    
    // Criar modal para gerenciar conteúdo
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h2>Gerenciar Conteúdo - ${disciplina}</h2>
                <button class="modal-close" onclick="fecharModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="content-actions">
                    <button class="btn btn-save" onclick="adicionarConteudo()">➕ Adicionar Conteúdo</button>
                    <button class="btn btn-edit" onclick="verCronograma()">📅 Ver Cronograma</button>
                </div>
                
                <div class="conteudos-list">
                    <div class="conteudo-card">
                        <div class="conteudo-header">
                            <h3>Introdução à Álgebra</h3>
                            <span class="status-badge status-concluído">Concluído</span>
                        </div>
                        <div class="conteudo-body">
                            <p class="conteudo-descricao">Fundamentos básicos de álgebra e operações matemáticas.</p>
                            <div class="conteudo-dates">
                                <span>Início: 01/08/2024</span>
                                <span>Fim: 15/08/2024</span>
                            </div>
                            <div class="conteudo-turmas">
                                <strong>Turmas:</strong> 1ºA, 2ºB, 3ºA
                            </div>
                        </div>
                        <div class="conteudo-actions">
                            <button class="btn btn-edit" onclick="editarConteudo('1')">Editar</button>
                            <button class="btn btn-danger" onclick="excluirConteudo('1')">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Função para adicionar conteúdo
function adicionarConteudo() {
    showAlert('Abrindo formulário para adicionar novo conteúdo...', 'success');
    // Aqui seria implementada a lógica para adicionar conteúdo
}

// Função para ver cronograma
function verCronograma() {
    showAlert('Abrindo cronograma da disciplina...', 'success');
    // Aqui seria implementada a lógica para visualizar cronograma
}

// Função para editar conteúdo
function editarConteudo(conteudoId) {
    showAlert(`Editando conteúdo ${conteudoId}...`, 'success');
    // Aqui seria implementada a lógica de edição
}

// Função para excluir conteúdo
function excluirConteudo(conteudoId) {
    if (confirm('Tem certeza que deseja excluir este conteúdo?')) {
        showAlert(`Conteúdo ${conteudoId} excluído!`, 'success');
    }
}

// Função para adicionar simulado
function adicionarSimulado() {
    showAlert('Abrindo formulário para adicionar novo simulado...', 'success');
    
    // Criar modal para adicionar simulado
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Adicionar Novo Simulado</h2>
                <button class="modal-close" onclick="fecharModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Nome do Simulado</label>
                    <input type="text" class="form-input" placeholder="Ex: Simulado Bimestral 1">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Disciplina</label>
                    <select class="form-select">
                        <option>Matemática</option>
                        <option>Português</option>
                        <option>Ciências</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Data da Prova</label>
                    <input type="date" class="form-input">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Turmas</label>
                    <div class="turmas-checkboxes">
                        <label><input type="checkbox" checked> 1º Ano A</label>
                        <label><input type="checkbox" checked> 2º Ano B</label>
                        <label><input type="checkbox" checked> 3º Ano A</label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Descrição</label>
                    <textarea class="form-input" placeholder="Descrição do simulado..."></textarea>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-save" onclick="salvarSimulado()">Salvar Simulado</button>
                    <button class="btn" onclick="fecharModal()">Cancelar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Função para salvar simulado
function salvarSimulado() {
    showAlert('Simulado salvo com sucesso!', 'success');
    fecharModal();
}

// Função para calcular médias
function calcularMedias() {
    showAlert('Calculando médias automáticas...', 'success');
    // Aqui seria implementada a lógica de cálculo de médias
}

// Função para lançar faltas
function lancarFaltas() {
    showAlert('Abrindo sistema de lançamento de faltas...', 'success');
    // Aqui seria implementada a lógica de lançamento de faltas
}

// Função para gerar relatórios
function gerarRelatorios() {
    showAlert('Abrindo sistema de geração de relatórios...', 'success');
    // Aqui seria implementada a lógica de geração de relatórios
}

// Função para ver estatísticas
function verEstatisticas() {
    showAlert('Abrindo estatísticas da turma...', 'success');
    // Aqui seria implementada a lógica de visualização de estatísticas
}

// Função para ver estatísticas da disciplina
function verEstatisticasDisciplina(disciplina) {
    showAlert(`Abrindo estatísticas da disciplina ${disciplina}...`, 'success');
    // Aqui seria implementada a lógica de estatísticas da disciplina
}

// Função para adicionar nova disciplina
function adicionarNovaDisciplina() {
    showAlert('Abrindo formulário para nova disciplina...', 'success');
    // Aqui seria implementada a lógica para adicionar nova disciplina
}

// Função para mostrar política de proteção de dados
function mostrarPoliticaProtecaoDados() {
    showAlert('Abrindo política de proteção de dados (LGPD)...', 'success');
    // Aqui seria implementada a lógica para mostrar a política
}

// Função para editar perfil do professor
function editProfessorProfile() {
    showAlert('Modo de edição do perfil ativado!', 'success');
    // Aqui seria implementada a lógica de edição
}

// Função para salvar perfil do professor
function saveProfessorProfile() {
    showAlert('Perfil do professor salvo com sucesso!', 'success');
}

// Função para alternar gerenciamento de notas
function toggleGerenciarNotas() {
    const section = document.getElementById('gerenciarNotasSection');
    const button = document.getElementById('btnToggleGrades');
    
    if (section.style.display === 'none') {
        section.style.display = 'block';
        button.innerHTML = '👁️ Ocultar Gerenciamento de Notas';
        showAlert('Gerenciamento de notas exibido!', 'success');
    } else {
        section.style.display = 'none';
        button.innerHTML = '👁️ Mostrar Gerenciamento de Notas';
        showAlert('Gerenciamento de notas ocultado!', 'success');
    }
}

// Função para trocar simulado do professor
function trocarSimuladoProfessor(numero) {
    // Remover classe active de todos os botões
    document.querySelectorAll('.simulado-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adicionar classe active ao botão clicado
    document.querySelector(`[data-simulado="${numero}"]`).classList.add('active');
    
    showAlert(`Editando Simulado ${numero}`, 'success');
}

// Função para salvar alterações de notas
function salvarAlteracoesNotas() {
    showAlert('Alterações de notas salvas com sucesso!', 'success');
}

// Função para exportar notas
function exportGrades() {
    showAlert('Exportando notas em PDF...', 'success');
    // Aqui seria implementada a lógica de exportação
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const currentUser = verificarTipoUsuario('professor');
    if (!currentUser) return;

    // Atualizar informações do perfil
    const nomeElement = document.getElementById('professorPerfilNome');
    const disciplinaElement = document.getElementById('professorPerfilDisciplina');
    if (nomeElement) nomeElement.textContent = currentUser.name;
    if (disciplinaElement) disciplinaElement.textContent = `Disciplina: ${currentUser.disciplina}`;
    
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
});

// Exportar funções para uso global
window.showProfessorSection = showProfessorSection;
window.toggleAccessibility = toggleAccessibility;
window.toggleLegend = toggleLegend;
window.togglePbLegend = togglePbLegend;
window.gerenciarTurma = gerenciarTurma;
window.editarNota = editarNota;
window.editarAluno = editarAluno;
window.salvarTurma = salvarTurma;
window.exportarTurma = exportarTurma;
window.gerenciarDisciplina = gerenciarDisciplina;
window.mostrarTabDisciplina = mostrarTabDisciplina;
window.salvarConfigDisciplina = salvarConfigDisciplina;
window.gerenciarConteudo = gerenciarConteudo;
window.adicionarConteudo = adicionarConteudo;
window.verCronograma = verCronograma;
window.editarConteudo = editarConteudo;
window.excluirConteudo = excluirConteudo;
window.adicionarSimulado = adicionarSimulado;
window.salvarSimulado = salvarSimulado;
window.calcularMedias = calcularMedias;
window.lancarFaltas = lancarFaltas;
window.gerarRelatorios = gerarRelatorios;
window.verEstatisticas = verEstatisticas;
window.verEstatisticasDisciplina = verEstatisticasDisciplina;
window.adicionarNovaDisciplina = adicionarNovaDisciplina;
window.mostrarPoliticaProtecaoDados = mostrarPoliticaProtecaoDados;
window.editProfessorProfile = editProfessorProfile;
window.saveProfessorProfile = saveProfessorProfile;
window.toggleGerenciarNotas = toggleGerenciarNotas;
window.trocarSimuladoProfessor = trocarSimuladoProfessor;
window.salvarAlteracoesNotas = salvarAlteracoesNotas;
window.exportGrades = exportGrades;
