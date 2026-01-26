import { Action, ThunkAction } from "@reduxjs/toolkit";
import AuthorsSlice from "./authors-slice";
import NewsSlice from "./news-slice";
import sectorSlice from "./sectorSlice";
import authorsSlice from "./authors-slice";
import newsDetailsSlice from "./news-details-slice";
import mainNewsSlice from "./main-news-slice";
import importantNewsSlice from "./important-news-slice";
import similarNewsSlice from "./similar-news-slice";
import mainNewsHomeSlice from "./main-news-home-slice";
import lastestNewsSlice from "./lastest-news-slice";
import lastedNewsPaginatedSlice from "./lastest-news-paginated-slice";
import aboutAuthoritySlice from "./about-authority-slice";
import sectorDetailsSlice from "./sector-details-slice";
import organizationProfileSettingsBasicDetailsSlice from "./organization-profile-settings-basic-details-slice";
import orgDefinationSlice from "./org-defination-slice";
import socialMediaSlice from "./social-media-slice";
import boardMembersSlice from "./board-members-slice";
import usersAggSlice from "./users-agg-slice";
import userSlice from "./user-slice";
import usersSlice from "./users-slice";
import eventsSlice from "./events-slice";
import circularsSlice from "./circulars-slice";
import orgsSlice from "./orgs-slice";
import documentInfoSlice from "./document-info-slice";
import circularsRelatedDocumentsSlice from "./circulars-related-documents-slice";
import circularLookupsSlice from "./circular-lookups-slice";
import mainClassificationSlice from "./mainClassificationSlice";
import NewsCountSlice from "./news-slice-count";
import workspaceSlice from "./workspaces-slice";
import notifiactionsSlice from "./notifiactionsSlice";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import messageSlice from "./message-slice";
import { storeRegistry } from '@4eplatform/shared/store/storeRegistry';
import SubsystemReducer from "./slices/workspaceSlice";
import addWorkSpaceSlice from "./slices/addWorkspaceSlice";
import subsytemSettingsSlice from "./slices/SubsytemSettingsSlice";
import orgHierarchySlice from "./slices/orgHierarchySlice";
import SubsystemDropdownListSlice from "./slices/getAllSubsystemSlice";
import NoteTypeIdSlice from "./slices/getLookUpsSlice";
import WorkSpaceComponentReducer from "./slices/workspaceAggregatorSlice";
import removesubsystemReducer from "./slices/removeSubsystemSlice";
import putWorkspaceActivationReducer from "./slices/putWorkspaceActivation";
import addWorkSpaceCardSlice from "./slices/addCardsystemsSlice";
import getAllMyComponentsSlice from "./slices/getAllMyComponentsSlice";
import getAllHiddenWorkspacesSlice from "./slices/getAllHiddenWorkspacesSlice";
import favouritesListSlice from "./slices/favouritesListSlice";
import postHiddenWorkspacesSlice from "./slices/postHiddenWorkspacesSlice";
import deleteHiddenWorkspacesSlice from "./slices/deleteHiddenWorkspacesSlice";
import userProfileViewSlice from "./slices/user-profile-view-slice";
import AllTypesWithParentSlice from "./slices/getAllTypesWithParent";
import SubsystemSettingsMainClassification from "./slices/getAllSubsytemSettingsMainClassification";
import SubsystemSettingsClassification from "./slices/subsytemSettingsMainClassification";
import GetSubsytemSettingsMainClassificationAgg from "./slices/subsytemSettingsMainClassificationSlice";
import getAllSubsystemMainLookUpSlice from "./slices/getAllSubsytemMainLookUpSlice";
import systemSettingsPartsSlice from "./slices/systemSettingsPartsSlice";
import getAllSubsytemSettingsbyMainClassificationid from "./slices/subsytemSettingsMainClassification";
import ssoSecuritySettingSlice from './slices/ssoSecuritySettingSlice';
import EditClassificationSlice from './slices/editClassificationSlice';

const store = storeRegistry.createStore({
    fetchNews: NewsSlice,
    addNews: NewsSlice,
    deleteNews: NewsSlice,
    fetchAuthors: AuthorsSlice,
    addAuthors: AuthorsSlice,
    deleteAuthors: AuthorsSlice,
    fetchSectors: sectorSlice,
    fetchSector: sectorDetailsSlice,
    addSectors: sectorSlice,
    deleteSectors: sectorSlice,
    allSector: sectorSlice,
    changeSectorState: sectorSlice,
    fetchNewsSector: sectorSlice,
    allAuthors: authorsSlice,
    changeAuthorState: authorsSlice,
    fetchNewsAuthor: authorsSlice,
    changeNewsState: NewsSlice,
    EditNews: NewsSlice,
    fetchNewsDetails: newsDetailsSlice,
    getNewsById: newsDetailsSlice,
    addRateNews: NewsSlice,
    fetchMainNews: mainNewsSlice,
    fetchImportantNews: importantNewsSlice,

    fetchMainNewsHome: mainNewsHomeSlice,
    fetchLastestNews: lastestNewsSlice,
    fetchLastedNewsPaginated: lastedNewsPaginatedSlice,
    aboutAuthority: aboutAuthoritySlice,
    organizationProfileSettingsBasicDetails:
      organizationProfileSettingsBasicDetailsSlice,
    orgDefination: orgDefinationSlice,
    getAllLK_SocialMedia: socialMediaSlice,
    addSocialMedia: socialMediaSlice,
    getSocials: socialMediaSlice,
    deleteSocialMedia: socialMediaSlice,
    boardMembers: boardMembersSlice,
    usersAgg: usersAggSlice,
    user: userSlice,
    users: usersSlice,
    events: eventsSlice,
    circulars: circularsSlice,
    orgs: orgsSlice,
    documentInfo: documentInfoSlice,
    circularsRelatedDocuments: circularsRelatedDocumentsSlice,
    circularLookups: circularLookupsSlice,
    workspace: workspaceSlice,
    // fetchNews: NewsCountSlice,
    mainClassification: mainClassificationSlice,
    subSystemSettingsMainClassification: SubsystemSettingsMainClassification,
    notifications: notifiactionsSlice,
    message: messageSlice,
    subsystem: SubsystemReducer,
    addWorkspace: addWorkSpaceSlice,
    SubsytemSettingsAggregator: subsytemSettingsSlice,
    workspaceComponent: WorkSpaceComponentReducer,
    removesubsystem: removesubsystemReducer,
    orgHierarchy: orgHierarchySlice,
    subsystemDropdownList: SubsystemDropdownListSlice,
    NoteTypeId: NoteTypeIdSlice,
    putWorkspaceActivation: putWorkspaceActivationReducer,
    addWorkspaceCard: addWorkSpaceCardSlice,
    myComponents: getAllMyComponentsSlice,
    hiddenWorkspaces: getAllHiddenWorkspacesSlice,
    getFavouriteList: favouritesListSlice,
    postHiddenWorkspaces: postHiddenWorkspacesSlice,
    deleteHiddenWorkspaces: deleteHiddenWorkspacesSlice,
    userView: userProfileViewSlice,
    AllTypesWithParents: AllTypesWithParentSlice,
    subsystemSettingsClassification: SubsystemSettingsClassification,
    subsytemSettingsMainClassificationAggSlice:
    GetSubsytemSettingsMainClassificationAgg,
    allSubSystemMainLookUp: getAllSubsystemMainLookUpSlice,
    ssoSecuritySetting: ssoSecuritySettingSlice,
    systemSettingsParts: systemSettingsPartsSlice,
    editClassification: EditClassificationSlice,
    allSubsytemByClassificationId: getAllSubsytemSettingsbyMainClassificationid,

});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

