const facts = [
    "YOUR BRAIN MOVES. That’s right, your brain is always changing. From about six weeks in the embryo until you die, your brain constantly changes connections and grows new cells.",
    "YOUR BRAIN GETS BORED. Once you’re familiar with a particular subject, your brain actually reduces blood flow to those areas. That leads to daydreaming, attention loss, and general apathy.",
    "YOUR CELLS CHANGE WHEN YOU LEARN STUFF. Learning new things actually helps your brain cells do things more efficiently by reinforcing the myelin sheath.",
    "SLEEP HELPS YOU REMEMBER THINGS. Losing sleep can actually lead to worse memory recall. That’s because your brain stores new info while you’re catching ZZZs.",
    "YOUR BRAIN ALSO HAS CELLS CALLED GLIA. Glia, Greek for glue, keep your nerve cells together. They also make your neuron cells more efficient.",
    "IT’S ALWAYS IN FLUX. Neuroplasticity is the fancy science word for how your brain changes. It doesn’t mean that your noggin is made out of plastic, but it does mean that your cells and their connections are always in flux.",
    "YOUR BRAIN ADAPTS TO DAMAGE. According to Sharpbrains, when you damage portions of your brain, it can re-learn the same tasks in different parts of the brain.",
    "THE THINGS YOU LEARN MAKE YOUR BRAIN GROW DIFFERENTLY. Scientists figured out that taxi drivers have a bigger hippocampus than bus drivers.",
    "THE BRAIN IS CONNECTED IN INTERESTING WAYS. Losing a certain sense can change your behavior in crazy and unpredictable ways.",
    "USE IT OR LOSE IT. Your brain never stops growing and changing. That means that your lifestyle can help make sure you preserve your mental acuity."
];

function startLoading() {
    const fact = facts[Math.floor(Math.random() * facts.length)];
    const loadingFactsDiv = document.getElementById('loading-facts');
    loadingFactsDiv.textContent = fact;
    setTimeout(() => {
        loadingFactsDiv.textContent = '';
        generateFlashcards(document.getElementById('notes-input').value);
    }, 3000);
}

function generateFlashcards(notes) {
    const flashcardContainer = document.getElementById('flashcard-container');
    flashcardContainer.innerHTML = '';
    const sentences = notes.split('.').filter(sentence => sentence.trim().length > 0);

    sentences.forEach(sentence => {
        const flashcard = document.createElement('div');
        flashcard.className = 'flashcard';

        const words = sentence.split(' ');
        const half = Math.ceil(words.length / 2);
        const front = words.slice(0, half).join(' ');
        const back = words.slice(half).join(' ');

        flashcard.innerHTML = `
            <div class="flashcard-front">${front}</div>
            <div class="flashcard-back">${back}</div>
        `;

        flashcardContainer.appendChild(flashcard);
    });
}

function generateMatchingActivity() {
    const matchingContainer = document.getElementById('matching-container');
    matchingContainer.innerHTML = '';
    const notes = document.getElementById('notes-input').value;
    const sentences = notes.split('.').filter(sentence => sentence.trim().length > 0);

    const terms = sentences.map(sentence => {
        const words = sentence.split(' ');
        return {
            term: words.slice(0, Math.ceil(words.length / 2)).join(' '),
            definition: words.slice(Math.ceil(words.length / 2)).join(' ')
        };
    });

    terms.forEach((term, index) => {
        const termDiv = document.createElement('div');
        termDiv.className = 'matching-term';
        termDiv.textContent = term.term;
        termDiv.dataset.index = index;

        const definitionDiv = document.createElement('div');
        definitionDiv.className = 'matching-definition';
        definitionDiv.textContent = term.definition;
        definitionDiv.dataset.index = index;

        matchingContainer.appendChild(termDiv);
        matchingContainer.appendChild(definitionDiv);
    });
}

function generateQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';
    const notes = document.getElementById('notes-input').value;
    const sentences = notes.split('.').filter(sentence => sentence.trim().length > 0);

    sentences.forEach((sentence, index) => {
        const words = sentence.split(' ');
        const question = words.slice(0, Math.ceil(words.length / 2)).join(' ');
        const answer = words.slice(Math.ceil(words.length / 2)).join(' ');

        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.textContent = Question ${index + 1}: ${question}...;

        const options = [answer, ...generateRandomOptions(sentences, answer)];
        shuffle(options);

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'quiz-options';
        
        options.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.onclick = () => alert(option === answer ? 'Correct!' : 'Incorrect.');
            optionsContainer.appendChild(optionButton);
        });

        quizContainer.appendChild(questionDiv);
        quizContainer.appendChild(optionsContainer);
    });
}

function generateRandomOptions(sentences, correctAnswer) {
    const options = sentences
        .map(sentence => sentence.split(' ').slice(Math.ceil(sentence.split(' ').length / 2)).join(' '))
        .filter(option => option !== correctAnswer);
    return options.slice(0, 3); // Limit to 3 random options
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
