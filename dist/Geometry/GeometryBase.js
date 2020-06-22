"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeometryBase = void 0;
const Helper_1 = require("js-helper/dist/shared/Helper");
class GeometryBase {
    // static roundFactor: number = 1;
    constructor(precision, _roundFactor) {
        this._precision = precision;
        this._roundFactor = _roundFactor;
    }
    setPrecision(precision) {
        this._precision = precision;
    }
    _roundToPrecision(val, precision) {
        precision = Helper_1.Helper.nonNull(precision, this._precision, GeometryBase.precision);
        return Math.round(val * precision) / precision;
    }
    _round(val) {
        // return this._roundToPrecision(val, Helper.nonNull(this._roundFactor, GeometryBase.roundFactor));
        let precision = Helper_1.Helper.nonNull(this._roundFactor, GeometryBase.roundFactor);
        return Math.round(val * precision) / precision;
    }
    static round(val, precision) {
        precision = Helper_1.Helper.nonNull(precision, GeometryBase.roundFactor);
        return Math.round(val * precision) / precision;
    }
    static roundToPrecision(val, precision) {
        precision = Helper_1.Helper.nonNull(precision, GeometryBase.precision);
        return Math.round(val * precision) / precision;
    }
}
exports.GeometryBase = GeometryBase;
// static precision: number = 1000;
GeometryBase.precision = 1000000000000;
GeometryBase.roundFactor = 10000;
//# sourceMappingURL=GeometryBase.js.map