var nameTarget = "nathaniel"

//mathematical function to get random int in a range. Used in my code to randomize Unicode alphabet.
function randomIntFromInterval(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//generate a random name of specific length
function generateNewName(L){
    var newName = [L];
    var i =0;
    for(i=0; i<L; i++){
        newName[i] = String.fromCharCode( randomIntFromInterval(97,122) )
    }
    return newName.join('');
}

console.log(nameTarget);
console.log( generateNewName(nameTarget.length) );


var desiredPopulationSize = 10;

//Generate a population of random names of specific size
function generateNewPopulation(size){
    var populationOfNames =[size];
    var i =0;
    for(i=0; i<size; i++){
        populationOfNames[i] = generateNewName(nameTarget.length);
    }
    return populationOfNames;
}

var currentPopulation = generateNewPopulation(desiredPopulationSize);
console.log(currentPopulation);

//Measure every individual's fitness in a given population

//Measure an individual's fitness against the nameTarget
function measureIndividualFitness(ind){
    var i =0;
    var score = 0;
    for(i=0; i<ind.length; i++){
        score += Math.abs( nameTarget[i].charCodeAt() - ind[i].charCodeAt() );
    }
    return score;
}

//Now .map a scores aray to currentPopulation array
var scores = currentPopulation.map( measureIndividualFitness );

console.log(currentPopulation);
console.log(scores);

//Breed the current population to make next generation using scores as probability of reproducion.

//Choose two individuals randomly using scores as weights

//Splice them together randomly

//Insert that baby into the nextGeneration array.