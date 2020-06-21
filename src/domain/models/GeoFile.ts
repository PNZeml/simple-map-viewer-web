import UserAccessTypeDto from "@/domain/dtos/user/UserAccessTypeDto";
import GeoFileActivityRecord from "@/domain/models/GeoFileActivityRecord";

export class GeoFile {
    id!: number;
    name!: string;
    size!: number; // in bytes
    created!: Date;
    modified!: Date | null;
    opened!: Date | null;
    owner!: string;
    users!: Array<UserAccessTypeDto>;
    geoFileActivityRecords!: Array<GeoFileActivityRecord>;
}