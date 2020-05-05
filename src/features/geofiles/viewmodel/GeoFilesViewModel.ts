export interface GeoFilesViewModel {
    // observable
    geoFiles: Array<GeoFile>
    geoFile: GeoFile | null
    // computed properties
    createdDate: string | null
    modifiedDate: string | null
    // actions
    fetchGeoFiles(): Promise<void>
    selectGeoFile(selectedGeoFile: GeoFile | null): void
}