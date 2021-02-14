export class Resource {
    id: string;
}

export interface IBaseSerializer {
    fromJson(json: any): Resource;
    toJson(resource: Resource): any;
}
