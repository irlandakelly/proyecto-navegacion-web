// Capas base

var map = L.map('map').setView([24.799119, -107.342517], 8);

var satelite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
})

var hibrido = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',{
    maxZoom: 20,
})

var mapa = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
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

function getPercentageEdu (feature) {
    if (feature.properties.Porcentaje <= 20) {
        return 1
    }
    else if (feature.properties.Porcentaje <= 27) {
        return 2
    }
    else if (feature.properties.Porcentaje <= 33) {
        return 3
    }
    else if (feature.properties.Porcentaje <= 40) {
        return 4
    }
    else if (feature.properties.Porcentaje <= 67) {
        return 5
    }
};

var rezagoEdu = L.geoJSON(rezagoEdu, {
    style: function(feature) {
        switch (getPercentageEdu(feature)) {
            case 1: return {color: "#f6cacc", weight:1, fillOpacity:.7}
            case 2: return {color: "#ec8385", weight:1, fillOpacity:.7}
            case 3: return {color: "#e35053", weight:1, fillOpacity:.7}
            case 4: return {color: "#d02224", weight:1, fillOpacity:.7}
            case 5: return {color: "#9c191b", weight:1, fillOpacity:.7}
        }
    }
});

// Pobreza

function getPercentagePob (feature) {
    if (feature.properties.inlbpor <= 56) {
        return 1
    }
    else if (feature.properties.inlbpor <= 67) {
        return 2
    }
    else if (feature.properties.inlbpor <= 77) {
        return 3
    }
    else if (feature.properties.inlbpor <= 86) {
        return 4
    }
    else if (feature.properties.inlbpor <= 97) {
        return 5
    }
};

var pobreza = L.geoJSON(pobreza, {
    style: function(feature) {
        switch (getPercentagePob(feature)) {
            case 1: return {color: "#eef6fc", weight:1, fillOpacity:.7}
            case 2: return {color: "#97caed", weight:1, fillOpacity:.7}
            case 3: return {color: "#63b0e3", weight:1, fillOpacity:.7}
            case 4: return {color: "#2280bf", weight:1, fillOpacity:.7}
            case 5: return {color: "#0f3a57", weight:1, fillOpacity:.7}
        }
    }
});

// Rezago Social

function getPercentageSoc (feature) {
    if (feature.properties.GRS10 == 'Muy bajo') {
        return 1
    }
    else if (feature.properties.GRS10 == 'Bajo') {
        return 2
    }
    else if (feature.properties.GRS10 == 'Medio') {
        return 3
    }
    else if (feature.properties.GRS10 == 'Alto') {
        return 4
    }
    else if (feature.properties.GRS10 == 'Muy alto') {
        return 5
    }
};

var rezagoSoc = L.geoJSON(rezagoSoc, {
    style: function(feature) {
        switch (getPercentageSoc(feature)) {
            case 1: return {color: "#daf2da", weight:1, fillOpacity:.7}
            case 2: return {color: "#98d998", weight:1, fillOpacity:.7}
            case 3: return {color: "#60bf60", weight:1, fillOpacity:.7}
            case 4: return {color: "#32a632", weight:1, fillOpacity:.7}
            case 5: return {color: "#008000", weight:1, fillOpacity:.7}
        }
    }
});

// Municipios

function popup(feature, layer) {
    if (feature.properties && feature.properties.NOM_MUN) {
        layer.bindTooltip("<h4>" + feature.properties.NOM_MUN+ "</h4>");
    }
}

var municipios = L.geoJSON(municipios, {
    style: function(feature) {
        return {
            color: 'black',
            weight:1,
            opacity: 1,
            fillOpacity: 0
        };
    },
    onEachFeature: popup
}).addTo(map);



// Arreglo final

var capasAdicionales = {
    "Municipios":municipios,
    "Universidades Públicas":uniPub,
    "Universidades Privadas":uniPriv,
    "Rezago Educativo":rezagoEdu,
    "Nivel de pobreza":pobreza,
    "Rezago Social":rezagoSoc,
};

var capasBase = {
    "Mapa": mapa,
    "Satélite": satelite,
    "Híbrido": hibrido,
};

L.control.layers(capasBase, capasAdicionales).addTo(map);

map.on("overlayadd", function (event) {
	municipios.bringToFront();
});