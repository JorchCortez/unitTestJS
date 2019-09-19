/*Regulador.js*/
var Regulador = function(sensor){ 
    this.sensor = sensor;
};

Regulador.prototype = {
    measure: function(){

        var gases = this.sensor.getGasses();
        var o = 15 - gases.oxygen;
        
        var co = (gases.co2 > 8) ? 8 -gases.co2 : 0;

        return {
            oxygen: o,
            co2: co
        }
    }
}

module.exports = Regulador;