import {Point} from "../../src/Geometry/Point";
import {Line} from "../../src/Geometry/Line";
import {Face} from "../../src/Geometry/Face";

describe('line', () => {
    it('contains 1', () => {
        let line = new Line(new Point(0,0), new Point(10,10));
        let p = new Point(5,5);

        expect(line.containsPoint(p)).toBe(true);
    })

    it('contains 2', () => {
        let line = new Line(new Point(0,0), new Point(10,10));
        let p = new Point(10,10);

        expect(line.containsPoint(p)).toBe(true);
    })

    it('contains 3', () => {
        let line = new Line(new Point(0,0), new Point(10,10));
        let p = new Point(0,0);

        expect(line.containsPoint(p)).toBe(true);
    })

    it('contains 4', () => {
        let line = new Line(new Point(0,0), new Point(10,10));
        let p = new Point(6,5);

        expect(line.containsPoint(p)).toBe(false);
    })

    it('contains 5', () => {
        let line = new Line(new Point(0,0), new Point(10,10));
        let p = new Point(11,11);

        expect(line.containsPoint(p)).toBe(false);
    })

    it('contains 6', () => {
        let line = new Line(new Point(0,0), new Point(10,10));
        let p = new Point(-1,-1);

        expect(line.containsPoint(p)).toBe(false);
    })

    it('contains gradient infinity 1', () => {
        let line = new Line(new Point(0,0), new Point(0,10));
        let p = new Point(0,5);

        expect(line.containsPoint(p)).toBe(true);
    })

    it('contains gradient infinity 2', () => {
        let line = new Line(new Point(0,0), new Point(0,10));
        let p = new Point(0,10);

        expect(line.containsPoint(p)).toBe(true);
    })

    it('contains gradient infinity 3', () => {
        let line = new Line(new Point(0,0), new Point(0,10));
        let p = new Point(0,0);

        expect(line.containsPoint(p)).toBe(true);
    })

    it('contains gradient infinity 4', () => {
        let line = new Line(new Point(0,0), new Point(0,10));
        let p = new Point(1,5);

        expect(line.containsPoint(p)).toBe(false);
    })

    it('contains gradient infinity 5', () => {
        let line = new Line(new Point(0,0), new Point(0,10));
        let p = new Point(0,11);

        expect(line.containsPoint(p)).toBe(false);
    })

    it('contains gradient infinity 6', () => {
        let line = new Line(new Point(0,0), new Point(0,10));
        let p = new Point(0,-1);

        expect(line.containsPoint(p)).toBe(false);
    })

    it('contains gradient 0 1', () => {
        let line = new Line(new Point(0,0), new Point(10, 0));
        let p = new Point(5,0);

        expect(line.containsPoint(p)).toBe(true);
    })

    it('contains gradient 0 2', () => {
        let line = new Line(new Point(0,0), new Point(10, 0));
        let p = new Point(10,0);

        expect(line.containsPoint(p)).toBe(true);
    })

    it('contains gradient 0 3', () => {
        let line = new Line(new Point(0,0), new Point(10, 0));
        let p = new Point(0,0);

        expect(line.containsPoint(p)).toBe(true);
    })

    it('contains gradient 0 4', () => {
        let line = new Line(new Point(0,0), new Point(10, 0));
        let p = new Point(5,1);

        expect(line.containsPoint(p)).toBe(false);
    })

    it('contains gradient 0 5', () => {
        let line = new Line(new Point(0,0), new Point(10, 0));
        let p = new Point(11,0);

        expect(line.containsPoint(p)).toBe(false);
    })

    it('contains gradient 0 6', () => {
        let line = new Line(new Point(0,0), new Point(10, 0));
        let p = new Point(-1,0);

        expect(line.containsPoint(p)).toBe(false);
    })

    it('contains 7', () => {
        let line = new Line(new Point(82.971,104.404), new Point(87.5,105));
        let p = new Point(87.5,105);

        expect(line.containsPoint(p)).toBe(true);
    })

    it('combine array', () => {
        let lines1 = Face.rect(new Point(0,0), new Point(10,10)).getLines();
        let lines2 = Face.rect(new Point(5,10), new Point(10,20)).getLines();

        let lines = Line.combineArrays(lines2, lines1);

        expect(lines.length).toBe(6);
    })

    it ("combine", () => {
        let line1 = new Line(new Point(140, 70), new Point(140,105));
        let line2 = new Line(new Point(140, 140), new Point(140,35));

        let combination = line2.combine(line1);

        expect(combination.length).toBe(1);
    })

    it('getIntersectionPoints', () => {
        let line1 = new Line(new Point(25.278, 103.058), new Point(95.322, 68.145));
        let line2 = new Line(new Point(26.25, 102.655), new Point(35, 87.5))

        let intersectionPoints = line1.getIntersectionPointsWith(line2);
        expect(intersectionPoints.length).toBe(1);
    })

    it("contains point", () => {
        let line = new Line(new Point(25.4078, 36.6435), new Point(37.5, 20));

        expect(line.containsPoint(line.getCenter())).toBeTrue();
    })

    it("contains point", () => {
        let line = new Line(new Point(57.9078, 69.1435), new Point(70,52.5));

        expect(line.containsPoint(line.getCenter())).toBeTrue();
    })

    it("rotate 1", () => {
        let line = new Line(new Point(10, 10), new Point(20,10));

        line.rotate(Math.PI/2)

        expect(line.p1).toEqual(new Point(15,5));
        expect(line.p2).toEqual(new Point(15,15));
    })
});