"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
const Helper_1 = require("js-helper/dist/shared/Helper");
const Face_1 = require("./Face");
class Polygon {
    constructor(face, holes) {
        face = Helper_1.Helper.nonNull(face, []);
        holes = Helper_1.Helper.nonNull(holes, []);
        if (face instanceof Array) {
            face = new Face_1.Face(...face);
        }
        this._face = face;
        this._holes = [];
        holes.forEach(hole => this.addHole(hole));
    }
    getFace() {
        return this._face;
    }
    getHoles() {
        return this._holes;
    }
    checkCollision(other) {
        return this.getFace().checkCollision(other.getFace());
    }
    setHoles(holes) {
        this._holes = holes;
    }
    addHole(hole) {
        if (!(hole instanceof Polygon)) {
            return;
        }
        let status = this._face.checkCollision(hole.getFace());
        if (status === Face_1.Face.COLLISION_INSIDE) {
            this._holes = hole.union(...this._holes);
        }
    }
    removeUnnecessaryPoints() {
        this.getFace().removeUnnecessaryPoints();
        this._holes.forEach(h => h.removeUnnecessaryPoints());
        return this;
    }
    union(...others) {
        if (others.length === 0) {
            return [this];
        }
        let other = others[0];
        let newFace = null;
        let holes = [];
        let intersectionStatus = this.checkCollision(other);
        if (intersectionStatus === Face_1.Face.COLLISION_NO_INTERSECION) {
            // return [other, ...this.union(...others.slice(1))];
            let unions = this.union(...others.slice(1));
            let newUnions = [];
            let found = false;
            unions.forEach(u => {
                if (!found && u.checkCollision(other) === Face_1.Face.COLLISION_INSIDE) {
                    newUnions.push(...u.union(other));
                    found = true;
                }
                else {
                    newUnions.push(u);
                }
            });
            if (!found) {
                newUnions.push(other);
            }
            return newUnions;
        }
        else if (intersectionStatus === Face_1.Face.COLLISION_INTERSECTS) {
            let newFaces = this.getFace().union(other.getFace());
            if (newFaces.length == 2) { // has intersection points, but no real intersection, is only touching
                return [other, ...this.union(...others.slice(1))];
            }
            newFace = newFaces[0];
            let halfFaces = newFace.setminus(this.getFace());
            halfFaces.forEach(h => holes.push(...h.setminus(other.getFace())));
            holes = holes.map(h => new Polygon(h));
        }
        else if (intersectionStatus === Face_1.Face.COLLISION_INSIDE) {
            newFace = this.getFace();
        }
        else if (intersectionStatus === Face_1.Face.COLLISION_INSIDE_OTHER) {
            newFace = other.getFace();
        }
        this.getHoles().forEach(hole => {
            holes.push(...hole.setminus(other));
        });
        other.getHoles().forEach(hole => {
            holes.push(...hole.setminus(this));
        });
        holes = Polygon.arrayUnion(holes);
        let newPolygon = new Polygon(newFace);
        newPolygon.setHoles(holes);
        return newPolygon.union(...others.slice(1));
    }
    setminus(other) {
        let collisionStatus = this.checkCollision(other);
        if (collisionStatus === Face_1.Face.COLLISION_NO_INTERSECION) {
            return [this];
        }
        else if (collisionStatus === Face_1.Face.COLLISION_INSIDE_OTHER) {
            let otherHoles = other.getHoles();
            if (otherHoles.length > 0) {
                return this.intersection(...otherHoles);
            }
            else {
                return [];
            }
        }
        else if (collisionStatus === Face_1.Face.COLLISION_INSIDE) {
            this.addHole(other);
            return [this];
        }
        //Has Intersection
        else {
            let otherHoles = other.getHoles();
            let intersections = [];
            if (otherHoles.length > 0) {
                intersections = this.intersection(...otherHoles);
            }
            let smallerPolygons = this.getFace().setminus(other.getFace()).map(f => new Polygon(f));
            let newPolygons = [];
            smallerPolygons.forEach(p => {
                newPolygons.push(...p.union(...intersections));
            });
            let holes = this.getHoles();
            holes.forEach(h => {
                let newPolygonsWithHoles = [];
                newPolygons.forEach(p => newPolygonsWithHoles.push(...p.setminus(h)));
                newPolygons = newPolygonsWithHoles;
            });
            return newPolygons;
        }
    }
    intersection(...others) {
        let otherFaces = [];
        let holesBefore = [...this.getHoles()];
        others.forEach(o => {
            otherFaces.push(o.getFace());
            holesBefore.push(...o.getHoles());
        });
        let intersectedPolygons = this.getFace().intersection(...otherFaces).map(f => new Polygon(f));
        holesBefore.forEach(h => {
            let newPolygons = [];
            intersectedPolygons.forEach(p => {
                let overlappingStatus = p.checkCollision(h);
                if (overlappingStatus === Face_1.Face.COLLISION_INSIDE) {
                    p.addHole(h);
                    newPolygons.push(p);
                }
                else if (overlappingStatus === Face_1.Face.COLLISION_INSIDE_OTHER || overlappingStatus === Face_1.Face.COLLISION_INTERSECTS) {
                    newPolygons.push(...p.setminus(h));
                }
                else {
                    newPolygons.push(p);
                }
            });
            intersectedPolygons = newPolygons;
        });
        return intersectedPolygons;
    }
    static arrayUnion(arrayOfPolygons) {
        let unionPairs = {};
        let mapping = {};
        function getMappedIndex(index) {
            while (mapping[index] !== undefined) {
                index = mapping[index];
            }
            return index;
        }
        arrayOfPolygons.forEach((p, i) => {
            unionPairs[i] = unionPairs[i] || [];
            arrayOfPolygons.forEach((p2, j) => {
                if (j > i && p.checkCollision(p2) !== Face_1.Face.COLLISION_NO_INTERSECION) {
                    let jMappingIndex = getMappedIndex(j);
                    if (jMappingIndex !== j) {
                        unionPairs[j] = unionPairs[j] || [];
                        unionPairs[j].push(i);
                        mapping[i] = j;
                    }
                    else {
                        unionPairs[i].push(j);
                        mapping[j] = i;
                    }
                }
            });
        });
        Object.keys(unionPairs).forEach(i => {
            let mappedIndex = getMappedIndex(i);
            let res = arrayOfPolygons[mappedIndex].union(...unionPairs[i].map(j => arrayOfPolygons[j]));
            arrayOfPolygons[mappedIndex] = res[0];
        });
        return Object.keys(unionPairs).filter(i => mapping[i] === undefined).map(i => arrayOfPolygons[i].removeUnnecessaryPoints());
    }
    static rect(p1, p2) {
        return new Polygon([p1.copy(), p1.copy().setY(p2.y), p2.copy(), p1.copy().setX(p2.x)]);
    }
}
exports.Polygon = Polygon;
//# sourceMappingURL=Polygon.js.map