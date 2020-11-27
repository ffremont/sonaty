document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {
        dismissible: false
    });
    window.resModal = instances[0];
});

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

(function () {
    let items = [],
        item = null,
        level = 1,
        itemsPlayed = [],
        autoStopSound = null,
        oHowl = null;
    fetch('/data.json')
        .then(d => d.json())
        .then(data => items = data.items);


    const stopSound = () => {
        if (oHowl){
            oHowl.stop();
            oHowl = null;
        }
        if(autoStopSound)
            clearTimeout(autoStopSound);
    }

    /**
     *  Joue un item
     * @param {*} i 
     */
    const play = (i) => {
        stopSound();

        oHowl = new Howl({
            src: [i.sound],
            autoplay: true,
            loop: false,
            volume: 1,
            onend: () => {stopSound()}
        });

        autoStopSound = setTimeout(() => {
            stopSound();
        }, 6000);        
    }

    window.onChangeLevel = () => {
        document.getElementById('actions').classList.remove("running");
        level = parseInt(document.getElementById('level').value, 10);
    }
    window.start = () => {
        itemsPlayed = [];
        document.getElementById('actions').classList.add("running");
        window.next();
    }

    window.again = () => {
        play(item);
    }
    window.found = () => {
        document.getElementById('response').innerHTML = item.frLabel;
        document.getElementById('img-response').setAttribute('src',item.image);
        resModal.open();
    }

    window.next = () => {
        
        shuffle(items);
        playedLabels = itemsPlayed.map(i => i.frLabel);
        const reste = items.filter(i => i.level === level).filter(i => playedLabels.indexOf(i.frLabel) === -1 );
        if(reste.length){
            item = reste[0];
            play(item);
            itemsPlayed.push({...item});
        }            
        else{
            alert('Partie terminée');
            window.stop(true);
        }  
    }

    window.stop = (force) => {
        if(!force){
            if(confirm('Voulez-vous arrêter la partie en cours ?')){
                stopSound();
                document.getElementById('actions').classList.remove("running");
            }
        }else{
            stopSound();
            document.getElementById('actions').classList.remove("running");
        }        
    }
})();