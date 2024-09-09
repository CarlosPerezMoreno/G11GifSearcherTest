        let currentIndex = 0;
        let gifs = [];

        document.getElementById('searchButton').addEventListener('click', function() {
            const searchInput = document.getElementById('searchInput').value.trim();
            
            if (searchInput) {
                // Adding rating parameter to filter content
                const apiUrl = `https://api.tenor.com/v1/search?q=${encodeURIComponent(searchInput)}&key=LIVDSRZULELA&limit=10&rating=g`;

                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        gifs = data.results;
                        currentIndex = 0;
                        updateDisplay();
                    })
                    .catch(error => {
                        console.error('Error fetching GIFs:', error);
                        document.getElementById('gifDisplay').innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
                    });
            }
        });

        function updateDisplay() {
            const gifDisplay = document.getElementById('gifDisplay');
            gifDisplay.innerHTML = '';

            if (gifs.length > 0 && gifs[currentIndex]) {
                const gif = gifs[currentIndex];
                const imgElement = document.createElement('img');
                imgElement.src = gif.media[0].gif.url;
                gifDisplay.appendChild(imgElement);

                document.getElementById('prevButton').disabled = currentIndex === 0;
                document.getElementById('nextButton').disabled = currentIndex === gifs.length - 1;
            } else {
                gifDisplay.innerHTML = '<p>No GIFs to display.</p>';
                document.getElementById('prevButton').disabled = true;
                document.getElementById('nextButton').disabled = true;
            }
        }

        document.getElementById('prevButton').addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateDisplay();
            }
        });

        document.getElementById('nextButton').addEventListener('click', function() {
            if (currentIndex < gifs.length - 1) {
                currentIndex++;
                updateDisplay();
            }
        });
