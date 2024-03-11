// HTML elements
let inp = document.getElementById('searchInput');
let btn = document.getElementById('btn');
let dataCard = document.getElementById('universityCards');

// Event listener for the button click
btn.addEventListener('click', async () => {
    // Get the country input value
    let country = inp.value.trim();
    
    if (country !== '') {
        // Construct the API URL with the country parameter
        let apiUrl = `http://universities.hipolabs.com/search?country=${country}`;

        try {
            // Call the searchData function with the API URL
            let data = await searchData(apiUrl);
            
            // Clear previous search results
            dataCard.innerHTML = '';

            // Display the new search results
            data.forEach(university => {
                let card = createUniversityCard(university);
                dataCard.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
});

// Function to fetch data from the API
async function searchData(url) {
    let response = await axios.get(url);
    return response.data;
}

// Function to create a card for each university
function createUniversityCard(university) {
    let card = document.createElement('div');
    card.classList.add('card');

    let name = document.createElement('h2');
    name.textContent = university.name;

    let country = document.createElement('p');
    country.textContent = `Country: ${university.country}`;

    let website = document.createElement('a');
    website.textContent = 'Website';
    website.href = university.web_pages[0];
    website.target = '_blank';

    card.appendChild(name);
    card.appendChild(country);
    card.appendChild(website);

    return card;
}





