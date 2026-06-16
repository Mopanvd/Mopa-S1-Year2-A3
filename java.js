// 1. Prepare game data with 9 images (3 cities, 3 images per city)
const gameData = [
    { id: 1, city: 'Beijing', img: 'Beijing1.jpg' }, // Beijing landmark
    { id: 2, city: 'Beijing', img: 'Beijing2.jpg' },
    { id: 3, city: 'Beijing', img: 'Beijing3.jpg' },
    { id: 4, city: 'Shanghai', img: 'Shanghai1.jpg' }, // Shanghai landmark
    { id: 5, city: 'Shanghai', img: 'Shanghai2.jpg' },
    { id: 6, city: 'Shanghai', img: 'Shanghai3.jpg' },
    { id: 7, city: 'Chongqing', img: 'Chongqing1.jpg' }, // Chongqing landmark
    { id: 8, city: 'Chongqing', img: 'Chongqing2.jpg' },
    { id: 9, city: 'Chongqing', img: 'Chongqing3.jpg' }
];

let draggedItem = null;

// 2. Shuffle algorithm (randomly shuffle array)
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 3. Initialize game
function initGame() {
    const gridContainer = document.getElementById('imageGrid');
    const shuffledData = shuffle([...gameData]);

    // Generate 3x3 grid of images
    shuffledData.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('img-card');
        card.setAttribute('draggable', 'true');
        // Bind correct answer to the card
        card.dataset.city = item.city; 

        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.city;
        img.draggable = false;

        card.appendChild(img);
        gridContainer.appendChild(card);

        // Listen for drag start event on card
        card.addEventListener('dragstart', function(e) {
            draggedItem = this;
            e.dataTransfer.effectAllowed = 'move';
            this.style.opacity = '0.5';
        });

        // Listen for drag end event
        card.addEventListener('dragend', function() {
            this.style.opacity = '1';
            draggedItem = null;
        });
    });

    // 4. Bind drag and drop events to city tags
    const cityTags = document.querySelectorAll('.city-tag');
    const messageBox = document.getElementById('message');

    cityTags.forEach(tag => {
        // When dragged item enters the zone
        tag.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('hover');
        });

        // When dragged item leaves the zone
        tag.addEventListener('dragleave', function() {
            this.classList.remove('hover');
        });

        // When dragged item is dropped
        tag.addEventListener('drop', function() {
            this.classList.remove('hover');
            if (!draggedItem) return;

            const correctCity = draggedItem.dataset.city;
            const targetCity = this.dataset.city;

            // Check if answer is correct
            if (correctCity === targetCity) {
                messageBox.textContent = "Correct! 🎉";
                messageBox.className = "message correct";
                draggedItem.style.visibility = 'hidden';

                // Check if all items are classified
                const allHidden = Array.from(gridContainer.children).every(card => card.style.visibility === 'hidden');
                if (allHidden) {
                    messageBox.textContent = "Awesome! You completed all classifications! 👏";
                }
            } else {
                messageBox.textContent = "Wrong! Try again! ❌";
                messageBox.className = "message wrong";
            }
        });
    });
}

// Start the game
window.onload = initGame;