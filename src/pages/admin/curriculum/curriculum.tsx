import { message, Tabs } from "antd";
import CategoryCard from "../../../components/categoryCard";
import { useEffect, useState } from "react";
import ModalWrapper from "../../../components/modalWrapper";
import { curriculumAPI, type ExamCategory, type ExamSeries, type QuestionCategory, type Subject, type Subjectstatistics, type SubTopic, type Topic } from "../../../services/curriculum";
import SubjectModal from "./modal/subjectModal";
import QuestionCategoryModal from "./modal/questionCategoryModal";
import ExamSeriesModal from "./modal/examSeriesModal";
import ExamCategoryModal from "./modal/examCategoryModal";
import TopicModal from "./modal/topicModal";
import SubTopicModal from "./modal/subTopicModal";

export default function CurriculumPage() {
    const [examSeriesState, setExamSeriesState] = useState<{
        openModal: boolean;
        isAdd: boolean;
        list?: ExamSeries[];
        currentItem?: ExamSeries;
    }>({
        openModal: false,
        isAdd: false,
        list: [],
        currentItem: {} as ExamSeries,
    });
    const [examCategoryState, setExamCategoryState] = useState<{
        openModal: boolean;
        isAdd: boolean;
        list?: ExamCategory[];
        currentItem?: ExamCategory;
    }>({
        openModal: false,
        isAdd: false,
        list: [],
        currentItem: {} as ExamCategory,
    });
    const [subjectState, setSubjectState] = useState<{
        openModal: boolean;
        isAdd: boolean;
        list?: Subject[];
        currentItem?: Subject;
    }>({
        openModal: false,
        isAdd: false,
        list: [],
        currentItem: {} as Subject,
    });
    const [questionCategoryState, setQuestionCategoryState] = useState<{
        openModal: boolean;
        isAdd: boolean;
        list?: QuestionCategory[];
        currentItem?: QuestionCategory;
    }>({
        openModal: false,
        isAdd: false,
        list: [],
        currentItem: {} as QuestionCategory,
    });
    const [topicState, setTopicState] = useState<{
        openModal: boolean;
        isAdd: boolean;
        list?: Topic[];
        currentItem?: Topic;
    }>({
        openModal: false,
        isAdd: false,
        list: [],
        currentItem: {} as Topic,
    });
    const [subTopicState, setSubTopicState] = useState<{
        openModal: boolean;
        isAdd: boolean;
        list?: SubTopic[];
        currentItem?: SubTopic;
    }>({
        openModal: false,
        isAdd: false,
        list: [],
        currentItem: {} as SubTopic,
    });

    const tabKeyValues = ["questionType", "topic"]
    const [tabKey, setTabKey] = useState(tabKeyValues[0])

    useEffect(() => {
        console.log('组件已挂载');
        reload();
        return () => {
            console.log('组件将卸载');
        };
    }, []);

    const reload = () => {
        clearAddState()

        curriculumAPI.GetCurriculum().then((response) => {
            const seriesList: ExamSeries[] = response.series.map((series) => ({
                id: series.id,
                name: series.name,
                order: series.order,
                description: series.description,
                createdAt: 0,
                updatedAt: 0,
            }));
            const currentSeriesItem = examSeriesState?.list?.find((s) => s.id === examSeriesState.currentItem?.id);
            setExamSeriesState({
                openModal: false,
                isAdd: false,
                list: seriesList,
                currentItem: currentSeriesItem
            });

            // ------------------ExamCategory
            const categoryList: ExamCategory[] = response.series.flatMap((series) =>
                (series.categories ?? []).map((category) => ({
                    id: category.id,
                    name: category.name,
                    order: category.order,
                    description: category.description,
                    examSeriesID: series.id,
                    createdAt: 0,
                    updatedAt: 0,
                }))
            );
            const currentCategoryItem = examCategoryState?.list?.find((s) => s.id === examCategoryState.currentItem?.id);
            setExamCategoryState({
                openModal: false,
                isAdd: false,
                list: categoryList,
                currentItem: currentCategoryItem
            });

            // ------------------Subject
            const subjectList: Subject[] = response.series.flatMap((series) =>
                (series.categories ?? []).flatMap((category) => (category.subjects ?? []).map((subjects) => ({
                    id: subjects.id,
                    name: subjects.name,
                    order: subjects.order,
                    description: subjects.description,
                    examCategoryID: category.id,
                    createdAt: 0,
                    updatedAt: 0,
                })))
            );
            const currentSubjectItem = subjectState?.list?.find((s) => s.id === subjectState.currentItem?.id);
            setSubjectState({
                openModal: false,
                isAdd: false,
                list: subjectList,
                currentItem: currentSubjectItem
            });
        }).catch((e) => {
            message.error(`加载数据失败：${e}`);
        });
    }
    const reloadQuestionCategory = (subjectID: string) => {
        clearAddState()
        curriculumAPI.GetQuestionCategoryPagination(subjectID, 0, -1).then((response) => {
            const questionCategoryList: QuestionCategory[] = response.data?.map((questionCategory) => ({
                id: questionCategory.id,
                name: questionCategory.name,
                order: questionCategory.order,
                subjectID: questionCategory.subjectID,
                description: questionCategory.description,
                createdAt: questionCategory.createdAt,
                updatedAt: questionCategory.updatedAt,
            }));
            const currentQuestionCategoryItem = questionCategoryState?.list?.find((s) => s.id === questionCategoryState.currentItem?.id);
            setQuestionCategoryState(s => ({ ...s, list: questionCategoryList, currentItem: currentQuestionCategoryItem }))
        })

    }
    const reloadTopic = (subjectID: string) => {
        clearAddState()
        curriculumAPI.GetTopicPagination(subjectID, 0, -1).then((response) => {
            const topicList: Topic[] = response.data?.map((topic) => ({
                id: topic.id,
                name: topic.name,
                order: topic.order,
                subjectID: topic.subjectID,
                description: topic.description,
                createdAt: topic.createdAt,
                updatedAt: topic.updatedAt,
            }));
            const currentTopicItem = topicState?.list?.find((s) => s.id === topicState.currentItem?.id);
            setTopicState(s => ({ ...s, list: topicList, currentItem: currentTopicItem }))
        })

    }

    const reloadSubTopic = (topicID: string) => {
        clearAddState()
        curriculumAPI.GetSubTopicPagination(topicID, 0, -1).then((response) => {
            const subTopicList: SubTopic[] = response.data?.map((subtopic) => ({
                id: subtopic.id,
                name: subtopic.name,
                order: subtopic.order,
                topicID: subtopic.topicID,
                description: subtopic.description,
                createdAt: subtopic.createdAt,
                updatedAt: subtopic.updatedAt,
            }));
            const currentSubTopicItem = subTopicState?.list?.find((s) => s.id === subTopicState.currentItem?.id);
            setSubTopicState(s => ({ ...s, list: subTopicList, currentItem: currentSubTopicItem }))
        })

    }
    const clearAddState = () => {
        setExamSeriesState(s => ({ ...s, openModal: false, isAdd: false }))
        setExamCategoryState(s => ({ ...s, openModal: false, isAdd: false }))
        setSubjectState(s => ({ ...s, openModal: false, isAdd: false }))
        setQuestionCategoryState(s => ({ ...s, openModal: false, isAdd: false }))
        setTopicState(s => ({ ...s, openModal: false, isAdd: false }))
        setSubTopicState(s => ({ ...s, openModal: false, isAdd: false }))
    }

    //------handle ExamSeries event
    const handleOnClickExamSeries = (id: string) => {
        const found = examSeriesState.list?.find((s) => s.id === id);
        if (!found) {
            return
        }
        setExamSeriesState(s => ({ ...s, currentItem: found }))
        setExamCategoryState(s => ({ ...s, currentItem: {} as ExamCategory }))
        setSubjectState(s => ({ ...s, currentItem: {} as Subject }))
        setTabKey(tabKeyValues[0])
    }
    const handleAddExamSeries = () => {
        setExamSeriesState(s => ({ ...s, openModal: true, isAdd: true }))
    }
    const handleEditExamSeries = (id: string) => {
        const found = examSeriesState?.list?.find((s) => s.id === id);
        if (found) {
            setExamSeriesState(s => ({ ...s, openModal: true }))
        }
    }
    const handleDelExamSeries = (id: string) => {
        curriculumAPI.DeleteExamSeries(id).then(() => {
            reload();
        })
    };
    //------handle ExamCategory event
    const handleOnClickExamCategory = (id: string) => {
        const found = examCategoryState.list?.find((s) => s.id === id);
        if (!found) {
            return
        }
        setExamCategoryState(s => ({ ...s, currentItem: found }))
        setSubjectState((s) => ({ ...s, currentItem: {} as Subject }))
        setQuestionCategoryState(s => ({ ...s, list: [], currentItem: {} as QuestionCategory }))
        setTopicState(s => ({ ...s, list: [], currentItem: {} as Topic }))
        setSubTopicState(s => ({ ...s, list: [], currentItem: {} as SubTopic }))
        setTabKey(tabKeyValues[0])
    }
    const handleAddExamCategory = () => {
        setExamCategoryState(s => ({ ...s, openModal: true, isAdd: true }))
    }
    const handleEditExamCategory = (id: string) => {
        const found = examCategoryState?.list?.find((s) => s.id === id);
        if (found) {
            setExamCategoryState(s => ({ ...s, openModal: true }))
        }
    }
    const handleDelExamCategory = (id: string) => {
        curriculumAPI.DeleteExamCategory(id).then(() => {
            reload();
        })
    };
    //------handle Subject event
    const handleOnClickSubject = (id: string) => {
        const found = subjectState.list?.find((s) => s.id === id);
        if (!found) {
            return
        }
        setTabKey(tabKeyValues[0]);
        setSubjectState(s => ({ ...s, currentItem: found }));
        reloadQuestionCategory(id);
    }
    const handleAddSubject = () => {
        setSubjectState(s => ({ ...s, openModal: true, isAdd: true }))
    }
    const handleEditSubject = (id: string) => {
        const found = subjectState?.list?.find((s) => s.id === id);
        if (found) {
            setSubjectState(s => ({ ...s, openModal: true }))
        }
    }
    const handleDelSubject = (id: string) => {
        curriculumAPI.DeleteSubject(id).then(() => {
            reload();
        })
    };

    //------handle QuestionCategory event
    const handleOnClickQuestionCategory = (id: string) => {
        const found = questionCategoryState.list?.find((s) => s.id === id);
        if (found) {
            setQuestionCategoryState(s => ({ ...s, currentItem: found }))
        }
    }
    const handleAddQuestionCategory = () => {
        setQuestionCategoryState(s => ({ ...s, openModal: true, isAdd: true }))
    }
    const handleEditQuestionCategory = (id: string) => {
        const found = questionCategoryState?.list?.find((s) => s.id === id);
        if (found) {
            setQuestionCategoryState(s => ({ ...s, openModal: true }))
        }
    }
    const handleDelQuestionCategory = (id: string) => {
        curriculumAPI.DeleteQuestionCategory(id).then(() => {
            reloadQuestionCategory(subjectState.currentItem?.id??"")
        })
    };

    //------handle Topic event
    const handleOnClickTopic = (id: string) => {
        const found = topicState.list?.find((s) => s.id === id);
        if (!found) {
            return
        }
        setTopicState(s => ({ ...s, currentItem: found }))
        reloadSubTopic(id);

    }
    const handleAddTopic = () => {
        setTopicState(s => ({ ...s, openModal: true, isAdd: true }))
    }
    const handleEditTopic = (id: string) => {
        const found = topicState?.list?.find((s) => s.id === id);
        if (found) {
            setTopicState(s => ({ ...s, openModal: true }))
        }
    }
    const handleDelTopic = (id: string) => {
        curriculumAPI.DeleteTopic(id).then(() => {
            reloadTopic(subjectState.currentItem?.id??"")
        })
    };

    //------handle SubTopic event
    const handleOnClickSubTopic = (id: string) => {
        const found = subTopicState.list?.find((s) => s.id === id);
        if (!found) {
            return
        }
        setSubTopicState(s => ({ ...s, currentItem: found }))
    }
    const handleAddSubTopic = () => {
        setSubTopicState(s => ({ ...s, openModal: true, isAdd: true }))
    }
    const handleEditSubTopic = (id: string) => {
        const found = subTopicState?.list?.find((s) => s.id === id);
        if (found) {
            setSubTopicState(s => ({ ...s, openModal: true }))
        }
    }
    const handleDelSubTopic = (id: string) => {
        curriculumAPI.DeleteSubTopic(id).then(() => {
            reloadSubTopic(topicState.currentItem?.id??"");
        })
    };
    const onTabChange = (key: string) => {
        setTabKey(key);
        setTopicState(s => ({ ...s, list: [], currentItem: {} as Topic }))
        setSubTopicState(s => ({ ...s, list: [], currentItem: {} as SubTopic }))
        if (key === tabKeyValues[1]) {
            reloadTopic(subjectState.currentItem?.id ?? "");
        }
    };
    return (
        <div>
            <ModalWrapper open={examSeriesState.openModal} onClose={() => { reload() }} ><ExamSeriesModal isAdd={examSeriesState.isAdd} props={examSeriesState.currentItem} /></ModalWrapper>
            <ModalWrapper open={examCategoryState.openModal} onClose={() => { reload() }} ><ExamCategoryModal isAdd={examCategoryState.isAdd} examSeriesID={examCategoryState.currentItem?.id ?? ""} props={examCategoryState.currentItem} /></ModalWrapper>
            <ModalWrapper open={subjectState.openModal} onClose={() => { reload() }} ><SubjectModal isAdd={subjectState.isAdd} examCategoryID={examCategoryState.currentItem?.id ?? ""} props={subjectState.currentItem} /></ModalWrapper>
            <ModalWrapper open={questionCategoryState.openModal} onClose={() => { reloadQuestionCategory(subjectState.currentItem?.id ?? "") }} ><QuestionCategoryModal isAdd={questionCategoryState.isAdd} subjectID={subjectState.currentItem?.id ?? ""} props={questionCategoryState.currentItem} /></ModalWrapper>
            <ModalWrapper open={topicState.openModal} onClose={() => { reloadTopic(subjectState.currentItem?.id ?? "") }} ><TopicModal isAdd={topicState.isAdd} subjectID={subjectState.currentItem?.id ?? ""} props={topicState.currentItem} /></ModalWrapper>
            <ModalWrapper open={subTopicState.openModal} onClose={() => { reloadSubTopic(subTopicState.currentItem?.id ?? "") }} ><SubTopicModal isAdd={subTopicState.isAdd} topicID={topicState.currentItem?.id ?? ""} props={subTopicState.currentItem} /></ModalWrapper>

            <div className="flex flex-col h-full w-full">
                <div className="flex flex-row items-start whitespace-nowrap p-2">
                    <div className="w-[50px] shrink-0">
                        <h1 className="text-base font-normal">系列:</h1>
                    </div>
                    <div className="flex flex-row gap-4 ml-4 overflow-x-auto">
                        {examSeriesState.list?.map((item) => (
                            <CategoryCard key={item.id} id={item.id} onClick={(id) => handleOnClickExamSeries(id)} name={item.name} selected={examSeriesState.currentItem?.id === item.id} onEdit={(id) => handleEditExamSeries(id)} onDelete={(id) => handleDelExamSeries(id)}></CategoryCard>
                        ))}
                        <CategoryCard isAdd={true} onAdd={() => handleAddExamSeries()}></CategoryCard>
                    </div>
                </div>
                <div className="flex flex-row items-start whitespace-nowrap p-2">
                    <div className="w-[50px] shrink-0">
                        <h1 className="text-base font-normal">类别:</h1>
                    </div>
                    <div className="flex flex-row gap-4 ml-4 overflow-x-auto">
                        {examCategoryState.list?.map((item) => (
                            examSeriesState.currentItem?.id === item.examSeriesID &&
                            <CategoryCard key={item.id} id={item.id} onClick={(id) => handleOnClickExamCategory(id)} name={item.name} selected={examCategoryState.currentItem?.id === item.id} onEdit={(id) => handleEditExamCategory(id)} onDelete={(id) => handleDelExamCategory(id)}></CategoryCard>
                        ))}
                        <CategoryCard isAdd={true} onAdd={handleAddExamCategory}></CategoryCard>
                    </div>
                </div>
                <div className="flex flex-row items-start whitespace-nowrap p-2">
                    <div className="w-[50px] shrink-0">
                        <h1 className="text-base font-normal">科目:</h1>
                    </div>
                    <div className="flex flex-row gap-4 ml-4 overflow-x-auto">
                        {subjectState.list?.map((item) => (
                            examCategoryState.currentItem?.id === item.examCategoryID &&
                            <CategoryCard key={item.id} id={item.id} onClick={(id) => { handleOnClickSubject(id) }} name={item.name} selected={subjectState.currentItem?.id === item.id} onEdit={(id) => { handleEditSubject(id) }} onDelete={(id) => handleDelSubject(id)}></CategoryCard>
                        ))}
                        <CategoryCard isAdd={true} onAdd={handleAddSubject}></CategoryCard>
                    </div>
                </div>
                <div className="w-full h-full">
                    <Tabs
                        defaultActiveKey={tabKeyValues[0]}
                        activeKey={tabKey}
                        onChange={onTabChange}
                        items={[
                            {
                                label: '题型',
                                key: `${tabKeyValues[0]}`,
                                children: <div className="flex flex-row items-start whitespace-nowrap pl-2">
                                    <div className="w-[50px] shrink-0">
                                        <h1 className="text-base font-normal">题型:</h1>
                                    </div> <div className="flex flex-row gap-4 ml-4 overflow-x-auto">
                                        {questionCategoryState.list?.map((item) => (
                                            subjectState.currentItem?.id === item.subjectID &&
                                            <CategoryCard key={item.id} id={item.id} onClick={(id) => { handleOnClickQuestionCategory(id) }} name={item.name} selected={questionCategoryState.currentItem?.id === item.id} onEdit={(id) => { handleEditQuestionCategory(id) }} onDelete={(id) => handleDelQuestionCategory(id)}></CategoryCard>
                                        ))}
                                        <CategoryCard isAdd={true} onAdd={handleAddQuestionCategory}></CategoryCard>
                                    </div>
                                </div>
                            },
                            {
                                label: '主题类型',
                                key: `${tabKeyValues[1]}`,
                                children: <div className="flex flex-col h-full w-full">
                                    <div className="flex flex-row items-start whitespace-nowrap pl-2">
                                        <div className="w-[50px] shrink-0">
                                            <h1 className="text-base font-normal">主题:</h1>
                                        </div>
                                        <div className="flex flex-row gap-4 ml-4 overflow-x-auto">
                                            {topicState.list?.map((item) => (
                                                <CategoryCard key={item.id} id={item.id} onClick={(id) => { handleOnClickTopic(id) }} name={item.name} selected={topicState.currentItem?.id === item.id} onEdit={(id) => { handleEditTopic(id) }} onDelete={(id) => handleDelTopic(id)}></CategoryCard>
                                            ))}
                                            <CategoryCard isAdd={true} onAdd={handleAddTopic}></CategoryCard>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-start whitespace-nowrap p-2">
                                        <div className="w-[50px] shrink-0">
                                            <h1 className="text-base font-normal">子主题:</h1>
                                        </div>
                                        <div className="flex flex-row gap-4 ml-4 overflow-x-auto">
                                            {subTopicState.list?.map((item) => (
                                                <CategoryCard key={item.id} id={item.id} onClick={(id) => { handleOnClickSubTopic(id) }} name={item.name} selected={subTopicState.currentItem?.id === item.id} onEdit={(id) => {
                                                    handleEditSubTopic(id)
                                                }} onDelete={(id) => handleDelSubTopic(id)}></CategoryCard>
                                            ))}
                                            <CategoryCard isAdd={true} onAdd={handleAddSubTopic}></CategoryCard>
                                        </div>
                                    </div>
                                </div>
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}
