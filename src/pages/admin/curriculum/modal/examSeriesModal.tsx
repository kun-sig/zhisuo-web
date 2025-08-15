import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { curriculumAPI, type ExamSeries } from '../../../../services/curriculum';


type ExamSeriesProps = {
  props?: ExamSeries
  isAdd?: boolean
}

export default function ExamSeriesModal({ isAdd, props }: ExamSeriesProps) {
  const onFinish: FormProps<ExamSeries>['onFinish'] = (values) => {
    if (!isAdd) {
      curriculumAPI.UpdateExamSeries(props?.id!, values.name!, Number(values.order), values.description ?? "")
        .then(() => {
          message.success("更新成功")
        }).catch((e) => {
          message.error(`更新失败：${e}`)
        })
    } else {
      props = {} as ExamSeries
      curriculumAPI.CreateExamSeries(values.name!, Number(values.order), values.description ?? "").then(() => {
        message.success("添加成功")
      }).catch((e) => {
        message.error(`添加失败：${e}`)
      })
    }
  };

  const onFinishFailed: FormProps<ExamSeries>['onFinishFailed'] = (errorInfo) => {
    message.warning("请要求填写信息!")

  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-auto my-10 transition-all duration-300">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">考试系列</h2>
      <Form
        name="basic"
        layout="vertical"
        initialValues={!isAdd ? props : props = {} as ExamSeries}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="space-y-5"
      >
        <Form.Item<ExamSeries>
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input placeholder="例如：软考，建造师，金融学" size="large" />
        </Form.Item>

        <Form.Item<ExamSeries>
          label="序号"
          name="order"
          rules={[{ required: true, message: '请输入序号' }]}
        >
          <Input type="number" placeholder="例如：1" size="large" />
        </Form.Item>

        <Form.Item<ExamSeries>
          label="描述"
          name="description"
          rules={[{ required: false }]}
        >
          <Input.TextArea placeholder="简要描述该系列" rows={3} size="large" />
        </Form.Item>

        <Form.Item className="mt-4">
          <Button type="primary" htmlType="submit" block size="large" className="hover:bg-blue-600 transition">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}