// ========================================
// BACKEND - LOGIN
// ========================================
// Este arquivo contém a lógica de backend para a página de login

// ===== DADOS DE EXEMPLO PRÉ-CADASTRADOS =====
// FUTURO: Integração com banco de dados real via database-config.js
const users = {
    // Alunos
    'aluno@teste.com': {
        password: '12345678',
        type: 'aluno',
        name: 'João Silva',
        matricula: '2024001',
        cpfAluno: '111.222.333-44',
        dataNascimento: '2010-03-15',
        serie: '2',
        turma: 'A'
    },
    'maria@teste.com': {
        password: '12345678',
        type: 'aluno',
        name: 'Maria Santos',
        matricula: '2024002',
        cpfAluno: '555.666.777-88',
        dataNascimento: '2011-07-20',
        serie: '1',
        turma: 'B'
    },

    // Professores
    'prof@teste.com': {
        password: '12345678',
        type: 'professor',
        name: 'Prof. Carlos Silva',
        matricula: 'PROF001',
        disciplina: 'Matemática'
    },
    'ana.prof@teste.com': {
        password: '12345678',
        type: 'professor',
        name: 'Profa. Ana Costa',
        matricula: 'PROF002',
        disciplina: 'Português'
    },

    // Responsáveis
    'resp@teste.com': {
        password: '12345678',
        type: 'responsavel',
        name: 'José Silva',
        cpfResponsavel: '123.456.789-00',
        cpfAlunoVinculado: '111.222.333-44', // CPF do aluno vinculado
        alunoVinculado: {
            nome: 'João Silva',
            matricula: '2024001',
            cpf: '111.222.333-44',
            dataNascimento: '2010-03-15',
            serie: '2',
            turma: 'A'
        }
    }
};

// ===== DADOS DE TURMAS E ALUNOS =====
const turmasData = {
    '1A': {
        nome: '1° ano A',
        disciplina: 'Matemática',
        professor: 'Prof. Carlos Silva',
        alunos: [
            { nome: 'João Silva', matricula: '2024001', frequencia: 95, nota: 9.5, comportamento: 'Excelente' },
            { nome: 'Maria Santos', matricula: '2024002', frequencia: 88, nota: 8.2, comportamento: 'Bom' },
            { nome: 'Pedro Oliveira', matricula: '2024003', frequencia: 92, nota: 7.8, comportamento: 'Bom' },
            { nome: 'Ana Costa', matricula: '2024004', frequencia: 85, nota: 9.0, comportamento: 'Excelente' },
            { nome: 'Lucas Ferreira', matricula: '2024005', frequencia: 90, nota: 8.5, comportamento: 'Bom' }
        ]
    },
    '2B': {
        nome: '2° ano B',
        disciplina: 'Matemática',
        professor: 'Prof. Carlos Silva',
        alunos: [
            { nome: 'Carlos Mendes', matricula: '2023001', frequencia: 87, nota: 7.5, comportamento: 'Bom' },
            { nome: 'Fernanda Lima', matricula: '2023002', frequencia: 94, nota: 9.2, comportamento: 'Excelente' },
            { nome: 'Rafael Souza', matricula: '2023003', frequencia: 89, nota: 8.8, comportamento: 'Bom' },
            { nome: 'Juliana Rocha', matricula: '2023004', frequencia: 91, nota: 8.0, comportamento: 'Bom' }
        ]
    },
    '3A': {
        nome: '3° ano A',
        disciplina: 'Matemática',
        professor: 'Prof. Carlos Silva',
        alunos: [
            { nome: 'Gabriel Alves', matricula: '2022001', frequencia: 93, nota: 9.8, comportamento: 'Excelente' },
            { nome: 'Camila Dias', matricula: '2022002', frequencia: 86, nota: 7.2, comportamento: 'Bom' },
            { nome: 'Diego Santos', matricula: '2022003', frequencia: 88, nota: 8.5, comportamento: 'Bom' },
            { nome: 'Larissa Costa', matricula: '2022004', frequencia: 95, nota: 9.5, comportamento: 'Excelente' },
            { nome: 'Bruno Silva', matricula: '2022005', frequencia: 90, nota: 8.8, comportamento: 'Bom' }
        ]
    }
};

// ===== DADOS DE NOTAS POR PROFESSOR =====
let professorNotas = {
    'prof@teste.com': {
        '1A': {
            'João Silva': { frequencia: 95, nota: 9.5, comportamento: 'Excelente' },
            'Maria Santos': { frequencia: 88, nota: 8.2, comportamento: 'Bom' },
            'Pedro Oliveira': { frequencia: 92, nota: 7.8, comportamento: 'Bom' },
            'Ana Costa': { frequencia: 85, nota: 9.0, comportamento: 'Excelente' },
            'Lucas Ferreira': { frequencia: 90, nota: 8.5, comportamento: 'Bom' }
        },
        '2B': {
            'Carlos Mendes': { frequencia: 87, nota: 7.5, comportamento: 'Bom' },
            'Fernanda Lima': { frequencia: 94, nota: 9.2, comportamento: 'Excelente' },
            'Rafael Souza': { frequencia: 89, nota: 8.8, comportamento: 'Bom' },
            'Juliana Rocha': { frequencia: 91, nota: 8.0, comportamento: 'Bom' }
        },
        '3A': {
            'Gabriel Alves': { frequencia: 93, nota: 9.8, comportamento: 'Excelente' },
            'Camila Dias': { frequencia: 86, nota: 7.2, comportamento: 'Bom' },
            'Diego Santos': { frequencia: 88, nota: 8.5, comportamento: 'Bom' },
            'Larissa Costa': { frequencia: 95, nota: 9.5, comportamento: 'Excelente' },
            'Bruno Silva': { frequencia: 90, nota: 8.8, comportamento: 'Bom' }
        }
    }
};

// ===== DADOS DE CONTEÚDO POR DISCIPLINA =====
let professorConteudo = {
    'prof@teste.com': {
        disciplina: 'Matemática',
        conteudos: [
            {
                id: 1,
                titulo: 'Operações Básicas',
                descricao: 'Adição, subtração, multiplicação e divisão',
                dataInicio: '2024-01-15',
                dataFim: '2024-01-30',
                status: 'Concluído',
                turmas: ['1A', '2B'],
                atividades: [
                    { nome: 'Exercícios de Adição', tipo: 'Prática', prazo: '2024-01-20' },
                    { nome: 'Prova de Multiplicação', tipo: 'Avaliação', prazo: '2024-01-25' }
                ]
            },
            {
                id: 2,
                titulo: 'Frações',
                descricao: 'Conceitos básicos de frações e operações',
                dataInicio: '2024-02-01',
                dataFim: '2024-02-15',
                status: 'Em Andamento',
                turmas: ['1A', '2B', '3A'],
                atividades: [
                    { nome: 'Exercícios de Frações', tipo: 'Prática', prazo: '2024-02-10' },
                    { nome: 'Trabalho em Grupo', tipo: 'Projeto', prazo: '2024-02-12' }
                ]
            },
            {
                id: 3,
                titulo: 'Geometria Básica',
                descricao: 'Formas geométricas e cálculos de área',
                dataInicio: '2024-02-16',
                dataFim: '2024-03-01',
                status: 'Planejado',
                turmas: ['2B', '3A'],
                atividades: [
                    { nome: 'Construção de Figuras', tipo: 'Prática', prazo: '2024-02-20' },
                    { nome: 'Cálculo de Áreas', tipo: 'Exercício', prazo: '2024-02-25' }
                ]
            }
        ]
    }
};

// ===== DADOS DE OBSERVAÇÕES DOS PROFESSORES =====
let professorObservacoes = {
    'prof@teste.com': {
        '2024001': [ // Matrícula do aluno
            {
                id: 1,
                disciplina: 'Matemática',
                data: '2024-10-15',
                observacao: 'Aluna demonstra excelente desempenho em todas as atividades. Participa ativamente das aulas e auxilia os colegas. Recomendo continuar incentivando a prática diária de exercícios.'
            }
        ],
        '2024002': [
            {
                id: 1,
                disciplina: 'Matemática',
                data: '2024-10-12',
                observacao: 'Bom desenvolvimento nas atividades. Recomendo mais atenção nos exercícios de álgebra.'
            }
        ]
    }
};

// ===== DADOS DE DISCIPLINAS POR PROFESSOR =====
let professorDisciplinas = {
    'prof@teste.com': [
        {
            id: 1,
            nome: 'Matemática',
            tipo: 'Principal',
            turmas: ['1A', '2B', '3A'],
            totalAlunos: 14,
            cargaHoraria: 40,
            status: 'Ativa',
            objetivos: [
                'Desenvolver raciocínio lógico',
                'Aplicar conceitos matemáticos',
                'Resolver problemas práticos'
            ],
            metodologia: 'Aulas expositivas com exercícios práticos e trabalhos em grupo',
            avaliacao: 'Provas escritas (60%) + Trabalhos (40%)',
            recursos: ['Quadro branco', 'Calculadora', 'Material didático'],
            estatisticas: {
                mediaGeral: 8.2,
                aprovados: 12,
                reprovados: 2,
                frequenciaMedia: 91.5
            }
        },
        {
            id: 2,
            nome: 'Física (Apoio)',
            tipo: 'Apoio',
            turmas: ['2B'],
            totalAlunos: 4,
            cargaHoraria: 20,
            status: 'Ativa',
            objetivos: [
                'Compreender conceitos físicos básicos',
                'Aplicar fórmulas em exercícios',
                'Relacionar física com matemática'
            ],
            metodologia: 'Aulas práticas com demonstrações e experimentos',
            avaliacao: 'Provas (50%) + Relatórios de experimentos (50%)',
            recursos: ['Laboratório', 'Equipamentos de física', 'Simuladores'],
            estatisticas: {
                mediaGeral: 7.8,
                aprovados: 3,
                reprovados: 1,
                frequenciaMedia: 88.2
            }
        }
    ]
};

let currentUser = null;