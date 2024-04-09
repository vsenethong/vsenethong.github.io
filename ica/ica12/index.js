document.addEventListener('DOMContentLoaded', function () {
    const newQuoteButton = document.querySelector('#js-new-quote');

    newQuoteButton.addEventListener('click', getQuote);

    function getQuote() {
        console.log('New quote button clicked');
        const endpoint = 'https://trivia.cyberwisp.com/getrandomchristmasquestion';

        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch quote');
                }
                console.log('Fetched quote');
                return response.json();
            })
            .then(data => {
                displayQuote(data.question);
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
                alert('Failed to fetch quote. Please try again.');
            });
    }

    function displayQuote(question) {
        const quoteTextElement = document.querySelector('#js-quote-text');
        quoteTextElement.textContent = `${question}`;
    }
});
