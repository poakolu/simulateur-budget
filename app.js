// Stockage des journées et clé de sauvegarde
let journalEntries = [];
const STORAGE_KEY = 'rapportStageData';

// ===================================
// GESTION DE LA SAUVEGARDE (Local Storage)
// ===================================

function saveData() {
    const data = {
        studentName: document.getElementById('studentName').value,
        companyName: document.getElementById('companyName').value,
        tutorName: document.getElementById('tutorName').value,
        introText: document.getElementById('introText').value,
        companyText: document.getElementById('companyText').value,
        conclusionText: document.getElementById('conclusionText').value,
        journal: journalEntries // Sauvegarde le tableau d'entrées
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        const data = JSON.parse(storedData);
        document.getElementById('studentName').value = data.studentName || '';
        document.getElementById('companyName').value = data.companyName || '';
        document.getElementById('tutorName').value = data.tutorName || '';
        document.getElementById('introText').value = data.introText || '';
        document.getElementById('companyText').value = data.companyText || '';
        document.getElementById('conclusionText').value = data.conclusionText || '';
        
        // Reconstitution du journal
        journalEntries = data.journal || [];
        renderJournal();
    }
}

// ===================================
// ÉVÈNEMENTS & LOGIQUE APPLICATIVE
// ===================================

// Charger les données et lier les événements de sauvegarde
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    document.querySelectorAll('input, textarea').forEach(el => {
        // Sauvegarde tous les champs sauf ceux pour ajouter une entrée journalière
        if (el.id !== 'dayDate' && el.id !== 'dayActivity' && el.id !== 'dayPhoto') {
            el.addEventListener('input', saveData);
        }
    });
});

function showSection(id) {
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    const ids = ['infos', 'intro', 'entreprise', 'journal', 'bilan', 'export'];
    const index = ids.indexOf(id);
    if(index !== -1) {
        document.querySelectorAll('.nav-btn')[index].classList.add('active');
    }
}

function addJournalEntry() {
    const date = document.getElementById('dayDate').value;
    const activity = document.getElementById('dayActivity').value;
    const photo = document.getElementById('dayPhoto').value;

    if (!date || !activity) {
        alert("Remplis au moins la date et l'activité !");
        return;
    }

    journalEntries.push({ date, activity, photo });

    document.getElementById('dayDate').value = "";
    document.getElementById('dayActivity').value = "";
    document.getElementById('dayPhoto').value = "";

    renderJournal();
    saveData(); // Sauvegarder après l'ajout d'une entrée
}

function renderJournal() {
    const list = document.getElementById('journalList');
    list.innerHTML = "";

    if (journalEntries.length === 0) {
        list.innerHTML = '<p style="color:#9ca3af; font-style:italic;">Aucune journée ajoutée pour l\'instant.</p>';
        return;
    }

    journalEntries.forEach((entry, index) => {
        let photoHtml = entry.photo ? `<div class="photo-tag">📸 A insérer : ${entry.photo}</div>` : "";
        
        list.innerHTML += `
            <div class="day-card">
                <button class="delete-btn" onclick="deleteEntry(${index})">X</button>
                <h4>${entry.date}</h4>
                <p>${entry.activity}</p>
                ${photoHtml}
            </div>
        `;
    });
}

function deleteEntry(index) {
    journalEntries.splice(index, 1);
    renderJournal();
    saveData(); // Sauvegarder après la suppression
}

function generateReport() {
    const name = document.getElementById('studentName').value;
    const company = document.getElementById('companyName').value;
    const tutor = document.getElementById('tutorName').value;
    const intro = document.getElementById('introText').value;
    const companyDesc = document.getElementById('companyText').value;
    const conclusion = document.getElementById('conclusionText').value;

    // Formater le journal
    let journalText = "";
    journalEntries.forEach(entry => {
        journalText += `\n📅 ${entry.date.toUpperCase()}\n`;
        journalText += `-------------------\n`;
        journalText += `${entry.activity}\n`;
        if (entry.photo) {
            journalText += `\n[ !!! INSÉRER PHOTO ICI : ${entry.photo} !!! ]\n`;
        }
        journalText += `\n`;
    });

    if (journalText === "") journalText = "(Aucune journée enregistrée)";

    const fullText = `
RAPPORT DE STAGE
========================================
Stagiaire : ${name}
Entreprise : ${company}
Tuteur : ${tutor}
========================================

I. INTRODUCTION
----------------------------------------
${intro}

II. PRÉSENTATION DE L'ENTREPRISE
----------------------------------------
${companyDesc}

III. JOURNAL DE BORD (ACTIVITÉS JOUR PAR JOUR)
----------------------------------------
${journalText}

IV. BILAN ET CONCLUSION
----------------------------------------
${conclusion}
    `;

    const outputDiv = document.getElementById('final-output');
    outputDiv.innerText = fullText;
    outputDiv.style.display = 'block';
    document.getElementById('copyBtn').style.display = 'inline-block';
}

function copyText() {
    const text = document.getElementById('final-output').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Texte copié ! Colle-le dans Word et remplace les balises [PHOTO] par tes images.");
    });
}
    }]
  };

  if (window.budgetChart) window.budgetChart.destroy();
  window.budgetChart = new Chart(ctx, {
    type: 'pie',
    data: data
  });
}
