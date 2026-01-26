import { MAIN_BASE_URL } from "@4eplatform/shared";

interface Endpoint {
  url: string;
  method: keyof Requests; // 'get', 'post', 'put', 'delete'
}
interface Requests {
  get: (url: string, params?: any) => Promise<any>;
  post: (url: string, body: {}) => Promise<any>;
  put: (url: string, body: {}) => Promise<any>;
  delete: (url: string) => Promise<any>;
  putById: (url: string, params?: any) => Promise<any>;
}

const sectorEndpoints: { [key: string]: Endpoint } = {
  getAllSectors: {
    url: "Sector/GetAllSectorsPaginatedFiltered",
    method: "get",
  },
  getAllNewSector: { url: "Sector", method: "get" },
  getAllSectorsWithoutPagination: { url: "Sector", method: "get" },
  postNewSector: { url: "Sector", method: "post" },
  putASector: { url: "Sector", method: "putById" },
  changeSectorState: { url: "Sector/changeSectorState", method: "putById" },
  deleteSector: { url: "Sector", method: "delete" },
};
// getAllAuthor: { url: "Author/GetAllAuthorsPaginated", method: "get" },
//   getAllNewsAuthor: { url: "News/GetAllNewsByAuthorId", method: "get" },
//   getAllAuthorWithoutPagination: { url: "Author/GetAllAuthors", method: "get" },
//   postAuthor: { url: "Author/PostAuthor", method: "post" },
//   putAuthor: { url: "Author/PutAuthor", method: "putById" },

//   changeAuthorState: { url: "Author/changeAuthorState", method: "putById" },
//   deleteAuthor: { url: "Author/DeleteAuthor", method: "delete" },
export const baseUrl =
  (window as any)._env_?.REACT_APP_API_Digital_News_Url + "/";
const sectorApis = {
  baseurl: `${baseUrl}api/`,
  endpoints: sectorEndpoints,
};

export { sectorApis };
