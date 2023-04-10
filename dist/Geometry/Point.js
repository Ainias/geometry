"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const js_helper_1 = require("@ainias42/js-helper");
const Rect_1 = require("./Rect");
const GeometryBase_1 = require("./GeometryBase");
class Point extends GeometryBase_1.GeometryBase {
    constructor(x, y, precision) {
        super(precision);
        this.x = js_helper_1.Helper.nonNull(this._roundToPrecision(x), 0);
        this.y = js_helper_1.Helper.nonNull(this._roundToPrecision(y), 0);
    }
    getX() {
        return this._round(this.x);
    }
    getY() {
        return this._round(this.y);
    }
    copy() {
        return new Point(this.x, this.y, this._precision);
    }
    multiply(factorOrPoint) {
        let factorX;
        let factorY;
        if (factorOrPoint instanceof Point) {
            factorX = factorOrPoint.x;
            factorY = factorOrPoint.y;
        }
        else {
            factorX = factorOrPoint;
            factorY = factorOrPoint;
        }
        this.x = this._roundToPrecision(this.x * factorX);
        this.y = this._roundToPrecision(this.y * factorY);
        return this;
    }
    crossProduct(other) {
        return this._round(this.x * other.y - this.y * other.x);
    }
    scalarProduct(other) {
        return this.copy().multiply(other.copy()).sumOfParts();
    }
    normalize() {
        if (this.x === 0 && this.y === 0) {
            return this;
        }
        return this.divide(this.length());
    }
    divide(dividerOrPoint) {
        let dividerX;
        let dividerY;
        if (dividerOrPoint instanceof Point) {
            dividerX = dividerOrPoint.x;
            dividerY = dividerOrPoint.y;
        }
        else {
            dividerX = dividerOrPoint;
            dividerY = dividerOrPoint;
        }
        this.x = this._roundToPrecision(this.x / dividerX);
        this.y = this._roundToPrecision(this.y / dividerY);
        return this;
    }
    sumOfParts() {
        return this._round(this.x + this.y);
    }
    productOfParts() {
        return this._round(this.x * this.y);
    }
    round(onDecimal) {
        onDecimal = js_helper_1.Helper.nonNull(onDecimal, 0);
        let multiplier = Math.pow(10, onDecimal);
        this.x = Math.round(this.x * multiplier) / multiplier;
        this.y = Math.round(this.y * multiplier) / multiplier;
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
    add(xOrPoint, y) {
        if (xOrPoint instanceof Point) {
            y = xOrPoint.y;
            xOrPoint = xOrPoint.x;
        }
        this.x = this._roundToPrecision(this.x + xOrPoint);
        this.y = this._roundToPrecision(this.y + y);
        return this;
    }
    addX(x) {
        if (x instanceof Point) {
            x = x.x;
        }
        this.x = this._roundToPrecision(this.x + x);
        return this;
    }
    addY(y) {
        if (y instanceof Point) {
            y = y.y;
        }
        this.y = this._roundToPrecision(this.y + y);
        return this;
    }
    subtract(xOrPoint, y) {
        if (xOrPoint instanceof Point) {
            y = xOrPoint.y;
            xOrPoint = xOrPoint.x;
        }
        this.x = this._roundToPrecision(this.x - xOrPoint);
        this.y = this._roundToPrecision(this.y - y);
        return this;
    }
    subtractX(x) {
        if (x instanceof Point) {
            x = x.x;
        }
        this.x = this._roundToPrecision(this.x - x);
        return this;
    }
    subtractY(y) {
        if (y instanceof Point) {
            y = y.y;
        }
        this.y = this._roundToPrecision(this.y - y);
        return this;
    }
    set(xOrPoint, y) {
        if (xOrPoint instanceof Point) {
            y = xOrPoint.y;
            xOrPoint = xOrPoint.x;
        }
        this.x = this._roundToPrecision(xOrPoint);
        this.y = this._roundToPrecision(y);
        return this;
    }
    setX(x) {
        this.x = this._roundToPrecision(x);
        return this;
    }
    setY(y) {
        this.y = this._roundToPrecision(y);
        return this;
    }
    abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }
    isNaN() {
        return (isNaN(this.x) || isNaN(this.y));
    }
    smallerValuesThan(other) {
        return this.x < other.x && this.y < other.y;
    }
    smallerEqualValuesThan(other) {
        return this.x <= other.x && this.y <= other.y;
    }
    greaterValuesThan(other) {
        return this.x > other.x && this.y > other.y;
    }
    greaterEqualValuesThan(other) {
        return this.x >= other.x && this.y >= other.y;
    }
    smallerXThan(xOrOther) {
        if (xOrOther instanceof Point) {
            xOrOther = xOrOther.x;
        }
        return this.x < xOrOther;
    }
    smallerYThan(yOrOther) {
        if (yOrOther instanceof Point) {
            yOrOther = yOrOther.y;
        }
        return this.y < yOrOther;
    }
    greaterXThan(xOrOther) {
        if (xOrOther instanceof Point) {
            xOrOther = xOrOther.x;
        }
        return this.x > xOrOther;
    }
    greaterYThan(yOrOther) {
        if (yOrOther instanceof Point) {
            yOrOther = yOrOther.y;
        }
        return this.y > yOrOther;
    }
    smallerEqualXThan(xOrOther) {
        return !this.greaterXThan(xOrOther);
    }
    smallerEqualYThan(yOrOther) {
        return !this.greaterYThan(yOrOther);
    }
    greaterEqualXThan(xOrOther) {
        return !this.smallerXThan(xOrOther);
    }
    greaterEqualYThan(yOrOther) {
        return !this.smallerYThan(yOrOther);
    }
    equals(other, delta) {
        if (!(other instanceof Point)) {
            return false;
        }
        delta = js_helper_1.Helper.nonNull(delta, 0);
        let diff = this.copy().subtract(other).abs();
        return diff.getX() <= delta && diff.getY() <= delta;
        // return this.x === other.x && this.y === other.y;
    }
    bound(rect) {
        if (rect instanceof Point) {
            rect = new Rect_1.Rect(new Point(0, 0), rect.copy());
        }
        this.x = Math.max(rect.p1.x, Math.min(rect.p2.x, this.x));
        this.y = Math.max(rect.p1.y, Math.min(rect.p2.y, this.y));
        return this;
    }
    swapDimensions() {
        let tmp = this.x;
        this.x = this.y;
        this.y = tmp;
        return this;
    }
    length() {
        return this._round(Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)));
    }
    toArray() {
        return [this.x, this.y];
    }
    rotate(angle, rotationPoint) {
        rotationPoint = js_helper_1.Helper.nonNull(rotationPoint, new Point(0, 0));
        this.subtract(rotationPoint);
        this.transform(Math.cos(angle), -Math.sin(angle), 0, Math.sin(angle), Math.cos(angle), 0);
        // let oldX = this.x;
        //
        // this.x = this.x *  - this.y * Math.sin(angle);
        // this.y = oldX * Math.sin(angle) + this.y * Math.cos(angle);
        this.add(rotationPoint);
        return this;
    }
    sign() {
        let sign = new Point(0, 0);
        if (this.x < 0) {
            sign.x = -1;
        }
        else if (this.x > 0) {
            sign.x = 1;
        }
        if (this.y < 0) {
            sign.y = -1;
        }
        else if (this.y > 0) {
            sign.y = 1;
        }
        return sign;
    }
    transform(m11, m12, m13, m21, m22, m23) {
        let xOld = this.x;
        this.x = this._roundToPrecision(xOld * m11 + this.y * m12 + m13);
        this.y = this._roundToPrecision(xOld * m21 + this.y * m22 + m23);
        return this;
    }
    static singleFromArray(pointArray) {
        if (pointArray.length >= 2) {
            return new Point(pointArray[0], pointArray[1]);
        }
        return null;
    }
    static fromJson(pointJson) {
        return new Point(pointJson.x, pointJson.y, pointJson._precision);
    }
    static fromArray(array) {
        return array.map(pointArray => Point.singleFromArray(pointArray));
    }
    static toArray(points) {
        return points.map(p => p.toArray());
    }
    static max(...points) {
        let x = [];
        let y = [];
        points.forEach(p => {
            x.push(p.x);
            y.push(p.y);
        });
        return new Point(Math.max(...x), Math.max(...y));
    }
    static min(...points) {
        let x = [];
        let y = [];
        points.forEach(p => {
            x.push(p.x);
            y.push(p.y);
        });
        return new Point(Math.min(...x), Math.min(...y));
    }
    static indexOf(pointArray, point, fromIndex) {
        let index = -1;
        fromIndex = js_helper_1.Helper.nonNull(fromIndex, 0);
        pointArray.some((p, i) => {
            if (i >= fromIndex && p.equals(point)) {
                index = i;
                return true;
            }
        });
        return index;
    }
    static angleOf(p1, p2) {
        let scalarProduct = p1.copy().normalize().scalarProduct(p2.copy().normalize());
        let angle = Math.acos(Math.max(Math.min(scalarProduct, 1), -1));
        if (p1.crossProduct(p2) > 0) {
            angle = 2 * Math.PI - angle;
        }
        return angle;
    }
}
exports.Point = Point;
//# sourceMappingURL=Point.js.map