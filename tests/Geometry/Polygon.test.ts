import {Face} from "../../src/Geometry/Face";
import {Point} from "../../src/Geometry/Point";
import {Polygon} from "../../src/Geometry/Polygon";

describe('polygon', () => {
    it('union1', () => {
        let face1 = new Face(new Point(0, 0), new Point(15, 0), new Point(15, 5), new Point(5, 5), new Point(5, 15), new Point(15, 15), new Point(15, 20), new Point(0, 20));
        let face2 = new Face(new Point(25, 0), new Point(10, 0), new Point(10, 5), new Point(20, 5), new Point(20, 15), new Point(10, 15), new Point(10, 20), new Point(25, 20));

        let polygon1 = new Polygon(face1)
        let polygon2 = new Polygon(face2)

        let union = polygon1.union(polygon2);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 20), new Point(25, 20), new Point(25, 0)]);

        let holes = union[0].getHoles();
        expect(holes.length).toBe(1);
        expect(holes[0]).toBeInstanceOf(Polygon);
        expect(holes[0].getFace().getPoints()).toEqual([new Point(5, 5), new Point(5, 15), new Point(20, 15), new Point(20, 5)]);
    })

    it('union2', () => {
        let polygon1 = Polygon.rect(new Point(0, 0), new Point(10, 10));
        let polygon2 = Polygon.rect(new Point(5, 5), new Point(15, 15));

        let union = polygon1.union(polygon2);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 10), new Point(5, 10), new Point(5, 15), new Point(15, 15), new Point(15, 5), new Point(10, 5), new Point(10, 0)]);

        expect(union[0].getHoles().length).toBe(0);
    })

    it('union3', () => {
        let polygon1 = Polygon.rect(new Point(15, 15), new Point(25, 25));
        let polygon2 = Polygon.rect(new Point(0, 0), new Point(40, 40));
        // let hole = Polygon.rect(new Point(10,10), new Point(30,30));
        // polygon2.setHoles([hole]);

        let union = polygon1.union(polygon2);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 40), new Point(40, 40), new Point(40, 0)]);

        expect(union[0].getHoles().length).toBe(0);
    })

    it('union4', () => {
        let polygon1 = new Polygon([new Point(0, 0), new Point(0, 15), new Point(5, 15), new Point(5, 5), new Point(15, 5), new Point(15, 15), new Point(20, 15), new Point(20, 0)])
        let polygon2 = Polygon.rect(new Point(0, 15), new Point(20, 20));
        // let hole = Polygon.rect(new Point(10,10), new Point(30,30));
        // polygon2.setHoles([hole]);

        let union = polygon2.union(polygon1);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 20), new Point(20, 20), new Point(20, 0)]);

        let holes = union[0].getHoles();
        expect(holes.length).toBe(1);
        expect(holes[0]).toBeInstanceOf(Polygon);
        expect(holes[0].getFace().getPoints()).toEqual([new Point(5, 5), new Point(5, 15), new Point(15, 15), new Point(15, 5)]);
    })

    it('union4', () => {
        let polygons = [];
        let polygon1 = new Polygon([new Point(70, 35), new Point(70, 105), new Point(210, 35)]);
        polygons.push(polygon1);

        let polygon2 = new Polygon([new Point(35, 70), new Point(105, 0), new Point(140, 70)]);

        let unions = polygon2.union(polygon1);

        expect(unions.length).toBe(1);
        expect(unions[0]).toBeInstanceOf(Polygon);
        expect(unions[0].getFace().getPoints()).toEqual([new Point(35, 70), new Point(70, 70), new Point(70, 105), new Point(210, 35), new Point(122.5, 35), new Point(105, 0)])
    })

    it("union 5", () => {
        let polygon1 = new Polygon([new Point(35, 35), new Point(105, 105), new Point(175, 35)]);
        let polygon2 = new Polygon([new Point(70, 70), new Point(105, 0), new Point(140, 70)]);

        let unions = polygon2.union(polygon1);

        expect(unions.length).toBe(1);
        expect(unions[0]).toBeInstanceOf(Polygon);
        expect(unions[0].getFace().getPoints()).toEqual([new Point(35, 35), new Point(87.5, 35), new Point(105, 0), new Point(122.5, 35), new Point(175, 35), new Point(105, 105)])
    })

    it("union 6", () => {
        let polygon1 = new Polygon([new Point(35, 35), new Point(35, 210), new Point(210, 35)]);
        let polygon2 = new Polygon([new Point(0, 210), new Point(105, 0), new Point(175, 175)]);

        let union = polygon2.union(polygon1);
        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
    })

    it("union 7", () => {
        let polygon1 = new Polygon([new Point(35, 35), new Point(35, 210), new Point(210, 35)]);
        let polygon2 = new Polygon([new Point(0, 210), new Point(70, 0), new Point(140, 175)]);

        let union = polygon2.union(polygon1);
        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
    })

    it("union 8", () => {
        let polygon1 = new Polygon([new Point(210, 595), new Point(525, 35), new Point(805, 103.65384615384616), new Point(945, 350), new Point(770, 595)]);
        let polygon2 = new Polygon([new Point(140, 35), new Point(140, 595), new Point(945, 595), new Point(945, 245), new Point(945, 35)]);

        let union = polygon2.union(polygon1);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(140, 35), new Point(140, 595), new Point(945, 595), new Point(945, 35)])
    })

    it('union no intersection', () => {
        let polygon1 = Polygon.rect(new Point(0, 0), new Point(10, 10));
        let polygon2 = Polygon.rect(new Point(20, 20), new Point(30, 30));

        let union = polygon1.union(polygon2);

        expect(union.length).toBe(2);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[1]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 10), new Point(10, 10), new Point(10, 0)]);
        expect(union[1].getFace().getPoints()).toEqual([new Point(20, 20), new Point(20, 30), new Point(30, 30), new Point(30, 20)]);

        expect(union[0].getHoles().length).toBe(0);
        expect(union[1].getHoles().length).toBe(0);
    })

    it('union no intersection but touching', () => {
        let polygon1 = Polygon.rect(new Point(0, 0), new Point(10, 10));
        let polygon2 = Polygon.rect(new Point(10, 10), new Point(20, 20));

        let union = polygon1.union(polygon2);

        expect(union.length).toBe(2);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[1]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(10, 10), new Point(10, 20), new Point(20, 20), new Point(20, 10)]);
        expect(union[1].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 10), new Point(10, 10), new Point(10, 0)]);

        expect(union[0].getHoles().length).toBe(0);
        expect(union[1].getHoles().length).toBe(0);
    })

    it('union with hole 1', () => {
        let polygon1 = Polygon.rect(new Point(0, 0), new Point(30, 30));
        let polygon2 = Polygon.rect(new Point(10, 10), new Point(20, 20));
        let hole = Polygon.rect(new Point(10, 10), new Point(20, 20));
        polygon1.setHoles([hole]);

        let union = polygon1.union(polygon2);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 30), new Point(30, 30), new Point(30, 0)]);

        expect(union[0].getHoles().length).toBe(0);
    })

    it('union with hole 2', () => {
        let polygon1 = Polygon.rect(new Point(0, 0), new Point(30, 30));
        let polygon2 = Polygon.rect(new Point(10, 10), new Point(15, 20));
        let hole = Polygon.rect(new Point(10, 10), new Point(20, 20));
        polygon1.setHoles([hole]);

        let union = polygon1.union(polygon2);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 30), new Point(30, 30), new Point(30, 0)]);

        let holes = union[0].getHoles();
        expect(holes.length).toBe(1);
        expect(holes[0]).toBeInstanceOf(Polygon);
        expect(holes[0].getFace().getPoints()).toEqual([new Point(15, 10), new Point(15, 20), new Point(20, 20), new Point(20, 10)])
    })

    it('union with hole 3', () => {
        let polygon1 = Polygon.rect(new Point(0, 0), new Point(50, 50));
        let polygon2 = Polygon.rect(new Point(20, 20), new Point(30, 30));
        let hole = Polygon.rect(new Point(10, 10), new Point(40, 40));

        polygon1.setHoles([hole]);

        let union = polygon1.union(polygon2);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 50), new Point(50, 50), new Point(50, 0)]);

        let holes = union[0].getHoles();
        expect(holes.length).toBe(1);
        expect(holes[0]).toBeInstanceOf(Polygon);
        expect(holes[0].getFace().getPoints()).toEqual([new Point(10, 10), new Point(10, 40), new Point(40, 40), new Point(40, 10)])

        let islands = holes[0].getHoles();
        expect(islands.length).toBe(1);
        expect(islands[0]).toBeInstanceOf(Polygon);
        expect(islands[0].getFace().getPoints()).toEqual([new Point(20, 20), new Point(20, 30), new Point(30, 30), new Point(30, 20)])
    })

    it('union with holes 4', () => {
        let polygon1 = Polygon.rect(new Point(0, 0), new Point(50, 50));
        let polygon2 = Polygon.rect(new Point(20, 5), new Point(30, 45));
        let hole = Polygon.rect(new Point(10, 10), new Point(40, 40));

        polygon1.setHoles([hole]);

        let union = polygon1.union(polygon2);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 50), new Point(50, 50), new Point(50, 0)]);

        let holes = union[0].getHoles();
        expect(holes.length).toBe(2);
        expect(holes[0]).toBeInstanceOf(Polygon);
        expect(holes[1]).toBeInstanceOf(Polygon);
        expect(holes[0].getFace().getPoints()).toEqual([new Point(30, 10), new Point(30, 40), new Point(40, 40), new Point(40, 10)])
        expect(holes[1].getFace().getPoints()).toEqual([new Point(10, 10), new Point(10, 40), new Point(20, 40), new Point(20, 10)])
    })

    it('union with holes 5', () => {
        let polygon1 = Polygon.rect(new Point(25, 5), new Point(30, 10));

        let polygon2 = Polygon.rect(new Point(15, 15), new Point(35, 35))
        let polygon3 = new Polygon([new Point(5, 5), new Point(5, 45), new Point(45, 45), new Point(45, 5), new Point(30, 5), new Point(30, 10), new Point(40, 10), new Point(40, 40), new Point(10, 40), new Point(10, 10), new Point(25, 10), new Point(25, 5)])

        let union = polygon1.union(polygon2, polygon3);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(5, 5), new Point(5, 45), new Point(45, 45), new Point(45, 5)])

        union = union[0].getHoles();
        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(10, 10), new Point(10, 40), new Point(40, 40), new Point(40, 10)])

        union = union[0].getHoles();
        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(15, 15), new Point(15, 35), new Point(35, 35), new Point(35, 15)])

        union = union[0].getHoles();
        expect(union.length).toBe(0);
    })

    it('union with holes in holes', () => {
        let polygon1 = Polygon.rect(new Point(0, 0), new Point(50, 50));
        let polygon2 = Polygon.rect(new Point(10, 15), new Point(40, 40));
        let hole1 = Polygon.rect(new Point(5, 10), new Point(45, 45))
        let hole2 = Polygon.rect(new Point(15, 20), new Point(35, 35))
        // let island = Polygon.rect(new Point(20, 25), new Point(30, 30));

        polygon1.setHoles([hole1]);
        polygon2.setHoles([hole2]);

        let union = polygon1.union(polygon2);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 50), new Point(50, 50), new Point(50, 0)])

        let holes = union[0].getHoles();
        expect(holes.length).toBe(1);
        expect(holes[0]).toBeInstanceOf(Polygon);
        expect(holes[0].getFace().getPoints()).toEqual([new Point(5, 10), new Point(5, 45), new Point(45, 45), new Point(45, 10)])

        let islands = holes[0].getHoles();
        expect(islands.length).toBe(1);
        expect(islands[0]).toBeInstanceOf(Polygon);
        expect(islands[0].getFace().getPoints()).toEqual([new Point(10, 15), new Point(10, 40), new Point(40, 40), new Point(40, 15)])

        let islandHoles = islands[0].getHoles();
        expect(islandHoles.length).toBe(1);
        expect(islandHoles[0]).toBeInstanceOf(Polygon);
        expect(islandHoles[0].getFace().getPoints()).toEqual([new Point(15, 20), new Point(15, 35), new Point(35, 35), new Point(35, 20)])

        let islandHolesIslands = islandHoles[0].getHoles();
        expect(islandHolesIslands.length).toBe(0);
    })

    it('setminus 1', () => {
        let polygon1 = Polygon.rect(new Point(10, 10), new Point(20, 20));
        let polygon2 = Polygon.rect(new Point(10, 10), new Point(15, 20));

        let setminus = polygon1.setminus(polygon2);

        expect(setminus.length).toBe(1);
        expect(setminus[0]).toBeInstanceOf(Polygon);
        expect(setminus[0].getFace().getPoints()).toEqual([new Point(15, 10), new Point(15, 20), new Point(20, 20), new Point(20, 10)])

        let holes = setminus[0].getHoles();
        expect(holes.length).toBe(0);
    })

    it('setminus 2', () => {
        let polygon1 = Polygon.rect(new Point(10, 10), new Point(40, 40));
        let polygon2 = Polygon.rect(new Point(20, 5), new Point(30, 45));

        let setminus = polygon1.setminus(polygon2);

        expect(setminus.length).toBe(2);
        expect(setminus[0]).toBeInstanceOf(Polygon);
        expect(setminus[1]).toBeInstanceOf(Polygon);
        expect(setminus[0].getFace().getPoints()).toEqual([new Point(10, 10), new Point(10, 40), new Point(20, 40), new Point(20, 10)])
        expect(setminus[1].getFace().getPoints()).toEqual([new Point(30, 10), new Point(30, 40), new Point(40, 40), new Point(40, 10)])
    })

    it('setminus with holes', () => {
        let polygon1 = Polygon.rect(new Point(0, 0), new Point(50, 50));
        let polygon2 = Polygon.rect(new Point(25, 5), new Point(30, 10));

        let hole1 = Polygon.rect(new Point(15, 15), new Point(35, 35))
        let hole2 = new Polygon([new Point(5, 5), new Point(5, 45), new Point(45, 45), new Point(45, 5), new Point(30, 5), new Point(30, 10), new Point(40, 10), new Point(40, 40), new Point(10, 40), new Point(10, 10), new Point(25, 10), new Point(25, 5)])
        polygon1.setHoles([hole1, hole2]);

        let setminus = polygon1.setminus(polygon2);

        expect(setminus.length).toBe(1);
        expect(setminus[0]).toBeInstanceOf(Polygon)
        expect(setminus[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 50), new Point(50, 50), new Point(50, 0)])

        let holes = setminus[0].getHoles();
        expect(holes.length).toBe(1);
        expect(holes[0]).toBeInstanceOf(Polygon);
        expect(holes[0].getFace().getPoints()).toEqual([new Point(5, 5), new Point(5, 45), new Point(45, 45), new Point(45, 5)])

        holes = holes[0].getHoles();
        expect(holes.length).toBe(1);
        expect(holes[0]).toBeInstanceOf(Polygon);
        expect(holes[0].getFace().getPoints()).toEqual([new Point(10, 10), new Point(10, 40), new Point(40, 40), new Point(40, 10)])

        holes = holes[0].getHoles();
        expect(holes.length).toBe(1);
        expect(holes[0]).toBeInstanceOf(Polygon);
        expect(holes[0].getFace().getPoints()).toEqual([new Point(15, 15), new Point(15, 35), new Point(35, 35), new Point(35, 15)])

        holes = holes[0].getHoles();
        expect(holes.length).toBe(0);
    })

    it('setminus total overlapping', () => {
        let polygon1 = Polygon.rect(new Point(10, 10), new Point(40, 40));
        let polygon2 = Polygon.rect(new Point(0, 0), new Point(50, 50));

        let setminus = polygon1.setminus(polygon2);

        expect(setminus.length).toBe(0);
    })

    it('union 12?', () => {
        let face1 = new Face(new Point(45, 0), new Point(45, 70), new Point(90, 70), new Point(90, 0));
        let face2 = new Face(new Point(0, 0), new Point(70, 0), new Point(0, 70), new Point(70, 70));

        let p1 = new Polygon(face1);
        let p2 = new Polygon(face2);

        let union = p2.union(p1);

        expect(union.length).toBe(1);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(35, 35), new Point(45, 25), new Point(45, 45), new Point(35, 35), new Point(0, 70), new Point(90, 70), new Point(90, 0)])

        let holes = union[0].getHoles();
        expect(holes.length).toBe(0);
    })

    it('union 13', () => {
        let polygon1 = new Polygon([new Point(350, 245), new Point(420, 350), new Point(595, 315), new Point(595, 210), new Point(525, 140), new Point(455, 175), new Point(420, 315), new Point(595, 245), new Point(490, 175), new Point(490, 105)]);
        let polygon2 = new Polygon([new Point(455, 105), new Point(525, 140), new Point(595, 70)]);

        let union = polygon2.union(polygon1)

        expect(union.length).toBe(1);

        let holes = union[0].getHoles();
        expect(holes.length).toBe(0);
    })

    xit('setminus with holes', () => {
        let polygon1 = Polygon.rect(new Point(0, 0), new Point(50, 50));
        let polygon2 = Polygon.rect(new Point(10, 15), new Point(40, 40));
        let hole1 = Polygon.rect(new Point(5, 10), new Point(45, 45))
        let hole2 = Polygon.rect(new Point(15, 20), new Point(35, 35))
        // let island = Polygon.rect(new Point(20, 25), new Point(30, 30));

        polygon1.setHoles([hole1]);
        polygon2.setHoles([hole2]);

        let union = hole2.setminus(polygon1);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 50), new Point(50, 50), new Point(50, 0)])

        let holes = union[0].getHoles();
        expect(holes.length).toBe(1);
        expect(holes[0]).toBeInstanceOf(Polygon);
        expect(holes[0].getFace().getPoints()).toEqual([new Point(5, 10), new Point(5, 45), new Point(45, 45), new Point(45, 10)])

        let islands = holes[0].getHoles();
        expect(islands.length).toBe(1);
        expect(islands[0]).toBeInstanceOf(Polygon);
        expect(islands[0].getFace().getPoints()).toEqual([new Point(10, 15), new Point(10, 40), new Point(40, 40), new Point(40, 15)])

        let islandHoles = islands[0].getHoles();
        expect(islandHoles.length).toBe(1);
        expect(islandHoles[0]).toBeInstanceOf(Polygon);
        expect(islandHoles[0].getFace().getPoints()).toEqual([new Point(15, 20), new Point(15, 35), new Point(35, 35), new Point(35, 15)])

        let islandHolesIslands = islandHoles[0].getHoles();
        expect(islandHolesIslands.length).toBe(0);
    })

    xit('test', () => {
        let face1 = Face.rect(new Point(5, 5), new Point(10, 10));
        let face2 = Face.rect(new Point(15, 5), new Point(20, 10));
        let face3 = Face.rect(new Point(10, 5), new Point(15, 10));

        let polygon1 = new Polygon(face1)
        let polygon2 = new Polygon(face2)
        let polygon3 = new Polygon(face3)

        let res = Polygon.arrayUnion([polygon1, polygon2, polygon3]);
        let x = 42;
    })
});