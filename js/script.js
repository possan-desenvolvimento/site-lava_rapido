document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. LÓGICA DO CARROSSEL
    // ==========================================
    const carousel = document.querySelector(".carousel");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        });

        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
    }

    // ==========================================
    // 2. LÓGICA DO WEB APP (AGENDAMENTO)
    // ==========================================
    
    let agendamento = {
        servico: "",
        veiculo: "",
        periodo: ""
    };

    const telefoneLavaRapido = "5511964801185"; 

    window.abrirModal = function(veiculoPreSelecionado = null) {
        const modal = document.getElementById("modalAgendamento");
        modal.style.display = "flex";
        
        agendamento = { servico: "", veiculo: "", periodo: "" };

        if (veiculoPreSelecionado) {
            agendamento.veiculo = veiculoPreSelecionado;
            irParaEtapa(1); 
        } else {
            irParaEtapa(1); 
        }
    }

    window.fecharModal = function() {
        document.getElementById("modalAgendamento").style.display = "none";
    }

    window.onclick = function(event) {
        const modal = document.getElementById("modalAgendamento");
        if (event.target == modal) {
            fecharModal();
        }
    }

    function irParaEtapa(numeroEtapa) {
        document.querySelectorAll('.etapa').forEach(etapa => {
            etapa.classList.remove('ativa');
        });
        
        if (numeroEtapa === 1) document.getElementById('etapa-servico').classList.add('ativa');
        if (numeroEtapa === 2) document.getElementById('etapa-profissional').classList.add('ativa'); // ID mantido para compatibilidade
        if (numeroEtapa === 3) document.getElementById('etapa-horario').classList.add('ativa');
    }

    window.selecionarServico = function(servico) {
        agendamento.servico = servico;
        
        if (agendamento.veiculo !== "") {
            irParaEtapa(3);
        } else {
            irParaEtapa(2);
        }
    }

    window.selecionarProfissional = function(veiculo) {
        agendamento.veiculo = veiculo;
        irParaEtapa(3);
    }

    window.finalizarAgendamento = function(periodo) {
        agendamento.periodo = periodo;
        
        const mensagem = `Olá! Gostaria de agendar uma lavagem.
        
*Serviço:* ${agendamento.servico}
*Veículo:* ${agendamento.veiculo}
*Período:* ${agendamento.periodo}

Pode me confirmar a disponibilidade?`;

        window.open(`https://wa.me/${telefoneLavaRapido}?text=${encodeURIComponent(mensagem)}`, "_blank");
        
        fecharModal();
    }
});