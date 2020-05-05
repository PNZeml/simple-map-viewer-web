interface GeoFile {
    id: number;
    name: string;
    size: number; // in bytes
    createdDate: Date;
    modifiedDate: Date;
    owner?: User;
}