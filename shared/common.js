// ========================================
// ARQUIVO COMPARTILHADO - FUNÇÕES COMUNS
// ========================================
// Este arquivo contém funções que são utilizadas em múltiplas páginas

// Base de dados de usuários (simulada)
const users = {
    'aluno@teste.com': {
        name: 'João da Silva',
        password: '12345678',
        type: 'aluno',
        matricula: '2025001',
        serie: '3',
        turma: 'A'
    },
    'prof@teste.com': {
        name: 'Prof. Carlos Silva',
        password: '12345678',
        type: 'professor',
        disciplina: 'Matemática'
    },
    'resp@teste.com': {
        name: 'Maria Santos',
        password: '12345678',
        type: 'responsavel',
        filhos: ['João da Silva']
    }
};

// Função para mostrar alertas
function showAlert(message, type = 'success') {
    // Remove alertas existentes
    const existingAlerts = document.querySelectorAll('.custom-alert');
    existingAlerts.forEach(alert => alert.remove());

    // Cria novo alerta
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">${type === 'success' ? '✅' : '❌'}</span>
            <span>${message}</span>
        </div>
    `;

    // Adiciona ao body
    document.body.appendChild(alert);

    // Mostra o alerta
    setTimeout(() => alert.classList.add('show'), 100);

    // Remove após 3 segundos
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Função para navegar entre páginas
function navigateToPage(page) {
    window.location.href = page;
}

// Função para logout
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserEmail');
    showAlert('Logout realizado com sucesso!', 'success');
    setTimeout(() => navigateToPage('index.html'), 1500);
}

// ===== FUNÇÕES DE ACESSIBILIDADE =====
function toggleAccessibility(mode) {
    const body = document.body;
    const daltonismoLegend = document.getElementById('daltonismoLegend');
    const pbLegend = document.getElementById('pbLegend');
    
    // Remover modos anteriores
    body.classList.remove('daltonismo-mode', 'preto-e-branco-mode');
    if (daltonismoLegend) daltonismoLegend.classList.remove('show');
    if (pbLegend) pbLegend.classList.remove('show');
    
    if (mode === 'daltonismo') {
        body.classList.add('daltonismo-mode');
        if (daltonismoLegend) daltonismoLegend.classList.add('show');
        showAlert('Modo Daltônico ativado! Legenda exibida.', 'success');
    } else if (mode === 'preto-e-branco') {
        body.classList.add('preto-e-branco-mode');
        if (pbLegend) pbLegend.classList.add('show');
        showAlert('Modo Preto e Branco ativado! Legenda exibida.', 'success');
    } else {
        showAlert('Modo de visualização padrão restaurado.', 'success');
    }
    
    // Fechar menu de acessibilidade após seleção
    const accessibilityOptions = document.getElementById('accessibilityOptions');
    if (accessibilityOptions) {
        accessibilityOptions.classList.remove('show');
    }
}

function toggleLegend() {
    const legend = document.getElementById('daltonismoLegend');
    if (legend) {
        legend.classList.toggle('show');
    }
}

function togglePbLegend() {
    const legend = document.getElementById('pbLegend');
    if (legend) {
        legend.classList.toggle('show');
    }
}

// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para mascarar CPF
function mascararCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
    
    // Aplica a máscara
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    return cpf;
}

// Função para garantir que o usuário está logado
function garantirCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    const userEmail = localStorage.getItem('currentUserEmail');
    
    if (!userData || !userEmail) {
        navigateToPage('index.html');
        return null;
    }

    const currentUser = JSON.parse(userData);
    if (!currentUser.email) {
        currentUser.email = userEmail;
    }
    
    return currentUser;
}

// Função para verificar tipo de usuário
function verificarTipoUsuario(tipoEsperado) {
    const currentUser = garantirCurrentUser();
    if (!currentUser) return false;
    
    if (currentUser.type !== tipoEsperado) {
        navigateToPage('index.html');
        return false;
    }
    
    return currentUser;
}

// Função para mostrar loading
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '⏳ Carregando...';
    document.body.appendChild(loading);
    return loading;
}

// Função para remover loading
function hideLoading(loadingElement) {
    if (loadingElement) {
        loadingElement.remove();
    }
}

// Função para simular salvamento
function simulateSave() {
    const loading = showLoading();
    
    setTimeout(() => {
        hideLoading(loading);
        showAlert('Dados salvos com sucesso!', 'success');
    }, 1500);
}

// Função para alternar tema
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    showAlert(`Tema ${isDark ? 'escuro' : 'claro'} ativado!`, 'success');
}

// Função para validar formulário
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#2ecc71';
        }
    });
    
    return isValid;
}

// Função para formatar data
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

// Função para fechar modal
function fecharModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Função para buscar
function searchFunction(query) {
    if (!query) return;
    showAlert(`Buscando por: ${query}`, 'success');
}

// Função para trocar foto
function changePhoto() {
    showAlert('Funcionalidade de foto em desenvolvimento', 'success');
}

// Exportar funções para uso global
window.users = users;
window.showAlert = showAlert;
window.navigateToPage = navigateToPage;
window.logout = logout;
window.validateEmail = validateEmail;
window.mascararCPF = mascararCPF;
window.garantirCurrentUser = garantirCurrentUser;
window.verificarTipoUsuario = verificarTipoUsuario;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.simulateSave = simulateSave;
window.toggleTheme = toggleTheme;
window.validateForm = validateForm;
window.formatarData = formatarData;
window.fecharModal = fecharModal;
window.searchFunction = searchFunction;
window.changePhoto = changePhoto;
window.toggleAccessibility = toggleAccessibility;
window.toggleLegend = toggleLegend;
window.togglePbLegend = togglePbLegend;
