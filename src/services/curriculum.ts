import { http, type ApiResponse } from "../utils/http";
import { urls } from "./urls";

// PaginationRequest
export interface PaginationRequest {
    page: number;         // 当前页码
    pageSize: number;     // 每页数量
}

// 请求体类型
interface CreateExamSeriesRequest {
    name: string;        // 考试体系名称，如“软考”
    description: string; // 描述
    order: number;       // 序号
}

// 响应体类型（空响应）
interface CreateExamSeriesResponse {
    // 无字段
}

// DeleteExamSeriesRequest
export interface DeleteExamSeriesRequest {
    id: string;
}

// DeleteExamSeriesResponse
export interface DeleteExamSeriesResponse {
    // 空对象
}

// UpdateExamSeriesRequest
export interface UpdateExamSeriesRequest {
    id: string;
    name: string;
    description: string;
    order: number;
}

// UpdateExamSeriesResponse
export interface UpdateExamSeriesResponse {
    // 空对象
}

// ExamSeries
export interface ExamSeries {
    id: string;              // MongoDB 主键
    name: string;            // 考试体系名称，如“软考”
    description: string;     // 描述
    order: number;           // 序号 (int32)
    createdAt: number;       // 创建时间（Unix 时间戳，int64）
    updatedAt: number;       // 更新时间（Unix 时间戳，int64）
}

// GetExamSeriesRequest
export interface GetExamSeriesRequest {
    id: string;
}

// GetExamSeriesResponse
export interface GetExamSeriesResponse {
    series: ExamSeries;
}

// GetExamSeriesPaginationRequest
export interface GetExamSeriesPaginationRequest {
    pagination: PaginationRequest;
    filter: Record<string, string>; // map<string, string>
}

// ExamSeries（来自前面定义）
export interface ExamSeries {
    id: string;
    name: string;
    description: string;
    order: number;
    createdAt: number;  // Unix 时间戳
    updatedAt: number;  // Unix 时间戳
}

// GetExamSeriesPaginationResponse
export interface GetExamSeriesPaginationResponse {
    totalSize: number;       // int64 映射为 number
    data: ExamSeries[];      // repeated
}

export interface ExamCategory {
    id: string;
    name: string;
    description: string;
    order: number;
    examSeriesID: string;
    createdAt: number;
    updatedAt: number;
}

export interface CreateExamCategoryRequest {
    name: string;
    description: string;
    order: number;
    examSeriesID: string;
}

export interface CreateExamCategoryResponse {
    // 空对象
}

export interface DeleteExamCategoryRequest {
    id: string;
}

export interface DeleteExamCategoryResponse {
    // 空对象
}

export interface UpdateExamCategoryRequest {
    id: string;
    name: string;
    description: string;
    order: number;
}

export interface UpdateExamCategoryResponse {
    // 空对象
}

export interface GetExamCategoryRequest {
    id: string;
}

export interface GetExamCategoryResponse {
    category: ExamCategory;
}

export interface GetExamCategoryPaginationRequest {
    pagination: PaginationRequest;
    filter: Record<string, string>;
}

export interface GetExamCategoryPaginationResponse {
    totalSize: number;
    data: ExamCategory[];
}

export interface Subject {
    id: string;
    name: string;
    description: string;
    order: number;
    examCategoryID: string;
    createdAt: number;
    updatedAt: number;
}

export interface CreateSubjectRequest {
    name: string;
    description: string;
    order: number;
    examCategoryID: string;
}

export interface CreateSubjectResponse {
    // 空对象
}

export interface DeleteSubjectRequest {
    id: string;
}

export interface DeleteSubjectResponse {
    // 空对象
}

export interface UpdateSubjectRequest {
    id: string;
    name: string;
    description: string;
    order: number;
}

export interface UpdateSubjectResponse {
    // 空对象
}

export interface GetSubjectRequest {
    id: string;
}

export interface GetSubjectResponse {
    category: Subject;
}

export interface GetSubjectPaginationRequest {
    pagination: PaginationRequest;
    filter: Record<string, string>;
}

export interface GetSubjectPaginationResponse {
    totalSize: number;
    data: Subject[];
}

export interface QuestionCategory {
    id: string;
    subjectID: string;
    name: string;
    description: string;
    order: number;
    createdAt: number;
    updatedAt: number;
}

export interface CreateQuestionCategoryRequest {
    name: string;
    description: string;
    order: number;
    subjectID: string;
}

export interface CreateQuestionCategoryResponse {
    // 空对象
}

export interface DeleteQuestionCategoryRequest {
    id: string;
}

export interface DeleteQuestionCategoryResponse {
    // 空对象
}
export interface UpdateQuestionCategoryRequest {
    id: string;
    name: string;
    description: string;
    order: number;
}

export interface UpdateQuestionCategoryResponse {
    // 空对象
}
export interface GetQuestionCategoryRequest {
    id: string;
}

export interface GetQuestionCategoryResponse {
    question: QuestionCategory;
}
export interface GetQuestionCategoryPaginationRequest {
    pagination: PaginationRequest;
    subjectID: string;
}

export interface GetQuestionCategoryPaginationResponse {
    totalSize: number;
    data: QuestionCategory[];
}

export interface Topic {
    id: string;
    subjectID: string;
    name: string;
    description: string;
    order: number;
    createdAt: number; // Unix timestamp
    updatedAt: number;
}

export interface CreateTopicRequest {
    name: string;
    description: string;
    order: number;
    subjectID: string;
}

export interface CreateTopicResponse { }

export interface DeleteTopicRequest {
    id: string;
}

export interface DeleteTopicResponse { }

export interface UpdateTopicRequest {
    id: string;
    name: string;
    description: string;
    order: number;
}

export interface UpdateTopicResponse { }

export interface GetTopicRequest {
    id: string;
}

export interface GetTopicResponse {
    topic: Topic;
}

export interface GetTopicPaginationRequest {
    pagination: PaginationRequest;
    subjectID: String;
}

export interface GetTopicPaginationResponse {
    totalSize: number;
    data: Topic[];
}

export interface SubTopic {
    id: string;
    topicID: string;
    name: string;
    description: string;
    order: number;
    createdAt: number;
    updatedAt: number;
}

export interface CreateSubTopicRequest {
    name: string;
    description: string;
    order: number;
    topicID: string;
}

export interface CreateSubTopicResponse { }

export interface DeleteSubTopicRequest {
    id: string;
}

export interface DeleteSubTopicResponse { }

export interface UpdateSubTopicRequest {
    id: string;
    name: string;
    description: string;
    order: number;
}

export interface UpdateSubTopicResponse { }

export interface GetSubTopicRequest {
    id: string;
}

export interface GetSubTopicResponse {
    topic: SubTopic;
}

export interface GetSubTopicPaginationRequest {
    pagination: PaginationRequest;
    topicID: string;
}

export interface GetSubTopicPaginationResponse {
    totalSize: number;
    data: SubTopic[];
}

export interface GetCurriculumRequest { }

// 响应对象中的 Subject
export interface Subjectstatistics {
    id: string;
    name: string;
    description: string;
    order: number;
}

// 响应对象中的 ExamCategory
export interface ExamCategorystatistics {
    id: string;
    name: string;
    description: string;
    order: number;
    subjects: Subjectstatistics[];
}

// 响应对象中的 ExamSeries
export interface ExamSeriesstatistics {
    id: string;
    name: string;
    description: string;
    order: number;
    categories: ExamCategorystatistics[];
}


// 最终响应结构
export interface GetCurriculumResponse {
    series: ExamSeriesstatistics[];
}

class CurriculumAPI {
    async GetCurriculum(): Promise<GetCurriculumResponse> {
        const body: GetCurriculumRequest = {};
        const response = await http.post<GetCurriculumResponse>(
            urls.getCurriculum,
            body
        );
        return response;
    }
    async CreateExamSeries(name: string, order: number, description: string): Promise<CreateExamSeriesResponse> {
        const body: CreateExamSeriesRequest = { name: name, order: order, description: description };
        const response = await http.post<CreateExamSeriesResponse>(
            urls.createExamSeries,
            body
        );
        return response;
    }
    async DeleteExamSeries(id: string): Promise<DeleteExamSeriesResponse> {
        const body: DeleteExamSeriesRequest = { id: id };
        const response = await http.post<DeleteExamSeriesResponse>(
            urls.deleteExamSeries,
            body
        );
        return response;
    }
    async UpdateExamSeries(id: string, name: string, order: number, description: string): Promise<UpdateExamSeriesResponse> {
        const body: UpdateExamSeriesRequest = { id: id, name: name, order: order, description: description };
        const response = await http.post<UpdateExamSeriesResponse>(
            urls.updateExamSeries,
            body
        );
        return response;
    }
    async GetExamSeries(id: string): Promise<GetExamSeriesResponse> {
        const body: GetExamSeriesRequest = { id: id };
        const response = await http.post<GetExamSeriesResponse>(
            urls.getExamSeries,
            body
        );
        return response;
    }
    async GetExamSeriesPagination(page: number, pageSize: number): Promise<GetExamSeriesPaginationResponse> {
        const body: GetExamSeriesPaginationRequest = {
            pagination: {
                page: page,
                pageSize: pageSize,
            },
            filter: {},
        };
        const response = await http.post<GetExamSeriesPaginationResponse>(
            urls.listExamSeries,
            body
        );
        return response;
    }

    async CreateExamCategory(examSeriesID: string, name: string, order: number, description: string): Promise<CreateExamCategoryResponse> {
        const body: CreateExamCategoryRequest = { examSeriesID: examSeriesID, name: name, order: order, description: description };
        const response = await http.post<CreateExamCategoryResponse>(
            urls.createExamCategory,
            body
        );
        return response;
    }
    async DeleteExamCategory(id: string): Promise<DeleteExamCategoryResponse> {
        const body: DeleteExamCategoryRequest = { id: id };
        const response = await http.post<DeleteExamCategoryResponse>(
            urls.deleteExamCategory,
            body
        );
        return response;
    }
    async UpdateExamCategory(id: string, name: string, order: number, description: string): Promise<UpdateExamCategoryResponse> {
        const body: UpdateExamCategoryRequest = { id: id, name: name, order: order, description: description };
        const response = await http.post<UpdateExamCategoryResponse>(
            urls.updateExamCategory,
            body
        );
        return response;
    }
    async GetExamCategory(id: string): Promise<GetExamCategoryResponse> {
        const body: GetExamCategoryRequest = { id: id };
        const response = await http.post<GetExamCategoryResponse>(
            urls.getExamCategory,
            body
        );
        return response;
    }
    async GetExamCategoryPagination(page: number, pageSize: number): Promise<GetExamCategoryPaginationResponse> {
        const body: GetExamCategoryPaginationRequest = {
            pagination: {
                page: page,
                pageSize: pageSize,
            },
            filter: {},
        };
        const response = await http.post<GetExamCategoryPaginationResponse>(
            urls.listExamCategory,
            body
        );
        return response;
    }
    async CreateSubject(examCategoryID: string, name: string, order: number, description: string): Promise<CreateSubjectResponse> {
        const body: CreateSubjectRequest = { examCategoryID: examCategoryID, name: name, order: order, description: description };
        const response = await http.post<CreateSubjectResponse>(
            urls.createSubject,
            body
        );
        return response;
    }
    async DeleteSubject(id: string): Promise<DeleteSubjectResponse> {
        const body: DeleteSubjectRequest = { id: id };
        const response = await http.post<DeleteSubjectResponse>(
            urls.deleteSubject,
            body
        );
        return response;
    }
    async UpdateSubject(id: string, name: string, order: number, description: string): Promise<UpdateSubjectResponse> {
        const body: UpdateSubjectRequest = { id: id, name: name, order: order, description: description };
        const response = await http.post<UpdateSubjectResponse>(
            urls.updateSubject,
            body
        );
        return response;
    }
    async GetSubject(id: string): Promise<GetSubjectResponse> {
        const body: GetSubjectRequest = { id: id };
        const response = await http.post<GetSubjectResponse>(
            urls.getSubject,
            body
        );
        return response;
    }
    async GetSubjectPagination(page: number, pageSize: number): Promise<GetSubjectPaginationResponse> {
        const body: GetSubjectPaginationRequest = {
            pagination: {
                page: page,
                pageSize: pageSize,
            },
            filter: {},
        };
        const response = await http.post<GetSubjectPaginationResponse>(
            urls.listSubject,
            body
        );
        return response;
    }
    async CreateQuestionCategory(subjectID: string, name: string, order: number, description: string): Promise<CreateQuestionCategoryResponse> {
        const body: CreateQuestionCategoryRequest = { subjectID: subjectID, name: name, order: order, description: description };
        const response = await http.post<CreateQuestionCategoryResponse>(
            urls.createQuestionCategory,
            body
        );
        return response;
    }
    async DeleteQuestionCategory(id: string): Promise<DeleteQuestionCategoryResponse> {
        const body: DeleteQuestionCategoryRequest = { id: id };
        const response = await http.post<DeleteQuestionCategoryResponse>(
            urls.deleteQuestionCategory,
            body
        );
        return response;
    }
    async UpdateQuestionCategory(id: string, name: string, order: number, description: string): Promise<UpdateQuestionCategoryResponse> {
        const body: UpdateQuestionCategoryRequest = { id: id, name: name, order: order, description: description };
        const response = await http.post<UpdateQuestionCategoryResponse>(
            urls.updateQuestionCategory,
            body
        );
        return response;
    }
    async GetQuestionCategory(id: string): Promise<GetQuestionCategoryResponse> {
        const body: GetQuestionCategoryRequest = { id: id };
        const response = await http.post<GetQuestionCategoryResponse>(
            urls.getQuestionCategory,
            body
        );
        return response;
    }
    async GetQuestionCategoryPagination(subjectID: string, page: number, pageSize: number): Promise<GetQuestionCategoryPaginationResponse> {
        const body: GetQuestionCategoryPaginationRequest = {
            pagination: {
                page: page,
                pageSize: pageSize,
            },
            subjectID: subjectID,
        };
        const response = await http.post<GetQuestionCategoryPaginationResponse>(
            urls.listQuestionCategory,
            body
        );
        return response;
    }
    async CreateTopic(subjectID: string, name: string, order: number, description: string): Promise<CreateTopicResponse> {
        const body: CreateTopicRequest = { subjectID: subjectID, name: name, order: order, description: description };
        const response = await http.post<CreateTopicResponse>(
            urls.createTopic,
            body
        );
        return response;
    }
    async DeleteTopic(id: string): Promise<DeleteTopicResponse> {
        const body: DeleteTopicRequest = { id: id };
        const response = await http.post<DeleteTopicResponse>(
            urls.deleteTopic,
            body
        );
        return response;
    }
    async UpdateTopic(id: string, name: string, order: number, description: string): Promise<UpdateTopicResponse> {
        const body: UpdateTopicRequest = { id: id, name: name, order: order, description: description };
        const response = await http.post<UpdateTopicResponse>(
            urls.updateTopic,
            body
        );
        return response;
    }
    async GetTopic(id: string): Promise<GetTopicResponse> {
        const body: GetTopicRequest = { id: id };
        const response = await http.post<GetTopicResponse>(
            urls.getTopic,
            body
        );
        return response;
    }
    async GetTopicPagination(subjectID: string, page: number, pageSize: number): Promise<GetTopicPaginationResponse> {
        const body: GetTopicPaginationRequest = {
            pagination: {
                page: page,
                pageSize: pageSize,
            },
            subjectID: subjectID,
        };
        const response = await http.post<GetTopicPaginationResponse>(
            urls.listTopic,
            body
        );
        return response;
    }
    async CreateSubTopic(topicID: string, name: string, order: number, description: string): Promise<CreateSubTopicResponse> {
        const body: CreateSubTopicRequest = { topicID: topicID, name: name, order: order, description: description };
        const response = await http.post<CreateSubTopicResponse>(
            urls.createSubTopic,
            body
        );
        return response;
    }
    async DeleteSubTopic(id: string): Promise<DeleteSubTopicResponse> {
        const body: DeleteSubTopicRequest = { id: id };
        const response = await http.post<DeleteSubTopicResponse>(
            urls.deleteSubTopic,
            body
        );
        return response;
    }
    async UpdateSubTopic(id: string, name: string, order: number, description: string): Promise<UpdateSubTopicResponse> {
        const body: UpdateSubTopicRequest = { id: id, name: name, order: order, description: description };
        const response = await http.post<UpdateSubTopicResponse>(
            urls.updateSubTopic,
            body
        );
        return response;
    }
    async GetSubTopic(id: string): Promise<GetSubTopicResponse> {
        const body: GetSubTopicRequest = { id: id };
        const response = await http.post<GetSubTopicResponse>(
            urls.getSubTopic,
            body
        );
        return response;
    }
    async GetSubTopicPagination(topicID: string, page: number, pageSize: number): Promise<GetSubTopicPaginationResponse> {
        const body: GetSubTopicPaginationRequest = {
            pagination: {
                page: page,
                pageSize: pageSize,
            },
            topicID: topicID,
        };
        const response = await http.post<GetSubTopicPaginationResponse>(
            urls.listSubTopic,
            body
        );
        return response;
    }
}

export const curriculumAPI = new CurriculumAPI();