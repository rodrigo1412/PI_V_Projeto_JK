// ========================================
// FRONTEND - CADASTRO RESPONSÁVEL
// ========================================
// Este arquivo contém a lógica específica do cadastro de responsável

// Função de navegação é importada do common.js

// Função para cadastrar responsável
function cadastrarResponsavel() {
    const form = document.getElementById('cadastroResponsavelForm');
    if (!form) {
        showAlert('Formulário não encontrado!', 'error');
        return;
    }

    // Coletar dados do formulário
    const formData = new FormData(form);
    const responsavelData = {
        name: formData.get('nome'),
        email: formData.get('email'),
        password: formData.get('senha'),
        cpf: formData.get('cpf'),
        dataNascimento: formData.get('dataNascimento'),
        telefone: formData.get('telefone'),
        endereco: formData.get('endereco'),
        cpfAlunoVinculado: formData.get('cpfAlunoVinculado'),
        nomeAlunoVinculado: formData.get('nomeAlunoVinculado'),
        matriculaAlunoVinculado: formData.get('matriculaAlunoVinculado'),
        type: 'responsavel'
    };

    // Validações básicas
    if (!responsavelData.name || !responsavelData.email || !responsavelData.password) {
        showAlert('Por favor, preencha todos os campos obrigatórios!', 'error');
        return;
    }

    if (!validateEmail(responsavelData.email)) {
        showAlert('Por favor, insira um e-mail válido!', 'error');
        return;
    }

    if (responsavelData.password.length < 6) {
        showAlert('A senha deve ter pelo menos 6 caracteres!', 'error');
        return;
    }

    // Verificar se o e-mail já existe
    if (users[responsavelData.email]) {
        showAlert('Este e-mail já está cadastrado!', 'error');
        return;
    }

    // Simular cadastro (em uma aplicação real, isso seria enviado para o backend)
    try {
        // Adicionar ao objeto users (simulando banco de dados)
        users[responsavelData.email] = responsavelData;
        
        // Salvar no localStorage para persistência
        localStorage.setItem('users', JSON.stringify(users));
        
        showAlert('Responsável cadastrado com sucesso!', 'success');
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
            navigateToPage('index.html');
        }, 2000);
        
    } catch (error) {
        console.error('Erro ao cadastrar responsável:', error);
        showAlert('Erro ao cadastrar responsável. Tente novamente.', 'error');
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

// Função para buscar aluno por CPF
function buscarAlunoPorCPF(cpf) {
    const todosUsuarios = Object.values(users);
    return todosUsuarios.find(u => u.type === 'aluno' && u.cpf === cpf);
}

// Função para validar vínculo com aluno
function validarVinculoAluno(cpfAluno) {
    if (!cpfAluno) return false;
    
    const aluno = buscarAlunoPorCPF(cpfAluno);
    return aluno !== undefined;
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar máscaras aos campos
    const cpfInput = document.getElementById('cpf');
    const cpfAlunoInput = document.getElementById('cpfAlunoVinculado');
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
    
    // Máscara para CPF do aluno vinculado
    if (cpfAlunoInput) {
        cpfAlunoInput.addEventListener('input', function(e) {
            e.target.value = formatarCPF(e.target.value);
        });
        
        cpfAlunoInput.addEventListener('blur', function(e) {
            const cpf = e.target.value.replace(/[^\d]/g, '');
            if (cpf.length === 11) {
                if (!validarCPF(cpf)) {
                    showMessage(cpfAlunoInput, 'CPF inválido!', 'error');
                } else if (!validarVinculoAluno(cpf)) {
                    showMessage(cpfAlunoInput, 'Aluno não encontrado!', 'error');
                } else {
                    const aluno = buscarAlunoPorCPF(cpf);
                    if (aluno) {
                        // Preencher automaticamente os dados do aluno
                        const nomeAlunoInput = document.getElementById('nomeAlunoVinculado');
                        const matriculaAlunoInput = document.getElementById('matriculaAlunoVinculado');
                        
                        if (nomeAlunoInput) nomeAlunoInput.value = aluno.name || aluno.nome;
                        if (matriculaAlunoInput) matriculaAlunoInput.value = aluno.matricula;
                        
                        showMessage(cpfAlunoInput, 'Aluno encontrado!', 'success');
                    }
                }
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
            
            if (idade < 18 || idade > 80) {
                showMessage(dataNascimentoInput, 'Idade deve estar entre 18 e 80 anos!', 'error');
            } else {
                showMessage(dataNascimentoInput, 'Data válida!', 'success');
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
window.cadastrarResponsavel = cadastrarResponsavel;
window.validarCPF = validarCPF;
window.formatarCPF = formatarCPF;
window.formatarTelefone = formatarTelefone;
window.buscarAlunoPorCPF = buscarAlunoPorCPF;
window.validarVinculoAluno = validarVinculoAluno;
