//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 15;
let raio = dBolinha / 2;

//variaveis da raquete
let xRaquete = 5
let yRaquete = 150
let raqueteComprimento = 10
let raqueteAltura = 90

//variaveis da raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente; 

let colidiu = false

//chance de errar
let chanceDeErrar = 0;

//Placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada
let ponto
let trilha


//velocidade da bolinha
let VelocidadexBolinha = 6
let VelocidadeyBolinha = 6
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha ();
  movimentaBolinha ();
  verificacolisão ();
  mostraRaquete(xRaquete,yRaquete);
  movimentaraquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  //verificacolisaoraquete();
  colisaominharaquetebiblioteca(xRaquete, yRaquete);
  movimentaRaqueteOponente();
  colisaominharaquetebiblioteca(xRaqueteOponente, yRaqueteOponente);
  placarDoJogo();
  marcaPonto();
}


function mostraBolinha () {
  circle (xBolinha,yBolinha,dBolinha);
}

function movimentaBolinha () {
  xBolinha += VelocidadexBolinha;
  yBolinha += VelocidadeyBolinha;
}

function verificacolisão () {
  if (xBolinha + raio > width || xBolinha - raio < 0){
    VelocidadexBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    VelocidadeyBolinha *= -1;
  }
}
function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, 
         raqueteAltura);
}

function movimentaraquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}
function verificacolisaoraquete(){
  if (xBolinha -  raio < xRaquete + raqueteComprimento 
& yBolinha - raio < yRaquete + raqueteAltura && 
     yBolinha - raio > yRaquete - raqueteAltura) {
    VelocidadexBolinha *= -1;
  }
}

function colisaominharaquetebiblioteca(x, y){
  colidiu = 
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){VelocidadexBolinha *= -1;
  raquetada.play();
              }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calcularChanceDeErrar()
}

function placarDoJogo(){
  stroke (255)
  textAlign(CENTER)
  textSize (16);
  fill(color (255, 140, 0));
  rect (150,10,40,20);
  fill(255);
  text (meusPontos, 170,26);
  fill(color (255, 140, 0));
  rect (450,10,40,20);
  fill(255);
  text (pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 593){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 7){
    pontosOponente +=1;
    ponto.play();
  }
}

function calcularChanceDeErrar(){
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function preload(){
  trilha = loadSound ("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}