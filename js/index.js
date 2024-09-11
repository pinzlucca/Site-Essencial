window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    // Adiciona a classe para esconder o loader
    loader.classList.add("loader--hidden");

    // Remove o loader do DOM após a transição de ocultação
    loader.addEventListener("transitionend", () => {
        document.body.removeChild(loader);
    });
});

let count = 1;
        document.getElementById("radio1").checked=true;

        setInterval( function(){
        nextImage();
        }, 5000)

        function nextImage(){
            count++;
            if(count>4){
                count = 1;
            }
        document.getElementById("radio"+count).checked=true;
}



