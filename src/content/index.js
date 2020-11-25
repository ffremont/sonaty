document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {dismissible:false});
    window.resModal = instances[0];
  });

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

(function () {
    let items = [], item = null, level = 1, playing = false;
    fetch('/items.json')
        .then(d => d.json())
        .then(i => items = i);

    /**
     *  Joue un item
     * @param {*} i 
     */
    const play = (i) => {
        if(playing) return;
        playing = true;

        return new Howl({
            src: [i.sound],
            autoplay: true,
            loop: false,
            volume: 1,
            onend: () => playing = false
          });
    }

    window.onChangeLevel = () => {
        document.getElementById('actions').classList.remove("running");
        level = parseInt(ocument.getElementById('level').value,10);
    }
    window.start = () => {
        shuffle(items);
        item = items.filter(i => i.level === level)[0];
        document.getElementById('actions').classList.add("running");
     
        play(item);
    }

    window.again = () => {
        play(item);
    }
    window.found = () => {
        
        document.getElementById('response').innerHTML=item.frLabel;
        resModal.open();
        //shuffle(items);
        //item = items.filter(i => i.level === level)[0];

        //play(item);
    }
})();