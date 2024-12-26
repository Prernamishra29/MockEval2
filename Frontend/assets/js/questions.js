async function fetchReviewesQuestions() {
    try {
        const response = await fetch('http://localhost:3000/questions');
        const questions = await response.json();

        const reviewedQuestionsGrid= document.getElementById('reviewedQuestionsGrid');
        reviewedQuestionsGrid.innerHTML = " ";
        
        const reviewedQuestions = questions.filter((question) => question.reviewStatus ===true);
        reviewedQuestions.forEach((question) => {
            const card = document.createElement('div');
            card.className = 'reviewed-question-card';
            card.innerHTML = `
            <h3>${question.statement}</h3>
            <p><strong>Option A:</strong> ${question.optionA}</p>
            <p><strong>Option B:</strong> ${question.optionB}</p>
            <p><strong>Option C:</strong> ${question.optionC}</p>
            <p><strong>Option D:</strong> ${question.optionD}</p>
            <p><strong>Correct Answer:</strong> ${question.correctOption}</p>
            `;
            reviewedQuestionsGrid.appendChild(card);
        });
        } catch (error) {
            console.error('Failed to fetch questions:', error);
}
}
fetchReviewesQuestions();