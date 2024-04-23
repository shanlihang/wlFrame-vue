export interface MenuType{
    ID:number|undefined,
    CreatedAt:string,
    UpdatedAt:string,
    DeletedAt:string,
    name:string,
    component:string,
    icon:string,
    parentId:number|undefined,
    router:string,
    sort:number|undefined,
    type:number|undefined,
    uri:string,
    children:MenuType[]
}

export interface RouteType{
    path:string,
    component:string
}