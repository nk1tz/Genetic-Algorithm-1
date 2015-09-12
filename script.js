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
// console.log( generateNewName(nameTarget.length) );


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
// console.log(scores);

//Breed the current population to make next generation using scores as probability of reproducion.

//Choose two individuals randomly using scores as weights
//First we inverte the weight map using a little trick: (2 x average - score)/sum
var sumOfScores = scores.reduce(function(a, b) {
    return a + b;
});

//This is the weight inversion function : (2 x average - score)/sum
var averageScore = sumOfScores / currentPopulation.length;
function invertWeight(originalWeight){
    return (2 * averageScore - originalWeight)/sumOfScores;
}
//this following array represents the weighted probabilities of mating based on a 0 to 1 scale.
var probabilityOfMating = scores.map( invertWeight );

//this following array represents the ranges between 0 and 1 that each individual represents. Used for direct random selection.
var thresholdsOfProbability = [probabilityOfMating.length];
for(var i = 0; i < probabilityOfMating.length; i++){ 
    if(i === 0){
         thresholdsOfProbability[i] = probabilityOfMating[i];
    } else {
        thresholdsOfProbability[i] = probabilityOfMating[i] + thresholdsOfProbability[i-1];
    }
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


//Time to generate the nextPopulation array.
var nextPopulation = [];

function generateNextPop(){
    for(var i in currentPopulation){
        //Now actually choose two individuals
        var mate1 = chooseMate();
        var mate2 = chooseMate();
        var baby = makeBaby(mate1,mate2);
        nextPopulation.push(baby);
    }
}

generateNextPop();
console.log(nextPopulation);

//nextPopulation becomes currentPopulation
currentPopulation = nextPopulation;
console.log(currentPopulation);