import {MenuType,RouteType} from '@/model/menu'
export function AddRoutes(list:MenuType[]):RouteType[]{
    const routes:RouteType[] = []
    list.forEach(element => {
        element.children.forEach(item => {
            let r:RouteType = {
                path:'',
                component:''
            }
            r.path = item.uri
            r.component = item.component
            routes.push(r)
        })
    })
    return routes
}