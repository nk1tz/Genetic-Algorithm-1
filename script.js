//Global variables
var nameTarget = "nathaniel"
var desiredPopulationSize = 10;
var solutionIsFound = false;

console.log(nameTarget);

//Actually generate the first population
var currentPopulation = generateNewPopulation(desiredPopulationSize);
console.log(currentPopulation);
var nextPopulation = [];
var thresholdsOfProbability = [];

//
//          GENERAL ITERATIVE PROCESS 
//
//    This is the high level process laid out.
// begin

while(solutionIsFound == false){
    thresholdsOfProbability = evaluatePopulation();
    nextPopulation = breedNextPop()
    currentPopulation = nextPopulation;
    console.log(currentPopulation);
}


//
//           FITNESS EVALUATION
//
//  Function used to evaluate a population
//
//  This function will return the probabilities of reproduction array called thresholdsOfProbability.
function evaluatePopulation(){
    //first .map a scores aray to currentPopulation array
    var scores = currentPopulation.map( measureIndividualFitness );
    
    // calculate sum of scores
    var sumOfScores = scores.reduce(function(a, b) {
        return a + b;
    });
    
    //This is the weight inversion function : (2 x average - score)/sum
    function invertWeight(originalWeight){
        return (2 * (sumOfScores / currentPopulation.length) - originalWeight)/sumOfScores;
    }
    //this following array represents the weighted probabilities of mating based on a 0 to 1 scale.
    var probabilityOfMating = scores.map( invertWeight );
    
    //this following array represents the ranges between 0 and 1 that each individual represents. Used for direct random selection.
    //This is the array used in BREEDING.
    thresholdsOfProbability = [probabilityOfMating.length];
    
    for(var i = 0; i < probabilityOfMating.length; i++){ 
        if(i === 0){
             thresholdsOfProbability[i] = probabilityOfMating[i];
        } else {
            thresholdsOfProbability[i] = probabilityOfMating[i] + thresholdsOfProbability[i-1];
        }
    }
    return thresholdsOfProbability;
}

//Measure an individual's fitness against the nameTarget
function measureIndividualFitness(ind){
    var i =0;
    var score = 0;
    for(i=0; i<ind.length; i++){
        score += Math.abs( nameTarget[i].charCodeAt() - ind[i].charCodeAt() );
    }
    if(score == 0){
        solutionIsFound = true;
    }
    return score;
}


//                         BREEDING
//
//Breed the current population to make next generation using scores as probability of reproducion.
//
//This function breeds the population in order to create the next one.
function breedNextPop(){
    for(var i in currentPopulation){
        //Now actually choose two individuals
        var mate1 = chooseMate();
        var mate2 = chooseMate();
        var baby = makeBaby(mate1,mate2);
        nextPopulation.push(baby);
    }
    return nextPopulation;
}

//Return two mates (could be the same, doesn't matter)
function chooseMate(){
    var throwDart = Math.random();
    var flag = 0;
    var x = 0;
    while( flag == false ){
        if( throwDart < thresholdsOfProbability[x] ){
            flag = true;
            return x;
        } else x++;
    }
}

//Splice them together randomly and make baby
function makeBaby(mate1, mate2){
    var spliceLocation = randomIntFromInterval(0,currentPopulation[mate1].length);
    var baby = currentPopulation[mate1].slice(0, spliceLocation) + currentPopulation[mate2].slice(spliceLocation);
    return baby;
}


//
//OTHER FUNCTIONS
//

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

//This function Generate a population of random names of specific size
function generateNewPopulation(size){
    var populationOfNames =[size];
    var i =0;
    for(i=0; i<size; i++){
        populationOfNames[i] = generateNewName(nameTarget.length);
    }
    return populationOfNames;
}