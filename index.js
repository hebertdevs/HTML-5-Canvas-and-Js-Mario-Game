

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
        else {this.velocity.y = 0}
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
/* Metodo para o desenho da plataforma */ 
  draw(){
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

/* Importando imagens com Js */
const imagePlatform = new Image(); 
  imagePlatform.src = './images/platform.png';  

const backgroundImage = new Image(); 
  backgroundImage.src = './images/background.png';

const  hillsImage = new Image(); 
hillsImage.src = './images/hills.png';
  
console.log(backgroundImage)
/* Instanciamos nossa class Player */
const player = new Player()

/* Instanciando como array multiplas plataformas e passando valores para o constructor*/ 
const platforms =  [
  new Platform({ x: -1, y: 470, image: imagePlatform}), 
  new Platform({ x: imagePlatform.width -3, y: 470, image: imagePlatform})]

const genericObjects = [
  new GenericObject({x: -1, y: -1, image: backgroundImage }),
  new GenericObject({x: -1, y: -1, image: hillsImage })]

/* Objeto que ira monitorar as teclas pressionadas */
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}
/* Variavel para dectar quanto da nossa tela se moveu */ 
let scrollOffset = 0

/* Criamos a Função que ira fazer o loop de movimentação e limpar a tela */
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  genericObjects.forEach(genericObjects => {
    genericObjects.draw()
  })
  
  platforms.forEach((platform) => {
    platform.draw()
  }) 
  player.update()

/* Condicionais para movimentação da posição do personagem */  
/*Condicionais para evitar colisao do personagem com a plataforma */
  if(keys.right.pressed && player.position.x < 400){
    player.velocity.x = 5
  } else if (keys.left.pressed && player.position.x > 100){
    player.velocity.x = -5
  } else {player.velocity.x = 0
      if(keys.right.pressed) {
        scrollOffset += 5
        platforms.forEach((platform) => {
          platform.position.x -= 5
        })       
        genericObjects.forEach(genericObjects => {
          genericObjects.position.x -= 3
        })  
      } else if (keys.left.pressed) {
        scrollOffset -= 5
        platforms.forEach((platform) => {
          platform.position.x += 5
        })   
        genericObjects.forEach(genericObjects => {
          genericObjects.position.x += 3
        })       
      }

} 
 platforms.forEach((platform) => {
 if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width
  ){
    player.velocity.y = 0
  }
}) 
 if (scrollOffset > 100) {
  console.log("You Win")
 }
}

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
      player.velocity.y -= 20
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
        player.velocity.y -= 20
      break
    }
  

  })