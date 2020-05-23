import WebApiService from "@/data/webapi/WebApiService";
import UserDto from "@/domain/dtos/user/UserDto";
import {GetAllBySearchQueryDto} from "@/domain/dtos/user/GetAllBySearchQueryDto";
import UserAccessTypeDto from "@/domain/dtos/user/UserAccessTypeDto";

export default class UserWebApiService extends WebApiService {
    public async getAllBySearchQuery(request: GetAllBySearchQueryDto): Promise<Array<UserDto>> {
        const response =
            await this.retrieve<Array<UserDto>>("users", {params: request});
        return response.data;
    }

    public async getAllByGeoFile(
        userId: number,
        geoFileId: number
    ): Promise<Array<UserAccessTypeDto>> {
        const response = await this.retrieve<Array<UserAccessTypeDto>>(
            `users/${userId}/geofiles/${geoFileId}/share`
        );
        return response.data;
    }
}