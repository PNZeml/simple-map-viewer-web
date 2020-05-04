import WebApiService from "@/domain/services/webapi/WebApiService";
import {GeoFilesWebApiService} from "@/features/geofiles/services/GeoFilesWebApiService";

export default class GeoFilesWebApiServiceImpl extends WebApiService implements GeoFilesWebApiService {
    public async getGeoFiles(userId: number): Promise<Array<GeoFile>> {
        const response = await this.retrieve<Array<GeoFile>>(`users/${userId}/geofiles`);
        return response.data;
    }
}