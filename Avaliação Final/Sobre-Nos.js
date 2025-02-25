document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("floatingButton");
    
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
        offsetX = e.clientX - button.getBoundingClientRect().left;
        offsetY = e.clientY - button.getBoundingClientRect().top;
    });

    document.addEventListener("mousemove", function (e) {
        if (isDragging) {
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;
            button.style.left = x + "px";
            button.style.top = y + "px";
            button.style.position = "fixed";
        }
    });

    document.addEventListener("mouseup", function () {
        if (isDragging) {
            isDragging = false;
            // Salvar posição no localStorage
            localStorage.setItem("buttonPos", JSON.stringify({
                left: button.style.left,
                top: button.style.top
            }));
        }
    });
});