import {Helper} from "js-helper/dist/shared/Helper";
import {Point} from "./Point";

export class Line {

    p1: Point;
    p2: Point;
    _gradient: number;

    constructor(p1, p2) {
        this.set(p1, p2);
    }

    length() {
        return this.p1.copy().substract(this.p2).length();
    }

    getGradient() {
        return this._gradient;
    }

    set(p1, p2) {
        this.p1 = Helper.nonNull(p1, this.p1);
        this.p2 = Helper.nonNull(p2, this.p2);

        let diff = this.p2.copy().substract(this.p1);

        if (diff.x === 0) {
            this._gradient = Infinity;
        } else {
            this._gradient = diff.y / diff.x
        }
    }

    equals(other, direction) {
        direction = Helper.nonNull(direction, true);
        return (this.p1.equals(other.p1) && this.p2.equals(other.p2)) || (!direction && this.p1.equals(other.p2) && this.p2.equals(other.p1))
    }

    containsPoint(p) {
        let diff = p.copy().substract(this.p1);
        let diffLine = this.p2.copy().substract(this.p1);
        if (this._gradient === Infinity) {
            if (diff.x !== 0) {
                return false;
            }
        } else if (this._gradient === 0) {
             return (diff.y === 0 && ((p.x >= this.p1.x && p.x <= this.p2.x) || (p.x <= this.p1.x && p.x >= this.p2.x)));
        } else if (this.p1.y + diff.x * this._gradient !== p.y) {
            return false;
        }
        let diffY = diffLine.y;
        return ((diffY <= 0 && diff.y <= 0) || ((diffY >= 0 && diff.y >= 0))) && Math.abs(diffY) >= Math.abs(diff.y);
    }

    getIntersectionPointsWith(other) {
        let vector = this.getVector(); //r
        let otherVector = other.getVector(); //s

        let diff = other.p1.copy().substract(this.p1); //(q-p)

        let diffCross1 = diff.crossProduct(otherVector); //(q-p) x s
        let diffCross2 = diff.crossProduct(vector); //(q-p) x r
        let vectorCross1 = vector.crossProduct(otherVector); //rxs

        if (vectorCross1 === 0) {
            if (diffCross2 !== 0) {
                return [];
            }

            let factorStart0 = diff.scalarProduct(vector) / vector.scalarProduct(vector); //(q-p)*r/(r*r)
            let factorStart1 = factorStart0 + (otherVector.scalarProduct(vector) / vector.scalarProduct(vector))// (q-p+s)*r/(r*r)

            let points = [];
            //check if intersecting
            if ((factorStart0 >= 0 && factorStart0 <= 1) || (factorStart1 >= 0 && factorStart1 <= 1)) {
                if (factorStart0 >= 0 && factorStart0 <= 1) {
                    points.push(this.p1.copy().add(vector.copy().multiply(factorStart0)).round(10));
                } else if (factorStart0 < 0) {
                    points.push(this.p1)
                } else {
                    points.push(this.p2);
                }
                if (factorStart1 >= 0 && factorStart1 <= 1) {
                    points.push(this.p1.copy().add(vector.copy().multiply(factorStart1).round(10)));
                } else if (factorStart1 < 0) {
                    points.push(this.p1)
                } else {
                    points.push(this.p2);
                }
            }
            return points;
        } else {
            let factor1 = diffCross1 / vectorCross1; //t
            let factor2 = diffCross2 / vectorCross1; //s

            if (factor1 >= 0 && factor1 <= 1 && factor2 >= 0 && factor2 <= 1) {
                return [this.p1.copy().add(vector.multiply(factor1))];
            }
        }
        return [];
    }

    getVector() {
        return this.p2.copy().substract(this.p1)
    }

    combine(other){
        if (Math.abs(other._gradient) !== Math.abs(this._gradient)){
            return [this, other];
        }

        let intersectionPoints = this.getIntersectionPointsWith(other);
        if (intersectionPoints.length > 0){
            //Should be exactly 2
            let points = [other.p1, other.p2, this.p1, this.p2].filter(p => Point.indexOf(intersectionPoints, p) !== -1);
            return [new Line(points[0], points[1])];
        }
        else {
            return [this, other];
        }
    }

    getCenter(){
        return this.p1.copy().add(this.getVector().divide(2));
    }

    static combineArrays(lines, linesOther){
        let oldLines = linesOther;
        lines.forEach(line => {
            let newLines = [];
            oldLines.forEach(l => {
                let combinedLines = line.combine(l);
                if (combinedLines.length === 1){
                    line = combinedLines[0];
                }
                else {
                    newLines.push(combinedLines[1]);
                }
            });
            newLines.push(line);
            oldLines = newLines;
        });
        return oldLines;
    }
}