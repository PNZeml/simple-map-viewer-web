import proj4 from "proj4";

export class ProjectionString {
    public readonly name: string;
    public readonly projection: string;

    public static readonly EPGS4326: ProjectionString =
        new ProjectionString("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
    public static readonly GOOGLE: ProjectionString = new ProjectionString(
        "EPSG:3857",
        "+proj=merc " +
        "+a=6378137 +b=6378137 " +
        "+lat_ts=0.0 +lon_0=0.0 " +
        "+x_0=0.0 +y_0=0 +k=1.0 " +
        "+units=m +nadgrids=@null +wktext  +no_defs"
    );

    private constructor(name: string, protection: string) {
        this.name = name;
        this.projection = protection;
    }

    public Register = (): void => proj4.defs(this.name, this.projection);
}

export default class ProjectionUtils {
    public static RegisterProjections() {
        ProjectionString.EPGS4326.Register();
        ProjectionString.GOOGLE.Register();
    }
}