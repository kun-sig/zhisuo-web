// 基础域名配置（可根据环境变量自动切换）
export const urls = {
    getVerifyCode: `/user/getVerifyCode`,
    login: `/user/login`,
    userList: `/user/list`,
    userRole: `/user/role`,
    userRoleList: `/user/role/list`,
    userRoleUpdate: `/user/role/update`,
    userRoleDelete: `/user/list/delete`,

    //获取所有课程相关信息
    getCurriculum: `/curriculum/curriculum`,
    // 考试系列 ExamSeries
    createExamSeries: `/curriculum/exam/series`,
    deleteExamSeries: `/curriculum/exam/series/delete`,
    updateExamSeries: `/curriculum/exam/series/update`,
    getExamSeries: `/curriculum/exam/series/get`,
    listExamSeries: `/curriculum/exam/series/list`,

    // 考试分类 ExamCategory
    createExamCategory: `/curriculum/exam/category`,
    deleteExamCategory: `/curriculum/exam/category/delete`,
    updateExamCategory: `/curriculum/exam/category/update`,
    getExamCategory: `/curriculum/exam/category/get`,
    listExamCategory: `/curriculum/exam/category/list`,

    // 学科 Subject
    createSubject: `/curriculum/subject`,
    deleteSubject: `/curriculum/subject/delete`,
    updateSubject: `/curriculum/subject/update`,
    getSubject: `/curriculum/subject/get`,
    listSubject: `/curriculum/subject/list`,

    // 题目分类 QuestionCategory
    createQuestionCategory: `/curriculum/question/category`,
    deleteQuestionCategory: `/curriculum/question/category/delete`,
    updateQuestionCategory: `/curriculum/question/category/update`,
    getQuestionCategory: `/curriculum/question/category/get`,
    listQuestionCategory: `/curriculum/question/category/list`,

    // 主题 Topic
    createTopic: `/curriculum/topic`,
    deleteTopic: `/curriculum/topic/delete`,
    updateTopic: `/curriculum/topic/update`,
    getTopic: `/curriculum/topic/get`,
    listTopic: `/curriculum/topic/list`,

    // 子主题 Subtopic
    createSubTopic: `/curriculum/subtopic`,
    deleteSubTopic: `/curriculum/subtopic/delete`,
    updateSubTopic: `/curriculum/subtopic/update`,
    getSubTopic: `/curriculum/subtopic/get`,
    listSubTopic: `/curriculum/subtopic/list`,

    //权限管理
    createPermission: `/permission/permission`,
    topicPermission: `/permission/permission/topic`,
    topicsPermission: `/permission/permission/topics`,
    getPermissionOptions: `/permission/permission/options`,
    createRole: `/permission/role`,
    listRole: `/permission/role/list`,
    updateRole: `/permission/role/update`,
    deleteRole: `/permission/role/delete`,
};

