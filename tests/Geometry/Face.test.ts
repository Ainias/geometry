import {Point} from "../../src/Geometry/Point";
import {Face} from "../../src/Geometry/Face";
import {Polygon} from "../../src/Geometry/Polygon";
import {Line} from "../../src/Geometry/Line";

describe('face', () => {
    it('containsPoint 1', () => {
        let face = Face.rect(new Point(10, 10), new Point(20, 20))
        let point = new Point(15, 15);

        expect(face.containsPoint(point)).toBe(true);
    })

    it('containsPoint 2', () => {
        let face = Face.rect(new Point(10, 10), new Point(20, 20))
        let point = new Point(10, 15);

        expect(face.containsPoint(point)).toBe(true);
    })

    it('containsPoint 2', () => {
        let face = Face.rect(new Point(10, 10), new Point(20, 20))
        let point = new Point(10, 10);

        expect(face.containsPoint(point)).toBe(true);
    })

    it('containsPoint 2', () => {
        let face = Face.rect(new Point(10, 10), new Point(20, 20))
        let point = new Point(15, 20);

        expect(face.containsPoint(point)).toBe(true);
    })

    it('containsPoint 2', () => {
        let face = Face.rect(new Point(10, 10), new Point(20, 20))
        let point = new Point(20, 20);

        expect(face.containsPoint(point)).toBe(true);
    })

    it('containsPoint 2', () => {
        let face = Face.rect(new Point(10, 10), new Point(20, 20))
        let point = new Point(5, 5);

        expect(face.containsPoint(point)).toBe(false);
    })

    it('containsPoint 2', () => {
        let face = Face.rect(new Point(10, 10), new Point(20, 20))
        let point = new Point(25, 25);

        expect(face.containsPoint(point)).toBe(false);
    })

    it('containsPoint 2', () => {
        let face = Face.rect(new Point(10, 10), new Point(20, 20))
        let point = new Point(15, 5);

        expect(face.containsPoint(point)).toBe(false);
    })

    it('containsPoint 2', () => {
        let face = Face.rect(new Point(10, 10), new Point(20, 20))
        let point = new Point(5, 15);

        expect(face.containsPoint(point)).toBe(false);
    })

    it('containsPoint 2', () => {
        let face = Face.rect(new Point(10, 10), new Point(20, 20))
        let point = new Point(10, 5);

        expect(face.containsPoint(point)).toBe(false);
    })

    it('containsPoint 2', () => {
        let face = Face.rect(new Point(10, 10), new Point(20, 20))
        let point = new Point(5, 10);

        expect(face.containsPoint(point)).toBe(false);
    })

    it('union1', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(15, 15), new Point(25, 25))

        let union = face1.union(face2);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Face);
        expect(union[0].getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(15, 20), new Point(15, 25), new Point(25, 25), new Point(25, 15), new Point(20, 15), new Point(20, 10)]);
    })

    it('union2', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(30, 30), new Point(40, 40))

        let union = face1.union(face2);

        expect(union.length).toBe(2);
        expect(union[1]).toEqual(face1);
        expect(union[0]).toEqual(face2);
    })

    it('union3', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(12, 12), new Point(18, 18))

        let union = face1.union(face2);

        expect(union.length).toBe(1);
        expect(union[0]).toEqual(face1);
    })

    it('union4', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(15, 15), new Point(25, 25))
        let face3 = Face.rect(new Point(30, 30), new Point(40, 40))
        let face4 = Face.rect(new Point(12, 12), new Point(18, 18))

        let union = face1.union(face2, face3, face4);

        expect(union.length).toBe(2);
        expect(union[0]).toBe(face3);
        expect(union[1]).toBeInstanceOf(Face);
        expect(union[1].getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(15, 20), new Point(15, 25), new Point(25, 25), new Point(25, 15), new Point(20, 15), new Point(20, 10)]);
    })

    it('union5', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(15, 15), new Point(25, 25))

        let union = face2.union(face1);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Face);
        expect(union[0].getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(15, 20), new Point(15, 25), new Point(25, 25), new Point(25, 15), new Point(20, 15), new Point(20, 10)]);
    })

    it('union6', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))

        let union = face1.union(face1);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Face);
        expect(union[0].getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(20, 20), new Point(20, 10)]);
    })

    it('union7', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(20, 20), new Point(30, 30))

        let union = face1.union(face2);

        expect(union.length).toBe(2);
        // expect(union[0]).toBeInstanceOf(Face);
        // expect(union[0].getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(15, 20), new Point(15, 25), new Point(25, 25), new Point(25, 15), new Point(20, 15), new Point(20, 10)]);
    })

    it("union 8", () => {
        let face1 = new Face(new Point(70, 35), new Point(70, 105), new Point(210, 35));
        let face2 = new Face(new Point(35, 70), new Point(105, 0), new Point(140, 70));

        let unions = face2.union(face1);

        expect(unions.length).toBe(1);
        expect(unions[0]).toBeInstanceOf(Face);
        expect(unions[0].getPoints()).toEqual([new Point(35, 70), new Point(70, 70), new Point(70, 105), new Point(210, 35), new Point(122.5, 35), new Point(105, 0)])
    });

    it("union 9", () => {
        let face1 = new Face(new Point(35, 35), new Point(105, 105), new Point(175, 35));
        let face2 = new Face(new Point(70, 70), new Point(105, 0), new Point(140, 70));

        let unions = face2.union(face1);

        expect(unions.length).toBe(1);
        expect(unions[0]).toBeInstanceOf(Face);
        expect(unions[0].getPoints()).toEqual([new Point(35, 35), new Point(87.5, 35), new Point(105, 0), new Point(122.5, 35), new Point(175, 35), new Point(105, 105)])
    })

    it("union 10", () => {
        let face1 = new Face(new Point(35, 35), new Point(35, 210), new Point(210, 35));
        let face2 = new Face(new Point(0, 210), new Point(105, 0), new Point(175, 175));

        let union = face2.union(face1);
        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Face);
    })

    it("union 11", () => {
        let face1 = new Face(...[new Point(210, 595), new Point(525, 35), new Point(805, 103.65384615384616), new Point(945, 350), new Point(770, 595)]);
        let face2 = new Face(...[new Point(140, 35), new Point(140, 595), new Point(945, 595), new Point(945, 245), new Point(945, 35)]);

        let union = face2.union(face1);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Face);
        expect(union[0].getPoints()).toEqual([new Point(140, 35), new Point(140, 595), new Point(945, 595), new Point(945, 35)])
    })

    it('intersection simple overlapping', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(15, 15), new Point(25, 25))

        let intersection = face1.intersection(face2);

        expect(intersection.length).toBe(1);
        expect(intersection[0]).toBeInstanceOf(Face);
        expect(intersection[0].getPoints()).toEqual([new Point(15, 15), new Point(15, 20), new Point(20, 20), new Point(20, 15)]);
    })

    it('intersection not overlapping', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(30, 30), new Point(40, 40))

        let intersection = face1.intersection(face2);

        expect(intersection.length).toBe(0);
    })

    it('intersection two overlapping areas', () => {
        let face1 = new Face(new Point(0, 0), new Point(15, 0), new Point(15, 5), new Point(5, 5), new Point(5, 15), new Point(15, 15), new Point(15, 20), new Point(0, 20));
        let face2 = new Face(new Point(25, 0), new Point(10, 0), new Point(10, 5), new Point(20, 5), new Point(20, 15), new Point(10, 15), new Point(10, 20), new Point(25, 20));

        let intersection = face1.intersection(face2);

        expect(intersection.length).toBe(2);
        expect(intersection[0]).toBeInstanceOf(Face);
        expect(intersection[1]).toBeInstanceOf(Face);
        expect(intersection[0].getPoints()).toEqual([new Point(10, 15), new Point(10, 20), new Point(15, 20), new Point(15, 15),]);
        expect(intersection[1].getPoints()).toEqual([new Point(10, 0), new Point(10, 5), new Point(15, 5), new Point(15, 0)]);
    })

    it('intersection touching corner', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(20, 20), new Point(40, 40))

        let intersection = face1.intersection(face2);

        expect(intersection.length).toBe(0);
    })

    it('intersection touching edge', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(10, 20), new Point(40, 40))

        let intersection = face1.intersection(face2);

        expect(intersection.length).toBe(0);
    })

    it('intersection fully overlapping', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(10, 10), new Point(40, 40))

        let intersection = face1.intersection(face2);

        expect(intersection.length).toBe(1);
        expect(intersection[0]).toBeInstanceOf(Face);
        expect(intersection[0].getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(20, 20), new Point(20, 10)]);
    })

    it('setminus overlapping', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(15, 15), new Point(30, 30))

        let setminus = face1.setminus(face2);

        expect(setminus.length).toBe(1);
        expect(setminus[0]).toBeInstanceOf(Face);
        expect(setminus[0].getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(15, 20), new Point(15, 15), new Point(20, 15), new Point(20, 10)]);
    })

    it('setminus touching point', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(20, 20), new Point(30, 30))

        let setminus = face1.setminus(face2);

        expect(setminus.length).toBe(1);
        expect(setminus[0]).toBeInstanceOf(Face);
        expect(setminus[0].getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(20, 20), new Point(20, 10)]);
    })

    it('setminus touching edge', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(10, 20), new Point(30, 30))

        let setminus = face1.setminus(face2);

        expect(setminus.length).toBe(1);
        expect(setminus[0]).toBeInstanceOf(Face);
        expect(setminus[0].getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(20, 20), new Point(20, 10)]);
    })

    it('setminus fully overlapping', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(5, 5), new Point(30, 30))

        let setminus = face1.setminus(face2);

        expect(setminus.length).toBe(0);
    })

    it('setminus fully overlapping but touching', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(10, 5), new Point(30, 30))

        let setminus = face1.setminus(face2);

        expect(setminus.length).toBe(0);
    })

    it('setminus overlapping and touching', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(25, 20))
        let face2 = new Face(new Point(0, 0), new Point(15, 0), new Point(15, 5), new Point(5, 5), new Point(5, 15), new Point(15, 15), new Point(15, 20), new Point(0, 20));

        let setminus = face1.setminus(face2);

        expect(setminus.length).toBe(1);
        expect(setminus[0]).toBeInstanceOf(Face);
        expect(setminus[0].getPoints()).toEqual([new Point(5, 5), new Point(5, 15), new Point(15, 15), new Point(15, 20), new Point(25, 20), new Point(25, 0), new Point(15, 0), new Point(15, 5)]);
    })

    it('setminus 1', () => {
        let face1 = new Face(new Point(0, 0), new Point(0, 10), new Point(5, 10), new Point(5, 15), new Point(15, 15), new Point(15, 5), new Point(10, 5), new Point(10, 0));
        let face2 = Face.rect(new Point(0, 0), new Point(10, 10))

        let setminus = face1.setminus(face2);

        expect(setminus.length).toBe(1);
        expect(setminus[0]).toBeInstanceOf(Face);
        expect(setminus[0].getPoints()).toEqual([new Point(5, 10), new Point(5, 15), new Point(15, 15), new Point(15, 5), new Point(10, 5), new Point(10, 10)]);
    })

    it('setminus 2', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(20, 15))
        let face2 = new Face(new Point(0, 0), new Point(0, 15), new Point(5, 15), new Point(5, 5), new Point(15, 5), new Point(15, 15), new Point(20, 15), new Point(20, 0));

        let setminus = face1.setminus(face2);

        expect(setminus.length).toBe(1);
        expect(setminus[0]).toBeInstanceOf(Face);
        expect(setminus[0].getPoints()).toEqual([new Point(5, 5), new Point(5, 15), new Point(15, 15), new Point(15, 5)]);
    })

    it('setminus line outside, but points inside', () => {
        let face1 = new Face(new Point(5, 10), new Point(10, 10), new Point(20, 20), new Point(20, 25), new Point(5, 25));
        let face2 = new Face(new Point(0, 0), new Point(10, 0), new Point(10, 20), new Point(30, 20), new Point(30, 30), new Point(0, 30));

        let setminus = face1.setminus(face2);

        expect(setminus.length).toBe(1);
        expect(setminus[0]).toBeInstanceOf(Face);
        expect(setminus[0].getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(20, 20)]);
    })

    it('setminus with multiple faces as result', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(40, 40));
        let face2 = Face.rect(new Point(20, 5), new Point(30, 45));

        let setminus = face1.setminus(face2);

        expect(setminus.length).toBe(2);
        expect(setminus[0]).toBeInstanceOf(Face);
        expect(setminus[1]).toBeInstanceOf(Face);
        expect(setminus[0].getPoints()).toEqual([new Point(10, 10), new Point(10, 40), new Point(20, 40), new Point(20, 10)])
        expect(setminus[1].getPoints()).toEqual([new Point(30, 10), new Point(30, 40), new Point(40, 40), new Point(40, 10)])
    })

    it('cut lines', () => {
        let face = Face.rect(new Point(10, 0), new Point(40, 40));
        let line = new Line(new Point(0, 5), new Point(45, 5))

        let lines = face.cutLines([line]);

        expect(lines.length).toBe(3);
        expect(lines[0]).toBeInstanceOf(Line);
        expect(lines[1]).toBeInstanceOf(Line);
        expect(lines[2]).toBeInstanceOf(Line);
        expect(lines[0]).toEqual(new Line(new Point(0, 5), new Point(10, 5)))
        expect(lines[1]).toEqual(new Line(new Point(10, 5), new Point(40, 5)))
        expect(lines[2]).toEqual(new Line(new Point(40, 5), new Point(45, 5)))
    })

    it('check collision 1', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(5, 5));
        let face2 = Face.rect(new Point(0, 0), new Point(5, 5));

        let collisionStatus = face1.checkCollision(face2);

        expect(collisionStatus).toBe(Face.COLLISION_TOUCHING_INSIDE);
    })

    it('check collision 2', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(10, 10));
        let face2 = Face.rect(new Point(0, 0), new Point(5, 5));

        let collisionStatus = face1.checkCollision(face2);

        expect(collisionStatus).toBe(Face.COLLISION_TOUCHING_INSIDE);
    })

    it('check collision 3', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(5, 5));
        let face2 = Face.rect(new Point(0, 0), new Point(10, 10));

        let collisionStatus = face1.checkCollision(face2);

        expect(collisionStatus).toBe(Face.COLLISION_TOUCHING_INSIDE_OTHER);
    })

    it('check collision 3', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(5, 5));
        let face2 = Face.rect(new Point(5, 5), new Point(10, 10));

        let collisionStatus = face1.checkCollision(face2);

        expect(collisionStatus).toBe(Face.COLLISION_TOUCHING);
    })

    it('check collision 4', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(5, 5));
        let face2 = Face.rect(new Point(0, 5), new Point(10, 10));

        let collisionStatus = face1.checkCollision(face2);

        expect(collisionStatus).toBe(Face.COLLISION_TOUCHING);
    })

    it('check collision 5', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(5, 5));
        let face2 = Face.rect(new Point(0, 6), new Point(10, 10));

        let collisionStatus = face1.checkCollision(face2);

        expect(collisionStatus).toBe(Face.COLLISION_NO_INTERSECTION);
    })

    it('check collision 6', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(10, 10));
        let face2 = Face.rect(new Point(1, 2), new Point(8, 8));

        let collisionStatus = face1.checkCollision(face2);

        expect(collisionStatus).toBe(Face.COLLISION_INSIDE);
    })

    it('check collision 6', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(10, 10));
        let face2 = Face.rect(new Point(1, 2), new Point(8, 8));

        let collisionStatus = face2.checkCollision(face1);

        expect(collisionStatus).toBe(Face.COLLISION_INSIDE_OTHER);
    })

    it('union no intersection but touching', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(10, 10));
        let face2 = Face.rect(new Point(10, 10), new Point(20, 20));

        let union = face1.union(face2);

        expect(union.length).toBe(2);
        expect(union[0]).toBeInstanceOf(Face);
        expect(union[1]).toBeInstanceOf(Face);
        expect(union[0].getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(20, 20), new Point(20, 10)]);
        expect(union[1].getPoints()).toEqual([new Point(0, 0), new Point(0, 10), new Point(10, 10), new Point(10, 0)]);
    })

    it('union with self-crossing polygon', () => {
        let face1 = new Face(new Point(45, 0), new Point(45, 70), new Point(90, 70), new Point(90, 0));
        let face2 = new Face(new Point(0, 0), new Point(70, 0), new Point(0, 70), new Point(70, 70));

        let union = face2.union(face1);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Face);
        expect(union[0].getPoints()).toEqual([new Point(0, 0), new Point(35, 35), new Point(0, 70), new Point(90, 70), new Point(90, 0)])
        // expect(setminus[1].getPoints()).toEqual([new Point(30,10), new Point(30,40), new Point(40,40), new Point(40,10)])
    })

    it('union tpuching', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(10, 10));
        let face2 = Face.rect(new Point(10, 10), new Point(20, 20));

        let union = face1.union(face2);

        expect(union.length).toBe(2);
        expect(union[0]).toBeInstanceOf(Face);
        expect(union[1]).toBeInstanceOf(Face);
        expect(union[0].getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(20, 20), new Point(20, 10)]);
        expect(union[1].getPoints()).toEqual([new Point(0, 0), new Point(0, 10), new Point(10, 10), new Point(10, 0)]);
    })

    it('union with self-crossing polygon 2', () => {
        let face1 = new Face(new Point(315, 245), new Point(315, 735), new Point(630, 735), new Point(630, 245));
        let face2 = new Face(new Point(175, 280), new Point(455, 70), new Point(210, 490), new Point(770, 560));

        let union = face2.union(face1);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Face);
        expect(union[0].getPoints().length).toEqual(12)
        // expect(setminus[1].getPoints()).toEqual([new Point(30,10), new Point(30,40), new Point(40,40), new Point(40,10)])
    })

    it('setminus', () => {
        let face1 = new Face(new Point(455, 105), new Point(466.6666666667, 110.8333333334), new Point(478.3333333333, 116.6666666667));
        let face2 = new Face(new Point(350, 245), new Point(595, 70), new Point(455, 105), new Point(478, 116));

        let setminus = face2.setminus(face1);

        expect(setminus.length).toBe(1);
        expect(setminus[0]).toBeInstanceOf(Face);
    })

    it('removeUnesseccaryPoints', () => {
        let face = new Face(new Point(0,0) , new Point(0,70) , new Point(70,70) , new Point(70,35) , new Point(35,35) , new Point(35,105) , new Point(105,105) , new Point(105,0));

        face = face.removeUnnecessaryPoints();

        expect(face).toBeInstanceOf(Face);
        expect(face.getPoints()).toEqual([new Point(0,0), new Point(0,70), new Point(35,70), new Point(35,105), new Point(105,105), new Point(105,0)]);
    })
});