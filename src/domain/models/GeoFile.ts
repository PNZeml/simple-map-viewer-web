interface GeoFile {
    id: number;
    name: string;
    size: number;
    modifiedDate: Date;
    owner?: User;
}