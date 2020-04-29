// constants
const STATUSES = {
    GREEN: 'green',
    YELLOW: 'yellow',
    RED: 'red'
};

// TODO: Move this enum to be pulled from some source
var currentOperationalStatus = STATUSES.RED;

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

var thirdPartyData = [
    {
        "id": 1,
        "name": "Sashimi salad",
        "status": STATUSES.GREEN,
        "image": "sashimi-salad.jpg",
    },
    {
        "id": 2,
        "name": "CFX",
        "image": "chirashi-sushi.jpg",
        "status": STATUSES.RED
    },
    {
        "id": 3,
        "name": "TF",
        "status": STATUSES.GREEN,
        "image": "seaweed-salad.jpg"
    },
    {
        "id": 4,
        "name": "MG",
        "status": STATUSES.YELLOW,
        "image": "edamame.jpg"
    },
    {
        "id": 5,
        "name": "WUBS",
        "status": STATUSES.GREEN,
        "image": "miso-soup.jpg"
    }
];

var thirdParties = new kendo.data.DataSource({
    data: thirdPartyData
});

var services = [
    {
        "id": 1,
        "name": "Navigator",
        "status": GetServiceStatusText(STATUSES.GREEN),
        "info": "Navigator web is up and running",
        "statusClass": "service-" + STATUSES.GREEN
    },
    {
        "id": 2,
        "name": "Admin",
        "status": GetServiceStatusText(STATUSES.YELLOW),
        "info": "Admin is always slowwwww",
        "statusClass": "service-" + STATUSES.YELLOW
    }
];

// models
var layoutModel = kendo.observable({
    statusClass: 'page-status ' + currentOperationalStatus,
    statusText: GetStatusText(currentOperationalStatus)
});

var indexModel = kendo.observable({
    items: thirdParties,
    services: services
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

    $("#grid").kendoGrid({
        dataSource: {
            data: services,
            schema: {
                model: {
                    fields: {
                        name: { type: "string" },
                        info: { type: "string" },
                        status: { type: "string" }
                    }
                }
            }
        },
        scrollable: false,
        sortable: false,
        filterable: false,
        rowTemplate: kendo.template($("#rowTemplate").html())
    });

    $("#grid").kendoTooltip({
        filter: ".k-icon",
        content: toolTip,
        position: "top"
    });
});

function toolTip(e) {
    var grid = $("#grid").getKendoGrid();
    var row = e.target.closest("tr")[0];
    var rowIdx = $("tr", grid.tbody).index(row);
    var data = grid.dataSource.at(rowIdx);

    return kendo.template($("#tooltip-template").html())({
        value: data.info
    });
}


function GetStatusText(status) {
    switch (status) {
        case STATUSES.GREEN:
            return "All Systems Operational";
        case STATUSES.YELLOW:
            return "Some System Degradation";
        case STATUSES.RED:
            return "Severe System Outage";
    }
}

function GetServiceStatusText(status) {
    switch (status) {
        case STATUSES.GREEN:
            return "Operational";
        case STATUSES.YELLOW:
            return "Degradation";
        case STATUSES.RED:
            return "Outage";
    }
}

$(function() {
    sushi.start();
});
