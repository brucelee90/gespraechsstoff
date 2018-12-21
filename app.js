window.onload = function () {



            var elems = document.getElementById('frage');
            var newDIV = document.createElement("div");
            elems.appendChild(newDIV)
            var instances = M.Carousel.init(elems,{fullWidth: true});
}


let eMail = 'leeklopfers@gmx.de'

// catID wird als globale Variable gesetzt
catID = ''

// document.getElementById('button').addEventListener('click', frageGenerieren)
// document.getElementById('category').innerHTML = `Zunächst muss eine Kategorie aus dem Menü gewählt werden `
let list = document.getElementById('list')

// Array mit allen erlaubten Werten erstellen
list.addEventListener('click', getCategory)

function getCategory(e)

{
        catID = e.target.id
        XHR = new XMLHttpRequest();
        switch (catID)
        {
            case 'norm':
                XHR.open('GET', 'gespraechsstoff_norm.json', true)
                break;
            case 'pers':
                XHR.open('GET', 'gespraechsstoff_pers.json', true)
                break;
            case 'smal':
                XHR.open('GET', 'gespraechsstoff_smal.json', true)
                break;
            case undefined:
                document.getElementById('category').innerHTML = `Um Gesprächsstoff zu laden, muss ein Kategorie gewählt werden `
                break;
        }

        if (XHR.readyState === 1) 
        {
            XHR.onload = function () 
            {
                if (this.status === 200) 
                {
                    fragenArr = JSON.parse(this.responseText)
                    let length = fragenArr.length

                    // Array mit erlaubten Zahlen generieren; allowedNums hat globalScope
                    allowedNums = erlaubteZahlenArr(fragenArr)

                    frageGenerieren()
                }

            }
            XHR.send()
        }
    
}

function frageGenerieren() {

    if (allowedNums.length > 0)
    {
        // Alle bestehenden slides löschen, bevor die neuen dazu kommen
        document.querySelectorAll('.carousel-item').forEach(function(a) 
        {
            a.remove()
        })
    
        for (let i = 0; i < allowedNums.length; i++) 
        {

            // Um in die Überschrift jeder Karte "Frage 1" etc. hochzuzählen muss die aktuelle Zeilennummer um einshochgezählt werden
            let j = i+1
            objFrage = fragenArr[i]
            frage = objFrage.frage
            var elems = document.getElementById('frage');
            var newDIV = document.createElement("div");
            newDIV.className = "carousel-item"
            newDIV.innerHTML = `<h1>Frage ${j}</h1><p>${frage}</p>`
            elems.appendChild(newDIV)
            // var elems = Array.prototype.slice.call(document.querySelectorAll('.carousel'))
            var instances = M.Carousel.init(elems,{fullWidth: true});

        }
 
    }
}

function erlaubteZahlenArr(array) {
    let i
    let allowedNumsArr = []

    for (i = 0; i < array.length; i ++) 
    {
        allowedNumsArr[i] = i;
    }

    array = shuffle(allowedNumsArr)
    return array
}

// Inhalte des Arrays shufflen. Funktion wurde nur kopiert
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }