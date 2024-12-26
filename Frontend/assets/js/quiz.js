const questionsGrid = document.getElementById('questionsGrid');
const addQuestionForm = document.getElementById('addQuestionForm');

function fetchQuestions() {
    fetch(apiurl)
    .then(response => response.json())
    .then((questions) => renderQuestions(questions)); 
}
//Render question
function renderQuestions(questions) {
questionsGrid.innerHTML = " ";
questions.forEach((question) => {
    const questionCard = document.createElement('div');
    questionCard.className = `question-card ${question.reviewStatus ? "reviewed": " "}` ;
            questionCard.innerHTML = `
            <h4>${question.statement}</h4>
            <p>${question.optionA}</p>
            <p>${question.optionB}</p>
            <p>${question.optionC}</p>
            <p>${question.optionD}</p>
            <p><strong> Correct Answer:</strong> ${question.correctOption}</p> 
            <button onclick="reviewQuestion(${question.id})">Review Question</button>
            <button onclick="deleteQuestion(${question.id})">Delete Question</button>
            `;
            questionsGrid.appendChild(questionCard);
        });
        //Add new question
        addQuestionForm.addEventListener('submit',(e)=> {
            e.preventDefault();
            const newQuestion = {
                statement: document.getElementById('question').value,
                optionA: document.getElementById('optionA').value,
                optionB: document.getElementById('optionB').value,
                optionC: document.getElementById('optionC').value,
                optionD: document.getElementById('optionD').value,
                correctOption: document.getElementById('correctOption').value,
                reviewStatus: false,
            };
       fetch(apiurl, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(newQuestion),
       })
       .then(() => {
        alert("Question Created");
        fetchQuestions();
       })
       .catch((error) => console.error('Error:', error));
    });
    //Review question
    function reviewQuestion(id){
        if(confirm('Are you sure you want to review this question?')){
            fetch(`${apiurl}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reviewStatus: true }),
            })
            .then(() => fetchQuestions())
            .catch((error) => console.error('Error:', error));
            }
        }
        //Delete question
        function deleteQuestion(id){
        if(confirm('Are you sure you want to delete this question?')){
            fetch(`${apiurl}/${id}`, {
                method: 'DELETE',
            })
            .then(() => fetchQuestions())
            .catch((error) => console.error('Error:', error));
        }
    }
    fetchQuestions();
}