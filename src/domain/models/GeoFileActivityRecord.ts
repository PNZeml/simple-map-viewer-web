import {ActivityType} from "@/domain/enums/ActivityType";

export default interface GeoFileActivityRecord {
    userName: string;
    userId: number;
    avatar: string;
    activityType: ActivityType;
    occurred: Date;
}