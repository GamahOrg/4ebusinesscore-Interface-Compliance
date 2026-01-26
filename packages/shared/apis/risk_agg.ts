import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";
let version = `v1/`;

const RiskAggEndpoints: { [key: string]: Endpoint } = {
  // history controller
  getAllHistory: {
    url: `${version}History/GetAllHistory`,
    method: `get`,
  },
  // risk controller
  getAllRisks: {
    url: `${version}Risk/GetAllRisks`,
    method: `get`,
  },
  getAllAssignedRisks: {
    url: `${version}Risk/GetAllAssignedRisks`,
    method: `get`,
  },
  getRiskById: {
    url: `${version}Risk/GetRiskById`,
    method: `get`,
  },
  // risk user controller
  getAllRiskUser: {
    url: `${version}RiskUser/GetAllRiskUser`,
    method: `get`,
  },
  getUserRiskbyUserId: {
    url: `${version}RiskUser/GetUserRiskbyUserid`,
    method: `get`,
  },
  getRiskUserByOrgId: {
    url: `${version}RiskUser/GetriskUserbyOrgId`,
    method: `get`,
  },
  getProcessingPlanByRiskId: {
    url: `${version}ProcessingPlan/GetProcessingPlanByRiskId`,
    method: `get`,
  },
};
const RiskAggBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_Risk_Agg_Url
}/api/`;
export const RiskAggRootUrl = `${
  (window as any)._env_?.REACT_APP_API_Risk_Agg_Url
}/`;

export const RiskAggConsume = initializeConsume(
  RiskAggBaseUrl,
  RiskAggEndpoints
);
