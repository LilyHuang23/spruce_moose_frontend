// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from local storage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    
}
// setLocalStorage();
// set a listener for both touchend and click
export function setClick(selector, callback) {
    qs(selector).addEventListener("touchend", (event) => {
        event.preventDefault();
        callback();
    });
    qs(selector).addEventListener("click", callback);
}
// gets parameters from a url
export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get(param); //what is 'product' in relation to the url
    return product;
}
//render multiple html templates to the DOM
export function renderListWithTemplate(
    templateFunc,
    parentElement,
    items,
    position = "afterbegin",
    clear = false
) {
    const htmlStrings = items.map(templateFunc);
    // if clear is true we need to clear out the contents of the parent.
    if (clear) {
        parentElement.innerHTML = "";
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
    template,
    parentElement,
    data,
    position = "afterbegin",
    callback
) {
    parentElement.insertAdjacentHTML(position, template);
    if (callback) {
        callback(data);
    }
}

export async function loadTemplate(path) {
    const res = await fetch(path);
    return await res.text();
}

export async function loadHeaderFooter() {
    //if local storage is empty it will cause an error with header and footer unless initialized.
    if (getLocalStorage("cart") == null) {
        setLocalStorage("cart", []);
    }
    let headerTemplate = await loadTemplate("/partials/header.html");
    headerTemplate = headerTemplate.replace(`cartCount">0`, `cartCount">${getLocalStorage("cart").length}`);
    const headerElement = document.getElementById("main-header");
    const footerTemplate = await loadTemplate("/partials/footer.html");
    const footerElement = document.getElementById("main-footer");

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}
