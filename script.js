const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const sonVentilateur = new Audio("ventilateur.mp3");
const sonVentilateurFort = new Audio("ventilateurfort.mp3");
const background = new Image();
background.src = "beach.jpg";
let vitesseVentilateur = 0;
sonVentilateur.loop = true;
sonVentilateur.volume = 0.4;
sonVentilateurFort.loop = true;
sonVentilateurFort.volume = 0.8; 

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
    switch(vitesseVentilateur){
        case 0:
            ctx.fillText("OFF", 35, 52);
            
            break;
        case 1:
            ctx.fillText("ON", 35, 52);
            
            break;
        case 2:

            ctx.fillText("MOYEN", 20, 52);
            

            break;
        case 3:
            ctx.fillText("RAPIDE", 20, 52);
            
            break;
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
        vitesseVentilateur++;

        if(vitesseVentilateur > 3){
            vitesseVentilateur = 0;
        }

        ventilateurAllume = vitesseVentilateur > 0;
        changerSon();

    // if (ventilateurAllume) {
    //     sonVentilateur.play().catch(function(error){
    //         console.log("Le son ne démarre pas :", error);
    //     });
    // } else {
    //     sonVentilateur.pause();
    //     sonVentilateur.currentTime = 0;
    // }

    dessinerBouton();
    }

});



function dessinerVentillateur(){
    ctx.save();
    ctx.translate(400, 300);
    ctx.rotate(angle);
    for(let i = 0; i < 3; i++){
        ctx.beginPath();
        ctx.ellipse(0, -120, 50, 150, 0, 0, Math.PI *2);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.rotate(Math.PI * 2/3);
        

    }
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.restore();

    

}
dessinerVentillateur();

function dessinerFond(){
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function dessinerPied(){
    // tige du pied
    ctx.fillStyle = "gray";
    ctx.fillRect(390, 330, 20, 180);

    // socle
    ctx.fillStyle = "darkgray";
    ctx.beginPath();
    ctx.ellipse(400, 530, 90, 25, 0, 0, Math.PI * 2);
    ctx.fill();
}

function animation(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dessinerFond();
    dessinerPied();
    dessinerBouton();
    dessinerVentillateur();
    requestAnimationFrame(animation);
    if(ventilateurAllume){
        angle += vitesseVentilateur * 0.08;

    }
}

animation();

sonVentilateur.addEventListener("error", function(){
    console.log("Erreur chargement son");
});

function changerSon(){
    sonVentilateur.pause();
    sonVentilateur.currentTime = 0;

    if(vitesseVentilateur === 0){
        return;
    }

    if(vitesseVentilateur === 1){
        sonVentilateur.src = "ventilateur.mp3";
    } else if(vitesseVentilateur === 2){
        sonVentilateur.src = "ventilateurfort.mp3";
    } else if(vitesseVentilateur === 3){
        sonVentilateur.src = "ventilateurfort.mp3";
    }

    sonVentilateur.loop = true;
    sonVentilateur.play();
}

