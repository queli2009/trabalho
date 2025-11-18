// Carregar dados do localStorage
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

// Referências aos elementos
const form = document.getElementById("formAluno");
const tabela = document.querySelector("#tabela tbody");

// Função para atualizar a tabela
function atualizarTabela() {
    tabela.innerHTML = "";

    alunos.forEach(aluno => {
        const tr = document.createElement("tr");

        const situacao = aluno.media >= 6 ? "Aprovado" : "Reprovado";
        const classe = aluno.media >= 6 ? "aprovado" : "reprovado";

        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.nota1}</td>
            <td>${aluno.nota2}</td>
            <td>${aluno.nota3}</td>
            <td>${aluno.media.toFixed(1)}</td>
            <td class="${classe}">${situacao}</td>
        `;

        tabela.appendChild(tr);
    });
}

// Primeira atualização da tabela
atualizarTabela();

// Evento de envio do formulário
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);
    const nota3 = parseFloat(document.getElementById("nota3").value);

    // Validação de campos
    if (!nome || isNaN(nota1) || isNaN(nota2)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Calcular a média
    const media = (nota1 + nota2 + nota3) / 3;

    const aluno = {
        nome: nome,
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        media: media
    };

    // Adicionar o aluno à lista
    alunos.push(aluno);

    // Armazenar dados no localStorage
    localStorage.setItem("alunos", JSON.stringify(alunos));

    // Atualizar tabela
    atualizarTabela();

    // Limpar os campos após o cadastro
    form.reset();
});
