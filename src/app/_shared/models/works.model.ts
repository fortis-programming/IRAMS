export interface WorksModel {
    projectId: string;
    title: string;
    type: string;
    updatedAt: string;
    status: string;
    members: Array<string>;
    validator: string;
    college: string;
    metaData: string;
    contributors: Array<string>;
}