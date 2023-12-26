export interface CreateColumns {
  title: string;
  dashboardId: number;
}

export interface Columns {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryColumns {
  result: string;
  data: Columns[];
}

export interface ModifyingColumns {
  title: string;
}

export interface CardImgUpLoad {
  imageUrl: string;
}
