// constants
const operationalStatuses = {
    GREEN: 'green',
    YELLOW: 'yellow',
    RED: 'red'
};

// TODO: Move this enum to be pulled from some source
var operationalStatus = operationalStatuses.RED;

// data

//var items = new kendo.data.DataSource({
//    schema: 
//    { 
//        model: {} 
//    },
//    transport: 
//    { 
//        read: 
//        { 
//            url:  "/data/menu.json", 
//            dataType: "json" 
//        } 
//    }
//});

var menu = [
    {
        "id": 1,
        "name": "Sashimi salad",
        "price": 12.0,
        "image": "sashimi-salad.jpg",
        "category": "Cold starters",
        "description": "Organic greens topped with fresh sashimi, wasabi soy vinaigrette.",
        "featured": true,
        "stats": {
            "protein": 2.9156,
            "fat": 2.4396,
            "carbohydrate": 3.8071,
            "energy": 17.5775,
            "sugar": 0.3738
        }
    },
    {
        "id": 2,
        "name": "Chirashi sushi",
        "price": 21.0,
        "image": "chirashi-sushi.jpg",
        "category": "Cold starters",
        "description": "Sushi bar variety with sushi rice.",
        "featured": false,
        "stats": {
            "protein": 2.3138,
            "fat": 0.6041,
            "carbohydrate": 7.8006,
            "energy": 7.5314,
            "sugar": 0.3114
        }
    },
    {
        "id": 3,
        "name": "Seaweed salad",
        "price": 17.0,
        "image": "seaweed-salad.jpg",
        "category": "Cold starters",
        "description": "A nice seaweed salad.",
        "featured": true,
        "stats": {
            "protein": 0.229,
            "fat": 2.2852,
            "carbohydrate": 4.8824,
            "energy": 5.1003,
            "sugar": 0.0037
        }
    },
    {
        "id": 4,
        "name": "Edamame",
        "price": 4.0,
        "image": "edamame.jpg",
        "category": "Warm Starters",
        "description": "Boiled soy beans with salt ",
        "featured": true,
        "stats": {
            "protein": 0.7436,
            "fat": 1.9771,
            "carbohydrate": 0.674,
            "energy": 17.294,
            "sugar": 0.1028
        }
    },
    {
        "id": 5,
        "name": "Miso soup",
        "price": 4.0,
        "image": "miso-soup.jpg",
        "category": "Warm Starters",
        "description": "Soy bean soup with Wacame seaweed, tofu and spring onion.",
        "featured": false,
        "stats": {
            "protein": 2.7642,
            "fat": 2.1552,
            "carbohydrate": 9.5294,
            "energy": 9.393,
            "sugar": 0.1399
        }
    },
    {
        "id": 6,
        "name": "Maguro",
        "price": 12.5,
        "image": "maguro.jpg",
        "category": "Sashimi",
        "description": "Tuna pieces.",
        "featured": true,
        "stats": {
            "protein": 2.2293,
            "fat": 0.7329,
            "carbohydrate": 0.0618,
            "energy": 28.2176,
            "sugar": 0.4018
        }
    },
    {
        "id": 7,
        "name": "Shake",
        "price": 10.0,
        "image": "shake.jpg",
        "category": "Sashimi",
        "description": "",
        "featured": false,
        "stats": {
            "protein": 1.4804,
            "fat": 1.4739,
            "carbohydrate": 0.2237,
            "energy": 16.9406,
            "sugar": 0.245
        }
    },
    {
        "id": 8,
        "name": "Shiromi",
        "price": 9.5,
        "image": "shiromi.jpg",
        "category": "Sashimi",
        "description": "White fish pieces.",
        "featured": false,
        "stats": {
            "protein": 0.2814,
            "fat": 1.3963,
            "carbohydrate": 1.5973,
            "energy": 16.4487,
            "sugar": 0.0509
        }
    },
    {
        "id": 9,
        "name": "Tekka maki",
        "price": 6.0,
        "image": "tekka-maki.jpg",
        "category": "Hosomaki",
        "description": "Tuna roll with wasabi. - 6 pieces",
        "featured": true,
        "stats": {
            "protein": 0.9559,
            "fat": 1.6395,
            "carbohydrate": 7.4319,
            "energy": 9.7847,
            "sugar": 0.4771
        }
    },
    {
        "id": 10,
        "name": "Hosomaki Mix",
        "price": 17.0,
        "image": "hosomaki-mix.jpg",
        "category": "Hosomaki",
        "description": "18 pieces.",
        "featured": false,
        "stats": {
            "protein": 2.683,
            "fat": 2.858,
            "carbohydrate": 1.6309,
            "energy": 23.8901,
            "sugar": 0.4839
        }
    },
    {
        "id": 11,
        "name": "California rolls",
        "price": 7.75,
        "image": "california-rolls.jpg",
        "category": "Traditionall Rolls",
        "description": "Crab sticks, avocado and cucumber. - 8 pieces",
        "featured": true,
        "stats": {
            "protein": 0.848,
            "fat": 0.1205,
            "carbohydrate": 3.6646,
            "energy": 18.6541,
            "sugar": 0.0174
        }
    }
];
var items = new kendo.data.DataSource({
    data: menu
});

// models
var cart = kendo.observable({
    total: function() {
        var price = 0,
            contents = this.get("contents"),
            length = contents.length,
            i = 0;

        for (; i < length; i ++) {
            price += parseInt(contents[i].item.price) * contents[i].quantity;
        }

        return kendo.format("{0:c}", price);
    }
});

var layoutModel = kendo.observable({
    cart: cart
});

var indexModel = kendo.observable({
    items: items,
    cart: cart,
//operationalStatus: operationalStatus,
    thirdParties: []
});


// Views and layouts
var layout = new kendo.Layout("layout-template", { model: layoutModel });
var index = new kendo.View("index-template", { model: indexModel });

var sushi = new kendo.Router({
    init: function() {
        console.log("router init");
        layout.render("#application");
    }
});

// Routing
sushi.route("/", function() {
    console.log("router root route");

    layout.showIn("#content", index);
    
    var template = kendo.template("<div class='page-status #= status#'>#= text #</div>");
    var data = { status: operationalStatus, text: GetStatusText(operationalStatus) }; 
    var result = template(data);
    $("#status").html(result);
});

function GetStatusText(status) {
    switch (status) {
        case operationalStatuses.GREEN:
            return "All Systems Operational";
        case operationalStatuses.YELLOW:
            return "Some System Degradation";
        case operationalStatuses.RED:
            return "Severe System Outage";
    }
}

$(function() {
    sushi.start();
});
