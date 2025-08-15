import { useEffect, useState } from "react";
import LableButtonGroup, { getGroupLableButtonOptions, type LableButtonOption } from "../../../components/labelButtonGroup";
import { curriculumAPI, type Topic } from "../../../services/curriculum";
import { message } from "antd";
import TopicPermissionTabs from "./topicPermissionTabs";

export default function PermissionPage() {
  const [examSeries, setExamSeries] = useState<{
    list?: LableButtonOption[];
    currentItem?: LableButtonOption;
  }>({
    list: [],
    currentItem: {} as LableButtonOption,
  });
  const [examCategory, setExamCategory] = useState<{
    list?: LableButtonOption[];
    currentItem?: LableButtonOption;
  }>({
    list: [],
    currentItem: {} as LableButtonOption,
  });
  const [subject, setSubject] = useState<{
    list?: LableButtonOption[];
    currentItem?: LableButtonOption;
  }>({
    list: [],
    currentItem: {} as LableButtonOption,
  });


  useEffect(() => {
    console.log('组件已挂载');
    reload();
    return () => {
      console.log('组件将卸载');
    };
  }, []);

  const reload = () => {
    curriculumAPI.GetCurriculum().then((response) => {
      const seriesList: LableButtonOption[] = response.series.map((series) => ({
        id: series.id,
        name: series.name,
        order: series.order,
      }));
      const currentSeriesItem = examSeries?.list?.find((s) => s.id === examSeries.currentItem?.id);
      setExamSeries({
        list: seriesList,
        currentItem: currentSeriesItem
      });

      // ------------------ExamCategory
      const categoryList: LableButtonOption[] = response.series.flatMap((series) =>
        (series.categories ?? []).map((category) => ({
          id: category.id,
          name: category.name,
          groupID: series.id,
          order: category.order,
        }))
      );
      const currentCategoryItem = examCategory?.list?.find((s) => s.id === examCategory.currentItem?.id);
      setExamCategory({
        list: categoryList,
        currentItem: currentCategoryItem
      });

      // ------------------Subject
      const subjectList: LableButtonOption[] = response.series.flatMap((series) =>
        (series.categories ?? []).flatMap((category) => (category.subjects ?? []).map((subjects) => ({
          id: subjects.id,
          name: subjects.name,
          groupID: category.id,
          order: subjects.order,
        })))
      );
      const currentSubjectItem = subject?.list?.find((s) => s.id === subject.currentItem?.id);
      setSubject({
        list: subjectList,
        currentItem: currentSubjectItem
      });
    }).catch((e) => {
      message.error(`加载数据失败：${e}`);
    });
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row items-start whitespace-nowrap p-2 min-h-[50px]">
        <div className="w-[50px] shrink-0">
          <h1 className="text-base font-normal">系列:</h1>
        </div>
        <div className="flex flex-row gap-4 ml-4 overflow-x-auto">
          <LableButtonGroup options={examSeries.list ?? []} onClick={(item) => { setExamSeries(s => ({ ...s, currentItem: item })) }}></LableButtonGroup>
        </div>
      </div>
      <div className="flex flex-row items-start whitespace-nowrap p-2 min-h-[50px]">
        <div className="w-[50px] shrink-0">
          <h1 className="text-base font-normal">类别:</h1>
        </div>
        <div className="flex flex-row gap-4 ml-4 overflow-x-auto">
          <LableButtonGroup onClick={(item) => { setExamCategory(s => ({ ...s, currentItem: item })) }} options={getGroupLableButtonOptions(examCategory.list ?? [], examSeries.currentItem?.id ?? "")}></LableButtonGroup>
        </div>
      </div>
      <div className="flex flex-row items-start whitespace-nowrap p-2 min-h-[50px]">
        <div className="w-[50px] shrink-0">
          <h1 className="text-base font-normal">科目:</h1>
        </div>
        <div className="flex flex-row gap-4 ml-4 overflow-x-auto">
          <LableButtonGroup onClick={(item) => { setSubject(s => ({ ...s, currentItem: item })) }} options={getGroupLableButtonOptions(subject.list ?? [], examCategory.currentItem?.id ?? "")}></LableButtonGroup>
        </div>
      </div>

      {subject.currentItem?.id && <div className="flex flex-row items-start whitespace-nowrap p-2 min-h-[50px]">
        <TopicPermissionTabs subjectID={subject.currentItem?.id ?? ""}></TopicPermissionTabs>
      </div>}

    </div>
  )
}
