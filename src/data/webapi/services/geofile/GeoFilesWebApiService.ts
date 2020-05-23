import WebApiService from "@/data/webapi/WebApiService";
import {GeoFile} from "@/domain/models/GeoFile";
import {ShareOptionsDto} from "@/domain/dtos/geofile/ShareOptionsDto";

export interface GeoFilesWebApiService extends WebApiService {
    getAll(userId: number): Promise<Array<GeoFile>>
    share(userId: number, geoFileId: number, shareDto: ShareOptionsDto): Promise<void>
    fake(): Promise<void>
}