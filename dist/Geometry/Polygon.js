"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polygon = void 0;
const Helper_1 = require("js-helper/dist/shared/Helper");
const Face_1 = require("./Face");
const Counter_1 = require("js-helper/dist/shared/Counter");
const GeometryBase_1 = require("./GeometryBase");
class Polygon extends GeometryBase_1.GeometryBase {
    constructor(face, holes, precision) {
        super(precision);
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
            return false;
        }
        let status = this._face.checkCollision(hole.getFace());
        if ((status & Face_1.Face.COLLISION_INSIDE) === Face_1.Face.COLLISION_INSIDE && ((status & Face_1.Face.COLLISION_POINT) === Face_1.Face.COLLISION_POINT || (status & Face_1.Face.COLLISION_TOUCHING) === 0)) {
            // this._holes = hole.union(...this._holes);
            this._holes = Polygon.arrayUnion(hole, ...this._holes);
            return true;
        }
        else {
            return false;
        }
    }
    removeUnnecessaryPoints() {
        this.getFace().removeUnnecessaryPoints();
        this._holes.forEach(h => h.removeUnnecessaryPoints());
        return this;
    }
    // removeInnerEdges(){
    //     this.getFace().removeInnerEdges();
    //     this._holes.forEach(h => h.removeInnerEdges());
    //     return this;
    // }
    union(...others) {
        if (others.length === 0) {
            return [this];
        }
        let other = others[0];
        let status = this.checkCollision(other);
        if ((status & Face_1.Face.COLLISION_INSIDE) === Face_1.Face.COLLISION_INSIDE) {
            let holes = [];
            this.getHoles().forEach(h => holes.push(...h.setminus(other)));
            this.setHoles(holes);
            return this.union(...others.slice(1));
        }
        else if ((status & Face_1.Face.COLLISION_INSIDE_OTHER) === Face_1.Face.COLLISION_INSIDE_OTHER) {
            let holes = [];
            other.getHoles().forEach(h => holes.push(...h.setminus(this)));
            other.setHoles(holes);
            return other.union(...others.slice(1));
        }
        else if (status === Face_1.Face.COLLISION_NONE) {
            // return Polygon.arrayUnion(other, ...this.union(...others.slice(1)));
            others = others.slice(1);
            if (others.length === 0) {
                return [other, this];
            }
            let union = this.union(...others);
            //this is not intersecting with anyone, so it will not connect to any polygon in this merge
            if (union.length >= others.length + 1) {
                return [...other.union(...others), this];
            }
            else {
                return other.union(...union);
            }
        }
        let newFaces = this.getFace().union(other.getFace());
        if (newFaces.length >= 2) {
            throw Error("should not be possible, since only intersection and touching outside is possible and both should only yield one polygon!");
        }
        let newPolygon = new Polygon(newFaces[0]);
        let tmpHoles = newFaces[0].setminus(this.getFace());
        let newHoles = [];
        tmpHoles.forEach(f => newHoles.push(...f.setminus(other.getFace()).map(f => new Polygon(f))));
        this.getHoles().forEach(h => newHoles.push(...h.setminus(other)));
        other.getHoles().forEach(h => newHoles.push(...h.setminus(this)));
        newHoles = Polygon.arrayUnion(...newHoles);
        newHoles.forEach(h => newPolygon.addHole(h));
        return newPolygon.union(...others.slice(1));
    }
    setminus(...others) {
        if (others.length === 0) {
            return [this];
        }
        let other = others[0];
        let status = this.checkCollision(other);
        if ((status & Face_1.Face.COLLISION_INSIDE) === Face_1.Face.COLLISION_INSIDE && ((status & Face_1.Face.COLLISION_POINT) === Face_1.Face.COLLISION_POINT || (status & Face_1.Face.COLLISION_TOUCHING) === 0)) {
            this.addHole(other);
            return this.setminus(...others.slice(1));
        }
        else if ((status & Face_1.Face.COLLISION_INSIDE_OTHER) === Face_1.Face.COLLISION_INSIDE_OTHER) {
            return [];
        }
        let otherHolesIntersected = [];
        other.getHoles().forEach(h => otherHolesIntersected.push(...h.intersection(this)));
        this.getHoles().forEach(h => h.getHoles().forEach(i => otherHolesIntersected.push(...i.setminus(other))));
        let holes = [];
        let faces = [this.getFace()];
        let unions = other.union(...this.getHoles());
        unions.forEach(union => {
            let newFaces = [];
            faces.forEach(f => {
                let collisionStatus = f.checkCollision(union.getFace());
                if ((collisionStatus & Face_1.Face.COLLISION_INSIDE) === Face_1.Face.COLLISION_INSIDE && ((collisionStatus & Face_1.Face.COLLISION_POINT) === Face_1.Face.COLLISION_POINT || (collisionStatus & Face_1.Face.COLLISION_TOUCHING) === 0)) {
                    holes.push(union);
                }
                else if ((collisionStatus & Face_1.Face.COLLISION_INTERSECTS) !== 0 || (collisionStatus & (Face_1.Face.COLLISION_TOUCHING | Face_1.Face.COLLISION_POINT)) === Face_1.Face.COLLISION_TOUCHING) {
                    newFaces.push(...f.setminus(union.getFace()));
                }
                else if (collisionStatus === 0) {
                    newFaces.push(f);
                }
            });
            faces = newFaces;
        });
        let polygons = faces.map(f => new Polygon(f));
        polygons = Polygon.arrayUnion(...polygons, ...otherHolesIntersected);
        let res = [];
        others = others.slice(1);
        polygons.forEach(p => {
            res.push(...p.setminus(...others));
        });
        return res;
    }
    intersection(...others) {
        let faces = [];
        let holes = this.getHoles();
        others.forEach(o => {
            faces.push(o.getFace());
            holes.push(...o.getHoles());
        });
        let polygons = this.getFace().intersection(...faces).map(f => new Polygon(f));
        let newPolygons = [];
        polygons.forEach(p => {
            newPolygons.push(...p.setminus(holes));
        });
        return newPolygons;
    }
    static circle(center, radius, numPoints) {
        return new Polygon(Face_1.Face.circle(center, radius, numPoints));
    }
    static arrayUnion(...polygons) {
        let lengthBefore = polygons.length;
        if (lengthBefore === 0) {
            return [];
        }
        do {
            lengthBefore = polygons.length;
            polygons = polygons[0].union(...polygons.slice(1));
        } while (lengthBefore > polygons.length);
        return polygons;
    }
    static rect(p1, p2) {
        return new Polygon([p1.copy(), p1.copy().setY(p2.y), p2.copy(), p1.copy().setX(p2.x)]);
    }
    __getSourceCode(index, parentArray) {
        index = Helper_1.Helper.nonNull(index, 0);
        if (!(index instanceof Counter_1.Counter)) {
            index = new Counter_1.Counter(index);
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
        this.getHoles().forEach((h, i) => {
            code += h.__getSourceCode(index, "holes" + id);
        });
        code += name + ".setHoles(holes" + id + ");\n\n";
        return code;
    }
}
exports.Polygon = Polygon;
//# sourceMappingURL=Polygon.js.map