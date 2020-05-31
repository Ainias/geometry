import {Point} from "./Point";
import {Helper} from "js-helper/dist/shared/Helper";
import {Line} from "./Line";

export class Face {

    static COLLISION_INSIDE = 1;
    static COLLISION_INSIDE_OTHER = 2;
    static COLLISION_INTERSECTS = 3;
    static COLLISION_NO_INTERSECION = 4;

    _points;

    constructor(...points) {
        this.setPoints(points);
    }

    setPoints(points){
        if (points.length === 0){
            this._points = [];
            return;
        }

        let smallestIndex = -1;
        let smallestPoint = null;

        points.forEach((p, i) => {
            if (smallestPoint === null || p.x < smallestPoint.x || (p.x === smallestPoint.x && p.y < smallestPoint.y)){
                smallestPoint = p;
                smallestIndex = i;
            }
        });

        let indexBefore = (smallestIndex-1+points.length)%points.length;
        let indexAfter = (smallestIndex+1)%points.length;

        let hasToReverse = false;
        if (points[indexBefore].x < points[indexAfter].x || (points[indexBefore].x === points[indexAfter].x && points[indexBefore].y < points[indexAfter].y)){
            smallestIndex++;
            hasToReverse = true;
        }

        points.push(...points.splice(0,smallestIndex));
        if (hasToReverse){
            points = points.reverse();
        }
        this._points = points;
    }

    getLines() {
        let lines = [];
        this._points.forEach((p, i) => {
            lines.push(new Line(p, this._points[(i + 1) % this._points.length]))
        });
        return lines;
    }

    getPoints() {
        return this._points;
    }

    getLastPoint() {
        if (this._points.length > 0) {
            return this._points[this._points.length - 1];
        }
        return null;
    }

    split() {
        let newFaces = [];
        let oldPoints = this.getPoints();
        for (let i = 0; i < oldPoints.length; i++) {
            let p = oldPoints[i];
            let otherIndex = Point.indexOf(oldPoints, p, i + 1);
            if (otherIndex !== -1) {
                newFaces.push(...new Face(...oldPoints.splice(i + 1, otherIndex - i + 1)).split())
            }
        }
        newFaces.push(new Face(...oldPoints));
        return newFaces;
    }

    containsPoint(point) {
        let min = Point.min(...this._points);
        let max = Point.max(...this._points);

        if (point.x < min.x || point.y < min.y || point.x > max.x || point.y > max.y) {
            return false;
        }
        let line = new Line(new Point(min.x, point.y), point);

        let count = 0;
        this.getLines().some(l => {
            if (l.containsPoint(point)) {
                count = 1;
                return true;
            }
            if (line.getIntersectionPointsWith(l).length > 0) {
                count++;
            }
            return false;
        });
        return count % 2 === 1;
    }

    checkCollision(otherFace) {
        let [one, another] = Face._getFacesWithIntersectionPoints(this, otherFace);
        if (one === this) {
            if (one.containsPoint(another.getLastPoint())) { //If one contains another
                return Face.COLLISION_INSIDE;
            } else if (another.containsPoint(one.getLastPoint())) { //If another contains one
                return Face.COLLISION_INSIDE_OTHER;
            } else { //if none contains another
                return Face.COLLISION_NO_INTERSECION;
            }
        }
        return Face.COLLISION_INTERSECTS;
    }

    removeUnnecessaryPoints(){
        let lines = this.getLines();
        let points = [];
        lines.forEach((l, i) => {
            let nextLine = lines[(i+1)%lines.length];
            if (nextLine.getGradient() !== l.getGradient()){
                points.push(l.p2);
            }
        });
        this.setPoints(points);
        return this;
    }

    setminus(other) {
        let [one, another] = Face._getFacesWithIntersectionPoints(this, other);

        //No intersection found
        if (one === this) {
            if (one.containsPoint(another.getLastPoint())) { //If one contains another
                throw new Error("Should not be possible!");
            } else if (another.containsPoint(one.getLastPoint())) { //If another contains one
                return [];
            } else { //if none contains another
                return [this]
            }
        }

        let points = one.getPoints();
        let pointsOther = another.getPoints();

        //calculate startingPoint
        let reference = Point.min(...points, ...pointsOther);

        let lines = [];
        let possibleStartingPoints = [];
        points.forEach((p, i, points) => {
            let nextPoint = points[(i + 1) % points.length];
            let lineMiddle = p.copy().add(nextPoint.copy().substract(p).multiply(0.5));
            if (!another.containsPoint(lineMiddle)) {
                possibleStartingPoints.push(lineMiddle);
                lines.push(new Line(p, nextPoint));
            }
        });

        //Touching and therefore has intersection points, but this is fully in other
        if (possibleStartingPoints.length === 0) {
            return [];
        }

        let startingPointIndex = null;
        let smallestLength = null;

        possibleStartingPoints.forEach((p, i) => {
            let length = new Line(p, reference).length();
            if (smallestLength === null || length < smallestLength) {
                smallestLength = length;
                startingPointIndex = i;
            }
        });

        let startingPoint = possibleStartingPoints[startingPointIndex];
        let removedLine = lines.splice(startingPointIndex,1)[0];
        lines.push(new Line(removedLine.p1, startingPoint))
        lines.push(new Line(startingPoint, removedLine.p2));

        if (removedLine.p1.x !== removedLine.p2.x){
            reference = startingPoint.copy().substract(1,0);
            if (one.containsPoint(reference)){
                reference = startingPoint.copy().add(1,0);
            }
        }
        else {
            reference = startingPoint.copy().substract(0,1);
            if (one.containsPoint(reference)){
                reference = startingPoint.copy().add(0,1);
            }
        }

        pointsOther.forEach((p, i, points) => {
            let otherPoint = points[(i + 1) % points.length];
            if (one.containsPoint(p.copy().add(otherPoint.copy().substract(p).multiply(0.5)))) {
                lines.push(new Line(p, otherPoint));
            }
        })
        // pointsOther.forEach(_pointCallback);

        let newFaces = [];
        while (lines.length > 0) {
            //loop through points until outline done
            let currentPoint = startingPoint;
            let line = new Line(reference, currentPoint);
            let newPoints = [];
            do {
                newPoints.push(currentPoint);
                let possiblePoints = lines.filter(l => l.p1.equals(currentPoint) || l.p2.equals(currentPoint)).map(l => l.p1.equals(currentPoint) ? l.p2 : l.p1);

                let inVector = line.p1.copy().substract(line.p2);
                if (inVector.equals(new Point(0, 0))) {
                    inVector = new Point(-1, -1);
                }

                let useSmallestAngle = ((Point.indexOf(points, currentPoint) === -1 || Point.indexOf(pointsOther, currentPoint) === -1))
                let nextPoint = Face._getNextPoint(inVector, currentPoint, possiblePoints, useSmallestAngle);
                if (nextPoint === null) {
                    newPoints = [];
                    lines = [];
                    break;
                }

                line = new Line(currentPoint, nextPoint);
                lines = lines.filter((l, i) => !l.equals(line, false));
                currentPoint = nextPoint;

            } while (currentPoint !== startingPoint);
            if (newPoints.length > 0) {
                newFaces.push(new Face(...newPoints).removeUnnecessaryPoints());
            }
        }

        return newFaces;
    }

    union(...other) {
        if (other.length === 0) {
            return this.split();
        }
        let [one, another] = Face._getFacesWithIntersectionPoints(this, other[0]);

        //No intersection found
        if (one === this) {
            if (one.containsPoint(another.getLastPoint())) { //If one contains another
                return one.union(...other.slice(1));
            } else if (another.containsPoint(one.getLastPoint())) { //If another contains one
                return another.union(...other.slice(1));
            } else { //if none contains another
                return [another, ...this.union(...other.slice(1))]
            }
        }

        let points = one.getPoints();
        let pointsOther = another.getPoints();

        //calculate startingPoint
        let reference = Point.min(...points, ...pointsOther);

        let lines = [];
        let startingPoint;
        let smallestLength = null;
        let _pointCallback = (p, i, points) => {
            let length = new Line(p, reference).length();
            if (smallestLength === null || length < smallestLength) {
                smallestLength = length;
                startingPoint = p;
            }
            lines.push(new Line(p, points[(i + 1) % points.length]));
        }
        points.forEach(_pointCallback);
        pointsOther.forEach(_pointCallback);

        //loop through points until outline done
        let currentPoint = startingPoint;
        let line = new Line(reference, currentPoint);
        let newPoints = [];
        do {
            newPoints.push(currentPoint);
            let possiblePoints = lines.filter(l => l.p1.equals(currentPoint) || l.p2.equals(currentPoint)).map(l => l.p1.equals(currentPoint) ? l.p2 : l.p1);

            let inVector = line.p1.copy().substract(line.p2);
            if (inVector.equals(new Point(0, 0))) {
                inVector = new Point(-1, -1);
            }

            let nextPoint = Face._getNextPoint(inVector, currentPoint, possiblePoints);
            if (nextPoint === null) {
                break;
            }

            line = new Line(currentPoint, nextPoint);
            lines = lines.filter((l, i) => !l.equals(line, false));
            currentPoint = nextPoint;

        } while (currentPoint !== startingPoint);

        let newFace = new Face(...newPoints).removeUnnecessaryPoints();
        return newFace.union(...other.slice(1));
    }

    intersection(...other) {
        if (other.length === 0) {
            return [this];
        }
        let [one, another] = Face._getFacesWithIntersectionPoints(this, other[0]);

        //No intersection found
        if (one === this) {
            if (one.containsPoint(another.getLastPoint())) { //If one contains another
                return another.intersection(...other.slice(1));
            } else if (another.containsPoint(one.getLastPoint())) { //If another contains one
                return one.intersection(...other.slice(1));
            } else { //if none contains another
                return [];
            }
        }

        let points = one.getPoints();
        let pointsOther = another.getPoints();

        let lines = [];
        let _pointCallback = (p, i, points, otherFace) => {
            let otherPoint = points[(i + 1) % points.length];
            if (otherFace.containsPoint(p.copy().add(otherPoint.copy().substract(p).multiply(0.5)))) {
                lines.push(new Line(p, otherPoint));
            }
        }
        points.forEach((p, i, points) => {
            _pointCallback(p, i, points, another);
        });
        pointsOther.forEach((p, i, points) => {
            _pointCallback(p, i, points, one);
        });

        let faces = [];
        while (lines.length > 0) {
            let startingPoint = lines[0].p1;
            //loop through points until outline done
            let currentPoint = startingPoint;
            let newPoints = [];
            do {
                newPoints.push(currentPoint);
                let nextPoint = null;
                lines.some(l => {
                    if (l.p1.equals(currentPoint)) {
                        nextPoint = l.p2;
                        return true;
                    } else if (l.p2.equals(currentPoint)) {
                        nextPoint = l.p1;
                        return true;
                    }
                });

                if (nextPoint === null) {
                    newPoints = [];
                    lines = [];
                    break;
                }

                let line = new Line(currentPoint, nextPoint);
                lines = lines.filter((l, i) => !l.equals(line, false));
                currentPoint = nextPoint;

            } while (currentPoint !== startingPoint);
            if (newPoints.length > 0) {
                faces.push(new Face(...newPoints));
            }
        }

        let resultFaces = [];
        faces.forEach(f => {
            resultFaces.push(...f.intersection(...other.slice(1)));
        })

        return resultFaces;
    }

    static rect(p1, p2) {
        return new Face(p1.copy(), p1.copy().setY(p2.y), p2.copy(), p1.copy().setX(p2.x));
    }

    static _getNextPoint(inVector, referencePoint, points, useSmallestAngle?) {
        useSmallestAngle = Helper.nonNull(useSmallestAngle, true);

        let savedAngle = null;
        let nextPoint = null;
        points.forEach((p) => {
            let outVector = p.copy().substract(referencePoint);

            //check if valid
            if (outVector.equals(new Point(0, 0))) {
                return;
            }

            let angle = 2 * Math.PI - Point.angleOf(inVector, outVector)
            if (inVector.crossProduct(outVector) < 0) {
                angle = 2 * Math.PI - angle;
            }
            if (savedAngle === null || (angle < savedAngle && useSmallestAngle) || (angle > savedAngle && !useSmallestAngle)) {
                savedAngle = angle;
                nextPoint = p;
            }
        });
        return nextPoint;
    }

    static _getFacesWithIntersectionPoints(one, another) {
        let intersections1 = {};
        let intersections2 = {};

        let lines1 = one.getLines();
        let lines2 = another.getLines();

        let hasIntersections = false;
        //calculate all intersections
        lines1.forEach((l1, i1) => {
            lines2.forEach((l2, i2) => {
                let points = l1.getIntersectionPointsWith(l2);
                points.forEach(p => {
                    intersections1[i1] = Helper.nonNull(intersections1[i1], []);
                    intersections2[i2] = Helper.nonNull(intersections2[i2], []);

                    let intersectionObject = {
                        i1: i1,
                        i2: i2,
                        p: p,
                    };

                    intersections1[i1].push(intersectionObject);
                    intersections2[i2].push(intersectionObject);
                    hasIntersections = true;
                });
            });
        });


        if (!hasIntersections) {
            return [one, another]
        }

        //integrate intersections into points
        let points = [];
        let currentPoint = null;
        lines1.forEach((line, index) => {
            currentPoint = line.p1;
            if (intersections1[index]) {
                intersections1[index].sort((a, b) => {
                    return new Line(currentPoint, a.p).length() - new Line(currentPoint, b.p).length();
                }).forEach(i => {
                    if (!i.p.equals(currentPoint)) {
                        currentPoint = i.p;
                        points.push(currentPoint);
                    }
                });
            }
            if (!line.p2.equals(currentPoint)) {
                currentPoint = line.p2;
                points.push(line.p2);
            }
        })

        let pointsOther = [];
        currentPoint = null;
        lines2.forEach((line, index) => {
            // if (!line.p1.equals(currentPoint)){
            currentPoint = line.p1;
            //     pointsOther.push(currentPoint);
            // }
            if (intersections2[index]) {
                intersections2[index].sort((a, b) => {
                    return new Line(currentPoint, a.p).length() - new Line(currentPoint, b.p).length();
                }).forEach(i => {
                    if (!i.p.equals(currentPoint)) {
                        currentPoint = i.p;
                        pointsOther.push(currentPoint);
                    }
                });
            }
            if (!line.p2.equals(currentPoint)) {
                currentPoint = line.p2;
                pointsOther.push(line.p2);
            }
        })

        return [new Face(...points), new Face(...pointsOther)];
    }
}