document.addEventListener('DOMContentLoaded', () => {
    const cardWrapper = document.querySelector('.card-wrapper');
    const filterButton = document.querySelector('#filter-button');
    const filterMenu = document.querySelector('#filter-menu');

    let allData = []; // Store all fetched data to avoid re-fetching

    // Function to render a card
    function renderCard(item) {
        const card = document.createElement('div');
        card.className = 'card p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 space-y-3';

        card.innerHTML = `
            <div class="card flex flex-col gap-6">
                <div class="flex justify-between items-center"> 
                    <h2 class="text-xl font-semibold text-gray-900">${item.title}</h2>
                    <h3 class="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">${item.category}</h3>
                </div>
                <p>${item.description}</p>
                <div class="flex justify-end">
                    <a href="${item.url}" target="_blank" aria-label="Read more about ${item.title}" role="button" class="w-[28%] inline-block px-4 py-2 text-xs md:text-sm text-center font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700">Read more</a>
                </div>
            </div>
        `;
        return card;
    }

    function renderFilterMenu(categories) {
        filterMenu.innerHTML = '';
    
        // Add "Show All" button
        const showAllButton = document.createElement('button');
        showAllButton.textContent = 'Show All';
        showAllButton.className = 'px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 w-full text-left';
        showAllButton.addEventListener('click', () => applyFilter());
        filterMenu.appendChild(showAllButton);
    
        categories.forEach(category => {
            const categoryItem = document.createElement('button');
            categoryItem.textContent = category;
            categoryItem.className = 'px-4 py-2 text-sm text-gray-900 hover:bg-gray-200 w-full text-left';
            categoryItem.addEventListener('click', () => applyFilter(category));
            filterMenu.appendChild(categoryItem);
        });
    }
    
    // Fetch data and initialize
    fetch('./data/featured-resources.json')
        .then((response) => response.json())
        .then((data) => {
            allData = data; // Store the fetched data

            const categories = [...new Set(data.map(item => item.category))]; // Get unique categories
            renderFilterMenu(categories); // Render filter menu

            // Render all the cards initially
            renderAllCards(data);
        })
        .catch((error) => console.error('Error fetching data:', error));

    // Toggle the filter menu when the filter button is clicked
    filterButton.addEventListener('click', () => {
        filterMenu.classList.toggle('hidden');
    });

    // Function to render all the cards
    function renderAllCards(data) {
        cardWrapper.innerHTML = ''; // Clear current cards
        data.forEach(item => {
            const card = renderCard(item);
            cardWrapper.appendChild(card); // Append all cards to the cardWrapper
        });
    }

    // Apply filter by category or show all
    function applyFilter(selectedCategory) {
        let filteredData;

        if (selectedCategory) {
            // Filter resources based on selected category
            filteredData = allData.filter(item => item.category === selectedCategory);
        } else {
            // Show all resources if no category is selected
            filteredData = allData;
        }

        renderAllCards(filteredData); // Re-render the filtered data (or all data if no filter)
    }
});
