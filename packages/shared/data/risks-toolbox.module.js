import { createWorkspaceItems } from "./workspace-generator";

const name = "RisksSystem";
const items = [
  {
    dept: "Services",
    title: "Settings",
    icon: "fa-solid fa-gears",
    link: "/risks-settings",
    color: "primary",
  },
  {
    dept: "Services",
    title: "RisksRegistry",
    icon: "fa-solid fa-folder-open",
    link: "/risks-registry",
    color: "warning",
  },
  // {
  //   dept: "Services",
  //   title: "RisksIndicators",
  //   icon: "fad fa-file-chart-pie",
  //   link: "/risks-indicators",
  //   color: "primary",
  // },
  // {
  //   dept: "Services",
  //   title: "RisksReports",
  //   icon: "fad fa-analytics",
  //   link: "/risks-reports",
  //   color: "success",
  // },
  // {
  //   dept: "Services",
  //   title: "Alerts",
  //   icon: "/media/icons/duotune/general/gen069.svg",
  //   link: "/notifications-details/risks",
  //   color: "primary",
  // },
  // {
  //   dept: "Services",
  //   title: "SearchAndFiltering",
  //   icon: "fad fa-filter",
  //   color: "danger",
  // },
  // {
  //   dept: "Services",
  //   title: "Approvals",
  //   icon: "fas fa-check-square",
  //   color: "success",
  // },
  // {
  //   dept: "Services",
  //   title: "Requests",
  //   icon: "fa-solid fa-bars",
  //   link: "/risks-requests",
  //   color: "info",
  // },
  // {
  //   dept: "Services",
  //   title: "TheFavorites",
  //   icon: "fa-solid fa-star",
  //   color: "info",
  // },
  // {
  //   dept: "Services",
  //   title: "intelligentInterlocutor",
  //   icon: "fa-solid fa-magnifying-glass-chart",
  //   link: "/intelligent-interlocutor/risks",
  //   color: "success",
  // },
  // {
  //   dept: "Services",
  //   title: "SystemSettings",
  //   icon: "fas fa-users-cog",
  //   // link: "/risks-system-settings/risks-workspace",
  //   link: "/risks-system-settings",
  //   color: "danger",
  // },
  // {
  //   dept: "Services",
  //   title: "AboutRisksSystem",
  //   icon: "fa-solid fa-circle-exclamation",
  //   link: "/about/Risk",
  //   color: "info",
  // },
  // {
  //   dept: "Services",
  //   title: "SubSystemSettings",
  //   icon: "fa-solid fa-gears",
  //   link: "/risks-sub-system-settings",
  //   color: "secondary",
  // },
];

const createdItems = createWorkspaceItems(name, items);
export const CardsListData = () => createdItems.map((item) => item.card);
export const ToolsBoxDrawerData = () =>
  createdItems.map((item) => item.toolboxItem);
export const TableListData = () => createdItems.map((item) => item.tableRow);
