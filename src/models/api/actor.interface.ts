export interface IActorListDataResponse {
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
    items: IActorListData[];
}
export interface IActorListData {
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
    name: string;
    avatar: string;
}

