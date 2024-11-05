const promptSync = require("prompt-sync")();

enum Difficulty {
  Easy = 15,
  Normal = 10,
  Hard = 5
}

class GuessNumber {
  private maxAttempts: number;
  private attempts: number = 0;
  private num: number;

  constructor(difficulty: Difficulty) {
    this.maxAttempts = difficulty;
    this.num = Math.floor(Math.random() * (100 - 1) + 1);
  }

  public guessNumber() {
    console.log(this.attempts, this.maxAttempts, this.num)
    while(this.attempts < this.maxAttempts) {
      this.attempts++;
      let guess: number = Number(promptSync("Adivine el numero (entre 1-100): "));
      
      if(guess > 100 || guess < 1) {
        console.log("El numero ingresado esta fuera de rango. Intente de nuevo.")
        this.attempts--;
        continue;
      }

      if(guess == this.num) {
        console.log(`Felicitaciones!! Acertaste!! El numero era: ${this.num}`)
        break;
      } else if (this.attempts >= this.maxAttempts) {
        console.log(`Alcanzaste el limite de intentos. El numero era: ${this.num}`)
      }
      else if (guess > this.num) {
        console.log(`Su suposicion es demasiado alta.`)
      } else {
        console.log(`Su suposicion es demasiado baja.`)
      }
    }
  }
}

const game = new GuessNumber(Difficulty.Hard)
game.guessNumber()