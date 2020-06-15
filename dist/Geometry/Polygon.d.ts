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
    removeInnerEdges(): this;
    union(...others: any[]): any;
    setminus(...others: any[]): any;
    intersection(...others: any[]): any[];
    static circle(center: any, radius: any, numPoints: any): Polygon;
    static arrayUnion(...polygons: any[]): any[];
    static rect(p1: any, p2: any): Polygon;
    __getSourceCode(index: any, parentArray?: any): string;
}
