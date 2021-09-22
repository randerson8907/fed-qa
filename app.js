async function fetchQuestions() {
    const questionUl = document.querySelector('#question-list');

    const response = await fetch('https://uhgwqthcj3.execute-api.us-east-1.amazonaws.com/CFStage/questions');
    const json = await response.json();

    json.body.forEach(q => {
        const newLi = document.createElement('li');
        const newHref = document.createElement('a');
        const linkText = document.createTextNode(q.question_summary);

        newHref.className = 'usa-link';
        newHref.href = 'question-detail.html';
        newHref.onclick = () => clickQuestion(q.question_id);

        newHref.appendChild(linkText);
        newLi.appendChild(newHref);
        questionUl.appendChild(newLi);
    });

    const loadingDiv = document.querySelector('#loading');
    loadingDiv.style.display = 'none';
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
    const questionCard = createQuestionCard(question.question_summary, question.question_detail, false);
    questionDiv.appendChild(questionCard);

    const questionIdHiddenInput = document.querySelector('#question_id');
    questionIdHiddenInput.value = questionId;

    const answersDiv = document.querySelector('#answer-list');
    if (question.answer) {
        const answersSection = document.querySelector('#answer-section');
        answersSection.style.display = 'block';

        question.answer.forEach(answer => {
            const answerCard = createAnswerCard(answer);
            answersDiv.appendChild(answerCard);
        });
    }

    const answerButtonsDiv = document.querySelector('#answer-buttons');
    answerButtonsDiv.style.display = 'block';

    const loadingDiv = document.querySelector('#loading');
    loadingDiv.style.display = 'none';
}


function createQuestionCard(summary, detail) {
    const card = document.createElement('div');
    card.className = 'usa-card';

    const cardContainer = document.createElement('div');
    cardContainer.className = 'usa-card__container';
    card.appendChild(cardContainer);

    const cardHeader = document.createElement('header');
    cardHeader.className = 'usa-card__header';
    cardContainer.appendChild(cardHeader);

    const cardHeading = document.createElement('h2');
    cardHeading.className = 'usa-card__heading';
    cardHeader.appendChild(cardHeading);

    const cardHeaderText = document.createTextNode(summary);
    cardHeading.appendChild(cardHeaderText);

    const cardBody = document.createElement('div');
    cardBody.className = 'usa-card__body';
    cardContainer.appendChild(cardBody);

    const cardBodyP = document.createElement('p');
    cardBody.appendChild(cardBodyP);

    const cardBodyText = document.createTextNode(detail);
    cardBodyP.appendChild(cardBodyText);

    return card;
}


function createAnswerCard(answer, votes) {
    const card = document.createElement('div');
    card.className = 'usa-card';

    const cardContainer = document.createElement('div');
    cardContainer.className = 'usa-card__container';
    card.appendChild(cardContainer);

    const cardBody = document.createElement('div');
    cardBody.className = 'usa-card__body';
    cardContainer.appendChild(cardBody);

    const cardBodyContainer = document.createElement('div');
    cardBodyContainer.className = 'grid-container';
    cardBody.appendChild(cardBodyContainer);

    const answerSectionRow = document.createElement('div');
    answerSectionRow.className = 'grid-row';
    cardBodyContainer.appendChild(answerSectionRow);

    const answerSectionCol = document.createElement('div');
    answerSectionCol.className = 'grid-col';
    answerSectionRow.appendChild(answerSectionCol);

    const answerP = document.createElement('p');
    answerSectionCol.appendChild(answerP);

    const answerBodyText = document.createTextNode(answer);
    answerP.appendChild(answerBodyText);

    const scoreSectionRow = document.createElement('div');
    scoreSectionRow.className = 'grid-row margin-top-1';
    cardBodyContainer.appendChild(scoreSectionRow);

    const scoreSectionCol = document.createElement('div');
    scoreSectionCol.className = 'grid-col';
    scoreSectionRow.appendChild(scoreSectionCol);

    const downvoteButton = document.createElement('button');
    downvoteButton.type = 'button';
    downvoteButton.className = 'usa-button usa-button--unstyled';
    downvoteButton.onclick = () => voteOnAnswer(-1);
    scoreSectionCol.appendChild(downvoteButton);

    const downvoteSvg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    downvoteSvg.setAttribute('class', 'usa-icon');
    downvoteSvg.setAttribute('aria-hidden', 'true');
    downvoteSvg.setAttribute('focusable', 'false');
    downvoteSvg.setAttribute('role', 'img');


    const downvoteUse = document.createElement('use');
    downvoteUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'uswds-2.12.1/img/sprite.svg#thumb_down_alt');
    downvoteSvg.appendChild(downvoteUse);
    downvoteButton.appendChild(downvoteSvg);


    const voteCountSpan = document.createElement('span');
    scoreSectionCol.appendChild(voteCountSpan);

    const voteCountText = document.createTextNode(votes);
    voteCountSpan.appendChild(voteCountText);

    const upvoteButton = document.createElement('button');
    upvoteButton.type = 'button';
    upvoteButton.className = 'usa-button usa-button--unstyled';
    upvoteButton.onclick = () => voteOnAnswer(1);
    scoreSectionCol.appendChild(upvoteButton);

    const upvoteSvg = document.createElement('svg');
    upvoteSvg.className = 'usa-icon';
    upvoteSvg.setAttribute('aria-hidden', 'true');
    upvoteSvg.setAttribute('focusable', 'false');
    upvoteSvg.setAttribute('role', 'img');
    upvoteButton.appendChild(upvoteSvg);

    const upvoteUse = document.createElement('use');
    upvoteUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'uswds-2.12.1/img/sprite.svg#thumb_up_alt');
    upvoteButton.appendChild(upvoteUse);

    return card;
}


function voteOnAnswer(value) {
    // TODO
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


function answerFormValid() {
    const form = document.querySelector('#answer-form');
    let valid = true;

    if (!form.answer.value) {
        const answerGroup = document.querySelector('#answer-group');
        answerGroup.classList.add('usa-form-group--error');
        const answerLabel = document.querySelector('#answer-label');
        answerLabel.classList.add('usa-label--error');
        const answerErrorDiv = document.querySelector('#answer-error-message');
        answerErrorDiv.style.display = 'block';
        const answerInput = document.querySelector('#answer');
        answerInput.classList.add('usa-input--error');
        valid = false
    }

    return valid;
}


async function answerQuestion() {
    const form = document.querySelector('#answer-form');

    if (answerFormValid()) {
        const response = await fetch(
            'https://rkb7e4iex0.execute-api.us-east-1.amazonaws.com/AddAnswerFunction',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "question_id": form.question_id.value,
                    "answer": form.answer.value
                })
            }
        );

        if (!response.ok) {
            const errorDiv = document.querySelector('#add-answer-error');
            errorDiv.style.display = 'block';

            setTimeout(() => errorDiv.style.display = 'none', 5000);
        } else {
            location.reload();
        }
    }
}


function navigateToAsk() {
    window.location.href = 'ask-question.html';
}


function navigateToIndex() {
    window.location.href = 'index.html';
}


function toggleAnswerForm() {
    const answerForm = document.querySelector('#answer-form-section');
    const toggleAnswerButton = document.querySelector('#toggle-answer-button');
    if (answerForm.style.display === 'none') {
        answerForm.style.display = 'block';
        toggleAnswerButton.style.display = 'none';
    } else {
        answerForm.style.display = 'none';
        toggleAnswerButton.style.display = 'block';
    }
}
