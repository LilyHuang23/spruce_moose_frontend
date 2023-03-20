import { getParam, loadHeaderFooter } from "../fetch/utility.js";
import ExternalServices from "../fetch/ExternalServices.js";
import PlantDetails from "../fetch/plant_details.js";

loadHeaderFooter();

const dataSource = new ExternalServices();
const plantId = getParam("plant");
const plant = new PlantDetails(plantId, dataSource);
plant.init();
