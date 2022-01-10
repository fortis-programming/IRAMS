export interface ResearchModel {
    id: string;
    title: string;
    authors: Array<string>;
    type: string;
    published: string;
    abstract: string;
    college: string;
    keywords: Array<string>; // TENTATIVE
    keyword: string;
    evaluator: string;
    status: string;
    metaData: string;
}