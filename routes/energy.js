//Dependencies
var eebSqlite3 = require('../lib/eeb_sqlite3.js');
var fs = require('fs');


//Starter Test Variables
var database = 'test/Output/baseline.sql';

//SQL Parsing Functions
function getEnergyUseData(sqlFile, fn) {
    var energy = {
        electricity: {
            pumps :[],
            fans : [],
            cooling : [],
            interiorLighting: [],
            interiorEquipment:[],
            heating :[],
            exteriorLighting:[],
            heatRejection:[],
            humidification:[],
            heatingRecovery:[],
            waterSystems:[],
            refrigeration:[],
            generation:[]
        },
        gas: [{
            cooling : [],
            interiorEquipment:[],
            heating :[],
            waterSystems:[],
            generation:[]
        }],
        
    };
    eebSqlite3.getValuesByMonthly('END USE ENERGY CONSUMPTION ELECTRICITY MONTHLY', 'Meter', '', '%', database, function(results) {
        energy.electricity = results;

        eebSqlite3.getValuesByMonthly('END USE ENERGY CONSUMPTION NATURAL GAS MONTHLY', 'Meter', '', '%', database, function(results) {
            energy.gas = results;
            
            /*energy.gas.forEach(function(row){
                if (row.curColumnName == 'HEATING:GAS'){
                    energy.gas.heating.push(row.value);
                }else if(row.curColumnName == 'COOLING:GAS'){
                     energy.gas.cooling.push(row.value);
                }else if(row.curColumnName == 'INTERIOREQUIPMENT:GAS'){
                     energy.gas.interiorEquipment.push(row.value);
                }else if(row.curColumnName == 'WATERSYSTEMS:GAS'){
                     energy.gas.waterSystems.push(row.value);
                }else {
                     energy.gas.generation.push(row.value);
                }
            });  
            energy.electricity.forEach(function(row){
                if (row.curColumnName == 'HEATING:ELECTRICITY'){
                    energy.electricity.heating.push(row.value);
                }else if(row.curColumnName == 'COOLING:ELECTRICITY'){
                     energy.electricity.cooling.push(row.value);
                }else if(row.curColumnName == 'PUMPS:ELECTRICITY'){
                     energy.electricity.pumps.push(row.value);
                }else if(row.curColumnName == 'FANS:ELECTRICITY'){
                     energy.electricity.fans.push(row.value);
                }else if(row.curColumnName == 'INTERIORLIGHTS:ELECTRICITY'){
                     energy.electricity.interiorLighting.push(row.value);
                }else if(row.curColumnName == 'INTERIOREQUIPMENT:ELECTRICITY'){
                     energy.electricity.interiorEquipment.push(row.value);
                }else if(row.curColumnName == 'EXTERIORLIGHTING:ELECTRICITY'){
                     energy.electricity.exteriorLighting.push(row.value);
                }else if(row.curColumnName == 'HEATREJECTION:ELECTRICITY'){
                     energy.electricity.heatRejection.push(row.value);
                }else if(row.curColumnName == 'HUMIDIFIER:ELECTRICITY'){
                     energy.electricity.humidification.push(row.value);
                }else if(row.curColumnName == 'HEATRECOVERY:ELECTRICITY'){
                     energy.electricity.heatingRecovery.push(row.value);
                }else if(row.curColumnName == 'WATERSYSTEMS:ELECTRICITY'){
                     energy.electricity.waterSystems.push(row.value);
                }else if(row.curColumnName == 'REFIGERATION:ELECTRICITY'){
                     energy.electricity.refrigeration.push(row.value);
                }else {
                     energy.electricity.generation.push(row.value);
                }
            });  */
            
            fn(energy);

        });
    });
}



//Routing
module.exports = {
    getEnergyUse: function(request, response) {

        getEnergyUseData(database, function(energy) {
            
            response.render('energy-use', {
                energy: energy
            });

        });
    }
};
