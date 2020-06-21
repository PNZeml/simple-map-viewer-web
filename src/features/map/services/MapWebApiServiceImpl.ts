import WebApiService from "@/data/webapi/WebApiService";
import {GeoJSON} from "geojson";

export default class MapWebApiServiceImpl extends WebApiService {
    public async openGeoFile(geoFileId: number): Promise<GeoJSON> {
        const response = await this.retrieve<GeoJSON>(`geofiles/${geoFileId}/open`);
        return response.data;
    }
}