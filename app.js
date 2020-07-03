/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var rezultat, rezrunde, aktivni, igra;

pocetak();

var roll1, reset;

// uhvacamo gumb roll i dajemo mu dogadaj kada se klikne
document.querySelector('.btn-roll').addEventListener('click', function()
{
    if(igra)
    {
        // za random vrijednost
        var randomdice = Math.floor(Math.random() * 6) + 1;

        // da ispise u konzoli
        // console.log(roll1);

        // varijabla je selektiran html preko klase
        var slikakocke = document.querySelector('.dice');

        // zadajemo stil
        slikakocke.style.display = 'block';

        // zadajemo html src iz varijable randomdice (neki broj)
        slikakocke.src = 'dice-' + randomdice + '.png';

        // ako rolla 2 x 6
        if(randomdice === 6 && roll1 === 6)
        {
            // resetiranje glavnog rezultata od aktivnog player-a
            rezultat[aktivni] = 0;
            // uhvati html element i stavi vrijednost na 0
            document.querySelector('#score-' + aktivni).textContent = '0';
            // funkcija iduciIgrac
            iduciIgrac();
            // varijabla reset da se roll1 stavi opet na null vidi dolje
            var reset = false;   
        }
        // ako nije rollao 1
        else if(randomdice !== 1)
        {
            // rezrunde = rezrunde + randomdice
            rezrunde += randomdice;

            //u html element po id-u dodaj text koji sadrži rezrunde
            document.querySelector('#current-' + aktivni).textContent = rezrunde;
        }
        else
        {
            // funkcija iduciIgrac() vidi dolje
            iduciIgrac();
        }

        // ako je rollao 6 i reset je na false stavi roll1 na null RESETIRANJE
        if(randomdice === 6 && reset === false)
        {
            roll1 = null;  
        }
        //ako je rollao samo 6 i "reset je true" roll1 je 6 (za prvo rollanje)
        else if(randomdice === 6)
        {
            roll1 = randomdice;
        }
        else
        {
            roll1 = null;
        }

    }
          
});

// uhvacamo gumb hold i dajemo mu dogadaj kada se klikne
document.querySelector('.btn-hold').addEventListener('click', function()
{
    if(igra)
    {
        // rezultat[aktivni] = rezultat[aktivni] + rezrunde
        rezultat[aktivni] += rezrunde;
        // uhvati html element i daj mu tekst od reda gore
        document.querySelector('#score-' + aktivni).textContent = rezultat[aktivni];
        
        // varijabla roll1 je null da se resetira na novom igraću
        roll1 = null;
        
        // varijabla input je vrijednost iz html-a input
        var input = document.getElementById('winscore').value;

        // ako je ubaćeno u input
        if(input)
        {
            // varijabla winscore je vrijednost iz inputa
            var winscore = input
        }
        // ako nije ubaćeno
        else
        {
            // varijabla winscore je 100
            winscore = 100;
        }

        // ako je retultat od aktivnog igraća >= varijabli winscore
        if(rezultat[aktivni] >= winscore)
        {
            // promjeni naziv u winner
            document.querySelector('#name-' + aktivni).textContent = 'winner';

            // ne prikaži kocku
            document.querySelector('.dice').style.display = 'none';

            //makni css class-u active
            document.querySelector('.player-' + aktivni + '-panel').classList.remove('active');

            //dodaj css class-u winner
            document.querySelector('.player-' + aktivni + '-panel').classList.add('winner');

            // igru stavi na false (zablokiraj)
            igra = false;

        }
        // ako nije
        else
        {
            // funkcija iduciIgrac
            iduciIgrac();
        }

    }

});

function iduciIgrac()
{
        //ako je varijabla aktivni 0
        if(aktivni === 0)
        {

            // varijabla aktivni pretvori u 1
            aktivni = 1;
            // varijablu rezrunde stavi na 0
            rezrunde = 0;
            // uhvati preko id-a html i daj mu text '0'
            document.getElementById('current-0').textContent = '0';
            // makni mu css stil active
            document.querySelector('.player-0-panel').classList.remove('active');
            // daj mu css stil active
            document.querySelector('.player-1-panel').classList.add('active'); 
    
        }
        else //inace
        {
            
            // varijabla aktivni pretvori u 0
            aktivni = 0;
            // varijablu rezrunde stavi na 0
            rezrunde = 0;
            // uhvati preko id-a html i daj mu text '0'
            document.getElementById('current-1').textContent = '0';
            // makni mu css stil active
            document.querySelector('.player-1-panel').classList.remove('active');
            // daj mu css stil active
            document.querySelector('.player-0-panel').classList.add('active');

        }

};

document.querySelector('.btn-new').addEventListener('click', pocetak);

function pocetak()
{
        //ukupni rezultat
        rezultat = [0, 0];

        // rezultat runde
        rezrunde = 0;
    
        // aktivnoi igrač 0 i 1
        aktivni = 0;
    
        // za kraj igre da se moze staviti false i da je kraj
        igra = true;

        roll1 = null;

        // da ne prikaze sliku kockice
        document.querySelector('.dice').style.display = 'none';

        // da stavi score na 0
        document.querySelector('#score-0').textContent = '0';

        // da stavi score na 0
        document.querySelector('#score-1').textContent = '0';

        // da stavi score runde na 0
        document.querySelector('#current-0').textContent = '0';

        // da stavi score runde na 0
        // document.querySelector('#current-1').innerHTML = '<em> 0 </em>'; umetanje html-a
        document.querySelector('#current-1').textContent = '0';

        document.querySelector('#name-0').textContent = 'Player 1';

        document.querySelector('#name-1').textContent = 'Player 2';

        document.querySelector('.player-0-panel').classList.remove('winner');

        document.querySelector('.player-1-panel').classList.remove('winner');

        document.querySelector('.player-0-panel').classList.remove('active');

        document.querySelector('.player-1-panel').classList.remove('active');

        document.querySelector('.player-0-panel').classList.add('active');
}