import {Helper} from "js-helper/dist/shared/Helper";

export class GeometryBase {
    _precision: any;
    _roundFactor: any;

    // static precision: number = 1000;
    static precision: number = 1000000000000;
    static roundFactor: number = 10000;
    // static roundFactor: number = 1;


    constructor(precision?: number, _roundFactor?: number) {
        this._precision = precision;
        this._roundFactor = _roundFactor;
    }

    setPrecision(precision){
        this._precision = precision;
    }

    _roundToPrecision(val, precision?){
        precision = Helper.nonNull(precision, this._precision, GeometryBase.precision);
        return Math.round(val*precision)/precision;
    }

    _round(val){
        // return this._roundToPrecision(val, Helper.nonNull(this._roundFactor, GeometryBase.roundFactor));
        let precision = Helper.nonNull(this._roundFactor, GeometryBase.roundFactor);
        return Math.round(val*precision)/precision;
    }

    static round(val, precision?){
        precision = Helper.nonNull(precision, GeometryBase.roundFactor);
        return Math.round(val*precision)/precision;
    }

    static roundToPrecision(val, precision?){
        precision = Helper.nonNull(precision, GeometryBase.precision);
        return Math.round(val*precision)/precision;
    }
}