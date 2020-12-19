export interface Domain {
  _id: string;
  loaiDomain: string;
  am: {
    unitCode: string;
    userName: string;
  };
  comTaxCode: string;
  comName: string;
  registrationDate: Date;
  extendDate: Object;
  cancelDate: Date;
  remark: string;
}
