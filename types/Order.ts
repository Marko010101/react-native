export type Order = {
  id: number;
  itemName: string;
  businessDay: string;
  statusInt: number;
  status: string;
  ggddLine?: {
    ggdd?: {
      itemName?: string;
    };
  };
};
