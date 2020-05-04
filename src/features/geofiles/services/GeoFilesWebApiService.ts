import WebApiService from "@/domain/services/webapi/WebApiService";

export interface GeoFilesWebApiService extends WebApiService {
    getGeoFiles(userId: number): Promise<Array<GeoFile>>
}