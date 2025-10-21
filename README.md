# Sistema Escolar Completo - ProJK

Este projeto foi separado do arquivo original `index_final_projK_access_ok (1).html` (8.000 linhas) em páginas individuais para melhor organização e manutenção.

## 📁 Estrutura do Projeto

### Arquivos Principais
- **`index.html`** - Página principal com todas as seções (versão original em uma página)
- **`login.html`** - Página de login isolada
- **`recuperar-senha.html`** - Página de recuperação de senha
- **`cadastro-aluno.html`** - Página de cadastro de alunos
- **`cadastro-professor.html`** - Página de cadastro de professores
- **`cadastro-responsavel.html`** - Página de cadastro de responsáveis
- **`dashboard-aluno.html`** - Dashboard do aluno

### Arquivos de Recursos
- **`styles.css`** - Estilos compartilhados entre todas as páginas
- **`script.js`** - JavaScript compartilhado com todas as funcionalidades

## 🚀 Como Usar

### Opção 1: Página Única (Original)
Abra `index.html` no navegador - contém todas as funcionalidades em uma única página.

### Opção 2: Páginas Separadas
Navegue diretamente para as páginas específicas:
- `login.html` - Para fazer login
- `cadastro-aluno.html` - Para cadastrar alunos
- `cadastro-professor.html` - Para cadastrar professores
- `cadastro-responsavel.html` - Para cadastrar responsáveis
- `dashboard-aluno.html` - Dashboard do aluno

## 🔐 Credenciais de Teste

**Senha para todos:** `12345678`

- **Aluno:** `aluno@teste.com`
- **Professor:** `prof@teste.com`
- **Responsável:** `resp@teste.com`

## ✨ Funcionalidades

### Acessibilidade
- Modo daltônico
- Modo preto e branco
- Legendas explicativas
- Alto contraste
- Fonte para dislexia
- Redução de animações

### Usuários
- **Alunos:** Visualizam boletim e perfil
- **Professores:** Gerenciam turmas e disciplinas
- **Responsáveis:** Acompanham progresso dos estudantes

### Recursos
- Sistema de login/logout
- Cadastro de usuários
- Recuperação de senha
- Dashboard personalizado por tipo de usuário
- Validação de formulários
- Máscaras de entrada (CPF)
- Alertas personalizados

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com flexbox e grid
- **JavaScript ES6+** - Funcionalidades interativas
- **Responsive Design** - Adaptável a diferentes telas

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop
- Tablet
- Smartphone

## 🎨 Design

- Interface moderna e limpa
- Cores acessíveis
- Ícones intuitivos
- Animações suaves
- Elementos decorativos

## 🔧 Manutenção

### Adicionando Novas Páginas
1. Crie o arquivo HTML
2. Inclua `styles.css` e `script.js`
3. Use a função `navigateToPage()` para navegação

### Modificando Estilos
- Edite `styles.css` para alterações globais
- Use classes específicas para estilos locais

### Adicionando Funcionalidades
- Edite `script.js` para funcionalidades compartilhadas
- Use scripts locais para funcionalidades específicas

## 📋 Estrutura das Páginas

Cada página separada segue o padrão:
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nome da Página</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Menu de Acessibilidade -->
    <!-- Conteúdo da Página -->
    <script src="script.js"></script>
    <script>
        // Scripts específicos da página
    </script>
</body>
</html>
```

## 🎯 Vantagens da Separação

1. **Manutenção mais fácil** - Cada página é independente
2. **Carregamento mais rápido** - Apenas o necessário é carregado
3. **Desenvolvimento em equipe** - Diferentes pessoas podem trabalhar em páginas diferentes
4. **SEO melhor** - URLs específicas para cada funcionalidade
5. **Debugging simplificado** - Problemas isolados por página

## 🚨 Notas Importantes

- Todas as páginas compartilham os mesmos estilos e scripts
- O sistema de usuários é mantido em memória (localStorage)
- As validações são consistentes entre todas as páginas
- A acessibilidade é preservada em todas as páginas

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Se todos os arquivos estão na mesma pasta
2. Se o navegador suporta JavaScript
3. Se não há erros no console do navegador

---

**Desenvolvido com ❤️ para a educação**
