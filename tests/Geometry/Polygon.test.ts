import {Face} from "../../src/Geometry/Face";
import {Point} from "../../src/Geometry/Point";
import {Polygon} from "../../src/Geometry/Polygon";

fdescribe('polygon', () => {
    it('union1', () => {
        let face1 = new Face(new Point(0,0), new Point(15,0), new Point(15,5), new Point(5,5), new Point(5,15),new Point(15,15), new Point(15,20), new Point(0,20));
        let face2 = new Face(new Point(25,0), new Point(10,0), new Point(10,5), new Point(20,5), new Point(20,15),new Point(10,15), new Point(10,20), new Point(25,20));

        let polygon1 = new Polygon(face1)
        let polygon2 = new Polygon(face2)

        let union = polygon1.union(polygon2);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0,0), new Point(0,20), new Point(25,20), new Point(25,0)]);

        let holes = union[0].getHoles();
        expect(holes.length).toBe(1);
        expect(holes[0]).toBeInstanceOf(Polygon);
        expect(holes[0].getFace().getPoints()).toEqual([new Point(5,5), new Point(5,15), new Point(20,15), new Point(20, 5)]);
    })

    xit('test', () => {
        let face1 = Face.rect(new Point(5,5), new Point(10,10));
        let face2 = Face.rect(new Point(15,5), new Point(20,10));
        let face3 = Face.rect(new Point(10,5), new Point(15,10));

        let polygon1 = new Polygon(face1)
        let polygon2 = new Polygon(face2)
        let polygon3 = new Polygon(face3)

        let res = Polygon.arrayUnion([polygon1, polygon2, polygon3]);
        let x = 42;
    })
});