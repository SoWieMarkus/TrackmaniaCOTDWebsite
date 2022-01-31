export class TrackmaniaZone {
  name!: string;
  flag!: string;
  parent: TrackmaniaZone|undefined;

  constructor(json: any) {
    this.name = json.name;
    this.flag = json.flag;
    this.parent = json.parent === undefined ? undefined : new TrackmaniaZone(json.parent);
  }

  get flagName():string {
    if (this.parent === undefined) return "https://trackmania.io/img/flags/WOR.jpg";
    return this.flag.match("[A-Z][A-Z][A-Z]") && this.flag.length === 3 ? "https://trackmania.io/img/flags/" +this.flag +".jpg" : this.parent.flagName;
  }
}
