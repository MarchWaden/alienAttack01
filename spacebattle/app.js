console.log('BATTLE BEGIN')

class Ship {
   constructor(name,hp,accuracy, firepower) {
     this.name = name;
     this.hp = hp;
     this.accuracy = accuracy;
     this.firepower = firepower;
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
    constructor(name,hp,accuracy,firepower) {
        super(name,hp,accuracy,firepower)
        this.name = name;
        this.hp = Math.floor(Math.random()*(7-3)+3);
        this.accuracy = (Math.random()*(.2)+.6);
        this.firepower = Math.floor(Math.random()*(3))+2;
    }
}

const USSAsembly = new Ship('USSAsembly', 20+Math.floor(Math.random()*4),.7,5) //added shields to USSAsembly's hp.

const alienArray = [];

const numberOfAlienShips = Math.floor(Math.random()*20)+1;
console.log(`There are ${numberOfAlienShips} alien ships.`);

for(let i =1; i<(numberOfAlienShips); i++){
    alienArray[i] = new AlienShip(`alienShip${i}`, "hp","accuracy","firepower")
}

let retreatCheck = false;

const battle = (enemy) => {
    while(USSAsembly.hp > 0  && enemy.hp > 0){
        USSAsembly.attack(enemy)
        if (enemy.hp === 0) {
            break
        }
        enemy.attack(USSAsembly)

    }
}

// the battles
for(let i=1; i<alienArray.length-1; i++){
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
}

console.log(alienArray);
console.log("battle is over");

if(USSAsembly.hp > 0 && alienArray[alienArray.length-1].hp === 0){
    console.log("USS ASSEMBLY win")
}

if(retreatCheck === true){
    console.log("YOU RETREATED")
}

else {
    console.log("Aliens win")
}
