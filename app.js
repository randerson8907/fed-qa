async function fetchQuestions() {
    const questionUl = document.querySelector('#question-list');

    // const response = await fetch('https://reqres.in/api/users');
    const response = await fetch('https://uhgwqthcj3.execute-api.us-east-1.amazonaws.com/CFStage/questions');
    const json = await response.json();

    // json.data.forEach(q => {
    json.body.forEach(q => {
        const newLi = document.createElement('li');
        const newHref = document.createElement('a');
        // const linkText = document.createTextNode('Question ' + q.first_name);
        const linkText = document.createTextNode(q.question_summary);

        newHref.className = 'usa-link';
        newHref.href = 'question-detail.html';
        // newHref.onclick = () => clickQuestion(q.id);
        newHref.onclick = () => clickQuestion(q.question_id);

        newHref.appendChild(linkText);
        newLi.appendChild(newHref);
        questionUl.appendChild(newLi);
    });
}


function clickQuestion(questionId) {
    localStorage.setItem('questionId', questionId);
}


async function fetchSingleQuestion() {
    const questionId = localStorage.getItem('questionId');

    const response = await fetch('https://uhgwqthcj3.execute-api.us-east-1.amazonaws.com/CFStage/questions');
    const json = await response.json();
    const question = json.body.find(q => q.question_id === questionId);

    const questionDiv = document.querySelector('#question-detail');
    const questionCard = createCard(question.question_summary, question.question_detail);
    questionDiv.appendChild(questionCard);

    const answersDiv = document.querySelector('#answer-list');
    if (question.answer) {
        question.answer.forEach(answer => {
            const answerCard = createCard('', answer);
            answersDiv.appendChild(answerCard);
        });
    } else {
        const answersSection = document.querySelector('#answer-section');
        answersSection.style.display = 'none';
    }
}


function createCard(summary, detail) {
    const card = document.createElement('div');
    card.className = 'grid-col-8 usa-card';

    const cardContainer = document.createElement('div');
    cardContainer.className = 'usa-card__container';
    card.appendChild(cardContainer);

    if (summary) {
        const cardHeader = document.createElement('header');
        cardHeader.className = 'usa-card__header';
        cardContainer.appendChild(cardHeader);

        const cardHeading = document.createElement('h2');
        cardHeading.className = 'usa-card__heading';
        cardHeader.appendChild(cardHeading);

        const cardHeaderText = document.createTextNode(summary);
        cardHeading.appendChild(cardHeaderText);
    }

    const cardBody = document.createElement('div');
    cardBody.className = 'usa-card__body';
    cardContainer.appendChild(cardBody);

    const cardBodyP = document.createElement('p');
    cardBody.appendChild(cardBodyP);

    const cardBodyText = document.createTextNode(detail);
    cardBodyP.appendChild(cardBodyText);

    return card;
}


function questionFormValid() {
    const form = document.querySelector('#question-form');
    let valid = true;

    if (!form.question_summary.value) {
        const questionSummaryGroup = document.querySelector('#question_summary-group');
        questionSummaryGroup.classList.add('usa-form-group--error');
        const questionSummaryLabel = document.querySelector('#question_summary-label');
        questionSummaryLabel.classList.add('usa-label--error');
        const questionSummaryErrorDiv = document.querySelector('#question_summary-error-message');
        questionSummaryErrorDiv.style.display = 'block';
        const questionSummaryInput = document.querySelector('#question_summary');
        questionSummaryInput.classList.add('usa-input--error');
        valid = false
    }

    if (!form.question_detail.value) {
        const questionDetailGroup = document.querySelector('#question_detail-group');
        questionDetailGroup.classList.add('usa-form-group--error');
        const questionDetailLabel = document.querySelector('#question_detail-label');
        questionDetailLabel.classList.add('usa-label--error');
        const questionDetailErrorDiv = document.querySelector('#question_detail-error-message');
        questionDetailErrorDiv.style.display = 'block';
        const questionDetailInput = document.querySelector('#question_detail');
        questionDetailInput.classList.add('usa-input--error');
        valid = false;
    }

    return valid;
}


async function submitQuestion() {
    const form = document.querySelector('#question-form');

    if (questionFormValid()) {
        const response = await fetch(
            'https://rkb7e4iex0.execute-api.us-east-1.amazonaws.com/AddQuestionFunction',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "question_summary": form.question_summary.value,
                    "question_detail": form.question_detail.value
                })
            }
        );

        if (!response.ok) {
            const errorDiv = document.querySelector('#add-question-error');
            errorDiv.style.display = 'block';

            setTimeout(() => errorDiv.style.display = 'none', 5000);
        } else {
            navigateToIndex();
        }
    }
}


async function answerQuestion() {
    // TODO - send questionId and answer-text
}


function onNavigateToAsk() {
    window.location.href = 'ask-question.html';
}


function navigateToIndex() {
    window.location.href = 'index.html';
}


function toggleAnswerForm() {
    const answerForm = document.querySelector('#answer-form');
    const toggleAnswerButton = document.querySelector('#toggle-answer-button');
    if (answerForm.style.display === 'none') {
        answerForm.style.display = 'block';
        toggleAnswerButton.style.display = 'none';
    } else {
        answerForm.style.display = 'none';
        toggleAnswerButton.style.display = 'block';
    }
}
