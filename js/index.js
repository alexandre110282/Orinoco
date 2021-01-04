let getListOfProductsFromApi = new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            resolve(request.responseText);
        } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
            reject(this.status);
        }
    };
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
});

function getAllProducts() {
    getListOfProductsFromApi
        .then(function (response) {
            let Teddies = JSON.parse(response); // Place les produits dans un tableau products

            for (let Teddie of Teddies) {
                const newTeddie = new Teddie(Teddies.colors, Teddies._id, Teddies.name, Teddies.price, Teddies.description, Teddies.imageUrl);
                document.getElementById("main").appendChild(newTeddie.createHtmlBlock());
            }
        })
        .catch(function (error) {
            document.getElementById("main").innerHTML += `<p>Connection au serveur échouée.</p>`;
            console.error(error);
        });
        console.log("ici");
}

class Teddies {
	constructor(colors, _id, name, price, imageUrl, description) {
		this.colors = colors;
		this._id = _id;
		this.name = name;
		this.price = price;
		this.imageUrl = imageUrl;  
	  	this.description = description;
	  
	}
}