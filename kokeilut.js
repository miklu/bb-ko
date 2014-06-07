
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
