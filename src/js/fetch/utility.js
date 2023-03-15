// utility functions to fetch data for the page
async function convertToJson(res) {
    const jsonResponse = await res.json(); // Parse response body as JSON
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: "servicesError", message: jsonResponse };
    }
}

export default class ExternalServices {
    constructor() {
        this.base_URL = "https://spruce-moose-backend.onrender.com";
    }
    async getData(category) {
        const response = await fetch(
            `${this.base_URL}/plant/${category}`
        );
        const data = await convertToJson(response);
        return data.Result;
    }
    async findProductById(id) {
        const response = await fetch(`${this.base_URL}product/${id}`);
        const data = await convertToJson(response);
        // console.log(data.Result);
        return data.Result;
    }
    async checkout(form) {
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        const options = {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(form),
        };
        // console.log(this.base_URL + "checkout/", options);
        return await fetch(this.base_URL + "checkout/", options).then(
            convertToJson
        );
        // call the checkout method in our ExternalServices module and send it our data object.
    }
}