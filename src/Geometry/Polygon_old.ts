import {Helper} from "js-helper/dist/shared/Helper";
import {Face} from "./Face";
import {Counter} from "js-helper/dist/shared/Counter";

export class Polygon_old {

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
            return false;
        }

        let status = this._face.checkCollision(hole.getFace());
        if (status === Face.COLLISION_INSIDE) {
            this._holes = hole.union(...this._holes);
            return true;
        }
            // else if (status === Face.COLLISION_TOUCHING_INSIDE){
            //     let res = this.setminus(hole);
            //     return false;
        // }
        else {
            return false;
        }
    }

    removeUnnecessaryPoints() {
        this.getFace().removeUnnecessaryPoints();
        this._holes.forEach(h => h.removeUnnecessaryPoints());
        return this;
    }

    union(...others) {
        if (others.length === 0) {
            return [this.removeUnnecessaryPoints()];
        }
        let other = others[0];

        let newFaces = null;
        let holes = [];
        let intersectionStatus = this.checkCollision(other);
        if (intersectionStatus === Face.COLLISION_NO_INTERSECTION) {
            // return [...this.union(...others.slice(1)), other];
            let unions = this.union(...others.slice(1));
            let newUnions = [];
            let found = false;
            unions.forEach(u => {
                //TODO what?!?
                if (!found && (u.checkCollision(other) === Face.COLLISION_INSIDE)) {
                    newUnions.push(...u.union(other));
                    found = true;
                } else {
                    newUnions.push(u);
                }
            });
            if (!found) {
                newUnions.push(other);
            }
            return newUnions;
        } else if (intersectionStatus === Face.COLLISION_INTERSECTS || intersectionStatus === Face.COLLISION_TOUCHING) {
            newFaces = this.getFace().union(other.getFace());

            let halfFaces = [];
            newFaces.forEach(face => halfFaces.push(...face.setminus(this.getFace())))
            halfFaces.forEach(h => holes.push(...h.setminus(other.getFace())));

            holes = holes.map(h => new Polygon(h));
        } else if (intersectionStatus === Face.COLLISION_INSIDE || intersectionStatus === Face.COLLISION_TOUCHING_INSIDE) {
            newFaces = [this.getFace()];
        } else if (intersectionStatus === Face.COLLISION_INSIDE_OTHER || intersectionStatus === Face.COLLISION_TOUCHING_INSIDE_OTHER) {
            newFaces = [other.getFace()];
        }

        this.getHoles().forEach(hole => holes.push(...hole.setminus(other)));
        other.getHoles().forEach(hole => holes.push(...hole.setminus(this)));

        holes = Polygon.arrayUnion(holes);

        let polygons = newFaces.map(f => new Polygon(f));
        let newPolygons = [];
        polygons.forEach(p => {
            let polygonsBefore = [p];
            holes.forEach(h => {
                let polygonsAfter = [];
                polygonsBefore.forEach(p => {
                    polygonsAfter.push(...p.setminus(h));
                });
                polygonsBefore = polygonsAfter;
            });
            newPolygons.push(...polygonsBefore);
        });

        return [...newPolygons[0].union(...others.slice(1)), ...newPolygons.slice(1)];
        // if (newPolygons.length > 1) {
        //     return Polygon.arrayUnion([...newPolygons, ...others.slice(1)]);
        // } else {
        // }
    }

    setminus(other) {
        let collisionStatus = this.checkCollision(other);
        if (collisionStatus === Face.COLLISION_NO_INTERSECTION || collisionStatus === Face.COLLISION_TOUCHING) {
            return [this];
        } else if (collisionStatus === Face.COLLISION_INSIDE_OTHER) {
            let otherHoles = other.getHoles();
            if (otherHoles.length > 0) {
                return this.intersection(...otherHoles);
            } else {
                return [];
            }
        } else if (collisionStatus === Face.COLLISION_INSIDE) {
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
                if (overlappingStatus === Face.COLLISION_INSIDE) {
                    p.addHole(h);
                    newPolygons.push(p);
                } else if (overlappingStatus === Face.COLLISION_INSIDE_OTHER || overlappingStatus === Face.COLLISION_INTERSECTS || overlappingStatus === Face.COLLISION_TOUCHING_INSIDE || overlappingStatus === Face.COLLISION_TOUCHING_INSIDE_OTHER) {
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
                if (j > i && p.checkCollision(p2) !== Face.COLLISION_NO_INTERSECTION) {
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
            //TODO falls durch split mehrere Polygone zurückkommen beachten
            arrayOfPolygons[mappedIndex] = res[0];
        });

        return Object.keys(unionPairs).filter(i => mapping[i] === undefined).map(i => arrayOfPolygons[i].removeUnnecessaryPoints());
    }

    static rect(p1, p2) {
        return new Polygon([p1.copy(), p1.copy().setY(p2.y), p2.copy(), p1.copy().setX(p2.x)]);
    }

    __getSourceCode(index, parentArray?) {
        index = Helper.nonNull(index, 0);
        if (!(index instanceof Counter)){
            index = new Counter(index);
        }

        let id = index.next();
        let name = "polygon" + id;
        let code = "let holes" + id + " = [];\n";
        code += "let " + name + " = new Polygon([";
        code += this.getFace().getPoints().map(p => "new Point(" + p.x + "," + p.y + ")").join(" , ");
        code += "]);\n";
        if (parentArray) {
            code += parentArray + ".push(" + name + ");\n";
        }
        code += "\n";
        this.getHoles().forEach((h,i) => {
            code += h.__getSourceCode(index, "holes" + id);
        });
        code += name + ".setHoles(holes" + id + ");\n\n";

        return code;
    }
}