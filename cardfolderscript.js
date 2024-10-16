let currentPage = 0;
const pages = document.querySelectorAll('.page');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const navigation = document.getElementById('navigation');
const book = document.querySelector('.book');

// Buch öffnen
function openBook() {
    book.classList.toggle('open');
    // Karten nur anzeigen, wenn das Buch geöffnet ist
    if (book.classList.contains('open')) {
        updatePage();
        navigation.classList.add('active'); // Navigation aktivieren
        // Buchdeckel animieren
        book.querySelector('.cover-left').style.transform = 'rotateY(-180deg)';
        book.querySelector('.cover-right').style.transform = 'rotateY(180deg)';
    } else {
        navigation.classList.remove('active'); // Navigation deaktivieren
        // Buchdeckel zurücksetzen
        book.querySelector('.cover-left').style.transform = 'rotateY(0deg)';
        book.querySelector('.cover-right').style.transform = 'rotateY(0deg)';
    }
}

// Seiten aktualisieren
function updatePage() {
    pages.forEach((page, index) => {
        page.classList.remove('active');
        if (index === currentPage) {
            page.classList.add('active');
        }
    });
    // Buttons aktivieren/deaktivieren
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === pages.length - 1;
}

// Seitenwechsel nach links
function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updatePage();
    }
}

// Seitenwechsel nach rechts
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updatePage();
    }
}

// Initiales Update beim Laden der Seite
updatePage();