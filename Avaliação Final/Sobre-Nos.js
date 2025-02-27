document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".floating-button");
    
    if (!button) {
        console.error("Botão não encontrado!");
        return;
    }
    
    // Garantir que o botão tenha um posicionamento inicial
    button.style.position = "absolute";
    button.style.width = button.offsetWidth + "px";
    button.style.height = button.offsetHeight + "px";
    
    // Carregar posição salva
    if (localStorage.getItem("buttonPos")) {
        let pos = JSON.parse(localStorage.getItem("buttonPos"));
        button.style.left = pos.left;
        button.style.top = pos.top;
    }
    
    let isDragging = false;
    let offsetX, offsetY;

    button.addEventListener("mousedown", function (e) {
        isDragging = true;
        offsetX = e.clientX - button.offsetLeft;
        offsetY = e.clientY - button.offsetTop;
        button.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", function (e) {
        if (isDragging) {
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;
            
            // Garantir que o botão não ultrapasse os limites da tela
            let maxX = window.innerWidth - button.offsetWidth;
            let maxY = document.documentElement.scrollHeight - button.offsetHeight;
            
            // Ajuste para garantir que o botão se mova até a borda inferior
            x = Math.max(0, Math.min(x, maxX));
            y = Math.max(0, Math.min(y, maxY));
            
            button.style.left = `${x}px`;
            button.style.top = `${y}px`;
        }
    });

    document.addEventListener("mouseup", function () {
        if (isDragging) {
            isDragging = false;
            button.style.cursor = "grab";
            // Salvar posição no localStorage
            localStorage.setItem("buttonPos", JSON.stringify({
                left: button.style.left,
                top: button.style.top
            }));
        }
    });

    button.style.cursor = "grab";
});