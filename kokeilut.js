
// Tarkista onko validi numero
console.log(isFinite(2));

// Poista item arraysta käyttäen sliceä
var items = [12, 1, 2, 3, 7, 5];
console.log(items.length);
items.splice(4,1);
console.log(items);

// Maksimi ja minimi arraystä
var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411]; 
var maxInNumbers = Math.max.apply(Math, numbers); 
var minInNumbers = Math.min.apply(Math, numbers);
console.log(maxInNumbers);
console.log(minInNumbers);


// Muuttaa väriä palautusprosentin mukaan
function arvostele (arvo) {
	
	var kuvaus;

	switch(true) {

		case isNaN(arvo):
			kuvaus = "Ei ole numero";
			break;

		case (arvo > 100):
			kuvaus = "Voitolla";
			break;

		case (arvo >= 75 && arvo < 100):
			kuvaus = "Hyvä";
			break;

		case (arvo >= 50 && arvo < 75):
			kuvaus = "Kelpo";
			break;

		case (arvo >= 50 && arvo < 75):
			kuvaus = "Huono";
			break;

		case (arvo < 50):
			kuvaus = "Surkea";
			break;

	}

	return kuvaus;
}

console.log(arvostele(49));


// Kombinaatio
function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;
	
	if (k > set.length || k <= 0) {
		return [];
	}
	
	if (k == set.length) {
		return [set];
	}
	
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	
	// Assert {1 < k < set.length}
	
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i+1);
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

console.log(k_combinations(['a', 'b', 'c', 'd'],2));


// Kaikki kombinaatiot
function combinations(set) {
	var k, i, combs, k_combs;
	combs = [];
	
	// Calculate all non-empty k-combinations
	for (k = 1; k <= set.length; k++) {
		k_combs = k_combinations(set, k);
		for (i = 0; i < k_combs.length; i++) {
			combs.push(k_combs[i]);
		}
	}
	return combs;
}


