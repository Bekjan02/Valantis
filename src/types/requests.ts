import { IItem, IItems } from '.';

export interface IMetaRequest {
  offset?: number;
  limit?: number;
}

export module IGetIds {
  export type Response = {
    result: string[];
  };
  export type Params = IMetaRequest;
}

export module IGetItems {
  export type Response = IItems;
  export type Params = string[];
}

export module IGetFilterItems {
  export type Response = {
    result: string[];
  };
  export type Params = Partial<IItem>;
}
