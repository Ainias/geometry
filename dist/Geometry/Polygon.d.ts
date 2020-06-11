export declare class Polygon {
    _face: any;
    _holes: any;
    constructor(face?: any, holes?: any);
    getFace(): any;
    getHoles(): any;
    checkCollision(other: any): any;
    setHoles(holes: any): void;
    addHole(hole: any): boolean;
    removeUnnecessaryPoints(): this;
    union(...others: any[]): any[];
    setminus(other: any): any;
    intersection(...others: any[]): any;
    static arrayUnion(arrayOfPolygons: any): any[];
    static rect(p1: any, p2: any): Polygon;
    __getSourceCode(index: any, parentArray?: any): string;
}
