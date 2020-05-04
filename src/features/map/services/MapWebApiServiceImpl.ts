import WebApiService from "@/domain/services/webapi/WebApiService";
import {GeoJSON} from "geojson";

export default class MapWebApiServiceImpl extends WebApiService {
    public async getGeoFile(geoFileId: number): Promise<GeoJSON> {
        const response = await this.retrieve<GeoJSON>(`users/1/geofiles/${geoFileId}`);
        return response.data;
    }
}