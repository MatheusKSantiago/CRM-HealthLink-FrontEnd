const especialidades = async ()=>{
    const response = await fetch("http://localhost:8080/api/employee/allspecialities", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/json',
          }
    });

    const especialidades = await response.json();
    const selectEspecialidade = document.getElementById("especialidadeSelect");

    especialidades.forEach(especialidade => {
        let option = document.createElement("option")
        option.value = especialidade;
        option.textContent = especialidade;
        selectEspecialidade.appendChild(option);
    });

}
const minhasConsultas = async ()=> {
    const response = await fetch(`http://localhost:8080/api/patient/appointments/${localStorage.getItem("email")}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Accept': 'application/json',
          }
    });

    const consultas = await response.json();
    const ul = document.getElementById("appointments-list")
    consultas.forEach(consulta=>{
        let li = document.createElement('li')
        li.textContent = JSON.stringify(consulta);
        ul.appendChild(li);
    })
}

function iniciarTelaPaciente(){
    especialidades();
    minhasConsultas();
}

function irParaMarcarConsulta(){
    localStorage.setItem("especialidade",document.getElementById("especialidadeSelect").value)
    localStorage.setItem("tipoAgendamento",document.getElementById("tipoAgendamentoSelect").value)
    window.location.href='../marcarConsulta/marcarConsulta.html'
}