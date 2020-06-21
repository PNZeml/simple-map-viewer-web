import WebApiService from "@/data/webapi/WebApiService";
import {GeoFilesWebApiService} from "@/data/webapi/geofile/GeoFilesWebApiService";
import {ShareOptionsDto} from "@/domain/dtos/geofile/ShareOptionsDto";
import {GeoFile} from "@/domain/models/GeoFile";

export default class GeoFilesWebApiServiceImpl
    extends WebApiService implements GeoFilesWebApiService {
    public async getGeoFile(geoFileId: number): Promise<GeoFile> {
        const response = await this.retrieve<GeoFile>(`geofiles/${geoFileId}`);
        return response.data;
    }

    public async getAllGeoFiles(shared: boolean): Promise<Array<GeoFile>> {
        const response = await this.retrieve<Array<GeoFile>>(
            "/geofiles",
            {params: {shared: shared}});
        return response.data;
    }

    public async share(geoFileId: number, shareDto: ShareOptionsDto): Promise<void> {
        await this.update(`geofiles/${geoFileId}/share`, shareDto);
    }

    public async fake(): Promise<void> {
        await this.create("geofiles/");
    }
}