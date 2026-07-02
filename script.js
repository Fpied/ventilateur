const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let ventilateurAllume = false;
let angle = 0;

const button = {
    x: 20,
    y: 20,
    largeur: 100,
    hauteur: 50
};

function dessinerBouton(){
    ctx.fillStyle = "red";
    ctx.fillRect(button.x, button.y, button.largeur, button.hauteur);

    ctx.fillStyle = "white";
    ctx.font = "20px arial";
    if(ventilateurAllume){
        ctx.fillText("ON", 45, 52);

    } else{
        ctx.fillText("OFF", 45, 52);

    }
    
}

dessinerBouton();

canvas.addEventListener("click", function(event){
    const rect = canvas.getBoundingClientRect();
    const sourisX = event.clientX - rect.left;
    const sourisY = event.clientY - rect.top;

    if (
        sourisX >= button.x &&
        sourisX <= button.x + button.largeur &&
        sourisY >= button.y &&
        sourisY <= button.y + button.hauteur
    ){
        ventilateurAllume = !ventilateurAllume;
        dessinerBouton();
    }

});

function dessinerCentreVentilateur(){
    ctx.beginPath();
    ctx.arc(400, 300, 25, 0, Math.PI *2);
    ctx.fillStyle = "gray";
    ctx.fill();

}

dessinerCentreVentilateur();

function dessinerPale(){
    ctx.beginPath();
    ctx.ellipse(400, 220, 20, 70, 0, 0, Math.PI *2);
    ctx.fillStyle = "lightgray";
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(400, 380, 20, 70, 0, 0, Math.PI * 2);
    ctx.fillStyle = "lightgray";
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(320, 300, 70, 20, 0, 0, Math.PI * 2);
    ctx.fillStyle = "lightgray";
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(480, 300, 70, 20, 0, 0, Math.PI * 2);
    ctx.fillStyle = "lightgray";
    ctx.fill();
}

dessinerPale();

function dessinerVentillateur(){
    ctx.save();
    ctx.translate(400, 300);
    ctx.rotate(angle);
    for(let i = 0; i < 4; i++){
        ctx.beginPath();
        ctx.ellipse(0, -80, 20, 70, 0, 0, Math.PI *2);
        ctx.fillStyle = "lightgray";
        ctx.fill();
        ctx.rotate(Math.PI / 2);
        

    }
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    ctx.restore();

    

}
dessinerVentillateur();

function animation(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dessinerBouton();
    dessinerVentillateur();
    requestAnimationFrame(animation);
    if(ventilateurAllume){
        angle += 0.02;

    }
}

animation();


