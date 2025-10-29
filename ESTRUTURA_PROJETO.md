# Estrutura do Projeto - Sistema Escolar JK

## 📁 Organização dos Arquivos

O projeto foi reorganizado para separar claramente o frontend e backend, mantendo os arquivos base como referência.

### 🗂️ Estrutura de Diretórios

```
PI_V_Projeto_JK/
├── 📁 shared/                    # Arquivos compartilhados
│   ├── common.js                 # Funções comuns (autenticação, alertas, etc.)
│   └── common.css                # Estilos comuns (variáveis, reset, componentes)
├── 📁 frontend/                  # Lógica específica do frontend
│   ├── login.js                  # Lógica da página de login
│   ├── login.css                 # Estilos da página de login
│   ├── dashboard-aluno.js        # Lógica do dashboard do aluno
│   ├── dashboard-aluno.css       # Estilos do dashboard do aluno
│   ├── dashboard-professor.js    # Lógica do dashboard do professor
│   └── dashboard-professor.css   # Estilos do dashboard do professor
├── 📁 backend/                   # Lógica de backend/API
│   └── login.js                  # API de autenticação e sessão
├── 📄 index.html                 # Página de login (página principal)
├── 📄 dashboard-aluno.html       # Dashboard do aluno
├── 📄 dashboard-professor.html   # Dashboard do professor
├── 📄 script.js                  # Arquivo base (mantido como referência)
├── 📄 styles.css                 # Arquivo base (mantido como referência)
└── 📄 database-config.js         # Configuração do banco de dados
```

## 🔧 Arquivos Compartilhados (shared/)

### `shared/common.js`
Contém todas as funções que são utilizadas em múltiplas páginas:
- **Autenticação**: `garantirCurrentUser()`, `verificarTipoUsuario()`
- **Navegação**: `navigateToPage()`, `logout()`
- **Interface**: `showAlert()`, `showLoading()`, `hideLoading()`
- **Validação**: `validateEmail()`, `validateForm()`
- **Utilitários**: `mascararCPF()`, `formatarData()`, `fecharModal()`
- **Base de dados**: Objeto `users` com dados simulados

### `shared/common.css`
Contém estilos que são utilizados em múltiplas páginas:
- **Variáveis CSS**: Cores, tamanhos, sombras
- **Reset e configurações básicas**
- **Animações**: fadeIn, slideIn, bounce, etc.
- **Componentes**: Botões, formulários, cards, badges
- **Layout**: Grid, flexbox, espaçamentos
- **Responsividade**: Media queries para diferentes telas

## 🎨 Frontend (frontend/)

### `frontend/login.js`
Lógica específica da página de login:
- `doLogin()` - Função principal de autenticação
- `togglePasswordVisibility()` - Alternar visibilidade da senha
- `rememberCredentials()` - Lembrar credenciais
- `fillTestCredentials()` - Preencher credenciais de teste
- `validateLoginForm()` - Validação em tempo real

### `frontend/login.css`
Estilos específicos da página de login:
- Layout do formulário de login
- Animações de entrada
- Estados de validação
- Responsividade para mobile

### `frontend/dashboard-aluno.js`
Lógica específica do dashboard do aluno:
- `showAlunoSection()` - Navegação entre seções
- `toggleAccessibility()` - Modos de acessibilidade
- `navegarSimulado()` - Navegação entre simulados
- `exportBoletimPDF()` - Exportação de boletim
- Funções da toolbar (fonte, contraste, etc.)

### `frontend/dashboard-aluno.css`
Estilos específicos do dashboard do aluno:
- Layout do boletim
- Tabelas de notas
- Seções de conquistas e calendário
- Navegação de simulados
- Indicadores de status

### `frontend/dashboard-professor.js`
Lógica específica do dashboard do professor:
- `showProfessorSection()` - Navegação entre seções
- `gerenciarTurma()` - Gerenciamento de turmas
- `gerenciarDisciplina()` - Gerenciamento de disciplinas
- `adicionarSimulado()` - Criação de simulados
- `toggleGerenciarNotas()` - Alternar edição de notas

### `frontend/dashboard-professor.css`
Estilos específicos do dashboard do professor:
- Layout das ferramentas do professor
- Modais de gerenciamento
- Tabelas de notas editáveis
- Cards de disciplinas e turmas
- Sistema de tabs

## ⚙️ Backend (backend/)

### `backend/login.js`
API de autenticação e gerenciamento de sessão:
- **AuthAPI**: Classe para simular requisições de API
- **SessionManager**: Gerenciamento de sessões do usuário
- **LoginAudit**: Auditoria de tentativas de login
- **Funções principais**:
  - `authenticateUser()` - Autenticação completa
  - `logoutUser()` - Logout seguro
  - `checkSession()` - Verificação de sessão
  - `updateLastLogin()` - Atualização de último login

## 📋 Como Usar

### 1. Página de Login
```html
<!-- Incluir os arquivos necessários -->
<link rel="stylesheet" href="shared/common.css">
<link rel="stylesheet" href="frontend/login.css">

<script src="shared/common.js"></script>
<script src="backend/login.js"></script>
<script src="frontend/login.js"></script>
```

### 2. Dashboard do Aluno
```html
<!-- Incluir os arquivos necessários -->
<link rel="stylesheet" href="shared/common.css">
<link rel="stylesheet" href="frontend/dashboard-aluno.css">

<script src="shared/common.js"></script>
<script src="frontend/dashboard-aluno.js"></script>
```

### 3. Dashboard do Professor
```html
<!-- Incluir os arquivos necessários -->
<link rel="stylesheet" href="shared/common.css">
<link rel="stylesheet" href="frontend/dashboard-professor.css">

<script src="shared/common.js"></script>
<script src="frontend/dashboard-professor.js"></script>
```

## 🔄 Fluxo de Funcionamento

1. **Login**: Usuário acessa `index.html` → `backend/index.js` valida credenciais → `frontend/index.js` gerencia interface
2. **Dashboard**: Após login → `shared/common.js` verifica sessão → `frontend/dashboard-*.js` carrega interface específica
3. **Navegação**: `shared/common.js` gerencia navegação entre páginas
4. **Persistência**: `backend/login.js` gerencia sessões no localStorage

## 🎯 Benefícios da Nova Estrutura

### ✅ Organização
- **Separação clara** entre frontend e backend
- **Arquivos específicos** para cada página
- **Código compartilhado** centralizado

### ✅ Manutenibilidade
- **Fácil localização** de funcionalidades
- **Modificações isoladas** por página
- **Reutilização** de código comum

### ✅ Escalabilidade
- **Adição fácil** de novas páginas
- **Modularização** de funcionalidades
- **Estrutura preparada** para APIs reais

### ✅ Performance
- **Carregamento otimizado** por página
- **Código específico** apenas quando necessário
- **Cache eficiente** de arquivos compartilhados

## 🚀 Próximos Passos

1. **Completar páginas restantes** (dashboard-responsavel, cadastros, etc.)
2. **Implementar APIs reais** no backend
3. **Adicionar testes** para cada módulo
4. **Otimizar performance** com lazy loading
5. **Implementar PWA** para uso offline

## 📝 Notas Importantes

- Os arquivos `script.js` e `styles.css` originais foram mantidos como referência
- Todas as funcionalidades existentes foram preservadas
- A estrutura é compatível com a implementação atual
- Fácil migração para frameworks modernos (React, Vue, Angular)

## ✅ Status da Refatoração (Atualizado)

### Páginas Completamente Refatoradas:
- ✅ `index.html` → `frontend/index.js` + `frontend/index.css`
- ✅ `dashboard-aluno.html` → `frontend/dashboard-aluno.js` + `frontend/dashboard-aluno.css`
- ✅ `dashboard-professor.html` → `frontend/dashboard-professor.js` + `frontend/dashboard-professor.css`
- ✅ `dashboard-responsavel.html` → `frontend/dashboard-responsavel.js` + `frontend/dashboard-responsavel.css`
- ✅ `cadastro-aluno.html` → `frontend/cadastro-aluno.js` + `frontend/cadastro-aluno.css`
- ✅ `cadastro-professor.html` → `frontend/cadastro-professor.js` + `frontend/cadastro-professor.css`
- ✅ `cadastro-responsavel.html` → `frontend/cadastro-responsavel.js` + `frontend/cadastro-responsavel.css`
- ✅ `recuperar-senha.html` → `frontend/recuperar-senha.js` + `frontend/recuperar-senha.css`

### Arquivos Compartilhados:
- ✅ `shared/common.js` - Funções e dados comuns
- ✅ `shared/common.css` - Estilos globais e variáveis CSS

### Próximas Etapas:
1. **Testar todas as funcionalidades** para garantir que nada foi quebrado
2. **Criar arquivos backend** específicos quando necessário
3. **Remover arquivos antigos** (`script.js` e `styles.css`) após validação
4. **Documentar APIs** e funcionalidades específicas
