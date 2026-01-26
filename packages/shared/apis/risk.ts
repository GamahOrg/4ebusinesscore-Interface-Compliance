import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";
let version = `v1/`;

const RiskEndpoints: { [key: string]: Endpoint } = {
  // category controller
  postCategory: {
    url: `${version}Category/PostCategory`,
    method: `post`,
  },
  putCategory: {
    url: `${version}Category/PutCategory`,
    method: `putByQueryWithBody`,
  },
  deleteCategory: {
    url: `${version}Category/DeleteCategory`,
    method: `deleteByQuery`,
  },
  getAllCategory: {
    url: `${version}Category/GetAllCategory`,
    method: `get`,
  },
  getCategoryById: {
    url: `${version}Category/GetCategoryById`,
    method: `get`,
  },
  // control controller
  postControl: {
    url: `${version}Control/PostControl`,
    method: `post`,
  },
  putControl: {
    url: `${version}Control/PutControl`,
    method: `putByQueryWithBody`,
  },
  deleteControl: {
    url: `${version}Control/DeleteControl`,
    method: `deleteByQuery`,
  },
  getAllControl: {
    url: `${version}Control/GetAllControl`,
    method: `get`,
  },
  getControlById: {
    url: `${version}Control/GetControlById`,
    method: `getById`,
  },
  // effect of event controller
  postEffectOfTheEvent: {
    url: `${version}EffectOfTheEvent/PostEffectOfTheEvent`,
    method: `post`,
  },
  putEffectOfTheEvent: {
    url: `${version}EffectOfTheEvent/PutEffectOfTheEvent`,
    method: `putByQueryWithBody`,
  },
  deleteEffectOfTheEvent: {
    url: `${version}EffectOfTheEvent/DeleteEffectOfTheEvent`,
    method: `deleteByQuery`,
  },
  getAllEffectOfTheEvent: {
    url: `${version}EffectOfTheEvent/GetAllEffectOfTheEvent`,
    method: `get`,
  },
  getEffectOfTheEventById: {
    url: `${version}EffectOfTheEvent/GetEffectOfTheEventById`,
    method: `getById`,
  },
  // identify risk controller
  postIdentifyRisk: {
    url: `${version}IdentifyRisk/PostIdentifyRisk`,
    method: `post`,
  },
  putIdentifyRisk: {
    url: `${version}IdentifyRisk/PutIdentifyRisk`,
    method: `putById`,
  },
  deleteIdentifyRisk: {
    url: `${version}IdentifyRisk/DeleteIdentifyRisk`,
    method: `delete`,
  },
  // impact controller
  postImpact: {
    url: `${version}Impact/PostImpact`,
    method: `post`,
  },
  putImpact: {
    url: `${version}Impact/PutImpact`,
    method: `putByQueryWithBody`,
  },
  deleteImpact: {
    url: `${version}Impact/DeleteImpact`,
    method: `deleteByBody`,
  },
  getAllImpact: {
    url: `${version}Impact/GetAllImpact`,
    method: `get`,
  },
  getImpactById: {
    url: `${version}Impact/GetImpactbyid`,
    method: `get`,
  },
  // Implementation status controller
  postImplementationStatus: {
    url: `${version}ImplementationStatus/PostImplementationStatus`,
    method: `post`,
  },
  putImplementationStatus: {
    url: `${version}ImplementationStatus/PutImplementationStatus`,
    method: `putByQueryWithBody`,
  },
  deleteImplementationStatus: {
    url: `${version}ImplementationStatus/DeleteImplementationStatus`,
    method: `deleteByBody`,
  },
  getAllImplementationStatus: {
    url: `${version}ImplementationStatus/GetAllImplementationStatus`,
    method: `get`,
  },
  getImplementationStatusById: {
    url: `${version}ImplementationStatus/GetImplementationStatusbyid`,
    method: `get`,
  },
  // Inherent risk controller
  postInherentRisk: {
    url: `${version}InherentRisk/PostInherentRisk`,
    method: `post`,
  },
  // lk risk type controller
  getAllLkRiskQuery: {
    url: `${version}LkRiskType/GetAllLkRiskQuery`,
    method: `get`,
  },
  postLK_RiskType: {
    url: `${version}LkRiskType/PostLK_RiskType`,
    method: `post`,
  },
  putLK_RiskType: {
    url: `${version}LkRiskType/PutLK_RiskType`,
    method: `putByQueryWithBody`,
  },
  deleteLK_RiskType: {
    url: `${version}LkRiskType/DeleteLK_RiskType`,
    method: `deleteByQuery`,
  },
  // Probability of effectivenes controller
  postProbabilityOfEffectivenes: {
    url: `${version}ProbabilityOfEffectivenes/PostProbabilityOfEffectivenes`,
    method: `post`,
  },
  putProbabilityOfEffectivenes: {
    url: `${version}ProbabilityOfEffectivenes/PutProbabilityOfEffectivenes`,
    method: `putByQueryWithBody`,
  },
  deleteProbabilityOfEffectivenes: {
    url: `${version}ProbabilityOfEffectivenes/DeleteProbabilityOfEffectivenes`,
    method: `deleteByBody`,
  },
  getAllProbabilityOfEffectivenes: {
    url: `${version}ProbabilityOfEffectivenes/GetAllProbabilityOfEffectivenes`,
    method: `get`,
  },
  getProbabilityOfEffectivenes: {
    url: `${version}ProbabilityOfEffectivenes/GetProbabilityOfEffectivenes`,
    method: `getById`,
  },
  // Probability of occurrence controller
  postProbabilityOfOccurrence: {
    url: `${version}ProbabilityOfOccurrence/PostProbabilityOfOccurrence`,
    method: `post`,
  },
  putProbabilityOfOccurrence: {
    url: `${version}ProbabilityOfOccurrence/PutProbabilityOfOccurrence`,
    method: `putByQueryWithBody`,
  },
  deleteProbabilityOfOccurrence: {
    url: `${version}ProbabilityOfOccurrence/DeleteProbabilityOfOccurrence`,
    method: `deleteByBody`,
  },
  getAllProbabilityOfOccurrence: {
    url: `${version}ProbabilityOfOccurrence/GetAllProbabilityOfOccurrence`,
    method: `get`,
  },
  getProbabilityOfOccurrenceById: {
    url: `${version}ProbabilityOfOccurrence/GetProbabilityOfOccurrencebyid`,
    method: `get`,
  },
  // proceessing plans controller
  postProcessingPlans: {
    url: `${version}ProcessingPlans/PostProcessingPlans`,
    method: `post`,
  },
  deleteProcessingPlan: {
    url: `${version}ProcessingPlans/DeleteProcessingPlan`,
    method: `delete`,
  },
  // regulatory controller
  postRegulatoryControl: {
    url: `${version}RegulatoryControl/PostRegulatoryControl`,
    method: `post`,
  },
  // remain risk controller
  postRemainRisk: {
    url: `${version}RemainRisk/PostRemainRisk`,
    method: `post`,
  },
  // risk criteria controller
  postRiskCriteria: {
    url: `${version}RiskCriteria/PostRiskCriteria`,
    method: `post`,
  },
  putRiskCriteria: {
    url: `${version}RiskCriteria/PutRiskCriteria`,
    method: `putByQueryWithBody`,
  },
  deleteRiskCriteria: {
    url: `${version}RiskCriteria/DeleteRiskCriteria`,
    method: `deleteByBody`,
  },
  getAllRiskCriteria: {
    url: `${version}RiskCriteria/GetAllRiskCriteria`,
    method: `get`,
  },
  getRiskCriteriaById: {
    url: `${version}RiskCriteria/GetRiskCriteriabyid`,
    method: `get`,
  },
  getRiskCriteriaMatrix: {
    url: `${version}RiskCriteria/GetRiskCriteriaMatrix`,
    method: `get`,
  },
  // risk user controller
  postRiskUser: {
    url: `${version}RiskUser/PostRiskUser`,
    method: `post`,
  },
  putRiskUser: {
    url: `${version}RiskUser/PutRiskUser`,
    method: `putByQueryWithBody`,
  },
  deleteRiskUser: {
    url: `${version}RiskUser/DeleteRiskUser`,
    method: `deleteByBody`,
  },
  // subcategory controller
  postSubCategory: {
    url: `${version}SubCategory/PostSubCategory`,
    method: `post`,
  },
  putSubCategory: {
    url: `${version}SubCategory/PutSubCategory`,
    method: `putByQueryWithBody`,
  },
  deleteSubCategory: {
    url: `${version}SubCategory/DeleteSubCategory`,
    method: `deleteByQuery`,
  },
  // error here in swagger
  getAllSubCategoryByCategoryId: {
    url: `${version}SubCategory/GetAllSubCategorybyCategoryid`,
    method: `get`,
  },
  getSubCategoryById: {
    url: `${version}SubCategory/GetSubCategoryById`,
    method: `get`,
  },
  // Type treatment plan controller
  postTypeTreatmentPlan: {
    url: `${version}TypeTreatmentPlan/PostTypeTreatmentPlan`,
    method: `post`,
  },
  putTypeTreatmentPlan: {
    url: `${version}TypeTreatmentPlan/PutTypeTreatmentPlan`,
    method: `putByQueryWithBody`,
  },
  deleteTypeTreatmentPlan: {
    url: `${version}TypeTreatmentPlan/DeleteTypeTreatmentPlan`,
    method: `deleteByBody`,
  },
  getAllTypeTreatmentPlan: {
    url: `${version}TypeTreatmentPlan/GetAllTypeTreatmentPlan`,
    method: `get`,
  },
  getTypeTreatmentPlanById: {
    url: `${version}TypeTreatmentPlan/GetTypeTreatmentPlanbyid`,
    method: `get`,
  },
  // risks filter controller
  postRisksfilter: {
    url: `${version}RisksFilter/PostRisksfilter`,
    method: `post`,
  },
  deleteRisksfilter: {
    url: `${version}DeleteRisksfilter`,
    method: `post`,
  },
  getAllRisksFilter: {
    url: `${version}RisksFilter/GetAllRisksFilter`,
    method: `get`,
  },
  getRisksFilterByUserId: {
    url: `${version}RisksFilter/GetRisksFilterByUserId`,
    method: `get`,
  },
};
const RiskBaseUrl = `${(window as any)._env_?.REACT_APP_API_Risk_Url}/api/`;
export const RiskRootUrl = `${(window as any)._env_?.REACT_APP_API_Risk_Url}/`;

export const RiskConsume = initializeConsume(RiskBaseUrl, RiskEndpoints);
