import {GeoFileActivityRecord} from "@/domain/models/GeoFileActivityRecord";

export interface GeoFile {
    id: number;
    name: string;
    size: number; // in bytes
    created: Date;
    modified: Date | null;
    opened: Date | null;
    owner?: User;
    activityRecords: Array<GeoFileActivityRecord>
}