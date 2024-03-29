"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
const Point_1 = require("./Point");
const js_helper_1 = require("@ainias42/js-helper");
const GeometryBase_1 = require("./GeometryBase");
class Rect extends GeometryBase_1.GeometryBase {
    constructor(p1, p2, precision) {
        super(precision);
        this.p1 = new Point_1.Point();
        this.p2 = new Point_1.Point();
        this.set(p1, p2);
    }
    containsPoint(point) {
        return !(point.x < this.p1.x || point.y < this.p1.y || point.x > this.p2.x || point.y > this.p2.y);
    }
    set(p1, p2) {
        p1 = js_helper_1.Helper.nonNull(p1, this.p1);
        p2 = js_helper_1.Helper.nonNull(p2, this.p2);
        this.p1.set(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
        this.p2.set(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y));
        return this;
    }
    multiply(pointOrFactor) {
        if (!(pointOrFactor instanceof Point_1.Point)) {
            pointOrFactor = new Point_1.Point(pointOrFactor, pointOrFactor);
        }
        this.p1.multiply(pointOrFactor);
        this.p2.multiply(pointOrFactor);
        return this;
    }
    add(point) {
        let newP2 = this.p2.copy().add(point);
        this.set(this.p1, newP2);
        console.log("n", this.p1, this.p2);
        return this;
    }
    isOverlapping(other) {
        return !((this.p2.x <= other.p1.x) ||
            (this.p1.x >= other.p2.x) ||
            (this.p2.y <= other.p1.y) ||
            (this.p1.y >= other.p2.y));
    }
    isInside(...points) {
        return points.every(point => {
            return this.p1.smallerEqualValuesThan(point) && this.p2.greaterEqualValuesThan(point);
        });
    }
    moveAt(value) {
        this.p1.add(value);
        this.p2.add(value);
        return this;
    }
    getOverlappingRect(other) {
        if (!this.isTouching(other)) {
            return new Rect();
        }
        return new Rect(Point_1.Point.max(this.p1, other.p1), Point_1.Point.min(this.p2, other.p2));
    }
    getArea() {
        return this.getDimension().productOfParts();
    }
    getDimension() {
        return this.p2.copy().subtract(this.p1);
    }
    copy() {
        return new Rect(this.p1, this.p2);
    }
    isTouching(other) {
        return !((this.p2.x < other.p1.x) ||
            (this.p1.x > other.p2.x) ||
            (this.p2.y < other.p1.y) ||
            (this.p1.y > other.p2.y));
    }
    equals(other) {
        return this.p1.equals(other.p1)
            && this.p2.equals(other.p2);
    }
    getCenter() {
        return this.p1.copy().add(this.p2.copy().subtract(this.p1).divide(2));
    }
    getPoints() {
        return [this.p1.copy(), this.p1.copy().setX(this.p2.x), this.p2.copy(), this.p2.copy().setX(this.p1.x)];
    }
    getXDiff() {
        return this.p2.x - this.p1.x;
    }
    getYDiff() {
        return this.p2.y - this.p1.y;
    }
    static fromJson(json) {
        return new Rect(Point_1.Point.fromJson(json.p1), Point_1.Point.fromJson(json.p2));
    }
}
exports.Rect = Rect;
//# sourceMappingURL=Rect.js.map