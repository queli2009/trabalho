let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

const form = document.getElementById("formNotas");
const tabela = document.querySelector("#tabelaAlunos tbody");

function atualizarTabela() {
    tabela.innerHTML = "";

    alunos.forEach(aluno => {
        const tr = document.createElement("tr");

        const imgStatus = aluno.media >= 6 ? "aprovado.png" : "reprovado.png";

        tr.innerHTML = `
            <td><img src="img/aluno.png" width="45"></td>
            <td>${aluno.nome}</td>
            <td>${aluno.n1}</td>
            <td>${aluno.n2}</td>
            <td>${aluno.media.toFixed(1)}</td>
            <td>
                <img src="img/${imgStatus}" class="status-img">
            </td>
        `;

        tabela.appendChild(tr);
    });
}

atualizarTabela();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const n1 = parseFloat(document.getElementById("nota1").value);
    const n2 = parseFloat(document.getElementById("nota2").value);

    if (!nome || isNaN(n1) || isNaN(n2)) {
        alert("Preencha todos os campos!");
        return;
    }

    const media = (n1 + n2) / 2;

    const aluno = {
        nome,
        n1,
        n2,
        media
    };

    alunos.push(aluno);
    localStorage.setItem("alunos", JSON.stringify(alunos));

    atualizarTabela();
    form.reset();
});
