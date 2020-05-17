import WebApiService from "@/data/webapi/WebApiService";
import UserDto from "@/domain/dtos/user/UserDto";
import {GetAllByDto} from "@/domain/dtos/geofile/GetAllByDto";

export default class UserWebApiService extends WebApiService {
    public async getAllBy(getAllByDto: GetAllByDto): Promise<Array<UserDto>> {
        const response =
            await this.retrieve<Array<UserDto>>("users", {params: getAllByDto});
        return response.data;
    }
}