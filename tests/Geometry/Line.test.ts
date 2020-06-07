import {Point} from "../../src/Geometry/Point";
import {Line} from "../../src/Geometry/Line";

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
});