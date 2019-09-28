import { postApi,getApi, postApiFormData, postApiFormDataForPDF } from "./api";

export const GetSurveyList=async(userId)=>getApi("SurveyRequest/GetPendingSurvey?userId="+userId);

export const GetLanguageList=async()=>getApi("SurveyRequest/GetLanguage");

export const GetSurveyQuestionList=async(RequestId,LanguageId)=>getApi("SurveyRequest/GetSurveyQuestion?requestId="+RequestId+"&languageId="+LanguageId);

export const GetSurveyAnswer=async(LanguageId)=>getApi("SurveyRequest/GetSurveyAnswer?languageId="+LanguageId);

export const SaveQuestionAnswerResponse=async(QuestionDataList,RequestId,LanguageId,UserId)=>postApi("SurveyRequest/SaveQuestionAnswerResponse?QuestionDataList="+JSON.stringify(QuestionDataList)+"&requestId="+RequestId+"&languageId="+LanguageId+"&userId="+UserId);
