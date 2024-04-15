document.addEventListener('DOMContentLoaded', function () {
    const newQuoteButton = document.querySelector('#js-new-quote');

    newQuoteButton.addEventListener('click', getQuote);
    copyQuoteButton.addEventListener('click', copyQuote);

    function getQuote() {
        console.log('New quote button clicked');
        const endpoint = 'https://rizzapi.vercel.app/random';

        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch quote');
                }
                console.log('Fetched quote');
                return response.json();
            })
            .then(data => {
                displayQuote(data.text);
                displayCategory(data.category);
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
                alert('Failed to fetch quote. Please try again.');
            });
    }

    function copyQuote() {
        const quoteTextElement = document.querySelector('#js-quote-text');
        const quoteText = quoteTextElement.textContent;
        navigator.clipboard.writeText(quoteText)
            .then(() => {
                alert('Quote copied to clipboard!');
            })
            .catch(error => {
                console.error('Error copying quote:', error);
                alert('Failed to copy quote. Please try again.');
            });
    }

    function displayQuote(quote) {
        const quoteTextElement = document.querySelector('#js-quote-text');
        quoteTextElement.textContent = `"${quote}"`;
        
        const copyQuoteButton = document.querySelector('#js-copy-quote'); // Define copyQuoteButton here
        copyQuoteButton.classList.remove('hidden');
        copyQuoteButton.addEventListener('click', copyQuote); // Add event listener here
    }
    
    function displayCategory(category) {
        const categoryTextElement = document.querySelector('#js-category');
        categoryTextElement.textContent = `Category: ${category}`;
    }
});
