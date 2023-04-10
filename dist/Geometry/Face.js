"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Face = void 0;
const Point_1 = require("./Point");
const js_helper_1 = require("@ainias42/js-helper");
const Line_1 = require("./Line");
const GeometryBase_1 = require("./GeometryBase");
class Face extends GeometryBase_1.GeometryBase {
    constructor(...points) {
        super();
        this.setPoints(points);
    }
    setPoints(points) {
        if (points.length === 0) {
            this._points = [];
            return;
        }
        this._points = points;
        points = Face._removeInnerEdges(this.cutLines(this.getLines()));
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
            lines.push(new Line_1.Line(p, this._points[(i + 1) % this._points.length]));
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
    getAreaWithGaussscheDreiecksformel() {
        let sum = 0;
        this._points.forEach((p, i) => {
            let nextIndex = (i + 1) % this._points.length;
            let p2 = this._points[nextIndex];
            sum += p.x * p2.y - p.y * p2.x;
        });
        return this._roundToPrecision(sum / 2);
    }
    getCentroidForSimpleFace() {
        let centroid = new Point_1.Point(0, 0);
        this._points.forEach((p, i) => {
            let nextIndex = (i + 1) % this._points.length;
            let p2 = this._points[nextIndex];
            let sum = p.x * p2.y - p.y * p2.x;
            centroid.add(new Point_1.Point(p.x + p2.x, p.y + p2.y).multiply(sum));
        });
        return centroid.divide(this.getAreaWithGaussscheDreiecksformel() * 6);
    }
    split() {
        let lines = this.cutLines(this.getLines());
        let oldPoints = [];
        lines.forEach(l => oldPoints.push(l.p1));
        let newFaces = [];
        // let oldPoints = this.getPoints();
        for (let i = 0; i < oldPoints.length; i++) {
            let p = oldPoints[i];
            let otherIndex = Point_1.Point.indexOf(oldPoints, p, i + 1);
            if (otherIndex !== -1) {
                let points = oldPoints.slice(i + 1, otherIndex + 1);
                let newFace = new Face(...points);
                if (this.containsPoint(newFace._getPointInside())) {
                    newFaces.push(...newFace.split());
                    oldPoints.splice(i + 1, otherIndex - i);
                }
            }
        }
        newFaces.push(new Face(...oldPoints));
        return newFaces;
    }
    // containsPoint(point, withTouching?) {
    //     if (this._points.length < 2 || Helper.isNull(point)) {
    //         return false;
    //     }
    //
    //     let min = Point.min(...this._points);
    //     let max = Point.max(...this._points);
    //
    //     if (point.x < min.x || point.y < min.y || point.x > max.x || point.y > max.y) {
    //         return false;
    //     }
    //     withTouching = Helper.nonNull(withTouching, true);
    //
    //     let line = new Line(new Point(min.x - 1, point.y), point);
    //     let lines = this.getLines();
    //
    //     let count = 0;
    //     for (let i = 0, n = lines.length; i < n; i++) {
    //         let l = lines[i];
    //         if (l.containsPoint(point)) {
    //             return withTouching;
    //         }
    //         let newIntersectionPoints = line.getIntersectionPointsWith(l);
    //         if (newIntersectionPoints.length === 1 && (newIntersectionPoints[0].equals(l.p1) || newIntersectionPoints[0].equals(l.p2))) {
    //             if (newIntersectionPoints[0].equals(l.p1)) {
    //                 continue;
    //             }
    //             let isAbove = l.p1.y < point.y;
    //             for (let j = 1; j < n; j++) {
    //                 let otherLine = lines[(i + j) % n];
    //                 if (otherLine.p2.y !== point.y) {
    //                     if (isAbove === otherLine.p2.y > point.y) {
    //                         count++;
    //                     }
    //                     i += j;
    //                     break;
    //                 } else if (otherLine.containsPoint(point)) {
    //                     return withTouching;
    //                 } else if (otherLine.p2.x > point.x) {
    //                     i += j;
    //                     break;
    //                 }
    //             }
    //
    //         } else {
    //             count += newIntersectionPoints.length;
    //         }
    //     }
    //     return count % 2 === 1;
    // }
    containsPoint(point, withTouching) {
        if (this._points.length < 2 || js_helper_1.Helper.isNull(point)) {
            return false;
        }
        let min = Point_1.Point.min(...this._points);
        let max = Point_1.Point.max(...this._points);
        if (point.x < min.x || point.y < min.y || point.x > max.x || point.y > max.y) {
            return false;
        }
        withTouching = js_helper_1.Helper.nonNull(withTouching, true);
        let line = new Line_1.Line(new Point_1.Point(min.x - 1, point.y), point);
        let lines = this.getLines();
        let count = 0;
        for (let i = 0, n = lines.length; i < n; i++) {
            let l = lines[i];
            if (l.containsPoint(point)) {
                return withTouching;
            }
            let newIntersectionPoints = line.getIntersectionPointsWith(l);
            if (newIntersectionPoints.length > 0) {
                if (l.p1.y > point.y) {
                    count++;
                }
                if (l.p2.y > point.y) {
                    count++;
                }
            }
        }
        return count % 2 === 1;
    }
    union(...others) {
        if (others.length === 0) {
            return [this];
        }
        let connectedFaces = [this];
        let notConnectedFaces = [];
        for (let i = 0; i < others.length; i++) {
            let o = others[i];
            let collisionStatus = this.checkCollision(o);
            if ((collisionStatus & (Face.COLLISION_INTERSECTS | Face.COLLISION_TOUCHING)) !== 0 && (collisionStatus & Face.COLLISION_INSIDE) === 0) {
                connectedFaces.push(o);
            }
            else if ((collisionStatus & Face.COLLISION_INSIDE_OTHER) !== 0) {
                others.splice(i, 1);
                return o.union(...others);
            }
            else if (collisionStatus === 0) {
                notConnectedFaces.push(o);
            }
        }
        if (connectedFaces.length === 1) {
            if (notConnectedFaces.length >= 1) {
                return [...notConnectedFaces[0].union(...notConnectedFaces.slice(1)), this];
            }
            else {
                return [this];
            }
        }
        let lines = [];
        connectedFaces.forEach(f => lines.push(...f.getLines()));
        connectedFaces.forEach(f => {
            lines = f.cutLines(lines);
        });
        let face = new Face(...(Face._glueLines(lines)[0])).removeUnnecessaryPoints();
        return face.union(...notConnectedFaces);
    }
    setminus(...others) {
        if (others.length === 0) {
            return [this];
        }
        let other = others[0];
        let allFaces = [this, other];
        let lines = [];
        allFaces.forEach(f => lines.push(...f.getLines()));
        allFaces.forEach(f => {
            lines = f.cutLines(lines);
        });
        let faces = Face._glueLines(lines, other, this).map(points => {
            return new Face(...points).removeUnnecessaryPoints();
        });
        let res = [];
        others = others.slice(1);
        faces.forEach(f => {
            res.push(...f.setminus(...others));
        });
        return res;
    }
    intersection(...others) {
        let allFaces = [this, ...others];
        let lines = [];
        allFaces.forEach(f => lines.push(...f.getLines()));
        allFaces.forEach(f => {
            lines = f.cutLines(lines);
        });
        lines = lines.filter(l => allFaces.every(f => f.containsPoint(l.getCenter())));
        return Face._glueLines(lines).map(points => new Face(...points));
    }
    getAllPointsInside() {
        const facePoints = this.getPoints();
        const maxPoint = Point_1.Point.max(...facePoints).ceil();
        const minPoint = Point_1.Point.min(...facePoints).floor();
        const points = [];
        // const lines = this.cutLines(this.getLines());
        const lines = this.getLines();
        for (let x = minPoint.x; x <= maxPoint.x; x++) {
            const line = new Line_1.Line(new Point_1.Point(x, minPoint.y), new Point_1.Point(x, maxPoint.y));
            let intersections = [];
            lines.forEach(l => {
                const lineIntersections = line.getIntersectionPointsWith(l);
                intersections.push(...lineIntersections);
                if (lineIntersections.length === 2) {
                    const yMax = Math.max(lineIntersections[0].y, lineIntersections[1].y);
                    for (let y = Math.ceil(Math.min(lineIntersections[0].y, lineIntersections[1].y)); y <= yMax; y++) {
                        points.push(new Point_1.Point(x, y));
                    }
                }
                else if (lineIntersections.length === 1) {
                    if (lineIntersections[0].equals(lineIntersections[0].copy().round())) {
                        points.push(lineIntersections[0]);
                    }
                }
            });
            intersections = intersections.sort((a, b) => a.y - b.y).filter((p, i) => i === 0 || p.y !== intersections[i - 1].y);
            let previousIntersection = null;
            intersections.forEach((intersection) => {
                if (previousIntersection && intersection.y > previousIntersection.y) {
                    const lineCenter = new Line_1.Line(intersection, previousIntersection).getCenter();
                    if (this.containsPoint(lineCenter)) {
                        for (let y = Math.floor(previousIntersection.y) + 1; y < intersection.y; y++) {
                            points.push(new Point_1.Point(x, y));
                        }
                    }
                }
                previousIntersection = intersection;
            });
        }
        return points;
    }
    _getPointInside() {
        let lines = this.getLines();
        if (lines.length <= 2) {
            return null;
        }
        for (let i = 0; i < lines.length; i++) {
            let otherIndex = (i + 1) % lines.length;
            let connectedLine = new Line_1.Line(lines[i].p1.copy().add(lines[i].getVector().multiply(0.5)), lines[otherIndex].p1.copy().add(lines[otherIndex].getVector().multiply(0.5)));
            let p = connectedLine.p1.copy().add(connectedLine.getVector().multiply(0.5));
            if (this.containsPoint(p, false)) {
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
            }
            else if (otherFace.containsPoint(this.getLastPoint())) { //If another contains one
                return Face.COLLISION_INSIDE_OTHER;
            }
            else { //if none contains another
                return 0;
            }
        }
        else {
            let collisionStatus = Face.COLLISION_TOUCHING;
            let lines = one.getLines();
            let linesOther = other.getLines();
            let isInOther = lines.some(l => otherFace.containsPoint(l.getCenter(), false));
            let otherIsInThis = linesOther.some(l => this.containsPoint(l.getCenter(), false));
            if (isInOther
                && otherIsInThis) {
                return (collisionStatus | Face.COLLISION_INTERSECTS);
            }
            else {
                let [intersections] = Face._getIntersections(this.getLines(), otherFace.getLines());
                // @ts-ignore
                if (Object.values(intersections).every(i => i.map(i => i.p).filter((p, i, points) => Point_1.Point.indexOf(points, p) === i).length < 2)) {
                    collisionStatus = collisionStatus | Face.COLLISION_POINT;
                }
                if (otherIsInThis) {
                    return (collisionStatus | Face.COLLISION_INSIDE);
                }
                else if (isInOther) {
                    return (collisionStatus | Face.COLLISION_INSIDE_OTHER);
                }
                else if (this.containsPoint(other._getPointInside())) {
                    return (collisionStatus | Face.COLLISION_INSIDE);
                }
                else {
                    return collisionStatus;
                }
            }
        }
    }
    removeUnnecessaryPoints() {
        //concat lines with same gradient
        let points = [];
        let lines = this.getLines();
        lines.forEach((l, i) => {
            let nextLine = lines[(i + 1) % lines.length];
            if (nextLine.getGradient() !== l.getGradient()) {
                points.push(l.p2);
            }
        });
        this.setPoints(points);
        return this;
    }
    cutLines(lines) {
        let myLines = this.getLines();
        let intersections = {};
        lines.forEach((l1, i) => {
            myLines.forEach((l2, i2) => {
                let points = l1.getIntersectionPointsWith(l2);
                points.forEach(p => {
                    intersections[i] = js_helper_1.Helper.nonNull(intersections[i], []);
                    let intersectionObject = {
                        p: p,
                        i2: i2
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
                intersections[index].push({ i: -1, p: line.p2 });
                intersections[index].sort((a, b) => {
                    return new Line_1.Line(currentStartPoint, a.p).length() - new Line_1.Line(currentStartPoint, b.p).length();
                }).forEach(i => {
                    if (!i.p.equals(currentStartPoint)) {
                        newLines.push(new Line_1.Line(currentStartPoint, i.p));
                        currentStartPoint = i.p;
                    }
                });
            }
            else {
                newLines.push(line);
            }
        });
        return newLines;
    }
    cutLinesOutside(lines, touching) {
        return this.cutLines(lines).filter(l => !this.containsPoint(l.getCenter(), touching));
    }
    cutLinesWithin(lines, touching) {
        return this.cutLines(lines).filter(l => this.containsPoint(l.getCenter(), touching));
    }
    static _glueLines(lines, notInFace, inFace) {
        if (lines.length === 0) {
            return [];
        }
        notInFace = js_helper_1.Helper.nonNull(notInFace, new Face());
        inFace = js_helper_1.Helper.nonNull(inFace, null);
        let startingPoint = null;
        let reference = null;
        if (inFace) {
            let lineIndex = null;
            lines.some((l, i) => {
                if (startingPoint === null) {
                    let center = l.getCenter();
                    if (!notInFace.containsPoint(center) && inFace.containsPoint(center)) {
                        startingPoint = center;
                        lineIndex = i;
                        return true;
                    }
                }
            });
            if (startingPoint === null) {
                return [];
            }
            let line = lines[lineIndex];
            lines.splice(lineIndex, 1);
            lines.push(new Line_1.Line(line.p1, startingPoint));
            lines.push(new Line_1.Line(startingPoint, line.p2));
            let max = Point_1.Point.max(...inFace.getPoints());
            let min = Point_1.Point.min(...inFace.getPoints());
            let linesToCut = [
                new Line_1.Line(new Point_1.Point(startingPoint.x, min.y), new Point_1.Point(startingPoint.x, max.y)),
                new Line_1.Line(new Point_1.Point(min.x, startingPoint.y), new Point_1.Point(max.x, startingPoint.y))
            ];
            let linesCut = inFace.cutLines(linesToCut);
            let smallestDistance = null;
            let smallestDistanceLine = null;
            linesCut.some(l => {
                if (l.p1.equals(startingPoint) || l.p2.equals(startingPoint)) {
                    let center = l.getCenter();
                    if (inFace.containsPoint(center, false)) {
                        reference = startingPoint.copy().add(startingPoint.copy().subtract(center));
                        return true;
                    }
                    else {
                        reference = center;
                        return true;
                    }
                }
                //Handle rundungsfehler(?)
                let length = Math.min(l.p1.copy().subtract(startingPoint).length(), l.p2.copy().subtract(startingPoint).length());
                if (smallestDistance === null || length < smallestDistance) {
                    smallestDistance = length;
                    smallestDistanceLine = l;
                }
            });
            //Handle rundungsfehler(?)
            if (reference === null) {
                let center = smallestDistanceLine.getCenter();
                if (inFace.containsPoint(center, false)) {
                    reference = startingPoint.copy().add(startingPoint.copy().subtract(center));
                }
                else {
                    reference = center;
                }
            }
            if (reference === null) {
                debugger;
            }
        }
        else {
            let points = [];
            lines.forEach((l) => points.push(l.p1, l.p2));
            reference = Point_1.Point.min(...points).subtract(1, 1);
            points.forEach(p => {
                if (startingPoint === null || p.x < startingPoint.x || (p.x === startingPoint.x && p.y < startingPoint.y)) {
                    startingPoint = p;
                }
            });
        }
        let lineLengthBefore = lines.length;
        let currentPoint = startingPoint;
        let newPoints = [];
        let line = new Line_1.Line(reference, currentPoint);
        const delta = 0;
        do {
            newPoints.push(currentPoint);
            let possiblePoints = lines.filter(l => l.p1.equals(currentPoint, delta) || l.p2.equals(currentPoint, delta)).map(l => l.p1.equals(currentPoint, delta) ? l.p2 : l.p1);
            let inVector = line.p1.copy().subtract(line.p2);
            if (inVector.equals(new Point_1.Point(0, 0))) {
                inVector = new Point_1.Point(-1, -1);
            }
            let savedAngle = null;
            let nextPoint = null;
            let useSmallestAngle = !notInFace.containsPoint(currentPoint);
            possiblePoints.forEach((p) => {
                let outVector = p.copy().subtract(currentPoint);
                //check if valid
                if (outVector.equals(new Point_1.Point(0, 0))) {
                    return;
                }
                let angle = 2 * Math.PI - Point_1.Point.angleOf(inVector, outVector);
                if (isNaN(angle)) {
                    debugger;
                    Point_1.Point.angleOf(inVector, outVector);
                }
                // if (inVector.crossProduct(outVector) < 0) {
                //     angle = 2 * Math.PI - angle;
                // }
                if (savedAngle === null || (angle < savedAngle && useSmallestAngle) || (angle > savedAngle && !useSmallestAngle)) {
                    savedAngle = angle;
                    nextPoint = p;
                }
            });
            if (nextPoint === null) {
                newPoints = [];
                break;
            }
            line = new Line_1.Line(currentPoint, nextPoint);
            lines = lines.filter(l => !l.equals(line, false, delta));
            currentPoint = nextPoint;
        } while (!currentPoint.equals(startingPoint, delta));
        let res = [];
        if (newPoints.length > 0) {
            res.push(newPoints);
        }
        if (lines.length > 0 && lines.length < lineLengthBefore) {
            res.push(...Face._glueLines(lines, notInFace, inFace));
        }
        return res;
    }
    static _removeInnerEdges(lines) {
        for (let i = 0; i < lines.length; i++) {
            let otherIndex = -1;
            lines.some((l, index) => {
                if (index > i && l.equals(new Line_1.Line(lines[i].p2, lines[i].p1))) {
                    otherIndex = index;
                    return true;
                }
            });
            if (otherIndex > i) {
                lines.splice(otherIndex, 1);
                lines.splice(i, 1);
                i--;
            }
        }
        let newPoints = Face._glueLines(lines);
        //ignore others as only first is hull
        if (newPoints.length >= 1) {
            return newPoints[0];
        }
        else {
            return [];
        }
    }
    static circle(center, radius, maxDistance) {
        maxDistance = Math.max(js_helper_1.Helper.nonNull(maxDistance, 5), 1);
        let numPoints = Math.ceil(2 * Math.PI * radius / maxDistance);
        if (numPoints % 2 === 0) {
            numPoints++;
        }
        return this.circle2(center, radius, numPoints);
    }
    static circle2(center, radius, numPoints) {
        numPoints = numPoints || 24;
        let angle = 2 * Math.PI / numPoints;
        let points = [];
        for (let i = 0; i < numPoints; i++) {
            points.push(new Point_1.Point(GeometryBase_1.GeometryBase.round(center.x + radius * Math.cos(angle * i)), GeometryBase_1.GeometryBase.round(center.y + radius * Math.sin(angle * i))));
        }
        return new Face(...points);
    }
    static rect(p1, p2) {
        return new Face(p1.copy(), p1.copy().setY(p2.y), p2.copy(), p1.copy().setX(p2.x));
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
                    intersections1[i1] = js_helper_1.Helper.nonNull(intersections1[i1], []);
                    intersections2[i2] = js_helper_1.Helper.nonNull(intersections2[i2], []);
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
            return [one, another];
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
                    return new Line_1.Line(currentPoint, a.p).length() - new Line_1.Line(currentPoint, b.p).length();
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
        });
        let pointsOther = [];
        currentPoint = null;
        lines2.forEach((line, index) => {
            // if (!line.p1.equals(currentPoint)){
            currentPoint = line.p1;
            //     pointsOther.push(currentPoint);
            // }
            if (intersections2[index]) {
                intersections2[index].sort((a, b) => {
                    return new Line_1.Line(currentPoint, a.p).length() - new Line_1.Line(currentPoint, b.p).length();
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
        });
        return [new Face(...points), new Face(...pointsOther)];
    }
    static fromJson(faceJson) {
        return new Face(...faceJson._points.map(p => Point_1.Point.fromJson(p)));
    }
}
exports.Face = Face;
Face.COLLISION_NONE = 0;
Face.COLLISION_INSIDE = 1;
Face.COLLISION_INSIDE_OTHER = 2;
Face.COLLISION_INTERSECTS = 4;
Face.COLLISION_TOUCHING = 8;
Face.COLLISION_POINT = 16;
//# sourceMappingURL=Face.js.map