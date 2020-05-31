export declare class Face {
    static COLLISION_INSIDE: number;
    static COLLISION_INSIDE_OTHER: number;
    static COLLISION_INTERSECTS: number;
    static COLLISION_NO_INTERSECION: number;
    _points: any;
    constructor(...points: any[]);
    setPoints(points: any): void;
    getLines(): any[];
    getPoints(): any;
    getLastPoint(): any;
    split(): any[];
    containsPoint(point: any): boolean;
    checkCollision(otherFace: any): number;
    removeUnnecessaryPoints(): this;
    setminus(other: any): any[];
    union(...other: any[]): any;
    intersection(...other: any[]): any;
    static rect(p1: any, p2: any): Face;
    static _getNextPoint(inVector: any, referencePoint: any, points: any, useSmallestAngle?: any): any;
    static _getFacesWithIntersectionPoints(one: any, another: any): any[];
}