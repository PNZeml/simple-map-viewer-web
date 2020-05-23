import { Dictionary } from "lodash";

export enum AccessType {
    Own,
    Watch,
    Comment,
    Edit
}

const readableAccessTypes: Dictionary<string> = {};
readableAccessTypes[AccessType.Own] = "Own";
readableAccessTypes[AccessType.Watch] = "Watch";
readableAccessTypes[AccessType.Comment] = "Comment";
readableAccessTypes[AccessType.Edit] = "Edit";

export function toReadable(accessType: AccessType): string {
    return readableAccessTypes[accessType];
}