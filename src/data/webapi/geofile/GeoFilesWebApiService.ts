import WebApiService from "@/data/webapi/WebApiService";
import {GeoFile} from "@/domain/models/GeoFile";
import {ShareOptionsDto} from "@/domain/dtos/geofile/ShareOptionsDto";

export interface GeoFilesWebApiService extends WebApiService {
    getGeoFile(geoFileId: number): Promise<GeoFile>
    getAllGeoFiles(shared: boolean): Promise<Array<GeoFile>>
    share(geoFileId: number, shareDto: ShareOptionsDto): Promise<void>
    fake(): Promise<void>
}