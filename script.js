// Get Quote from API
const getQuote = async () => {
    showLoadingSpinner();
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    const proxyUrl = 'https://ziyaadcors.herokuapp.com/'
    try{
        
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json();
        // IF author is blank
        if(data.quoteAuthor === ''){
            $('#author').text('Unknown')
        }else{
            $('#author').text(data.quoteAuthor)
        }
        // Chnage size of text
        if(data.quoteText.length > 120){
            $('#quote').addClass("long-quote")
        }else{
            $('#quote').removeClass("long-quote")
        }
        $('#quote').text(data.quoteText)

        removeLoadingSpinner();
        
    }
    catch(error){
        getQuote();
        console.log('Whoops, No Quote ',error)
    }
}
// Show Loading
const showLoadingSpinner = () =>{
    $('#loader').show()
    $('#quote-container').hide()
}

// Hide Loading
const removeLoadingSpinner = () => {
    if($('#loader').is(':visible')){
        $('#quote-container').show()
        $('#loader').hide()
    }
}
// Tweet Quote
const tweetQuote = () => {
    const quote = $('#quote').text()
    const author = $('#author').text()
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl,'_blank');
}

// Event Listeners
$("#twitter").click(() => {tweetQuote();})

$("#new-quote").click(() => {getQuote();})

// onLoad
getQuote();
