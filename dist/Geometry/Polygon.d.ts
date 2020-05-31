export declare class Polygon {
    _face: any;
    _holes: any;
    constructor(face?: any, holes?: any);
    getFace(): any;
    getHoles(): any;
    checkCollision(other: any): any;
    setHoles(holes: any): void;
    addHole(hole: any): void;
    removeUnnecessaryPoints(): this;
    union(...others: any[]): any;
    setminus(other: any): any;
    intersection(others: any): any;
    static arrayUnion(arrayOfPolygons: any): any[];
}
