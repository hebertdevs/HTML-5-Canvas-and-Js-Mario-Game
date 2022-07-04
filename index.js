
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

/*Definimos largura e altura do nosso canvas */
canvas.width = 1024
canvas.height = 576


console.log(c)

/* Variavel que utilizaremos para dar um 'peso' ao personagem de queda */
const gravity = 1.5

/* Class que iremos começar definindo parametros e metodos do nosso personagem */
class Player {
    constructor(){
      this.speed = 10
      this.position = {
        x: 100,
        y: 100
      }
      this.velocity = {
        x:0,
        y:0
      }
      this.width = 30
      this.height = 30
    }
/* Metodo que desenha nosso personagem na tela */
    draw() {
      c.fillStyle = 'red'
      c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

/* Metodo que mantera o personagem na tela com efeito de moviemnto*/     
    update() {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
 

        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity}
        
    }
}

/* Class que ira definir a plataforma onde nosso personagem se movimentara */
class Platform {
  constructor({ x, y, image }){
      this.position = {
        x:x,
        y:y
      }
      this.image = image
      this.width = image.width
      this. height = image.height

      
  }
/* Metodo para o desenho da plataforma */ 
  draw(){
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

/* Class que ira definir as imagens de fundo */
class GenericObject {
  constructor({ x, y, image }){
      this.position = {
        x:x,
        y:y
      }
      this.image = image
      this.width = image.width
      this. height = image.height

      
  }
/* Metodo para o desenho das nossas imagens na tela */ 
  draw(){
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

/* Importando imagens com Js */
let imagePlatform = new Image(); 
  imagePlatform.src = './images/platform.png';  

let backgroundImage = new Image(); 
  backgroundImage.src = './images/background.png';

let  hillsImage = new Image(); 
hillsImage.src = './images/hills.png';

let platformSmall = new Image(); 
platformSmall.src = './images/platformSmallTall.png';

  

/* Instanciamos nossa class Player */
let player = new Player()

/* Instanciando como array multiplas plataformas e passando valores para o constructor*/ 
let platforms =  []

/* Instanciando como array para receber as imagens de fundo */   
let genericObjects = []

/* Objeto que ira monitorar as teclas pressionadas */
let keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}
/* Variavel para dectar quanto da nossa tela se moveu */ 
let scrollOffset = 0

/*  Função que utilizaremos para iniciar e reiniciar o game */
function init(){

/* Importando imagens com Js */
 imagePlatform = new Image(); 
  imagePlatform.src = './images/platform.png';  

 backgroundImage = new Image(); 
  backgroundImage.src = './images/background.png';

  hillsImage = new Image(); 
hillsImage.src = './images/hills.png';

  platformSmall = new Image(); 
  platformSmall.src = './images/platformSmallTall.png';
  

/* Instanciamos nossa class Player */
 player = new Player()

/* Instanciando como array multiplas plataformas e passando valores para o constructor*/ 
 platforms =  [
  new Platform({ x: imagePlatform.width * 4 + 300 - 2 + imagePlatform.width - platformSmall.width, y: 270, image: platformSmall}),
  new Platform({ x: -1, y: 470, image: imagePlatform}), 
  new Platform({ x: imagePlatform.width -3, y: 470, image: imagePlatform}),
  new Platform({ x: imagePlatform.width * 2 + 100, y: 470, image: imagePlatform}),
  new Platform({ x: imagePlatform.width * 3 + 300, y: 470, image: imagePlatform}),
  new Platform({ x: imagePlatform.width * 4 + 300 - 2, y: 470, image: imagePlatform}),
  new Platform({ x: imagePlatform.width * 5 + 700 - 2, y: 470, image: imagePlatform}),

]

/* Instanciando como array para receber as imagens de fundo */   
 genericObjects = [
  new GenericObject({x: -1, y: -1, image: backgroundImage }),
  new GenericObject({x: -1, y: -1, image: hillsImage })]


/* Variavel para dectar quanto da nossa tela se moveu */ 
 scrollOffset = 0

} // Final função init()

/* Criamos a Função que ira fazer o loop de movimentação e limpar a tela */
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  genericObjects.forEach(genericObjects => {
    genericObjects.draw() // cada imagem de fundo sera desenhada na tela
  })
  
  platforms.forEach((platform) => {
    platform.draw()
  }) 

  player.update()

/* Condicionais para movimentação da posição do personagem */  
/*Condicionais para evitar colisao do personagem com a plataforma */
  if(keys.right.pressed && player.position.x < 400){
    player.velocity.x = player.speed
  } else if ((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0){
    player.velocity.x = -player.speed
  } else {player.velocity.x = 0
      if(keys.right.pressed) {
        scrollOffset += player.speed
        platforms.forEach((platform) => {
          platform.position.x -= player.speed // effeito parallax scroll
        })       
        genericObjects.forEach(genericObjects => {
          genericObjects.position.x -= player.speed * 0.66
        })  
      } else if (keys.left.pressed && scrollOffset > 0) {
        scrollOffset -= player.speed
        platforms.forEach((platform) => {
          platform.position.x += player.speed 
        })   
        genericObjects.forEach(genericObjects => {
          genericObjects.position.x += player.speed * 0.66 // effeito parallax scroll
        })       
      }

} 
 platforms.forEach((platform) => {
 if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width
  ){
    player.velocity.y = 0
  }
}) 
/*Condição de vencer o jogo */
 if (scrollOffset > imagePlatform.width * 5 + 300 - 2) {
  console.log("You Win")
 }

/*Condição de perder o jogo chamando a função init()*/  
if(player.position.y > canvas.height){
  console.log("You lose")
  init()
}
}

init()
animate()

/* Vamos capturar eventos de teclado e definir com switch ações de movimentação*/
addEventListener('keydown', ({keyCode}) =>{
//  console.log(keyCode)
  switch(keyCode){
    case 65:
      console.log('left')
      keys.left.pressed = true
      break

    case 83:
      console.log('down')
    break

    case 68:
      console.log('right')
      keys.right.pressed = true
    break

    case 87:
      console.log('up')
      player.velocity.y -= 25
    break
  }

})

/* Evento que ocorrerar ao soltar a tecla pressionada */ 
addEventListener('keyup', ({keyCode}) =>{
  //  console.log(keyCode)
    switch(keyCode){
      case 65:
        console.log('left')
        keys.left.pressed = false
        break

      case 83:
        console.log('down')
      break
  
      case 68:
        console.log('right')  
        keys.right.pressed = false
      break
  
      case 87:
        console.log('up')
      break
    }
  

  })