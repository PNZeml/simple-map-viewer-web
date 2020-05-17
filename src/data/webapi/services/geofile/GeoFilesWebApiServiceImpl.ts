import WebApiService from "@/data/webapi/WebApiService";
import {GeoFilesWebApiService} from "@/data/webapi/services/geofile/GeoFilesWebApiService";
import {ShareOptionsDto} from "@/domain/dtos/geofile/ShareOptionsDto";

export default class GeoFilesWebApiServiceImpl
    extends WebApiService implements GeoFilesWebApiService {
    public async getAllBy(userId: number): Promise<Array<GeoFile>> {
        const response = await this.retrieve<Array<GeoFile>>(`users/${userId}/geofiles`);
        return response.data;
    }

    public async share(userId: number, geoFileId: number, shareDto: ShareOptionsDto): Promise<void> {
        const response =
            await this.create(`users/${userId}/geofiles/${geoFileId}/share`, shareDto);
    }
}