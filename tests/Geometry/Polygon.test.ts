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
        expect(union[0].getFace().getPoints()).toEqual([new Point(140, 35), new Point(140, 595), new Point(945, 595),new Point(945, 245), new Point(945, 35)])
    })

    it('union no intersection', () => {
        let polygon1 = Polygon.rect(new Point(0, 0), new Point(10, 10));
        let polygon2 = Polygon.rect(new Point(20, 20), new Point(30, 30));

        let union = polygon1.union(polygon2);

        expect(union.length).toBe(2);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[1]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(20, 20), new Point(20, 30), new Point(30, 30), new Point(30, 20)]);
        expect(union[1].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 10), new Point(10, 10), new Point(10, 0)]);

        expect(union[0].getHoles().length).toBe(0);
        expect(union[1].getHoles().length).toBe(0);
    })

    it('union no intersection but touching', () => {
        let polygon1 = Polygon.rect(new Point(0, 0), new Point(10, 10));
        let polygon2 = Polygon.rect(new Point(10, 10), new Point(20, 20));

        let union = polygon1.union(polygon2);

        expect(union.length).toBe(1);
        expect(union[0]).toBeInstanceOf(Polygon);
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(0, 10), new Point(10, 10), new Point(10, 20), new Point(20, 20), new Point(20, 10), new Point(10, 10), new Point(10, 0)]);

        expect(union[0].getHoles().length).toBe(0);
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
        expect(setminus[0].getFace().getPoints()).toEqual([new Point(30, 10), new Point(30, 40), new Point(40, 40), new Point(40, 10)])
        expect(setminus[1].getFace().getPoints()).toEqual([new Point(10, 10), new Point(10, 40), new Point(20, 40), new Point(20, 10)])
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
        expect(union[0].getFace().getPoints()).toEqual([new Point(0, 0), new Point(35, 35), new Point(0, 70), new Point(90, 70), new Point(90, 0)])

        let holes = union[0].getHoles();
        expect(holes.length).toBe(1);
    })

    it('union 13', () => {
        let polygon1 = new Polygon([new Point(0, 25), new Point(10, 40), new Point(35, 35), new Point(35, 20), new Point(25, 10), new Point(15, 15), new Point(10, 35), new Point(35, 25), new Point(20, 15), new Point(20, 5)]);
        let polygon2 = new Polygon([new Point(15, 5), new Point(25, 10), new Point(25, 0)]);

        let union = polygon2.union(polygon1)

        expect(union.length).toBe(1);
        expect(union[0].getFace().getPoints().length).toBe(8);

        let holes = union[0].getHoles();
        expect(holes.length).toBe(1);
    })

    it("union 14", () => {
        let holes1 = [];
        let polygon1 = new Polygon([new Point(210, 70), new Point(210, 350), new Point(525, 350), new Point(525, 175), new Point(805, 175), new Point(805, 70)]);
        let hole1 = new Polygon([new Point(315, 175), new Point(315, 245), new Point(420, 245), new Point(420, 175)]);
        holes1.push(hole1);
        polygon1.setHoles(holes1);

        let polygon3 = new Polygon([new Point(175, 35), new Point(175, 385), new Point(560, 385), new Point(560, 35)]);

        let union = polygon3.union(polygon1);

        expect(union.length).toBe(1);
        expect(union[0].getHoles().length).toBe(0);
    });

    it("union 15", () => {
        let polygons = [];
        let polygon1 = new Polygon([new Point(0, 0), new Point(0, 70), new Point(70, 70), new Point(70, 0)]);
        polygons.push(polygon1);

        let polygon2 = new Polygon([new Point(140, 0), new Point(140, 70), new Point(210, 70), new Point(210, 0)]);
        polygons.push(polygon2);

        let polygon3 = new Polygon([new Point(280, 0), new Point(280, 70), new Point(350, 70), new Point(350, 0)]);

        let union = polygon3.union(polygon1, polygon2);

        expect(union.length).toBe(3);
    })

    it("union 16", () => {
        let polygon1 = new Polygon([new Point(215, 110), new Point(218, 107), new Point(222, 105), new Point(227, 105), new Point(402, 105), new Point(407, 105), new Point(411, 107), new Point(414, 110), new Point(417, 113), new Point(419, 117), new Point(420, 122), new Point(419, 127), new Point(417, 131), new Point(414, 134), new Point(411, 137), new Point(407, 139), new Point(402.5, 140), new Point(227, 140), new Point(222, 139), new Point(218, 137), new Point(215, 134), new Point(212, 131.25), new Point(210, 127)]);
        let polygon2 = new Polygon([new Point(245, 52), new Point(245, 122), new Point(245, 127), new Point(247, 131), new Point(250, 134), new Point(253, 137), new Point(257, 139), new Point(262, 140), new Point(267, 139), new Point(271, 137), new Point(274, 134), new Point(277, 131), new Point(279, 127), new Point(280, 122), new Point(280, 59), new Point(304, 35), new Point(325, 35), new Point(350, 59), new Point(350, 122.5), new Point(350, 127), new Point(352, 131), new Point(355, 134), new Point(358, 137), new Point(362, 139), new Point(367, 140), new Point(372, 139), new Point(376, 137), new Point(379, 134), new Point(382, 131), new Point(384, 127), new Point(385, 122), new Point(385, 52), new Point(384, 47), new Point(382, 43), new Point(379, 40), new Point(344, 5), new Point(341, 2), new Point(337, 0), new Point(332, 0), new Point(297, 0), new Point(292, 0), new Point(288, 2), new Point(285, 5), new Point(250, 40), new Point(247, 43), new Point(245, 47)]);

        let union = polygon2.union(polygon1);

        expect(union.length).toBe(1);
        expect(union[0].getHoles().length).toBe(1);
    });

    it ("union 17", () => {
        let polygon1 = new Polygon([new Point(35,52) , new Point(35,47 ) , new Point(37,43 ) , new Point(40,40 ) , new Point(43,37) , new Point(47,35 ) , new Point(52,35) , new Point(122,35) , new Point(127,35 ) , new Point(131,37) , new Point(134,40 ) , new Point(137,43 ) , new Point(139,47 ) , new Point(140,52) , new Point(139 ,57) , new Point(137 ,61) , new Point(134 ,64) , new Point(131 ,67 ) , new Point(127.02933329,69.40370196) , new Point(122.5,70) , new Point(52.5,70) , new Point(47.97066671,69.40370196) , new Point(43.75,67.65544457) , new Point(40.12563133,64.87436867) , new Point(37.34455543,61.25) , new Point(35.59629804,57.02933329)]);
        let polygon2 = new Polygon([new Point(35,52.5) , new Point(35,122.5) , new Point(35.59629804,127.02933329) , new Point(37.34455543,131.25) , new Point(40.12563133,134.87436867) , new Point(43.75,137.65544457) , new Point(47.97066671,139.40370196) , new Point(52.5,140) , new Point(57.02933329,139.40370196) , new Point(61.25,137.65544457) , new Point(64.87436867,134.87436867) , new Point(67.65544457,131.25) , new Point(69.40370196,127.02933329) , new Point(70,122.5) , new Point(70,52.5) , new Point(69.40370196,47.97066671) , new Point(67.65544457,43.75) , new Point(64.87436867,40.12563133) , new Point(61.25,37.34455543) , new Point(57.02933329,35.59629804) , new Point(52.5,35) , new Point(47.97066671,35.59629804) , new Point(43.75,37.34455543) , new Point(40.12563133,40.12563133) , new Point(37.34455543,43.75) , new Point(35.59629804,47.97066671)]);

        let union = polygon2.union(polygon1);

        expect(union.length).toBe(1);
        expect(union[0].getHoles().length).toBe(0);
    });

    it("union 18", () => {
        let polygon1 = new Polygon([new Point(0,0) , new Point(0,175) , new Point(35,175) , new Point(35,105) , new Point(70,105) , new Point(70,175) , new Point(105,175) , new Point(105,0)]);
        let polygon2 = new Polygon([new Point(35,35) , new Point(35,70) , new Point(70,70) , new Point(70,35)]);

        let holes1 = [];
        holes1.push(polygon2);

        polygon1.setHoles(holes1);

        let polygon3 = new Polygon([new Point(0,140) , new Point(0,175) , new Point(105,175) , new Point(105,140)]);

        let union = polygon3.union(polygon1);
        expect(union.length).toBe(1);
        expect(union[0].getHoles().length).toBe(2);
    });

    it("setminus", () => {
        let polygon2 = new Polygon([new Point(35,35) , new Point(35,70) , new Point(70,70) , new Point(70,35)]);
        let polygon3 = new Polygon([new Point(0,140) , new Point(0,175) , new Point(105,175) , new Point(105,140)]);

        let setminus = polygon2.setminus(polygon3);
        expect(setminus.length).toBe(1);
    });

    it('setminus with holes', () => {
        let polygons = [];
        let holes1 = [];
        let polygon1 = new Polygon([new Point(0,0) , new Point(0,245) , new Point(245,245) , new Point(245,0)]);
        polygons.push(polygon1);

        let holes2 = [];
        let polygon2 = new Polygon([new Point(35,35) , new Point(35,210) , new Point(210,210) , new Point(210,35)]);
        holes1.push(polygon2);

        let holes3 = [];
        let polygon3 = new Polygon([new Point(70,70) , new Point(70,175) , new Point(175,175) , new Point(175,70)]);
        holes2.push(polygon3);

        polygon3.setHoles(holes3);

        polygon2.setHoles(holes2);

        polygon1.setHoles(holes1);

        let polygon4 = new Polygon([new Point(105,0) , new Point(105,35) , new Point(140,35) , new Point(140,0)]);

        let setminus = polygon1.setminus(polygon4);
        expect(setminus.length).toBe(2);
        expect(setminus[0].getHoles().length).toBe(0);
        expect(setminus[1].getHoles().length).toBe(0);
    })

    it("union 19", () => {
        let polygon1 = new Polygon([new Point(0,87.5) , new Point(0.596,82.971) , new Point(2.345,78.75) , new Point(5.126,75.126) , new Point(8.75,72.345) , new Point(12.971,70.596) , new Point(17.5,70) , new Point(87.5,70) , new Point(92.029,70.596) , new Point(96.25,72.345) , new Point(99.874,75.126) , new Point(102.655,78.75) , new Point(104.404,82.971) , new Point(105,87.5) , new Point(104.404,92.029) , new Point(102.655,96.25) , new Point(99.874,99.874) , new Point(96.25,102.655) , new Point(92.029,104.404) , new Point(87.5,105) , new Point(17.5,105) , new Point(12.971,104.404) , new Point(8.75,102.655) , new Point(5.126,99.874) , new Point(2.345,96.25) , new Point(0.596,92.029)]);
        let polygon2 = new Polygon([new Point(0,17.5) , new Point(0,87.5) , new Point(0.596,92.029) , new Point(2.345,96.25) , new Point(5.126,99.874) , new Point(8.75,102.655) , new Point(12.971,104.404) , new Point(17.5,105) , new Point(22.029,104.404) , new Point(26.25,102.655) , new Point(29.874,99.874) , new Point(32.655,96.25) , new Point(34.404,92.029) , new Point(35,87.5) , new Point(35,35) , new Point(70,35) , new Point(70,87.5) , new Point(70.596,92.029) , new Point(72.345,96.25) , new Point(75.126,99.874) , new Point(78.75,102.655) , new Point(82.971,104.404) , new Point(87.5,105) , new Point(92.029,104.404) , new Point(96.25,102.655) , new Point(99.874,99.874) , new Point(102.655,96.25) , new Point(104.404,92.029) , new Point(105,87.5) , new Point(105,17.5) , new Point(104.404,12.971) , new Point(102.655,8.75) , new Point(99.874,5.126) , new Point(96.25,2.345) , new Point(92.029,0.596) , new Point(87.5,0) , new Point(17.5,0) , new Point(12.971,0.596) , new Point(8.75,2.345) , new Point(5.126,5.126) , new Point(2.345,8.75) , new Point(0.596,12.971)]);

        let union = polygon2.union(polygon1);

        expect(union.length).toBe(1);
        expect(union[0].getHoles().length).toBe(1);
    })

    it("setminus 4", () => {
        let holes1 = [];
        let points1 = [new Point(35,35) , new Point(35,140) , new Point(140,140) , new Point(140,35)]
        let polygon1 = new Polygon(points1);
        let points2 = [new Point(70.3824,83.8615) , new Point(70.3824,91.1385) , new Point(73.3422,97.7862) , new Point(78.75,102.6554) , new Point(85.6708,104.9041) , new Point(92.9078,104.1435) , new Point(99.2098,100.505) , new Point(103.487,94.6179) , new Point(105,87.5) , new Point(103.487,80.3821) , new Point(99.2098,74.495) , new Point(92.9078,70.8565) , new Point(85.6708,70.0959) , new Point(78.75,72.3446) , new Point(73.3422,77.2138)];
        let polygon2 = new Polygon(points2);
        holes1.push(polygon2);
        polygon1.setHoles(holes1);

        let polygon3 = new Polygon([new Point(770.3824,293.8615) , new Point(770.3824,301.1385) , new Point(773.3422,307.7862) , new Point(778.75,312.6554) , new Point(785.6708,314.9041) , new Point(792.9078,314.1435) , new Point(799.2098,310.505) , new Point(803.487,304.6179) , new Point(805,297.5) , new Point(803.487,290.3821) , new Point(799.2098,284.495) , new Point(792.9078,280.8565) , new Point(785.6708,280.0959) , new Point(778.75,282.3446) , new Point(773.3422,287.2138)]);

        let setminus = polygon1.setminus(polygon3);

        expect(setminus.length).toBe(1);
        expect(setminus[0].getFace().getPoints()).toEqual(points1)

        let holes = setminus[0].getHoles();
        expect(holes.length).toBe(1);
        expect(holes[0].getFace().getPoints()).toEqual(points2)
    })

    it("union20", () => {

        let face2 = Face.rect(new Point(5,5), new Point(10,10));
        let face3 = Face.rect(new Point(15,15), new Point(20,20));
        let face4 = Face.rect(new Point(5,15), new Point(10,20));

        let polygon2 = new Polygon(face2);
        let polygon3 = new Polygon(face3);
        let polygon4 = new Polygon(face4);

        let union = polygon4.union(polygon2, polygon3)

        expect(union.length).toBe(3);
        expect(union[0].getFace().getPoints()).toEqual(face2.getPoints())
        expect(union[1].getFace().getPoints()).toEqual(face3.getPoints())
        expect(union[2].getFace().getPoints()).toEqual(face4.getPoints())
    })

    it("setminus 4", () => {
        let face1 = Face.rect(new Point(0,0), new Point(25,25));
        let face2 = Face.rect(new Point(10,10), new Point(15,15));
        let face3 = Face.rect(new Point(20,0), new Point(25,5));

        let polygon1 = new Polygon(face1);
        let polygon2 = new Polygon(face2);
        let polygon3 = new Polygon(face3);

        polygon1.setHoles([polygon2]);

        let setminus = polygon1.setminus(polygon3)

        expect(setminus.length).toBe(1);
        expect(setminus[0].getFace().getPoints()).toEqual([new Point(0,0), new Point(0,25), new Point(25,25), new Point(25,5), new Point(20,5), new Point(20,0)]);

        let holes = setminus[0].getHoles();
        expect(holes.length).toBe(1);
        expect(holes[0].getFace().getPoints()).toEqual(face2.getPoints())
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