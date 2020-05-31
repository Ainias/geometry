import {Point} from "../../src/Geometry/Point";
import {Face} from "../../src/Geometry/Face";

describe('face', () => {
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
        expect(setminus[0].getPoints()).toEqual([new Point(10, 10),  new Point(10, 20), new Point(15, 20), new Point(15, 15), new Point(20, 15), new Point(20, 10)]);
    })

    it('setminus touching point', () => {
        let face1 = Face.rect(new Point(10, 10), new Point(20, 20))
        let face2 = Face.rect(new Point(20, 20), new Point(30, 30))

        let setminus = face1.setminus(face2);

        expect(setminus.length).toBe(1);
        expect(setminus[0]).toBeInstanceOf(Face);
        expect(setminus[0].getPoints()).toEqual([new Point(10, 10),  new Point(10, 20), new Point(20, 20), new Point(20, 10)]);
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
    it('setminus line outside, but points inside', () => {
        let face1 = new Face(new Point(5, 10), new Point(10, 10), new Point(20, 20), new Point(20, 25), new Point(5, 25));
        let face2 = new Face(new Point(0, 0), new Point(10, 0), new Point(10, 20), new Point(30, 20), new Point(30, 30), new Point(0, 30));

        let setminus = face1.setminus(face2);

        expect(setminus.length).toBe(1);
        expect(setminus[0]).toBeInstanceOf(Face);
        expect(setminus[0].getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(20, 20)]);
    })
});