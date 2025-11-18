// Carregar registros do localStorage
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

// Pegando elementos
const form = document.getElementById("formNotas");
const tabela = document.querySelector("#tabelaAlunos tbody");

// Função para atualizar tabela
function atualizarTabela() {
    tabela.innerHTML = "";

    alunos.forEach(aluno => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.n1}</td>
            <td>${aluno.n2}</td>
            <td>${aluno.media.toFixed(1)}</td>
            <td class="${aluno.media >= 6 ? "aprovado" : "reprovado"}">
                ${aluno.media >= 6 ? "Aprovado" : "Reprovado"}
            </td>
        `;

        tabela.appendChild(tr);
    });
}

// Primeiro carregamento
atualizarTabela();

// Evento de cadastro
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);

    if (!nome || isNaN(nota1) || isNaN(nota2)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const media = (nota1 + nota2) / 2;

    // Criar objeto aluno
    const novoAluno = {
        nome: nome,
        n1: nota1,
        n2: nota2,
        media: media
    };

    alunos.push(novoAluno);

    // salvar no localStorage
    localStorage.setItem("alunos", JSON.stringify(alunos));

    // atualizar tabela
    atualizarTabela();

    // limpar campos
    form.reset();
});
