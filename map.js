// Capas base

var map = L.map('map').setView([24.799119, -107.342517], 13);

var satelite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 8,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map)

var hibrido = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',{
    maxZoom: 20,
}).addTo(map)

var mapa = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Iconos

var uniPub = new L.icon ({
    iconUrl: "./iconos/azul.png",
    iconSize: [20, 20],
});

var uniPriv = new L.icon ({
    iconUrl: "./iconos/morado.png",
    iconSize: [20, 20],
});

// Universidades Públicas

function uniPublicas (feature, layer) {
    layer.bindPopup("<h4>"+ feature.properties.nom_estab+"</h4>");
    layer.setIcon(uniPub);
};

var uniPub = L.geoJson(publicas, {
    onEachFeature: uniPublicas
}).addTo(map);

// Universidades Privadas

function uniPrivadas (feature, layer) {
    layer.bindPopup("<h4>"+ feature.properties.nom_estab+"</h4>");
    layer.setIcon(uniPriv);
};

var uniPriv = L.geoJson(privadas, {
    onEachFeature: uniPrivadas
}).addTo(map);

// Rezago Educativo
/*
function getPercentage (feature) {
    if (feature.properties.Porcentaje <= 20) {
        return 1
    }
    else if (feature.properties.Porcentaje <= 27) {
        return 2
    }
};

var rezagoEdu = L.geoJSON(rezagoEdu, {
    style: function(feature) {
        switch (getPercentage(feature)) {
            case 1: return {color: "#ff0000"};
            case 2: return {color: "#0000ff"};
        }
    }
}).addTo(map);
*/


var capasAdicionales = {
    "Universidades Públicas":uniPub,
    "Universidades Privadas":uniPriv,
    // "Rezago Educativo":rezagoEdu,
};

var capasBase = {
    "Híbrido": hibrido,
    "Mapa": mapa,
    "Satélite": satelite,
};

L.control.layers(capasBase, capasAdicionales).addTo(map);