export declare class GeometryBase {
    _precision: any;
    _roundFactor: any;
    static precision: number;
    static roundFactor: number;
    constructor(precision?: number, _roundFactor?: number);
    setPrecision(precision: any): void;
    _roundToPrecision(val: any, precision?: any): number;
    _round(val: any): number;
    static round(val: any, precision?: any): number;
    static roundToPrecision(val: any, precision?: any): number;
}
