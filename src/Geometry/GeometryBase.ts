import {Helper} from "js-helper/dist/shared/Helper";

export class GeometryBase {
    _precision: any;

    // static precision: number = 1000;
    static precision: number = 10000;


    constructor(precision?: number) {
        this._precision = precision;
        // this._precision = Helper.nonNull(precision, 100000000);
        // this._precision = 10000000000;
    }

    setPrecision(precision){
        this._precision = precision;
    }

    _roundToPrecision(val, precision?){
        precision = Helper.nonNull(precision, this._precision, GeometryBase.precision);
        // return Math.floor(val*precision)/precision;
        return Math.round(val*precision)/precision;
    }

    _round(val){
        return Math.round(val);
    }
}