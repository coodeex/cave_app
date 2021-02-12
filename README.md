<h1 align="center">Brewery accounting full stack application</h1>
<br>

This app can be used to keep track of products used in beer making
<br>
In addition to that app can also keep track of batches and calculate the price of one bottle
<br>
It uses token based login so that only admins can add products and batches
<br>
Below you can see which features are already done (ok)

<pre>

Vaatimuksia frontille mm.
	Etusivulla ei paljon mitään muuta kuin kirjautuminen sisään
	Kun kirjautunut, niin käyttäjä voi lisätä tuotteita, joita on ostanut
		ja lisätä valmistettuja eriä

ok	Tuotteiden lisäyksessä input formi, jossa kohdat nimi, hinta ja paino



BACKEND

status	action

	tietokantaan 
ok		lisätä tuotteita(products) joilla on nimi, hinta ja paino
		lisätä valmistettuja eriä(batches), joissa on listattu käytettyjen tuotteiden nimet ja painot
		kun erä lisätään, niin lasketaan litrahinta ja vähennetään tietokannasta käytetyt ainekset
		pitää kirjaa tehdyistä muutoksista
		
	tietokannasta 
ok		saada kaikki tuotteet
ok		saada yksittäinen tuote id:n perusteella
ok		muokata yksittäisen tuotteen painoa
ok		poistaa tuotteita
		saada kaikki erät
		saada yksittäinen erä id:n perusteella
		muokata yksittäisen erän tietoja
		poistaa eriä

FRONTEND
	lähettää bäkkäriin
ok		tuotteita(products) joilla on nimi, hinta ja paino
ok		tuotteiden uusia painoja(mitä on jäljellä, kun on käytetty)		
		valmistettuja eriä(batches), joissa on listattu käytettyjen tuotteiden nimet ja painot sekä ylimääräiset kulut
			myös kuvia ja muistiinpanoja
	
	näyttää käyttäjälle
		login
		tuotteet joita on jäljellä
		tietoa valmiista eristä
		



frontend jatkuu siitä että lisätään mahdollisuus lisätä uusi erä(batch)
Eli käytännössä koodaillaan batchform ja lisätään se Appiin johon tulee myös statet inputeille

</pre>
