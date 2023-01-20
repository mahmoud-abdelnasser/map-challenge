export type User = {
   id: number,
   email: string,
   password: string,
   name: string
}

export type PolygonLayer = number[][]

export type Polygon = {
   id: number
   title: string,
   area: Array<string>
}
export type ErrorMsg = {
   message?: string
}
export type MapConfig = {
   avatar: string;
   maxZoom: number;
   minZoom: number;
   style: string;
   accessToken: string;
   title: string;
   type?: string;
 };