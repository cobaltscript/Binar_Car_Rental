class RenderFilter {
    constructor() {
        this.filterResult = document.getElementById('filter-result');
        this.searchInputElement = document.getElementById('search')
        this.btnCariMobil = document.getElementById('btn-cari-mobil')
        this.cars = [];
    }

    async fetchCars() {
        try {
            const response = await fetch('http://localhost:3000/cars');
            if (!response.ok) {
                throw new Error('Failed to fetch car data');
            }

            this.cars = await response.json();
            this.attachListener()
        } catch (error) {
            console.error('Error:', error);
            this.filterResult.innerHTML = 'Failed to fetch car data';
        }
    }

    attachListener() {
        this.btnCariMobil.addEventListener('click', () => {
            this.handleSearch();
        });
    }

    handleSearch() {
        const query = this.searchInputElement.value.toLowerCase();
        const filteredCars = this.cars.filter((car) => {
            return car.manufacture.toLowerCase().includes(query) || car.model.toLowerCase().includes(query) || car.type.toLowerCase().includes(query) || car.year.toString() === query
        });
        this.displayCars(filteredCars);
    }

    displayCars(cars) {
        const carList = document.createElement('ul');

        cars.forEach((car) => {
            const carItem = document.createElement('li');
            const carImage = document.createElement('img');
            carImage.src = car.image;
            carImage.alt = `${car.manufacture} ${car.model}`;
            carImage.style.width = '100px'

            const carInfo = document.createElement('p');
            carInfo.textContent = `${car.manufacture} ${car.model}, Year: ${car.year} Type: ${car.type}`;
            carItem.appendChild(carImage);
            carItem.appendChild(carInfo);
            carList.appendChild(carItem);
        });

        this.filterResult.innerHTML = '';
        this.filterResult.appendChild(carList);
    }
}