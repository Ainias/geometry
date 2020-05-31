import {Point} from "./Point";
import {Helper} from "js-helper/dist/shared/Helper";

export class Rect {

    p1: Point;
    p2: Point;

    constructor(p1?, p2?) {
        this.p1 = new Point();
        this.p2 = new Point();
        this.set(p1, p2);
    }

    set(p1?, p2?) {
        p1 = Helper.nonNull(p1, this.p1);
        p2 = Helper.nonNull(p2, this.p2);

        this.p1.set(
            Math.min(p1.x, p2.x),
            Math.min(p1.y, p2.y),
        );
        this.p2.set(
            Math.max(p1.x, p2.x),
            Math.max(p1.y, p2.y),
        );

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
        })
    }

    moveAt(value) {
        this.p1.add(value);
        this.p2.add(value);
    }

    getOverlappingRect(other) {
        if (!this.isTouching(other)) {
            return new Rect();
        }
        return new Rect(Point.max(this.p1, other.p1), Point.min(this.p2, other.p2));
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

    equals(other, delta) {
        return this.p1.equals(other.p1, delta)
            && this.p2.equals(other.p2, delta);
    }

    splitIntoSingleRects() {
        let singleRects = [];
        for (let x = this.p1.x; x < this.p2.x; x++) {
            for (let y = this.p1.y; y < this.p2.y; y++) {
                singleRects.push(new Rect(new Point(x, y), new Point(x + 1, y + 1)));
            }
        }
        return singleRects;
    }

    forEachPoint(callback) {
        for (let x = this.p1.x; x <= this.p2.x; x++) {
            for (let y = this.p1.y; y <= this.p2.y; y++) {
                callback(new Point(x, y), this);
            }
        }
    }

    every(callback) {
        for (let x = this.p1.x; x <= this.p2.x; x++) {
            for (let y = this.p1.y; y <= this.p2.y; y++) {
                if (callback(new Point(x, y), this) !== true) {
                    return false;
                }
            }
        }
        return true;
    }

    some(callback) {
        for (let x = this.p1.x; x <= this.p2.x; x++) {
            for (let y = this.p1.y; y <= this.p2.y; y++) {
                if (callback(new Point(x, y), this) === true) {
                    return true;
                }
            }
        }
        return false;
    }

    static isInsideOneRect(rects, ...point) {
        return rects.some(rect => rect.isInside(...point));
    }

    static getCircumferencePath(rects, directions) {

        if (rects.length === 0) {
            return [];
        }

        rects.sort((a, b) => {
            return (a.p1.x > b.p1.x) ? 1 : ((a.p1.x < b.p1.x) ? -1 :
                ((a.p1.y > b.p1.y) ? 1 : ((a.p1.y < b.p1.y) ? -1 :
                    0)))
        });

        let from = rects[0].p1;

        let path = [];
        let pathEdges = [from];

        directions = Helper.nonNull(directions, [
            new Point(-1, 0),
            new Point(0, 1),
            new Point(1, 0),
            new Point(0, -1),
        ]);

        let directionIndex = 0;
        let newDirectionIndex = 0;

        let currentPos = from.copy();
        let p = null;
        do {

            if (![0, 1, 2, 3].some(i => {
                p = currentPos.copy().add(directions[(directionIndex + i) % 4]);
                newDirectionIndex = (directionIndex + i + 3) % 4;

                let pIndex = Point.indexOf(path, p);
                return (Rect.isInsideOneRect(rects, p, p.copy().add(1, 1)) && //Inside a rect
                    (pIndex <= 0 || !currentPos.equals(path[pIndex - 1]))); //not previously taken from current position
            })) {
                debugger;
                return [];
            }
            path.push(p);

            if (directionIndex !== newDirectionIndex) {
                pathEdges.push(currentPos);
            }

            directionIndex = newDirectionIndex;
            currentPos = p;
        } while (!currentPos.equals(from));

        return pathEdges;
    }
}