
const jour = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
let dernierCours = null;
const emploiTemps = {

    lundi: ["Terminaux mobile", "Pause", "Modélisation Orienté Objet", "Base de donnée et SQL"],
    mardi: ["Mathématiques", "Pause", "Programmation Web", "Programmation Web"],
    mercredi: ["Programmation evenementielle", "Pause", "Systeme d'exploitation", "Systeme d'exploitation"],
    jeudi: ["Structure de données", "Pause", "Réseaux et TéléInformatique", "Réseaux et TéléInformatique"],
    vendredi: ["Mathématiques", "Pause", "Modélisation Orienté Objet", "Administration Systeme"],
    samedi: ["Travaux dirigées", "Pause", "Travaux dirigées", "oki c'est bon"]

};

const horaires = [
    { debut: 8, fin: 12, index: 0 },
    { debut: 12, fin: 13, index: 1 },
    { debut: 13, fin: 15, index: 2 },
    { debut: 15, fin: 17, index: 3 }
];


//l'heure et date actuelle 
function dateTime() {

    const now = new Date();

    const option = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const date = now.toLocaleDateString('fr-FR', option);
    const time = now.toLocaleTimeString('fr-FR', { hour12: false });

    document.getElementById('date').textContent = `${date} ${time}`;

}

//le temps augmente tout les 1s
setInterval(dateTime, 1000);
//appel de la date
dateTime();

//matiere actuelle 

function courActu() {
    const maintenant = new Date();
    const heureACt = maintenant.getHours();
    const jourAct = maintenant.toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();

    const horairesActuel = horaires.find(horaire => heureACt >= horaire.debut && heureACt < horaire.fin);

    if (horairesActuel && emploiTemps[jourAct]) {
        const matiere = emploiTemps[jourAct][horairesActuel.index];
        document.getElementById('matiere').textContent = `Cours actuel: ${matiere}`;

        // Jouer le bip à chaque changement de cours ou de pause
        if (dernierCours !== matiere) {
            playBeep();
            dernierCours = matiere;
        }
    } else {
        document.getElementById('matiere').textContent = "Pas de cours en ce moment.";
    }
}


setInterval(courActu, 60000);
courActu();


function playBeep() {

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(1300, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 15);
}
