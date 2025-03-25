import { CommonTableConfig } from "../../../models/common-table-config";


export class CommonTableConfigBC {
    //#region  singletone
    private static instance: CommonTableConfigBC;

    public static getInstance(): CommonTableConfigBC {
        if (!CommonTableConfigBC.instance) {
            CommonTableConfigBC.instance = new CommonTableConfigBC();
        }

        return CommonTableConfigBC.instance;
    }

    private constructor() {
    }

    //#endregion

    collection: CommonTableConfig[] = [];

    getByIdentifier(identifier: string): string | any {
        var d = this.collection.find((c) => c.Identifier == identifier);
        if (d == null) return null;
        return d.Data;
    }

    public className?(): string {
        return 'CommonTableConfigBC';
    }
    public newEntity(): CommonTableConfig {
        return new CommonTableConfig();
    }

    public getTable(): string {
        return 'FMS_TableConfigs';
    }
}
