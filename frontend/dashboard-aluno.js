// ========================================
// FRONTEND - DASHBOARD ALUNO
// ========================================
// Este arquivo contém a lógica específica do dashboard do aluno

// Variável para controlar o modo de acessibilidade atual
let currentAccessibilityMode = 'nenhum';

// Função para mostrar seções do aluno
function showAlunoSection(section) {
    // Esconder todas as seções
    document.querySelectorAll('[id$="Section"]').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Remover classe active de todos os itens do menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(`aluno${section.charAt(0).toUpperCase() + section.slice(1)}Section`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Adicionar classe active ao item do menu
    event.target.closest('.menu-item').classList.add('active');
}

// Funções de acessibilidade são importadas do common.js

// Funções auxiliares da toolbar
let fontSize = 100;

function adjustFontSize(delta) {
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

// Função para navegar entre simulados
function navegarSimulado(numeroSimulado) {
    // Remover classe active de todos os botões
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adicionar classe active ao botão clicado
    document.querySelector(`[data-simulado="${numeroSimulado}"]`).classList.add('active');
    
    // Mostrar apenas a coluna do simulado selecionado
    const headers = document.querySelectorAll('.tab-header');
    const cells = document.querySelectorAll('.grade-cell');
    
    headers.forEach((header, index) => {
        if (index === 0) return; // Pular o header "Disciplina"
        
        if (index === numeroSimulado) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    });
    
    // Destacar coluna correspondente
    cells.forEach(cell => {
        // Remover todas as classes de destaque
        cell.classList.remove('destaque-col-1', 'destaque-col-2', 'destaque-col-3', 'destaque-col-4');
        
        // Adicionar classe de destaque para a coluna selecionada
        if (cell.parentElement.children[numeroSimulado] === cell) {
            cell.classList.add(`destaque-col-${numeroSimulado}`);
        }
    });
    
    showAlert(`Visualizando Simulado ${numeroSimulado}`, 'success');
}

// Função para exportar boletim em PDF
function exportBoletimPDF() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        showAlert('Erro: Usuário não encontrado!', 'error');
        return;
    }

    const currentUser = JSON.parse(userData);
    showAlert('Gerando PDF do boletim...', 'success');
    
    // Dados do boletim
    const disciplinas = [
        { nome: 'Português', sim1: 'Bom', sim2: 'Insatisfatório', sim3: 'Regular', sim4: 'Excelente' },
        { nome: 'Matemática', sim1: 'Bom', sim2: 'Regular', sim3: 'Excelente', sim4: 'Bom' },
        { nome: 'Ciências', sim1: 'Excelente', sim2: 'Bom', sim3: 'Insatisfatório', sim4: 'Regular' }
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
                h2 { 
                    color: #C19A2B; 
                    text-align: center;
                    margin-bottom: 30px; 
                    font-size: 18px; 
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
                
                .nota-cell {
                    display: inline-block;
                    padding: 8px 20px;
                    border-radius: 25px;
                    font-weight: bold;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    border: 2px solid transparent;
                }
                
                .nota-excelente { 
                    background: linear-gradient(135deg, #4CAF50, #45a049); 
                    color: white;
                    border-color: #388E3C;
                }
                .nota-bom { 
                    background: linear-gradient(135deg, #2196F3, #1976D2); 
                    color: white;
                    border-color: #1565C0;
                }
                .nota-regular { 
                    background: linear-gradient(135deg, #FF9800, #F57C00); 
                    color: white;
                    border-color: #E65100;
                }
                .nota-insatisfatorio { 
                    background: linear-gradient(135deg, #F44336, #D32F2F); 
                    color: white;
                    border-color: #B71C1C;
                }
                
                .legenda {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin: 30px 0 20px 0;
                    padding: 15px;
                    background: #f5f3e8;
                    border-radius: 10px;
                }
                .legenda-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                }
                .legenda-color {
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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
                <h2>Sistema Escolar JK</h2>
                
                <div class="info-section">
                    <p><strong>Aluno:</strong> ${currentUser.name}</p>
                    <p><strong>Matrícula:</strong> ${currentUser.matricula}</p>
                    <p><strong>Turma:</strong> ${currentUser.serie}ª Série ${currentUser.turma}</p>
                    <p><strong>Data de Emissão:</strong> ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
                </div>
                
                <div class="legenda">
                    <div class="legenda-item">
                        <div class="legenda-color" style="background: linear-gradient(135deg, #4CAF50, #45a049);"></div>
                        <span><strong>Excelente</strong></span>
                    </div>
                    <div class="legenda-item">
                        <div class="legenda-color" style="background: linear-gradient(135deg, #2196F3, #1976D2);"></div>
                        <span><strong>Bom</strong></span>
                    </div>
                    <div class="legenda-item">
                        <div class="legenda-color" style="background: linear-gradient(135deg, #FF9800, #F57C00);"></div>
                        <span><strong>Regular</strong></span>
                    </div>
                    <div class="legenda-item">
                        <div class="legenda-color" style="background: linear-gradient(135deg, #F44336, #D32F2F);"></div>
                        <span><strong>Insatisfatório</strong></span>
                    </div>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Disciplina</th>
                            <th>Simulado 1</th>
                            <th>Simulado 2</th>
                            <th>Simulado 3</th>
                            <th>Simulado 4</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${disciplinas.map(disc => {
                            const getClass = (nota) => {
                                if (nota === 'Excelente') return 'nota-excelente';
                                if (nota === 'Bom') return 'nota-bom';
                                if (nota === 'Regular') return 'nota-regular';
                                return 'nota-insatisfatorio';
                            };
                            
                            return `
                            <tr>
                                <td>${disc.nome}</td>
                                <td><span class="nota-cell ${getClass(disc.sim1)}">${disc.sim1}</span></td>
                                <td><span class="nota-cell ${getClass(disc.sim2)}">${disc.sim2}</span></td>
                                <td><span class="nota-cell ${getClass(disc.sim3)}">${disc.sim3}</span></td>
                                <td><span class="nota-cell ${getClass(disc.sim4)}">${disc.sim4}</span></td>
                            </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
                
                <div class="footer">
                    <p><strong>Sistema Escolar JK - Gestão Acadêmica</strong></p>
                    <p>Boletim gerado automaticamente</p>
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

// Função para editar perfil do aluno
function editAlunoProfile() {
    showAlert('Modo de edição ativado!', 'success');
    // Aqui seria implementada a lógica de edição
}

// Função para salvar perfil do aluno
function saveAlunoProfile() {
    showAlert('Perfil salvo com sucesso!', 'success');
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const currentUser = verificarTipoUsuario('aluno');
    if (!currentUser) return;

    // Atualizar informações do perfil
    const nomeElements = document.querySelectorAll('#alunoPerfilNome');
    const infoElement = document.getElementById('alunoPerfilInfo');
    
    nomeElements.forEach(el => {
        if (el) el.textContent = currentUser.name;
    });
    
    if (infoElement) {
        infoElement.textContent = `Matrícula: ${currentUser.matricula} • Turma: ${currentUser.serie}ª${currentUser.turma}`;
    }
    
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
                    exportBoletimPDF();
                    break;
            }
        });
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
        
        // Se a legenda está aberta e o clique foi fora dela
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
window.showAlunoSection = showAlunoSection;
window.toggleAccessibility = toggleAccessibility;
window.toggleLegend = toggleLegend;
window.togglePbLegend = togglePbLegend;
window.adjustFontSize = adjustFontSize;
window.toggleHighContrast = toggleHighContrast;
window.toggleDyslexiaFont = toggleDyslexiaFont;
window.toggleReducedMotion = toggleReducedMotion;
window.navegarSimulado = navegarSimulado;
window.exportBoletimPDF = exportBoletimPDF;
window.editAlunoProfile = editAlunoProfile;
window.saveAlunoProfile = saveAlunoProfile;
