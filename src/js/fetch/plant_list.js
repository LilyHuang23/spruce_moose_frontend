import { renderListWithTemplate } from "./utility.js";

function plantCardTemplate(plant) {
    return `<li class="plant-card">
  <a href="/views/plant_pages/index.html?plant=${plant.Id}">
  <img
    src="${plant.imgUrl}"
    alt="Image of ${plant.scientificName}"
  />
  <h3 class="card__brand">${plant.scientificName}</h3>
  <h2 class="card__name">${plant.commonName}</h2>
  <p class="plant-card__price">$${plant.price}</p></a>
</li>`;
}

export default class plantList {
    constructor(category, listEl, dataSource) {
        this.category = category;
        this.listElement = document.querySelector(listEl);
        this.dataSource = dataSource;
        this.init();
    }
    async init() {
        const plants = await this.dataSource.getData(this.category);
        // console.log(plants);
        let filteredPlants = this.filterList(plants);
        this.renderList(filteredPlants);
    }
    renderList(plants) {
        document.querySelector(".plant-category").innerHTML = this.category;
        document.querySelector("#sort_select").addEventListener("change", (e) => {
            let sortedPlants = [];
            if (e.target.value == "price") {
                sortedPlants = this.sortListByPrice(plants);
            }
            else if (e.target.value == "brand") {
                sortedPlants = this.sortListByBrand(plants);
            }
            renderListWithTemplate(plantCardTemplate, this.listElement, sortedPlants);
        });
        renderListWithTemplate(plantCardTemplate, this.listElement, plants);
    }
    filterList(plants) {
        return plants.filter((plant) => plant.Image != "");
    }
    sortListByPrice(plants) {
        return plants.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    sortListByBrand(plants) {
        return plants.sort((a, b) => a.Brand.Name.localeCompare(b.Brand.Name));
    }
}