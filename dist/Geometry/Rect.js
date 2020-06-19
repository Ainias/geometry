"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
const Point_1 = require("./Point");
const Helper_1 = require("js-helper/dist/shared/Helper");
const GeometryBase_1 = require("./GeometryBase");
class Rect extends GeometryBase_1.GeometryBase {
    constructor(p1, p2, precision) {
        super(precision);
        this.p1 = new Point_1.Point();
        this.p2 = new Point_1.Point();
        this.set(p1, p2);
    }
    set(p1, p2) {
        p1 = Helper_1.Helper.nonNull(p1, this.p1);
        p2 = Helper_1.Helper.nonNull(p2, this.p2);
        this.p1.set(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
        this.p2.set(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y));
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
        return this.p2.copy().substract(this.p1);
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
}
exports.Rect = Rect;
//# sourceMappingURL=Rect.js.map