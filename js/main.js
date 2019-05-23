//añadir como tercer parámetro 'asc' o 'desc' para ordenar
/* var playlist = sortJSON(playlistOriginal, 'singer'); */




function init() {

    var playlist = [{
            singer: 'Those Dancing days',
            duration: '2:57',
            song: 'Fuckarias',
            src: '/audio/song1.mp3',
            sonando: false
        }, {
            singer: 'Billie Eilish',
            duration: '3:25',
            song: 'Bad Guy',
            src: '/audio/song2.mp3',
            sonando: false
        }, {
            singer: 'Franz Ferdinand',
            duration: '3:16',
            song: 'Take me out',
            src: '/audio/song3.mp3',
            sonando: false
        }, {
            singer: 'Xoel Lopez',
            duration: '3:53',
            song: 'Que no',
            src: '/audio/song4.mp3',
            sonando: false
        },
        {
            singer: 'Those Dancing days',
            duration: '2:57',
            song: 'Fuckarias',
            src: '/audio/song1.mp3',
            sonando: false
        }, {
            singer: 'Billie Eilish',
            duration: '3:25',
            song: 'Bad Guy',
            src: '/audio/song2.mp3',
            sonando: false
        }, {
            singer: 'Franz Ferdinand',
            duration: '3:16',
            song: 'Take me out',
            src: '/audio/song3.mp3',
            sonando: false
        }, {
            singer: 'Xoel Lopez',
            duration: '5:55',
            song: 'Que no',
            src: '/audio/song4.mp3',
            sonando: false
        }
    ]

    let cancionActual = 0;
    const player = document.getElementById('audio');
    const play = document.getElementById('play');
    const pause = document.getElementById('pause');
    const next = document.getElementById('next');
    const back = document.getElementById('back');
    const random = document.getElementById('random'); //esto es el checkbox
    const randomBtn = document.getElementById('randomBtn');
    const repeat = document.getElementById('repeat'); //esto es el checkbox
    const repeatBtn = document.getElementById('repeatBtn');
    const volumeup = document.getElementById('volumeup');
    const volumedown = document.getElementById('volumedown');

    pintarVolumen();
    pintarTiempo();
    pintarLista(playlist);

    //SETEA LA PRIMERA CANCION
    player.setAttribute('src', playlist[cancionActual].src);

    play.addEventListener('click', () => {
        play.classList.add('hide');
        pause.classList.remove('hide');
        audio.play();
    });

    pause.addEventListener('click', () => {

        pause.classList.add('hide');
        play.classList.remove('hide');
        audio.pause();
    });

    next.addEventListener('click', () => {
        cancionActual++;
        player.removeAttribute('src');
        if (cancionActual > (playlist.length) - 1) {
            cancionActual = 0;
        }

        if (repeat.checked === true) {
            cancionActual--;
            player.setAttribute('src', playlist[cancionActual].src);
        } else {
            player.setAttribute('src', playlist[(cancionActual)].src);
        }

        if (random.checked === true) {
            let aleatorySong = Math.floor((Math.random() * playlist.length));
            cancionActual = aleatorySong;
            player.removeAttribute('src');
            player.setAttribute('src', playlist[cancionActual].src);
            audio.play();
        }

        audio.play();

    });

    back.addEventListener('click', () => {
        cancionActual--;
        if (cancionActual < 0) {
            cancionActual = 0;
        }
        player.removeAttribute('src');
        player.setAttribute('src', playlist[cancionActual].src);
        audio.play();
    });

    //CHECK A RANDOM Y REPEAT
    randomBtn.addEventListener('click', () => {
        random.checked = !random.checked;
    });
    repeatBtn.addEventListener('click', () => {
        repeat.checked = !repeat.checked;
    });

    //SUBE Y BAJA VOLUMEN
    volumedown.addEventListener('click', () => {
        let newVolume = audio.volume + 0.1;
        if (newVolume > 1) {
            newVolume = 1;
        }
        audio.volume = newVolume;
        pintarVolumen(newVolume);
    });

    volumeup.addEventListener('click', () => {
        var newVolume = audio.volume - 0.1;
        if (newVolume < 0) {
            newVolume = 0;
        }
        audio.volume = newVolume;
        pintarVolumen(newVolume);
    });

    //PINTA RANGE VOLUMEN Y TIEMPO
    audio.addEventListener("timeupdate", pintarTiempo);
    audio.addEventListener("timeupdate", tiempoTranscurrido);
    audio.addEventListener("timeupdate", tiempoRestante);
    audio.addEventListener("timeupdate", pintarHover);




    function pintarHover() {
        const lis = document.getElementsByClassName('cancionSonando');
        for (let i = 0; i < lis.length; i++) {
            lis[i].classList.remove('hover');
        }
        let lihover = lis[cancionActual];
        lihover.classList.add('hover');
    }

    function pintarLista(canciones) {
        const lista = document.getElementById('list');

        for (let i = 0; i < canciones.length; i++) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            const span1 = document.createElement("span");
            const span2 = document.createElement("span");
            const button1 = document.createElement("button");
            const button2 = document.createElement("button");
            li.setAttribute('class', 'cancionSonando');
            button1.setAttribute('class', 'subir');
            button2.setAttribute('class', 'bajar');
            button1.innerHTML = [i];
            button2.innerHTML = [i];
            button1.addEventListener('click', upDown);
            button2.addEventListener('click', upDown);
            a.innerText = canciones[i].singer;
            a.setAttribute('id', [i]);
            a.addEventListener('click', songSelector, false);

            span1.innerText = canciones[i].duration;
            span2.innerText = canciones[i].song;
            li.append(a);
            li.append(span1);
            li.append(span2);
            li.appendChild(button1);
            li.appendChild(button2);
            lista.appendChild(li);
        }
    }

    function songSelector() {
        var cancionElegida = event.target.id;
        player.removeAttribute('src');
        player.setAttribute('src', playlist[cancionElegida].src);
        play.classList.add('hide');
        pause.classList.remove('hide');
        audio.play();
    }

    function upDown() {
        const subir = document.getElementsByClassName('subir');
        const bajar = document.getElementsByClassName('bajar');
        const playlistPosition = parseInt(event.target.innerHTML);
        const playlistMove = event.target.classList.value;

        if (playlistMove === 'subir' && playlistPosition > 0) {
            const eliminado = playlist.splice(playlistPosition, 1);
            playlist.splice(playlistPosition - 1, 0, eliminado[0]);
            borrarLista();
            pintarLista(playlist);
        }

        if (playlistMove === 'bajar' && playlistPosition < playlist.length) {
            const eliminado = playlist.splice(playlistPosition, 1);
            playlist.splice(playlistPosition + 1, 0, eliminado[0]);
            borrarLista();
            pintarLista(playlist);
        }

    }

    function borrarLista() {
        const lista = document.getElementById('list');
        lista.innerHTML = '<li>Random selection</li>';
    }

} //FIN DE INIT


function tiempoTranscurrido() {
    if(random.checked){
        const randomBtn = document.getElementById('randomBtn');
        randomBtn.classList.remove('semitransparent');   
    }
    else{
        randomBtn.classList.add('semitransparent');  
    }

    if (audio.currentTime === audio.duration && repeat.checked === true) {
        player.removeAttribute('src');
        player.setAttribute('src', playlist[cancionActual].src);
        audio.play();
    } else if (audio.currentTime === audio.duration && repeat.checked === false && random.checked === false) {
        cancionActual++;
       
       
        if (cancionActual > (playlist.length) - 1) {
            cancionActual = 0;
        }
        player.removeAttribute('src');
        player.setAttribute('src', playlist[cancionActual].src);
        audio.play();
    } else if (audio.currentTime === audio.duration && random.checked === true) {
        let aleatorySong = Math.floor((Math.random() * playlist.length));
        cancionActual = aleatorySong;
        player.removeAttribute('src');
        player.setAttribute('src', playlist[cancionActual].src);
        audio.play();
    }
    const tiempopasado = document.getElementById('tiempopasado');
    tiempopasado.innerHTML = '0:00';
    tiempopasado.innerHTML = SegundosAminutos(audio.currentTime);
}

function tiempoRestante() {
    const restante = document.getElementById('restante');
    let duracion = audio.duration;
    if (isNaN(duracion)) {
        duracion = 0;
    }
    let posicion = audio.currentTime;
    rest = parseInt((duracion - posicion));

    restante.innerHTML = SegundosAminutos(rest);
}

function SegundosAminutos(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));
    if (sec < 10) {
        sec = "0" + sec;
    }
    var tiempo = min + ':' + sec;
    return tiempo;
}

function pintarVolumen() {
    var VolumeBar = document.getElementById('volumebar');
    VolumeBar.style.width = (audio.volume * 100) + '%';
}

function pintarTiempo() {
    var timeBar = document.getElementById('audiobar');
    timeBar.style.width = ((audio.currentTime / 100) * audio.duration) + 'px';
    var tiempo = (audio.currentTime / audio.duration) * 100;
    timeBar.style.width = (tiempo - 24) + '%';
}

function sortJSON(data, key, orden) {
    return data.sort(function (a, b) {
        var x = a[key],
            y = b[key];

        if (orden === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        if (orden === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        }
    });
}

window.onload = init;