const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

/*Definimos largura e altura do nosso canvas */
canvas.width = window.innerWidth
canvas.height = window.innerHeight


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

/* Instanciamos nossa class Player */
const player = new Player()

/* Objeto que ira monitorar as teclas pressionadas */
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}
/* Criamos a Função que ira fazer o loop de movimentação e limpar a tela */
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  player.update()

/* Condicionais para movimentação da posição do personagem */  
  if(keys.right.pressed){
    player.velocity.x = 5
  } else if (keys.left.pressed){
    player.velocity.x = -5
  } else {player.velocity.x = 0}
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