import {Point} from "./Point";
import {Helper} from "js-helper/dist/shared/Helper";
import {Line} from "./Line";
import {Random} from "js-helper/dist/shared/Random";

export class Face {

    static COLLISION_NONE = 0;
    static COLLISION_INSIDE = 1;
    static COLLISION_INSIDE_OTHER = 2;
    static COLLISION_INTERSECTS = 4;
    static COLLISION_TOUCHING = 8;
    static COLLISION_POINT = 16;

    _points;

    constructor(...points) {
        this.setPoints(points);
    }

    setPoints(points) {
        if (points.length === 0) {
            this._points = [];
            return;
        }

        let smallestIndex = -1;
        let smallestPoint = null;

        points.forEach((p, i) => {
            if (smallestPoint === null || p.x < smallestPoint.x || (p.x === smallestPoint.x && p.y < smallestPoint.y)) {
                smallestPoint = p;
                smallestIndex = i;
            }
        });

        let indexBefore = (smallestIndex - 1 + points.length) % points.length;
        let indexAfter = (smallestIndex + 1) % points.length;

        let hasToReverse = false;
        if (points[indexBefore].x < points[indexAfter].x || (points[indexBefore].x === points[indexAfter].x && points[indexBefore].y < points[indexAfter].y)) {
            smallestIndex++;
            hasToReverse = true;
        }

        points.push(...points.splice(0, smallestIndex));
        if (hasToReverse) {
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
        let lines = this.cutLines(this.getLines());
        let oldPoints = [];
        lines.forEach(l => oldPoints.push(l.p1));

        let newFaces = [];

        // let oldPoints = this.getPoints();
        for (let i = 0; i < oldPoints.length; i++) {
            let p = oldPoints[i];
            let otherIndex = Point.indexOf(oldPoints, p, i + 1);
            if (otherIndex !== -1) {
                let points = oldPoints.slice(i + 1, otherIndex + 1);
                let newFace = new Face(...points);
                if (this.containsPoint(newFace._getPointInside())) {
                    newFaces.push(...newFace.split())
                    oldPoints.splice(i + 1, otherIndex - i);
                }
            }
        }
        newFaces.push(new Face(...oldPoints));
        return newFaces;
    }

    containsPoint(point, withTouching?) {
        let min = Point.min(...this._points);
        let max = Point.max(...this._points);

        if (point.x < min.x || point.y < min.y || point.x > max.x || point.y > max.y) {
            return false;
        }
        withTouching = Helper.nonNull(withTouching, true);

        let lineStartingPoint = new Point(min.x - 1, point.y);

        let count = 0;
        let repeat = false;
        do {
            repeat = false;
            count = 0;
            let line = new Line(lineStartingPoint, point);
            let lines = this.getLines();
            for (let i = 0, n = lines.length; i < n; i++) {
                let l = lines[i];
                if (l.containsPoint(point)) {
                    return withTouching;
                }
                let newIntersectionPoints = line.getIntersectionPointsWith(l);
                if (newIntersectionPoints.length === 1 && (newIntersectionPoints[0].equals(l.p1) || newIntersectionPoints[0].equals(l.p2))) {
                    repeat = true;
                    lineStartingPoint.add(new Point(0, Random.getRandom() * Math.max(l.length(), 1)))
                    break;
                }
                count += newIntersectionPoints.length;
            }
        } while (repeat === true);
        return count % 2 === 1;
    }

    _getPointInside() {
        let points = this._points;
        for (let i = 0; i < points.length; i++) {
            let otherIndex = (i + 2) % points.length;
            let p = points[i].copy().add(points[otherIndex].copy().substract(points[i]).multiply(0.5));
            if (this.containsPoint(p)) {
                return p;
            }
        }
        throw new Error("should always find a point, https://stackoverflow.com/questions/9797448/get-a-point-inside-the-polygon");
    }

    checkCollision(otherFace) {
        let [one, other] = Face._getFacesWithIntersectionPoints(this, otherFace);
        if (one === this) {
            if (this.containsPoint(otherFace.getLastPoint())) { //If one contains another
                return Face.COLLISION_INSIDE;
            } else if (otherFace.containsPoint(this.getLastPoint())) { //If another contains one
                return Face.COLLISION_INSIDE_OTHER;
            } else { //if none contains another
                return 0;
            }
        } else {
            let collisionStatus = Face.COLLISION_TOUCHING;
            let lines = one.getLines();
            let linesOther = other.getLines();

            let isInOther = lines.some(l => otherFace.containsPoint(l.getCenter(), false));
            let otherIsInThis = linesOther.some(l => this.containsPoint(l.getCenter(), false));
            if (isInOther
                && otherIsInThis) {
                return (collisionStatus | Face.COLLISION_INTERSECTS);
            } else {

                let [intersections] = Face._getIntersections(this.getLines(), otherFace.getLines());
                // @ts-ignore
                if (Object.values(intersections).every(i => i.map(i => i.p).filter((p, i, points) => Point.indexOf(points, p) === i).length < 2)) {
                    collisionStatus = collisionStatus | Face.COLLISION_POINT;
                }

                if (otherIsInThis) {
                    return (collisionStatus | Face.COLLISION_INSIDE);
                } else if (isInOther) {
                    return (collisionStatus | Face.COLLISION_INSIDE_OTHER);
                } else if (this.containsPoint(other._getPointInside())) {
                    return (collisionStatus | Face.COLLISION_INSIDE);
                } else {
                    return collisionStatus;
                }
            }
        }
    }

    removeInnerEdges(){
        //Remove polygons inside
        let points = [];
        let faces = [];
        let lines = this.cutLines(this.getLines());
        lines.forEach(l => points.push(l.p1));

        for (let i = 0; i < points.length; i++) {
            let p = points[i];
            let otherIndex = Point.indexOf(points, p, i + 1);
            if (otherIndex !== -1) {
                let innerPoints = points.splice(i + 1, otherIndex - i);
                let newFace = new Face(...innerPoints);
                if ((new Face(...points).checkCollision(newFace) & Face.COLLISION_INSIDE) === 0) {
                    // points.splice(i + 1, 0, ...innerPoints);
                    faces.push(newFace);
                }
            }
        }
        this.setPoints(points);
        let newFaces = this.union(...faces);
        if (newFaces.length >=2){
            throw new Error("should not be possible!");
        }
        this.setPoints(newFaces[0].getPoints());
        return this;
    }

    removeUnnecessaryPoints() {
        const roundFactor = 10000000000;

        //concat lines with same gradient
        let points = [];
        let lines = this.getLines();
        lines.forEach((l, i) => {
            let nextLine = lines[(i + 1) % lines.length];
            if (Math.round(nextLine.getGradient() * roundFactor) / roundFactor !== Math.round(l.getGradient() * roundFactor) / roundFactor) {
                points.push(l.p2);
            }
        });
        this.setPoints(points);

        return this;
    }

    setminus(other) {

        other = other.removeUnnecessaryPoints();
        let self = this.removeUnnecessaryPoints()
        if (other.getPoints().length <= 2) {
            return [this];
        } else if (self.getPoints().length <= 2) {
            return [];
        }

        let [one, another] = Face._getFacesWithIntersectionPoints(self, other);


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

        let lines = [];
        points.forEach((p, i, points) => {
            let nextPoint = points[(i + 1) % points.length];
            let lineMiddle = p.copy().add(nextPoint.copy().substract(p).multiply(0.5));
            if (!another.containsPoint(lineMiddle)) {
                lines.push(new Line(p, nextPoint));
            }
        });

        //Touching and therefore has intersection points, but this is fully in other
        if (lines.length === 0) {
            return [];
        }

        pointsOther.forEach((p, i, points) => {
            let otherPoint = points[(i + 1) % points.length];
            if (one.containsPoint(p.copy().add(otherPoint.copy().substract(p).multiply(0.5)))) {
                lines.push(new Line(p, otherPoint));
            }
        })

        let newFaces = [];
        while (lines.length > 0) {
            //calculate starting points
            let currentPoint = null;
            let reference = null;
            lines.some((l, i) => {
                let lineMiddle = l.p1.copy().add(l.getVector().multiply(0.5));
                if (!other.containsPoint(lineMiddle)) {
                    lines.splice(i, 1);
                    lines.push(new Line(l.p1, lineMiddle));
                    lines.push(new Line(lineMiddle, l.p2));

                    currentPoint = lineMiddle;

                    if (l.p1.x === l.p2.x) {
                        reference = lineMiddle.copy().substract(1, 0);
                        if (one.containsPoint(reference)) {
                            reference = lineMiddle.copy().add(1, 0);
                        }
                    } else {
                        reference = lineMiddle.copy().substract(0, 1);
                        if (one.containsPoint(reference)) {
                            reference = lineMiddle.copy().add(0, 1);
                        }
                    }
                    return true;
                }
            })
            if (currentPoint === null) {
                break;
            }

            let startingPoint = currentPoint;
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
                let newFace = new Face(...newPoints).removeUnnecessaryPoints();
                if (newFace.getPoints().length > 0) {
                    newFaces.push(newFace);
                }
            }
        }

        return newFaces;
    }

    union(...others) {
        if (others.length === 0) {
            return [this];
        }

        let self = this.removeUnnecessaryPoints();
        let other = others[0].removeUnnecessaryPoints();
        if (other.getPoints().length <= 2) {
            return this.union(...others.slice(1))
        } else if (self.getPoints().length <= 2) {
            // return other.union(...others.slice(1))
            return [];
        }

        let [one, another] = Face._getFacesWithIntersectionPoints(self, other);

        //No intersection found
        if (one === this) {
            if (one.containsPoint(another.getLastPoint())) { //If one contains another
                return one.union(...others.slice(1));
            } else if (another.containsPoint(one.getLastPoint())) { //If another contains one
                return another.union(...others.slice(1));
            } else { //if none contains another
                return [another, ...this.union(...others.slice(1))]
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
        return newFace.union(...others.slice(1));
    }

    intersection(...others) {
        if (others.length === 0) {
            return [this];
        }

        let self = this.removeUnnecessaryPoints();
        let other = others[0].removeUnnecessaryPoints();
        if (other.getPoints().length <= 2) {
            return this.intersection(...others.slice(1))
        } else if (self.getPoints().length <= 2) {
            return [];
        }

        let [one, another] = Face._getFacesWithIntersectionPoints(self, other);

        //No intersection found
        if (one === this) {
            if (one.containsPoint(another.getLastPoint())) { //If one contains another
                return another.intersection(...others.slice(1));
            } else if (another.containsPoint(one.getLastPoint())) { //If another contains one
                return one.intersection(...others.slice(1));
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
            resultFaces.push(...f.intersection(...others.slice(1)));
        })

        return resultFaces;
    }

    cutLines(lines) {
        let myLines = this.getLines();
        let intersections = {};
        lines.forEach((l1, i) => {
            myLines.forEach((l2) => {
                let points = l1.getIntersectionPointsWith(l2);
                points.forEach(p => {
                    intersections[i] = Helper.nonNull(intersections[i], []);
                    let intersectionObject = {
                        i: i,
                        p: p,
                    };

                    intersections[i].push(intersectionObject);
                });
            });
        });

        //integrate intersections into points
        let newLines = [];
        lines.forEach((line, index) => {
            let currentStartPoint = line.p1;
            if (intersections[index]) {
                //add last point such that the last line is also added
                intersections[index].push({i: -1, p: line.p2});
                intersections[index].sort((a, b) => {
                    return new Line(currentStartPoint, a.p).length() - new Line(currentStartPoint, b.p).length();
                }).forEach(i => {
                    if (!i.p.equals(currentStartPoint)) {
                        newLines.push(new Line(currentStartPoint, i.p));
                        currentStartPoint = i.p;
                    }
                });
            } else {
                newLines.push(line);
            }
        });
        return newLines;
    }

    cutLinesOutside(lines) {
        return this.cutLines(lines).filter(l => !this.containsPoint(l.getCenter()));
    }

    cutLinesWithin(lines) {
        return this.cutLines(lines).filter(l => this.containsPoint(l.getCenter()));
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
            if (isNaN(angle)) {
                debugger;
                Point.angleOf(inVector, outVector);
            }
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

    static _getIntersections(lines1, lines2) {
        let intersections1 = {};
        let intersections2 = {};

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

        return [intersections1, intersections2];
    }

    static _getFacesWithIntersectionPoints(one, another) {
        let lines1 = one.cutLines(one.getLines());
        let lines2 = another.cutLines(another.getLines());
        let [intersections1, intersections2] = this._getIntersections(lines1, lines2);

        if (Object.keys(intersections1).length === 0) {
            return [one, another]
        }

        // let lines1 = one.getLines();
        // let lines2 = another.getLines();

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
                pointsOther.push(line.p2);
            }
        })

        return [new Face(...points), new Face(...pointsOther)];
    }
}