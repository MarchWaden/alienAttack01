console.log('BATTLE BEGIN')

class Ship {
   constructor(name,hp,accuracy, firepower,missiles) {
     this.name = name;
     this.hp = hp;
     this.accuracy = accuracy;
     this.firepower = firepower;
     this.missiles = missiles;
   }

   attack (enemy) {

    if (Math.random() < this.accuracy) { //if a hit is rolled, subtract our firepower from the enemy's hp
        enemy.hp = enemy.hp - this.firepower;
        if(enemy.hp <= 0){ //if the enemy's hp is less than zero change it to zero
            enemy.hp = 0;
        }
        console.log( `${this.name} hit ${enemy.name} for ${this.firepower}. ${enemy.name} has ${enemy.hp} remaining!`);
    } else {
        console.log(`${this.name} missed`)
    }
   }
}

class AlienShip extends Ship {
    constructor(name,hp,accuracy,firepower,missiles) {
        super(name,hp,accuracy,firepower,missiles)
        this.name = name;
        this.hp = Math.floor(Math.random()*(7-3)+3);
        this.accuracy = (Math.random()*(.2)+.6);
        this.firepower = Math.floor(Math.random()*(3))+2;
        this.missiles = missiles;
    }
}

const USSAsembly = new Ship('USSAsembly', 20+Math.floor(Math.random()*4),.7,5,4) //added shields to USSAsembly's hp.


const alienArray = [];

const numberOfAlienShips = Math.floor(Math.random()*12)+2;
console.log(`There are ${numberOfAlienShips} alien ships.`);

for(let i =1; i<(numberOfAlienShips); i++){
    alienArray[i] = new AlienShip(`alienShip${i}`, "hp","accuracy","firepower",0)
}

let retreatCheck = false;
let missilesCheck = false;

const battle = (enemy) => {
    while(USSAsembly.hp > 0  && enemy.hp > 0){
        if (!missilesCheck){
        USSAsembly.attack(enemy);
      }else{
        enemy.hp = 0;
        console.log("Nuclear launch detected!");
        console.log(`${enemy.name} was destroyed!`);
        missilesCheck = false;
        USSAsembly.missiles -= 1;
      }
        if (enemy.hp === 0) {
            break
        }
        enemy.attack(USSAsembly)

    }
}

// the battles
for(let i=1; i<alienArray.length; i++){
    battle(alienArray[i]);
    if(USSAsembly.hp === 0){
        break
    }
    const retreatOption = prompt(`Do you want to retreat? Answer "yes" or "no".`).toLowerCase();
    if(retreatOption === "yes"){
        retreatCheck = true;
    }
    if (retreatCheck === true){
        break
    }
    if (USSAsembly.missiles > 0){
      const missilesOption = prompt('Do you want to use a missile? Answer "yes" or "no"').toLowerCase();
      if (missilesOption === 'yes'){
        missilesCheck = true;
    }
    }
    if (USSAsembly.missiles === 0){
      console.log("Out of missiles!");
    }

}

console.log(alienArray);
console.log("battle is over");

if(USSAsembly.hp > 0 && alienArray[alienArray.length-1].hp === 0){
    console.log("USS ASSEMBLY win")
}

else if(retreatCheck === true){
    console.log("YOU RETREATED")
}

else {
    console.log("Aliens win")
}
