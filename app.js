 // Car data array
        const carData = [
            {
                id: 1,
                name: "Peugeot 504",
                brand: "Peugeot",
                year: "2020",
                price: "500000",
                image: "car images/peugeot.jpg",
                model: "2020 Model"
            },
            {
                id: 2,
                name: "Ferrari Purosangue",
                brand: "Ferrari",
                year: "2019",
                price: "450000",
                image: "car images/ferrari.jpg",
                model: "2019 Model"
            },
            {
                id: 3,
                name: "Lexus LC500",
                brand: "Lexus",
                year: "2025",
                price: "800000",
                image: "car images/lexus.jpg",
                model: "2025 Model"
            },
            {
                id: 4,
                name: "Range Rover Sport",
                brand: "Range Rover",
                year: "2020",
                price: "700000",
                image: "car images/range.jpg",
                model: "2020 Model"
            },
            {
                id: 5,
                name: "Range Rover",
                brand: "Range Rover",
                year: "2017",
                price: "550000",
                image: "car images/range 2.jpg",
                model: "2017 Model"
            },
            {
                id: 6,
                name: "Toyota Land Cruiser",
                brand: "Toyota",
                year: "2015",
                price: "900000",
                image: "car images/lexus 1.jpg",
                model: "2015 Model"
            },
            {
                id: 7,
                name: "Peugeot 505",
                brand: "Peugeot",
                year: "2016",
                price: "880000",
                image: "car images/toyota.jpg",
                model: "2016 Model"
            },
            {
                id: 8,
                name: "Cybertruck 2024",
                brand: "Tesla",
                year: "2024",
                price: "900000",
                image: "car images/cybertruck.jpg",
                model: "2024 Model"
            }
        ];

        let selectedCar = null;

        // Initialize car display
        function displayCars(cars, highlightCarId = null) {
            const carContainer = document.getElementById('carResults');
            carContainer.innerHTML = '';
            
            if (cars.length === 0) {
                carContainer.innerHTML = '<p class="no-results">No cars found matching your search criteria.</p>';
                return 0;
            }
            
            cars.forEach(car => {
                const carCard = document.createElement('div');
                carCard.className = 'my-card';
                carCard.id = `car-${car.id}`;
                
                // Check if this car should be highlighted/selected
                const isSelected = (highlightCarId === car.id);
                
                if (isSelected) {
                    carCard.classList.add('car-selected');
                    selectedCar = car;
                }
                
                carCard.innerHTML = `
                    ${isSelected ? '<div class="selected-badge">SELECTED CAR</div>' : ''}
                    <div class="img-box">
                        <img src="${car.image}" alt="${car.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Car+Image'">
                        <div class="price-tag">$${parseInt(car.price).toLocaleString()}</div>
                    </div>
                    <div class="car-name">${car.name}</div>
                    <div class="model-name">${car.model}</div>
                    <div class="btn-row">
                        <button class="my-btn book-btn" data-car='${JSON.stringify(car)}'>
                            <span>Book </span><span>Now</span>
                        </button>
                        <button class="my-btn details-btn" data-car='${JSON.stringify(car)}'>
                            Details
                        </button>
                    </div>
                `;
                carContainer.appendChild(carCard);
            });
            
            // Re-attach event listeners after rendering
            attachCarButtonListeners();
            return cars.length;
        }

        // Search cars based on filters and return matching cars
        function searchCars() {
            const brand = document.getElementById('brandSelect').value;
            const model = document.getElementById('modelSelect').value;
            const year = document.getElementById('yearSelect').value;
            const price = document.getElementById('priceSelect').value;
            
            let filteredCars = carData;
            
            // Apply brand filter
            if (brand) {
                filteredCars = filteredCars.filter(car => 
                    car.brand.toLowerCase() === brand.toLowerCase()
                );
            }
            
            // Apply model filter
            if (model) {
                filteredCars = filteredCars.filter(car => 
                    car.name.toLowerCase() === model.toLowerCase()
                );
            }
            
            // Apply year filter
            if (year) {
                filteredCars = filteredCars.filter(car => car.year === year);
            }
            
            // Apply price filter
            if (price) {
                filteredCars = filteredCars.filter(car => parseInt(car.price) <= parseInt(price));
            }
            
            return filteredCars;
        }

        // Find exact matching car based on brand and year
        function findExactMatchCar(brand, year) {
            return carData.find(car => 
                car.brand.toLowerCase() === brand.toLowerCase() && 
                car.year === year
            );
        }

        // Set current year in footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();

        // Trip form submission
        document.getElementById('tripForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const pickupLocation = document.getElementById('pickupLocation').value;
            const pickupDate = document.getElementById('pickupDate').value;
            
            if (!pickupLocation || !pickupDate) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Scroll to car search section
            document.getElementById('car-search-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Highlight search section
            const searchSection = document.getElementById('car-search-section');
            searchSection.classList.add('car-search-highlight');
            setTimeout(() => {
                searchSection.classList.remove('car-search-highlight');
            }, 2000);
            
            // Show instruction alert
            alert('To select your preferred car, please use the "Car Search" section below.\n\nSelect brand, model, year, and price to find your perfect car match!');
        });

        // Car search form submission
        document.getElementById('carSearchForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const brand = document.getElementById('brandSelect').value;
            const model = document.getElementById('modelSelect').value;
            const year = document.getElementById('yearSelect').value;
            const price = document.getElementById('priceSelect').value;
            
            // Clear previous selection
            selectedCar = null;
            
            // If brand and year are selected, try to find exact match
            if (brand && year) {
                const exactMatchCar = findExactMatchCar(brand, year);
                
                if (exactMatchCar) {
                    // Display all cars but highlight the exact match
                    const allCars = carData;
                    const count = displayCars(allCars, exactMatchCar.id);
                    
                    // Scroll to the selected car
                    setTimeout(() => {
                        document.getElementById(`car-${exactMatchCar.id}`).scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 500);
                    
                    // Show success message
                    alert(`✅ Perfect Match Found!\n\nWe found the exact car you're looking for:\n\n` +
                          `• Brand: ${exactMatchCar.brand}\n` +
                          `• Model: ${exactMatchCar.name}\n` +
                          `• Year: ${exactMatchCar.year}\n` +
                          `• Price: $${parseInt(exactMatchCar.price).toLocaleString()}\n\n` +
                          `This car has been selected for you! Click "Book Now" to reserve it.`);
                    return;
                } else {
                    // If no exact match found, show warning and continue with filtered search
                    alert(`⚠️ No exact match found for ${brand} ${year}\n\nWe'll show you similar available cars instead.`);
                }
            }
            
            // Regular filtered search
            const filteredCars = searchCars();
            const count = displayCars(filteredCars);
            
            if (count > 0) {
                // Scroll to car section
                document.getElementById('our-car').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Show search results summary
                let summary = `Found ${count} car(s) matching your search:\n`;
                if (brand) summary += `• Brand: ${brand}\n`;
                if (model) summary += `• Model: ${model}\n`;
                if (year) summary += `• Year: ${year}\n`;
                if (price) summary += `• Price: Up to $${parseInt(price).toLocaleString()}\n`;
                
                if (count === 1) {
                    summary += `\nThis car has been automatically selected for you!`;
                    // Select the single car
                    selectedCar = filteredCars[0];
                    const carCard = document.getElementById(`car-${selectedCar.id}`);
                    if (carCard) {
                        carCard.classList.add('car-selected');
                        const imgBox = carCard.querySelector('.img-box');
                        imgBox.insertAdjacentHTML('afterbegin', '<div class="selected-badge">SELECTED CAR</div>');
                    }
                }
                
                alert(summary);
            } else {
                // No cars found
                alert(`❌ No cars found matching your search criteria.\n\nPlease try different filters or contact us for more options.\n\nYou searched for:\n` +
                      (brand ? `• Brand: ${brand}\n` : '') +
                      (model ? `• Model: ${model}\n` : '') +
                      (year ? `• Year: ${year}\n` : '') +
                      (price ? `• Price: Up to $${parseInt(price).toLocaleString()}\n` : ''));
                
                // Show all cars as alternatives
                setTimeout(() => {
                    alert('Showing all available cars as alternatives...');
                    displayCars(carData);
                    document.getElementById('our-car').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 1000);
            }
        });

        // Attach event listeners to car buttons
        function attachCarButtonListeners() {
            // Book Now button functionality
            document.querySelectorAll('.book-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const carData = JSON.parse(this.getAttribute('data-car'));
                    
                    // Get trip details from the main form
                    const pickupLocation = document.getElementById('pickupLocation').value || 'Not specified';
                    const pickupDate = document.getElementById('pickupDate').value || 'Not specified';
                    const dropoffDate = document.getElementById('dropoffDate').value || 'Not specified';
                    const pickupTime = document.getElementById('pickupTime').value || 'Not specified';
                    
                    const bookingDetails = `
🚗 CAR BOOKING CONFIRMATION 🚗

Selected Car Details:
• Car: ${carData.name}
• Brand: ${carData.brand}
• Year: ${carData.year}
• Price: $${parseInt(carData.price).toLocaleString()}/day

Trip Details:
• Pickup Location: ${pickupLocation}
• Pickup Date: ${pickupDate} at ${pickupTime}
• Return Date: ${dropoffDate}

Total Estimated Cost: $${(parseInt(carData.price) * 1).toLocaleString()}

Would you like to confirm this booking?
                    `;
                    
                    if (confirm(bookingDetails)) {
                        alert(`✅ BOOKING CONFIRMED!\n\nThank you for choosing AUTOROAD!\n\nBooking Reference: AR-${Date.now()}\nCar: ${carData.name}\nPickup: ${pickupDate} at ${pickupLocation}\n\nOur team will contact you within 24 hours to finalize details.`);
                        
                        // Reset form
                        document.getElementById('tripForm').reset();
                        document.getElementById('carSearchForm').reset();
                        
                        // Reset car selection
                        document.querySelectorAll('.my-card').forEach(card => {
                            card.classList.remove('car-selected');
                            const badge = card.querySelector('.selected-badge');
                            if (badge) badge.remove();
                        });
                        
                        selectedCar = null;
                    }
                });
            });

            // Details button functionality
            document.querySelectorAll('.details-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const carData = JSON.parse(this.getAttribute('data-car'));
                    
                    const details = `
🚗 CAR DETAILS 🚗

Basic Information:
• Name: ${carData.name}
• Brand: ${carData.brand}
• Year: ${carData.year}
• Model: ${carData.model}
• Daily Rate: $${parseInt(carData.price).toLocaleString()}

Features:
• Luxury leather interior
• Premium sound system
• GPS navigation
• Climate control
• Advanced safety features
• Fuel efficient engine
• Bluetooth connectivity
• Rear view camera

Additional Information:
• Available for immediate booking
• Insurance included
• 24/7 roadside assistance
• Free cancellation within 24 hours

Click 'Book Now' to reserve this car!
                    `;
                    
                    alert(details);
                });
            });
        }

        // Search Vehicle button in About section
        document.getElementById('searchVehicleBtn').addEventListener('click', function() {
            // Scroll to search section
            document.getElementById('car-search-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Highlight search section
            const searchSection = document.getElementById('car-search-section');
            searchSection.classList.add('car-search-highlight');
            setTimeout(() => {
                searchSection.classList.remove('car-search-highlight');
            }, 2000);
            
            alert('Use the Car Search form to find your perfect vehicle!\n\nSelect your preferred brand, model, year, and price range to see available options.');
        });

        // Read More links in blog
        document.querySelectorAll('.read-more').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const blogTitle = this.closest('.blog-content').querySelector('h2').textContent;
                alert(`📖 BLOG ARTICLE\n\nTitle: ${blogTitle}\n\nThis article would provide detailed information about this vehicle, including:\n• Full specifications\n• Performance details\n• Customer reviews\n• Comparison with similar models\n\nContact us for more information or to schedule a test drive!`);
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                
                if (targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Update active nav link
                        document.querySelectorAll('nav a').forEach(a => {
                            a.classList.remove('active');
                        });
                        this.classList.add('active');
                        
                        // Scroll to target
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Set min date for date inputs to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('pickupDate').min = today;
        document.getElementById('dropoffDate').min = today;

        // Initialize date inputs with tomorrow's date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        document.getElementById('pickupDate').value = tomorrowStr;
        document.getElementById('dropoffDate').value = tomorrowStr;

        // Set default time to 9:00 AM
        document.getElementById('pickupTime').value = "09:00";

        // Display all cars on page load
        displayCars(carData);

        // Auto-fill model based on brand selection
        document.getElementById('brandSelect').addEventListener('change', function() {
            const brand = this.value;
            const modelSelect = document.getElementById('modelSelect');
            
            if (brand) {
                // Filter models by brand
                const brandModels = carData
                    .filter(car => car.brand === brand)
                    .map(car => car.name);
                
                // Update model options
                modelSelect.innerHTML = '<option value="">All Models</option>';
                brandModels.forEach(model => {
                    modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
                });
            } else {
                // Reset to all models
                modelSelect.innerHTML = '<option value="">All Models</option>';
                const allModels = [...new Set(carData.map(car => car.name))];
                allModels.forEach(model => {
                    modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
                });
            }
        });

        // Initialize model options
        const allModels = [...new Set(carData.map(car => car.name))];
        const modelSelect = document.getElementById('modelSelect');
        allModels.forEach(model => {
            modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
        });
