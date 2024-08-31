let currentIndex = 0;
		/* Create a variable of type array to store the gifs */

        document.getElementById(/* The id of the searchButton */).addEventListener('click', function() {
            /* Store the data */ = document.getElementById('searchInput').value.trim();
            
            if (searchInput) {
                /* Store the data of the API */ = `https://g.tenor.com/v1/search?q=${encodeURIComponent(/*Handle the stored data*/)}&key=LIVDSRZULELA&limit=10&rating=g`;

                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        /* Use the array variable to store the gifs */ = data.results;
                        currentIndex = 0;
                        /* Call the function to updateDisplay */
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

            if (/* Use the array variable to store the gifs */.length > 0 && /* Use the array variable to store the gifs */[currentIndex]) {
                const gif = /* Use the array variable to store the gifs */[currentIndex];
                const imgElement = document.createElement('img');
                imgElement.src = gif.media[0].gif.url;
                gifDisplay.appendChild(imgElement);

                document.getElementById('prevButton').disabled = currentIndex === 0;
                document.getElementById('nextButton').disabled = currentIndex === /* Use the array variable to store the gifs */.length - 1;
            } else {
                gifDisplay.innerHTML = '<p>No GIFs to display.</p>';
                document.getElementById('prevButton').disabled = true;
                document.getElementById('nextButton').disabled = true;
            }
        }

        document.getElementById('prevButton').addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                /* Call the function to updateDisplay */
            }
        });

        document.getElementById('nextButton').addEventListener('click', function() {
            if (currentIndex < gifs.length - 1) {
                currentIndex++;
                /* Call the function to updateDisplay */
            }
        });
