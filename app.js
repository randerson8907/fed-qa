async function fetchQuestions() {
    const questionUl = document.querySelector('#question-list');

    const response = await fetch('https://reqres.in/api/users');
    const json = await response.json();

    json.data.forEach(q => {
        const newLi = document.createElement('li');
        const newHref = document.createElement('a');
        const linkText = document.createTextNode('Question ' + q.first_name);

        newHref.className = 'usa-link';
        newHref.href = 'question-detail.html';
        newHref.onclick = () => clickQuestion(q.id);

        newHref.appendChild(linkText);
        newLi.appendChild(newHref);
        questionUl.appendChild(newLi);
    });
}

function clickQuestion(questionId) {
    console.log(questionId);
    localStorage.setItem('questionId', questionId);
}

async function fetchSingleQuestion() {
    const questionId = localStorage.getItem('questionId');

    const response = await fetch('https://reqres.in/api/users/' + questionId);
    const json = await response.json();

    const questionDiv = document.querySelector('#question-detail');
    questionDiv.innerHTML = 'Question ID: ' + questionId + ', First Name: ' + json.data.first_name;
}

function askQuestion() {
    // TODO
}

function answerQuestion() {
    // TODO
}

function onCancelAsk() {
    window.location.href = 'index.html';
}

function toggleAnswerForm() {
    const answerForm = document.querySelector('#answer-form');
    answerForm.hidden = !answerForm.hidden;

    const toggleAnswerButton = document.querySelector('#toggle-answer-button');
    if (toggleAnswerButton.style.display === 'none') {
        toggleAnswerButton.style.display = 'block';
    } else {
        toggleAnswerButton.style.display = 'none';
    }
}
