import {Helper} from "js-helper/dist/shared/Helper";

export class GeometryBase {
    _precision: number;


    constructor(precision?: number) {
        this._precision = Helper.nonNull(precision, 1000000000);
        // this._precision = 10000000000;
    }

    setPrecision(precision){
        this._precision = precision;
    }

    _roundToPrecision(val){
        return Math.round(val*this._precision)/this._precision;
    }
}