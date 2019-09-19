var assert = require('assert');
var expect = require('chai').expect; 
var GasSensor = require('../lib/GasSensor');  
var Regulador = require('../Regulador');   

describe('Regulador test 1', () => {

    var sensor = null;
    beforeEach(function(){
        var DummySensor = function() {}

        DummySensor.prototype = {
            getGasses: () => {
                return null
            }
        }

        sensor = new DummySensor();
    })

    it('Should return Ox Adjustment + 5 when Ox = 10',() =>{
        
        sensor.getGasses = () => {
            return {oxygen: 10};
        }

        var regulador = new Regulador(sensor);
        var Adjustment = regulador.measure();

        expect(Adjustment.oxygen).to.equals(5);

    })

    it('Should return Ox Adjustment + 10 when Ox = 5',() =>{ 

        sensor.getGasses = () => {
            return {oxygen: 5};
        }

        var regulador = new Regulador(sensor);
        var Adjustment = regulador.measure();

        expect(Adjustment.oxygen).to.equals(10);

    })

    it('Should return Ox Adjustment -20 when Ox = 35',() =>{ 

        sensor.getGasses = () => {
            return {oxygen: 35};
        }

        var regulador = new Regulador(sensor);
        var Adjustment = regulador.measure();

        expect(Adjustment.oxygen).to.equals(-20);

    })

    it('Should return CO2 Adjustment -5 when CO2 = 13',() =>{ 

        sensor.getGasses = () => {
            return {co2: 13};
        }

        var regulador = new Regulador(sensor);
        var Adjustment = regulador.measure();

        expect(Adjustment.co2).to.equals(-5);
        

    })

    it('Should return CO2 Adjustment of 0 when CO2 <= 8',() =>{ 

        sensor.getGasses = () => {
            return {co2: 6};
        }

        var regulador = new Regulador(sensor);
        var Adjustment = regulador.measure();

        expect(Adjustment.co2).to.equals(0);

    })

    it('Should return Oxygen Adjustment of + 6 and CO2 Adjustment of 0 when Oxygen = 9 and CO2 <= 8',() =>{ 

        sensor.getGasses = () => {
            return {co2: 6, oxygen: 9};
        }

        var regulador = new Regulador(sensor);
        var Adjustment = regulador.measure();

        expect(Adjustment.co2).to.equals(0);
        expect(Adjustment.oxygen).to.equals(6)

    })
})