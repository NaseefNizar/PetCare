export type kycData = {
  firstName: string;
  lastName: string;
  centreName: string;
  locality: string;
  area: string;
  pincode: string;
  state: string;
  bankName: string;
  branchName: string;
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
};

export type initialState = {
  loading: Boolean;
  status: String;
  kycData: null | kycData;
};
