
import { CommonTableConfigBC } from "../common/components/common-table/common-table-config-bc";
import { BaseEntity } from "./base-entity";

export class CommonTableConfig extends BaseEntity<CommonTableConfig>{


  public Identifier!:string;
  public Data!:string; //json data


  public className?(): string {
    return "CommonTableConfig";
  }
  public newEntity?(): CommonTableConfig {
    return new CommonTableConfig();
  }


}
