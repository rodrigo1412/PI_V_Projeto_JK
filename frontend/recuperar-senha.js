// ========================================
// FRONTEND - RECUPERAR SENHA
// ========================================
// Este arquivo contém a lógica específica da recuperação de senha

// Função de navegação é importada do common.js

// Função para recuperar senha
function recoverPassword() {
    const email = document.getElementById('recoverEmail').value;
    
    if (!email) {
        showAlert('Por favor, insira seu e-mail!', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showAlert('Por favor, insira um e-mail válido!', 'error');
        return;
    }
    
    // Verificar se o e-mail existe no sistema
    if (!users[email]) {
        showAlert('E-mail não encontrado em nosso sistema!', 'error');
        return;
    }
    
    // Simular envio de e-mail de recuperação
    showAlert('E-mail de recuperação enviado! Verifique sua caixa de entrada.', 'success');
    
    // Redirecionar para login após 3 segundos
    setTimeout(() => {
        navigateToPage('index.html');
    }, 3000);
}

// Função validateEmail é importada do common.js

// Função para mostrar mensagem de validação
function showMessage(element, message, type) {
    // Remover mensagem anterior
    const existingMessage = element.parentNode.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Criar nova mensagem
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Adicionar mensagem após o elemento
    element.parentNode.appendChild(messageElement);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Validação em tempo real do e-mail
    const emailInput = document.getElementById('recoverEmail');
    if (emailInput) {
        emailInput.addEventListener('blur', function(e) {
            const email = e.target.value;
            if (email && !validateEmail(email)) {
                showMessage(emailInput, 'E-mail inválido!', 'error');
            } else if (email && !users[email]) {
                showMessage(emailInput, 'E-mail não encontrado!', 'error');
            } else if (email) {
                showMessage(emailInput, 'E-mail válido!', 'success');
            }
        });
    }
    
    // Carregar usuários do localStorage se existirem
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
        try {
            const parsedUsers = JSON.parse(savedUsers);
            Object.assign(users, parsedUsers);
        } catch (error) {
            console.error('Erro ao carregar usuários do localStorage:', error);
        }
    }
});

// Exportar funções para uso global
window.recoverPassword = recoverPassword;
window.showMessage = showMessage;
