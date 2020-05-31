import {Helper} from "js-helper/dist/shared/Helper";
import {Face} from "./Face";

export class Polygon {

    _face;
    _holes;

    constructor(face?, holes?) {
        face = Helper.nonNull(face, []);
        holes = Helper.nonNull(holes, []);

        if (face instanceof Array) {
            face = new Face(...face);
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
        if (status === Face.COLLISION_INSIDE) {
            this._holes = hole.union(this._holes);
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

        let newFaces = this.getFace().union(other.getFace());
        if (newFaces.length > 1) {
            return [other, ...this.union(others.slice(1))];
        }

        let newFace = newFaces[0];
        let halfFaces = newFace.setminus(this.getFace());

        let holes = [];
        halfFaces.forEach(h => holes.push(...h.setminus(other.getFace())));
        holes = holes.map(h => new Polygon(h));

        holes.push(...this.getHoles());
        holes.push(...other.getHoles());

        holes = Polygon.arrayUnion(holes);

        let newPolygon = new Polygon(newFace);
        newPolygon.setHoles(holes);
        return newPolygon.union(...others.slice(1));
    }

    setminus(other) {
        let collisionStatus = this.checkCollision(other);
        if (collisionStatus === Face.COLLISION_NO_INTERSECION) {
            return [this];
        } else if (collisionStatus === Face.COLLISION_INSIDE_OTHER) {
            return this.intersection(other.getHoles());
        } else if (collisionStatus === Face.COLLISION_INSIDE) {
            this.addHole(other);
            return [this];
        }
        //Has Intersection
        else {
            let intersections = this.intersection(other.getHoles());
            let smallerPolygons = this.getFace().setminus(other.getFace()).map(f => new Polygon(f));
            let newPolygons = [];
            smallerPolygons.forEach(p => {
                newPolygons.push(p.union(intersections));
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

    intersection(others) {
        let otherFaces = [];
        let holesBefore = this.getHoles();
        others.forEach(o => {
            otherFaces.push(o.getFace());
            holesBefore.push(...o.getHoles());
        });

        let intersectedPolygons = this.getFace().intersection(otherFaces).map(f => new Polygon(f));

        holesBefore.forEach(h => {
            let newPolygons = [];
            intersectedPolygons.forEach(p => {
                let overlappingStatus = p.checkCollision(h);
                if (overlappingStatus === Face.COLLISION_INSIDE) {
                    p.addHole(h);
                    newPolygons.push(p);
                } else if (overlappingStatus === Face.COLLISION_INSIDE_OTHER || overlappingStatus === Face.COLLISION_INTERSECTS) {
                    newPolygons.push(...p.setminus(h));
                } else {
                    newPolygons.push(p);
                }
            });
            intersectedPolygons = newPolygons;
        })

        return intersectedPolygons;
    }

    static arrayUnion(arrayOfPolygons) {
        let unionPairs = {};
        let mapping = {};

        function getMappedIndex(index) {
            while (mapping[index] !== undefined) {
                index = mapping[index]
            }
            return index;
        }

        arrayOfPolygons.forEach((p, i) => {
            unionPairs[i] = unionPairs[i] || [];
            arrayOfPolygons.forEach((p2, j) => {
                if (j > i && p.checkCollision(p2) !== Face.COLLISION_NO_INTERSECION) {
                    let jMappingIndex = getMappedIndex(j);
                    if (jMappingIndex !== j) {
                        unionPairs[j] = unionPairs[j] || [];
                        unionPairs[j].push(i);
                        mapping[i] = j;
                    } else {
                        unionPairs[i].push(j);
                        mapping[j] = i;
                    }
                }
            });
        });

        Object.keys(unionPairs).forEach(i => {
            let mappedIndex = getMappedIndex(i);
            let res = arrayOfPolygons[mappedIndex].union(...unionPairs[i].map(j => arrayOfPolygons[j]))
            arrayOfPolygons[mappedIndex] = res[0];
        });

        return Object.keys(unionPairs).filter(i => mapping[i] === undefined).map(i => arrayOfPolygons[i].removeUnnecessaryPoints());
    }

    static rect(p1, p2) {
        return new Polygon([p1.copy(), p1.copy().setY(p2.y), p2.copy(), p1.copy().setX(p2.x)]);
    }
}