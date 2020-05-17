import WebApiService from "@/data/webapi/WebApiService";

export interface GeoFilesWebApiService extends WebApiService {
    getAllBy(userId: number): Promise<Array<GeoFile>>
}