let getListOfProductsFromApi = new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            resolve(request.responseText);
        } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
            reject(this.status);
        }
    }
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
});

function getAllProducts() {
    getListOfProductsFromApi
        .then(function (response) {
            let products = JSON.parse(response); // Place les produits dans un tableau products

            for (let product of Products) {
                const newTeddie = new Teddie(Products.colors, Products._id, Products.name, Products.price, Products.description, Products.imageUrl);
                document.getElementById("main").appendChild(newTeddie.createHtmlBlock());
            }
        })
        .catch(function (error) {
            document.getElementById("main").innerHTML += `<p>Connection au serveur échouée.</p>`;
            console.error(error);
        });
        console.log("ici");
}

class Products {
	constructor(colors, _id, name, price, imageUrl, description) {
		this.colors = colors;
		this._id = _id;
		this.name = name;
		this.price = price;
		this.imageUrl = imageUrl;  
	  	this.description = description;
	  
	}
}
  