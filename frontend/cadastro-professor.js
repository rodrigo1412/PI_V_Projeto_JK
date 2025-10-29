// ========================================
// FRONTEND - CADASTRO PROFESSOR
// ========================================
// Este arquivo contém a lógica específica do cadastro de professor

// Função de navegação é importada do common.js

// Função para cadastrar professor
function cadastrarProfessor() {
    const form = document.getElementById('cadastroProfessorForm');
    if (!form) {
        showAlert('Formulário não encontrado!', 'error');
        return;
    }

    // Coletar dados do formulário
    const formData = new FormData(form);
    const professorData = {
        name: formData.get('nome'),
        email: formData.get('email'),
        password: formData.get('senha'),
        cpf: formData.get('cpf'),
        dataNascimento: formData.get('dataNascimento'),
        disciplina: formData.get('disciplina'),
        formacao: formData.get('formacao'),
        experiencia: formData.get('experiencia'),
        telefone: formData.get('telefone'),
        endereco: formData.get('endereco'),
        type: 'professor'
    };

    // Validações básicas
    if (!professorData.name || !professorData.email || !professorData.password) {
        showAlert('Por favor, preencha todos os campos obrigatórios!', 'error');
        return;
    }

    if (!validateEmail(professorData.email)) {
        showAlert('Por favor, insira um e-mail válido!', 'error');
        return;
    }

    if (professorData.password.length < 6) {
        showAlert('A senha deve ter pelo menos 6 caracteres!', 'error');
        return;
    }

    // Verificar se o e-mail já existe
    if (users[professorData.email]) {
        showAlert('Este e-mail já está cadastrado!', 'error');
        return;
    }

    // Simular cadastro (em uma aplicação real, isso seria enviado para o backend)
    try {
        // Adicionar ao objeto users (simulando banco de dados)
        users[professorData.email] = professorData;
        
        // Salvar no localStorage para persistência
        localStorage.setItem('users', JSON.stringify(users));
        
        showAlert('Professor cadastrado com sucesso!', 'success');
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
            navigateToPage('index.html');
        }, 2000);
        
    } catch (error) {
        console.error('Erro ao cadastrar professor:', error);
        showAlert('Erro ao cadastrar professor. Tente novamente.', 'error');
    }
}

// Função para validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validar primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    // Validar segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

// Função para formatar CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para formatar telefone
function formatarTelefone(telefone) {
    telefone = telefone.replace(/[^\d]/g, '');
    if (telefone.length === 11) {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (telefone.length === 10) {
        return telefone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return telefone;
}

// Função para validar experiência
function validarExperiencia(experiencia) {
    const exp = parseInt(experiencia);
    if (isNaN(exp) || exp < 0 || exp > 50) {
        return false;
    }
    return true;
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar máscaras aos campos
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    
    // Máscara para CPF
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            e.target.value = formatarCPF(e.target.value);
        });
        
        cpfInput.addEventListener('blur', function(e) {
            const cpf = e.target.value.replace(/[^\d]/g, '');
            if (cpf.length === 11 && !validarCPF(cpf)) {
                showMessage(cpfInput, 'CPF inválido!', 'error');
            } else if (cpf.length === 11) {
                showMessage(cpfInput, 'CPF válido!', 'success');
            }
        });
    }
    
    // Máscara para telefone
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            e.target.value = formatarTelefone(e.target.value);
        });
    }
    
    // Validação em tempo real do e-mail
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function(e) {
            const email = e.target.value;
            if (email && !validateEmail(email)) {
                showMessage(emailInput, 'E-mail inválido!', 'error');
            } else if (email && users[email]) {
                showMessage(emailInput, 'Este e-mail já está cadastrado!', 'error');
            } else if (email) {
                showMessage(emailInput, 'E-mail disponível!', 'success');
            }
        });
    }
    
    // Validação da senha
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmarSenha');
    
    if (senhaInput) {
        senhaInput.addEventListener('input', function(e) {
            const senha = e.target.value;
            if (senha.length > 0 && senha.length < 6) {
                showMessage(senhaInput, 'A senha deve ter pelo menos 6 caracteres!', 'error');
            } else if (senha.length >= 6) {
                showMessage(senhaInput, 'Senha válida!', 'success');
            }
        });
    }
    
    if (confirmarSenhaInput && senhaInput) {
        confirmarSenhaInput.addEventListener('input', function(e) {
            const senha = senhaInput.value;
            const confirmarSenha = e.target.value;
            
            if (confirmarSenha && senha !== confirmarSenha) {
                showMessage(confirmarSenhaInput, 'As senhas não coincidem!', 'error');
            } else if (confirmarSenha && senha === confirmarSenha) {
                showMessage(confirmarSenhaInput, 'Senhas coincidem!', 'success');
            }
        });
    }
    
    // Validação da data de nascimento
    const dataNascimentoInput = document.getElementById('dataNascimento');
    if (dataNascimentoInput) {
        dataNascimentoInput.addEventListener('change', function(e) {
            const dataNascimento = new Date(e.target.value);
            const hoje = new Date();
            const idade = hoje.getFullYear() - dataNascimento.getFullYear();
            
            if (idade < 18 || idade > 70) {
                showMessage(dataNascimentoInput, 'Idade deve estar entre 18 e 70 anos!', 'error');
            } else {
                showMessage(dataNascimentoInput, 'Data válida!', 'success');
            }
        });
    }
    
    // Validação da experiência
    const experienciaInput = document.getElementById('experiencia');
    if (experienciaInput) {
        experienciaInput.addEventListener('blur', function(e) {
            const experiencia = e.target.value;
            if (experiencia && !validarExperiencia(experiencia)) {
                showMessage(experienciaInput, 'Experiência deve estar entre 0 e 50 anos!', 'error');
            } else if (experiencia) {
                showMessage(experienciaInput, 'Experiência válida!', 'success');
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
window.cadastrarProfessor = cadastrarProfessor;
window.validarCPF = validarCPF;
window.formatarCPF = formatarCPF;
window.formatarTelefone = formatarTelefone;
window.validarExperiencia = validarExperiencia;
