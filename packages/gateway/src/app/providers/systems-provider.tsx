/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  FC,
  useContext,
  useState,
  useEffect,
} from "react";
import { useIntl } from "react-intl";
import { useUser } from "./user-provider";
export type contextProbType = {
  systems: {
    id: number;
    icon: string;
    title: string;
    checked: boolean;
    pathname: string;
    comingSoon: boolean;
    category: string;
  }[];
  setSystems: any;
};

const contextProb: contextProbType = {
  systems: [],
  setSystems: () => {},
};

export const SystemsContext = createContext<contextProbType>(contextProb);
export const useSystems = () => useContext(SystemsContext);

interface IProps {
  children: React.ReactNode;
}

const SystemsProvider: FC<IProps> = ({ children }) => {
  let intl = useIntl();
  let { user } = useUser();

  const [regaChecked, setRegaChecked] = useState(true);
  const [ncvcChecked, setNcvcChecked] = useState(true);
  const [gacChecked, setGacChecked] = useState(true);
  const [explainChecked, setExplainChecked] = useState(true);
  const [rsnfChecked, setRsnfChecked] = useState(true);
  const [itiChecked, setItiChecked] = useState(true);
  const [ppwChecked, setPpwChecked] = useState(true);
  const [idscChecked, setIdscChecked] = useState(true);
  const [userChecked, setUserChecked] = useState(true);

  const [systems, setSystems] = useState<any>(null);

  useEffect(() => {
    if (user?.username === "demo@rega.com") setRegaChecked(false);
    else if (user?.username === "demo@ncvc.com") setNcvcChecked(false);
    else if (user?.username === "demo@gac.com") setGacChecked(false);
    else if (user?.username === "demo@4explain.com") setExplainChecked(false);
    else if (user?.username === "demo@rsnf.com") setRsnfChecked(false);
    else if (user?.username === "demo@iti.com") setItiChecked(false);
    else if (user?.username === "demo@ppw.com") setPpwChecked(false);
    else if (user?.username === "demo@idsc.com") setIdscChecked(false);
    else if (user?.username === "user@4explain.com") setUserChecked(false);
  }, [user]);

  useEffect(() => {
    setSystems([
      // نظام مكتب الرئيس التنفيذى
      {
        id: 1,
        icon: "bi bi-person-lines-fill text-primary",
        title: intl.formatMessage({ id: "CEOOffice" }),
        checked: true,
        pathname: "/ceo-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "SupportAndDecisionMaking",
        }),
      },
      // نظام مكتب إدارة المشاريع
      {
        id: 2,
        icon: "fas fa-chart-bar text-info",
        title: intl.formatMessage({ id: "ProjectsManagement" }),
        checked: true,
        pathname: "/pmo-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "StrategyAndProjects",
        }),
      },
      // نظام إدارة المعرفة
      {
        id: 3,
        icon: "bi bi-lightbulb text-success",
        title: intl.formatMessage({ id: "KnowledgeManagement" }),
        checked: true,
        pathname: "/knowledge-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "EfficiencyRaisingSystems",
        }),
      },
      // نظام إدارة اللجان
      {
        id: 4,
        icon: "bi bi-journal-text text-danger",
        title: intl.formatMessage({ id: "CommitteeManagement" }),
        checked: true,
        pathname: "/committees-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "SupportAndDecisionMaking",
        }),
      },
      // نظام إدارة الدعم الفنى
      {
        id: 5,
        icon: "bi bi-headset text-gblue",
        title: intl.formatMessage({ id: "TechnicalSupportManagement" }),
        checked: true,
        pathname: "/technical-support-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "InstitutionalSystems",
        }),
      },
      // نظام لوحة التحكم
      {
        id: 6,
        icon: "fad fa-users text-primary",
        title: intl.formatMessage({ id: "ControlCpanel" }),
        checked: true,
        pathname: "/admin-panel-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "ControlAndMonitoring",
        }),
      },
      // نظام الآداء المؤسسي
      {
        id: 7,
        icon: "bi bi-graph-up-arrow text-warning",
        title: intl.formatMessage({ id: "OrganizationPerformance" }),
        checked: true,
        pathname: "/organization-performance-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "SupportAndDecisionMaking",
        }),
      },
      // نظام الإعلام الرقمى
      {
        id: 8,
        icon: "bi bi-collection-play text-info",
        title: intl.formatMessage({ id: "DigitalMediaSystem" }),
        checked: true,
        pathname: "/digital-media-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "CorporateIdentity",
        }),
      },
      // نظام إدارة المهام
      {
        id: 9,
        icon: "bi bi-list text-primary",
        title: intl.formatMessage({ id: "TasksManagementSystem" }),
        checked: true,
        pathname: "/tasks-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "StrategyAndProjects",
        }),
      },
      // نظام إدارة الإجتماعات
      {
        id: 10,
        icon: "fas fa-desktop text-danger",
        title: intl.formatMessage({ id: "MeetingsManagementSystem" }),
        checked: true,
        pathname: "/meetings-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "CorporateCommunicationSystems",
        }),
      },
      // نظام إدارة الأجندة
      {
        id: 11,
        icon: "bi bi-calendar-month text-primary",
        title: intl.formatMessage({ id: "AgendaManagementSystem" }),
        checked: true,
        pathname: "/agenda-details-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "CorporateCommunicationSystems",
        }),
      },
      // نظام الإستبيانات
      {
        id: 12,
        icon: "bi bi-ui-radios text-info",
        title: intl.formatMessage({ id: "QuestionnairesSystem" }),
        checked: true,
        pathname: "/questionnaires-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "DataSystems",
        }),
      },
      // نظام كونكت
      {
        id: 13,
        icon: "fab fa-hive text-success",
        title: intl.formatMessage({ id: "ConnectSystem" }),
        checked: true,
        pathname: "/connect-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "CorporateCommunicationSystems",
        }),
      },

      // نظام إدارة التقارير
      {
        id: 14,
        icon: "fas fa-chart-line text-warning",
        title: intl.formatMessage({ id: "ReportsManagementSystem" }),
        checked: true,
        pathname: "/reports-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "DataSystems",
        }),
      },
      // نظام مؤشر
      {
        id: 15,
        icon: "fas fa-chart-pie text-primary",
        title: intl.formatMessage({ id: "IndicatorSystem" }),
        checked: true,
        pathname: "/indicator-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "SupportAndDecisionMaking",
        }),
      },
      // نظام تكامل
      {
        id: 16,
        icon: "fas fa-people-arrows text-success",
        title: intl.formatMessage({ id: "IntegrationSystem" }),
        checked: true,
        pathname: "/integration-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "DataSystems",
        }),
      },

      // نظام إدارة المخاطر
      {
        id: 17,
        icon: "fas fa-radiation-alt text-danger",
        title: intl.formatMessage({ id: "RisksSystem" }),
        checked: true,
        pathname: "/risks-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "GRCSystems",
        }),
      },
      // نظام إدارة الإستراتيجية
      {
        id: 18,
        icon: "fas fa-check-circle text-warning",
        title: intl.formatMessage({ id: "StrategySystem" }),
        checked: true,
        pathname: "/strategy-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "StrategyAndProjects",
        }),
      },
      // نظام البوابة الداخلية
      {
        id: 19,
        icon: "fas fa-external-link-square-alt text-primary",
        title: intl.formatMessage({ id: "InternalGateSystem" }),
        checked: true,
        pathname: "/internal-gate-workspace",
        comingSoon: false,
        category:intl.formatMessage({
        id: "Category4",
      })
      },
      // نظام إدارة المشتريات
      {
        id: 20,
        icon: "bi bi-coin text-info",
        title: intl.formatMessage({ id: "PurchasesManagement" }),
        checked: true,
        pathname: "/purchases-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "InstitutionalSystems",
        }),
      },
      // نظام الإتصالات الإدارية
      {
        id: 21,
        icon: "fa-solid fa-tower-broadcast text-primary",
        title: intl.formatMessage({
          id: "AdministrativeCommunicationsSystem",
        }),
        checked: true,
        pathname: "/administrative-communications-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "CorporateCommunicationSystems",
        }),
      },
      // نظام حوكمة البيانات
      {
        id: 22,
        icon: "bi bi-database-check text-gblue",
        title: intl.formatMessage({ id: "DataGovernanceSystem" }),
        checked: true,
        pathname: "/data-governance-workspace",
        // pathname: "/",
        comingSoon: true,
        category: intl.formatMessage({
          id: "DataSystems",
        }),
      },
      // نظام إدارة الإلتزام
      {
        id: 23,
        icon: "fas fa-business-time text-primary",
        title: intl.formatMessage({ id: "CommitmentAndComplianceSystem" }),
        checked: true,
        pathname: "/commitment-compliance-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "GRCSystems",
        }),
      },

      // نظام إدارة التدريب
      {
        id: 24,
        icon: "fas fa-chalkboard-teacher text-gblue",
        title: intl.formatMessage({ id: "TrainingSystem" }),
        checked: true,
        pathname: "/training-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "EfficiencyRaisingSystems",
        }),
      },
      // نظام ذكاء الاعمال
      {
        id: 25,
        icon: "bi bi-robot text-primary",
        title: intl.formatMessage({ id: "BusinessAiSystem" }),
        checked: true,
        pathname: "/business-ai-workspace",
        // pathname: "/",
        comingSoon: true,
        category: intl.formatMessage({
          id: "DataSystems",
        }),
      },
      // نظام إدارة الطلبات
      {
        id: 26,
        icon: "fas fa-list-ol text-success",
        title: intl.formatMessage({ id: "RequestsSystem" }),
        checked: true,
        pathname: "/requests-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "CorporateCommunicationSystems",
        }),
      },
      // نظام التميز المؤسسي
      {
        id: 27,
        icon: "fas fa-directions text-gblue",
        title: intl.formatMessage({ id: "WorkflowManagementSystem" }),
        checked: true,
        pathname: "/workflow-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "InstitutionalSystems",
        }),
      },
      // نظام فرص
      {
        id: 28,
        icon: "fas fa-door-open text-warning",
        title: intl.formatMessage({ id: "OpportunitiesSystem" }),
        checked: true,
        pathname: "/opportunities-workspace",
        // pathname: "/",
        comingSoon: true,
        category: intl.formatMessage({
          id: "CorporateCommunicationSystems",
        }),
      },
      // نظام تحقق
      {
        id: 29,
        icon: "fas fa-user-shield text-danger",
        title: intl.formatMessage({ id: "VerificationSystem" }),
        checked: true,
        pathname: "/verification-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "DataSystems",
        }),
      },
      // نظام سمارت
      {
        id: 30,
        icon: "fas fa-dungeon text-primary",
        title: intl.formatMessage({ id: "SmartSystem" }),
        checked: true,
        pathname: "/smart-workspace",
        // pathname: "/",
        comingSoon: true,
        category: intl.formatMessage({
          id: "DataSystems",
        }),
      },
      // نظام إدارة الدخول الموحد
      {
        id: 31,
        icon: "icon2-sso fs-23 text-primary",
        title: intl.formatMessage({ id: "SingleSignOnAppSystem" }),
        checked: true,
        pathname: "/single-signon-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "DataSystems",
        }),
      },
      // نظام التوقيع الإلكترونى
      {
        id: 32,
        icon: "fas fa-file-signature text-info",
        title: intl.formatMessage({ id: "ElectronicSignatureSystem" }),
        checked: true,
        pathname: "/electronic-signature-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "CorporateIdentity",
        }),
      },
      // نظام إستمرارية الأعمال
      // {
      //   id: 33,
      //   icon: "bi bi-shuffle text-primary",
      //   title: intl.formatMessage({ id: "BusinessContinuitySystem" }),
      //   checked: true,
      //   pathname: "/business-continuity-workspace",
      //   comingSoon: true,
      // category:intl.formatMessage({
      //   id: "ComingSoon",
      // })
      // },
      // نظام تميز الأعمال
      // {
      //   id: 34,
      //   icon: "fas fa-bookmark text-warning",
      //   title: intl.formatMessage({ id: "BusinessExcellenceSystem" }),
      //   checked: true,
      //   pathname: "/business-excellence-workspace",
      //   comingSoon: true,
      // category:intl.formatMessage({
      //   id: "ComingSoon",
      // })
      // },
      // نظام البوابة الخارجية
      // {
      //   id: 35,
      //   icon: "fas fa-torii-gate text-danger",
      //   title: intl.formatMessage({ id: "ExternalGateSystem" }),
      //   checked: true,
      //   pathname: "/external-gate-workspace",
      //   comingSoon: true,
      //   category: intl.formatMessage({
      //     id: "ComingSoon",
      //   }),
      // },
      // نظام حياكم
      {
        id: 36,
        icon: "icon1-dalla_1 text-success",
        title: intl.formatMessage({ id: "VisitorSystem" }),
        checked: true,
        pathname: "/visitor-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "CorporateIdentity",
        }),
      },
      // نظام ادارة المرافق
      {
        id: 37,
        icon: "fas fa-building text-success",
        title: intl.formatMessage({ id: "UtilitySystem" }),
        checked: true,
        pathname: "/utility-workspace",
        // pathname: "/",
        comingSoon: true,
        category: intl.formatMessage({
          id: "InstitutionalSystems",
        }),
      },
      // نظام ڤيو
      {
        id: 38,
        icon: "far fa-eye text-danger",
        title: intl.formatMessage({ id: "ViewSystem" }),
        checked: true,
        pathname: "/view-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "CorporateIdentity",
        }),
      },
      // نظام صناعة القرار
      {
        id: 39,
        icon: "fas fa-user-tie text-danger",
        title: intl.formatMessage({ id: "DecisionMakerSystem" }),
        checked: true,
        pathname: "/decision-maker-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "DataSystems",
        }),
      },
      // نظام إدارة الشراكات
      {
        id: 40,
        icon: "fa-solid fa-handshake text-primary",
        title: intl.formatMessage({ id: "PartnershipsManagementSystem" }),
        checked: true,
        pathname: "/partnership-system-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "CorporateCommunicationSystems",
        }),
      },
      // نظام برامج أوفيس
      {
        id: 41,
        icon: "fa-solid fa-computer text-primary",
        title: intl.formatMessage({ id: "OfficeSoftwareSystem" }),
        checked: true,
        pathname: "/office-software-system-workspace",
        // pathname: "/",
        comingSoon: true,
        category: intl.formatMessage({
          id: "InstitutionalSystems",
        }),
      },
      // نظام إدارة الموافقات
      {
        id: 42,
        icon: "fas fa-check-square text-success",
        title: intl.formatMessage({ id: "ApprovalsSystem" }),
        checked: true,
        pathname: "/approvals-workspace",
        // pathname: "/",
        comingSoon: true,
        category: intl.formatMessage({
          id: "CorporateCommunicationSystems",
        }),
      },
      //نظام إدارة علاقات العملاء
      {
        id: 43,
        icon: "fas fa-users-cog text-info",
        title: intl.formatMessage({ id: "CustomerRelationsSystem" }),
        checked: true,
        pathname: "/customer-relations-workspace",
        // pathname: "/",
        comingSoon: true,
        category: intl.formatMessage({
          id: "InstitutionalSystems",
        }),
      },
      //نظام ادارة المعايير والجودة
      {
        id: 44,
        icon: "fas fa-check-circle text-gblue",
        title: intl.formatMessage({
          id: "QualityAndStandardsManagementSystem",
        }),
        checked: true,
        pathname: "/quality-standards-workspace",
        // pathname: "/",
        comingSoon: true,
        category: intl.formatMessage({
          id: "InstitutionalSystems",
        }),
      },
      //نظام ادارة الاشعارات
      {
        id: 45,
        icon: "fas fa-bell text-gblue",
        title: intl.formatMessage({ id: "NotificationManagementSystem" }),
        checked: true,
        pathname: "/notifications-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "CorporateCommunicationSystems",
        }),
      },
      // نظام القانونية
      {
        id: 46,
        icon: "fa-solid fa-scale-balanced text-info",
        title: intl.formatMessage({ id: "LegalSystem" }),
        checked: true,
        pathname: "/legal-workspace",
        comingSoon: false,
        category: intl.formatMessage({
          id: "DataSystems",
        }),
      },
      //نظام المراجعة الداخلية
      {
        id: 47,
        icon: "fas fa-search-plus text-info",
        title: intl.formatMessage({ id: "InternalReviewSystem" }),
        checked: true,
        pathname: "/internal-review-workspace",
        // pathname:"/",
        comingSoon: true,
        category: intl.formatMessage({
          id: "InstitutionalSystems",
        }),
      },
        // نظام الإتصال الأستراتيجى
        {
          id: 48,
          icon: "fas fa-blender-phone text-primary",
          title: intl.formatMessage({ id: "StrategyCommunicateSystem" }),
          checked: true,
          pathname: "/strategy-communicate-workspace",
          comingSoon: false,
          category: intl.formatMessage({
          id: "CorporateCommunicationSystems",
          }),
        },
    ]);
  }, [
    regaChecked,
    ncvcChecked,
    gacChecked,
    explainChecked,
    rsnfChecked,
    itiChecked,
    ppwChecked,
    idscChecked,
    userChecked,
  ]);

  useEffect(() => {
    localStorage.setItem("systems", JSON.stringify(systems));
  }, [systems]);

  return (
    <SystemsContext.Provider
      value={{
        systems,
        setSystems,
      }}
    >
      {children}
    </SystemsContext.Provider>
  );
};

export default SystemsProvider;
