// ========================================
// FRONTEND - LOGIN
// ========================================
// Este arquivo contém a lógica específica da página de login

// Função principal de login
function doLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showAlert('Por favor, preencha todos os campos!', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showAlert('Por favor, insira um e-mail válido!', 'error');
        return;
    }

    // Simular validação com backend
    const user = users[email];
    if (!user || user.password !== password) {
        showAlert('E-mail ou senha incorretos!', 'error');
        return;
    }

    // Salvar dados do usuário no localStorage para compartilhar entre páginas
    const userWithEmail = { ...user, email: email };
    localStorage.setItem('currentUser', JSON.stringify(userWithEmail));
    localStorage.setItem('currentUserEmail', email);
    
    showAlert(`Bem-vindo, ${user.name}!`, 'success');

    // Redirecionar para dashboard correto
    setTimeout(() => {
        if (user.type === 'aluno') {
            navigateToPage('dashboard-aluno.html');
        } else if (user.type === 'professor') {
            navigateToPage('dashboard-professor.html');
        } else if (user.type === 'responsavel') {
            navigateToPage('dashboard-responsavel.html');
        }
    }, 1500);
}

// Função para alternar visibilidade da senha
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('loginPassword');
    const toggleBtn = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '👁️';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️‍🗨️';
    }
}

// Função para lembrar credenciais
function rememberCredentials() {
    const email = document.getElementById('loginEmail').value;
    const remember = document.getElementById('rememberMe').checked;
    
    if (remember && email) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
}

// Função para carregar credenciais lembradas
function loadRememberedCredentials() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('loginEmail').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
}

// Função para preencher credenciais de teste
function fillTestCredentials(userType) {
    const testCredentials = {
        aluno: 'aluno@teste.com',
        professor: 'prof@teste.com',
        responsavel: 'resp@teste.com'
    };
    
    document.getElementById('loginEmail').value = testCredentials[userType];
    document.getElementById('loginPassword').value = '12345678';
    
    showAlert(`Credenciais de ${userType} preenchidas!`, 'success');
}

// Função para validar formulário em tempo real
function validateLoginForm() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const submitBtn = document.querySelector('.login-button');
    
    if (email && password && password.length >= 8) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
    }
}

// Função para mostrar/ocultar dicas de credenciais
function toggleCredentialsInfo() {
    const info = document.querySelector('.credentials-info');
    const toggleBtn = document.querySelector('.toggle-credentials');
    
    if (info.style.display === 'none') {
        info.style.display = 'block';
        toggleBtn.textContent = 'Ocultar Credenciais';
    } else {
        info.style.display = 'none';
        toggleBtn.textContent = 'Mostrar Credenciais';
    }
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Carregar credenciais lembradas
    loadRememberedCredentials();
    
    // Adicionar event listeners
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const rememberCheckbox = document.getElementById('rememberMe');
    
    if (emailInput) {
        emailInput.addEventListener('input', validateLoginForm);
        emailInput.addEventListener('blur', rememberCredentials);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', validateLoginForm);
    }
    
    if (rememberCheckbox) {
        rememberCheckbox.addEventListener('change', rememberCredentials);
    }
    
    // Validar formulário inicial
    validateLoginForm();
    
    // Adicionar funcionalidade de Enter para login
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            doLogin();
        }
    });
    
    // Verificar se já está logado
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        showAlert(`Você já está logado como ${user.name}`, 'success');
        
        setTimeout(() => {
            if (user.type === 'aluno') {
                navigateToPage('dashboard-aluno.html');
            } else if (user.type === 'professor') {
                navigateToPage('dashboard-professor.html');
            } else if (user.type === 'responsavel') {
                navigateToPage('dashboard-responsavel.html');
            }
        }, 2000);
    }
});

// Exportar funções para uso global
window.doLogin = doLogin;
window.togglePasswordVisibility = togglePasswordVisibility;
window.rememberCredentials = rememberCredentials;
window.loadRememberedCredentials = loadRememberedCredentials;
window.fillTestCredentials = fillTestCredentials;
window.validateLoginForm = validateLoginForm;
window.toggleCredentialsInfo = toggleCredentialsInfo;