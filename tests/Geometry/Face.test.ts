import {Point} from "../../src/Geometry/Point";
import {Face} from "../../src/Geometry/Face";
import {Line} from "../../src/Geometry/Line";
import {Polygon} from "../../src/Geometry/Polygon";

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
        let face2 = new Face(...[new Point(140, 35), new Point(140, 595), new Point(945, 595), new Point(945, 35)]);

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
        expect(intersection[1].getPoints()).toEqual([new Point(10, 15), new Point(10, 20), new Point(15, 20), new Point(15, 15),]);
        expect(intersection[0].getPoints()).toEqual([new Point(10, 0), new Point(10, 5), new Point(15, 5), new Point(15, 0)]);
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

        expect(collisionStatus).toBe(Face.COLLISION_TOUCHING | Face.COLLISION_INSIDE);
    })

    it('check collision 2', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(10, 10));
        let face2 = Face.rect(new Point(0, 0), new Point(5, 5));

        let collisionStatus = face1.checkCollision(face2);

        expect(collisionStatus).toBe(Face.COLLISION_TOUCHING | Face.COLLISION_INSIDE);
    })

    it('check collision 3', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(5, 5));
        let face2 = Face.rect(new Point(0, 0), new Point(10, 10));

        let collisionStatus = face1.checkCollision(face2);

        expect(collisionStatus).toBe((Face.COLLISION_TOUCHING | Face.COLLISION_INSIDE_OTHER));
    })

    it('check collision 3', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(5, 5));
        let face2 = Face.rect(new Point(5, 5), new Point(10, 10));

        let collisionStatus = face1.checkCollision(face2);

        expect(collisionStatus).toBe(Face.COLLISION_TOUCHING | Face.COLLISION_POINT);
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

        expect(collisionStatus).toBe(Face.COLLISION_NONE);
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

    it('union with self-crossing polygon', () => {
        let face1 = new Face(new Point(45, 0), new Point(45, 70), new Point(90, 70), new Point(90, 0));
        let face2 = new Face(new Point(0, 0), new Point(70, 0), new Point(0, 70), new Point(70, 70));

        let union = face2.union(face1);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Face);
        expect(union[0].getPoints()).toEqual([new Point(0, 0), new Point(35, 35), new Point(0, 70), new Point(90, 70), new Point(90, 0)])
        // expect(setminus[1].getPoints()).toEqual([new Point(30,10), new Point(30,40), new Point(40,40), new Point(40,10)])
    })

    it('union touching', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(10, 10));
        let face2 = Face.rect(new Point(10, 10), new Point(20, 20));

        let union = face1.union(face2);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Face);
        expect(union[0].getPoints()).toEqual([new Point(0, 0), new Point(0, 10), new Point(10, 10), new Point(10, 20), new Point(20, 20), new Point(20, 10), new Point(10, 10), new Point(10, 0)]);
    })

    it('union touching2', () => {
        let face1 = Face.rect(new Point(0, 0), new Point(10, 10));
        let face2 = Face.rect(new Point(10, 10), new Point(20, 20));

        let union = face2.union(face1);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Face);
        expect(union[0].getPoints()).toEqual([new Point(0, 0), new Point(0, 10), new Point(10, 10), new Point(10, 20), new Point(20, 20), new Point(20, 10), new Point(10, 10), new Point(10, 0)]);
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

    it('union with self-crossing polygon 3', () => {
        let face1 = new Face(new Point(45, 0), new Point(45, 70), new Point(90, 70), new Point(90, 0));
        let face2 = new Face(new Point(0, 0), new Point(70, 0), new Point(0, 70), new Point(70, 70));

        let union = face2.union(face1);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Face);
        expect(union[0].getPoints().length).toEqual(5)
        // expect(setminus[1].getPoints()).toEqual([new Point(30,10), new Point(30,40), new Point(40,40), new Point(40,10)])
    })

    it("setminus 3", () => {
        let face1 = new Face(new Point(0, 0), new Point(0, 140), new Point(140, 140), new Point(140, 0));
        let face2 = new Face(new Point(0, 0), new Point(35, 140), new Point(70, 70), new Point(105, 140), new Point(140, 0));

        let setminus = face1.setminus(face2);
        expect(setminus.length).toBe(3);
    })

    it("setminus", () => {
        let face1 = new Face(new Point(0, 17.5), new Point(0, 87.5), new Point(0.596, 92.029), new Point(2.345, 96.25), new Point(5.126, 99.874), new Point(8.75, 102.655), new Point(12.971, 104.404), new Point(17.5, 105), new Point(87.5, 105), new Point(92.029, 104.404), new Point(96.25, 102.655), new Point(99.874, 99.874), new Point(102.655, 96.25), new Point(104.404, 92.029), new Point(105, 87.5), new Point(105, 17.5), new Point(104.404, 12.971), new Point(102.655, 8.75), new Point(99.874, 5.126), new Point(96.25, 2.345), new Point(92.029, 0.596), new Point(87.5, 0), new Point(17.5, 0), new Point(12.971, 0.596), new Point(8.75, 2.345), new Point(5.126, 5.126), new Point(2.345, 8.75), new Point(0.596, 12.971));
        let face2 = new Face(new Point(0, 17.5), new Point(0, 87.5), new Point(0.596, 92.029), new Point(2.345, 96.25), new Point(5.126, 99.874), new Point(8.75, 102.655), new Point(12.971, 104.404), new Point(17.5, 105), new Point(35, 35), new Point(70, 35), new Point(82.971, 104.404), new Point(87.5, 105), new Point(92.029, 104.404), new Point(96.25, 102.655), new Point(99.874, 99.874), new Point(102.655, 96.25), new Point(104.404, 92.029), new Point(105, 87.5), new Point(105, 17.5), new Point(104.404, 12.971), new Point(102.655, 8.75), new Point(99.874, 5.126), new Point(96.25, 2.345), new Point(92.029, 0.596), new Point(87.5, 0), new Point(17.5, 0), new Point(12.971, 0.596), new Point(8.75, 2.345), new Point(5.126, 5.126), new Point(2.345, 8.75), new Point(0.596, 12.971));

        let setminus = face1.setminus(face2);

        expect(setminus.length).toBe(1);
        expect(setminus[0].getPoints().length).toBe(5);
    })

    it("union", () => {
        let face1 = new Face(new Point(0, 70), new Point(17.5, 70), new Point(35, 87.5), new Point(26.25, 102.655), new Point(22.029, 104.404), new Point(0, 105));
        let face2 = new Face(new Point(9.678, 71.855), new Point(25.322, 103.145), new Point(95.322, 68.145), new Point(79.678, 36.855));

        let union = face1.union(face2);

        let res = [new Point(0, 70), new Point(0, 105), new Point(22.029, 104.404), new Point(25.27831669556, 103.057627806448), new Point(25.322, 103.145), new Point(95.322, 68.145), new Point(79.678, 36.855), new Point(13.388, 70)];
        expect(union.length).toBe(1);
        expect(union[0].getPoints()).toEqual(res);
    })

    it("union", () => {
        let face1 = new Face(new Point(239.887, 145.143), new Point(274.872, 180.128), new Point(250.128, 204.872), new Point(215.143, 169.887));
        let face2 = new Face(new Point(245, 192.5), new Point(262.5, 175), new Point(274.874, 180.126), new Point(280, 192.5), new Point(262.5, 210), new Point(257.971, 209.404), new Point(253.75, 207.655), new Point(247.345, 201.25));

        let union = face1.union(face2);

        expect(union.length).toBe(1);
        expect(union[0].getPoints().length).toBeGreaterThan(4);
    })

    it("union", () => {
        let offset = new Point(-650, -330);
        let factor = 1;
        let face1 = new Face(new Point(702.345, 358.75).add(offset).multiply(factor), new Point(705.126, 355.126).add(offset).multiply(factor), new Point(712.971, 350.596).add(offset).multiply(factor), new Point(735, 350).add(offset).multiply(factor), new Point(700, 385).add(offset).multiply(factor));
        let face2 = new Face(new Point(670.128, 390.128).add(offset).multiply(factor), new Point(694.872, 414.872).add(offset).multiply(factor), new Point(729.872, 379.872).add(offset).multiply(factor), new Point(705.128, 355.128).add(offset).multiply(factor));

        let union = face1.union(face2);

        expect(union.length).toBe(1);
        expect(union[0].getPoints().length).toBeLessThan(10);
    })

    it("union", () => {
        let offset = new Point(-400, -450);
        let factor = 1;
        let face1 = new Face(new Point(425.1273, 530.1243).add(offset).multiply(factor), new Point(460.1258, 495.1258).add(offset).multiply(factor), new Point(484.8742, 519.8742).add(offset).multiply(factor), new Point(449.8757, 554.8727).add(offset).multiply(factor), new Point(425.1256, 554.8744).add(offset).multiply(factor));
        let face2 = new Face(new Point(460.1256, 495.1256).add(offset).multiply(factor), new Point(472.5, 490).add(offset).multiply(factor), new Point(490, 507.5).add(offset).multiply(factor), new Point(484.8744, 519.8744).add(offset).multiply(factor), new Point(481.25, 522.6554).add(offset).multiply(factor), new Point(455.5963, 512.0293).add(offset).multiply(factor));

        let union = face1.union(face2);
        expect(union.length).toBe(1);
        expect(union[0].getPoints().length).toBe(9);
    })

    it("union", () => {
        let face1 = new Face(new Point(452.6554, 551.25), new Point(449.8744, 554.8744), new Point(420.5963, 547.0293));
        let face2 = new Face(new Point(425.1258, 530.1258), new Point(449.8742, 554.8742), new Point(484.8742, 519.8742), new Point(460.1258, 495.1258));

        let union = face1.union(face2);
        expect(union.length).toBe(1);
        expect(union[0].getPoints().length).toBe(7);
    })

    it("containsPoint 2", () => {
        let face = Face.circle(new Point(52.5,52.5), 17.5, 24);
        let lines = face.getLines();

        // lines = face.cutLines(lines);

        expect(lines.length).toBe(5);
        expect(face.containsPoint(lines[0].getCenter())).toBeTrue();
        expect(face.containsPoint(lines[1].getCenter())).toBeTrue();
        expect(face.containsPoint(lines[2].getCenter())).toBeTrue();
        expect(face.containsPoint(lines[3].getCenter())).toBeTrue();
        expect(face.containsPoint(lines[4].getCenter())).toBeTrue();
    })

    it("new Face", () => {
        let face = new Face(new Point(0,0), new Point(10,0), new Point(10,10), new Point(10,5));

        let points = face.getPoints();
        expect(points.length).toEqual(3);
    })
});

