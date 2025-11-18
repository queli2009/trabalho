// Função para adicionar um aluno
function adicionarAluno(event) {
    event.preventDefault();

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nomeAluno').value;
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);

    // Calcula a média
    const media = (nota1 + nota2) / 2;

    // Determina o status (aprovado ou reprovado)
    const status = media >= 6 ? 'Aprovado' : 'Reprovado';
    const statusClass = media >= 6 ? 'aluno-aprovado' : 'aluno-reprovado';

    // Cria uma nova linha na tabela
    const tabela = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();

    // Cria as células da linha
    novaLinha.innerHTML = `
        <td>${nome}</td>
        <td>${nota1}</td>
        <td>${nota2}</td>
        <td>${media.toFixed(1)}</td>
        <td class="${statusClass}">${status}</td>
    `;

    // Limpa os campos do formulário
    document.getElementById('formulario').reset();

    // Armazena os dados no localStorage
    salvarDadosLocalStorage(nome, nota1, nota2, media, status);
}

// Função para salvar os dados no localStorage
function salvarDadosLocalStorage(nome, nota1, nota2, media, status) {
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    alunos.push({ nome, nota1, nota2, media, status });
    localStorage.setItem('alunos', JSON.stringify(alunos));
}

// Função para carregar os dados armazenados no localStorage
function carregarDadosLocalStorage() {
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    const tabela = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];

    alunos.forEach(aluno => {
        const novaLinha = tabela.insertRow();
        const statusClass = aluno.media >= 6 ? 'aluno-aprovado' : 'aluno-reprovado';

        novaLinha.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.nota1}</td>
            <td>${aluno.nota2}</td>
            <td>${aluno.media.toFixed(1)}</td>
            <td class="${statusClass}">${aluno.status}</td>
        `;
    });
}

// Carrega os dados ao iniciar a página
window.onload = carregarDadosLocalStorage;
