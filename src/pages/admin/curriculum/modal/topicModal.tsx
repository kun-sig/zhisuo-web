import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { curriculumAPI, type Topic } from '../../../../services/curriculum';

type TopicModalProps = {
  subjectID?: string
  props?: Topic
  isAdd?: boolean
}

export default function TopicModal({isAdd, subjectID, props }: TopicModalProps) {
  const onFinish: FormProps<Topic>['onFinish'] = (values) => {
    if (props != undefined && props?.id!.length > 0 && !isAdd) {
      curriculumAPI.UpdateTopic(props?.id, values.name!, Number(values.order), values.description ?? "").then(() => {
        message.success("更新成功")
      }).catch((e) => {
        message.error(`更新失败：${e}`)
      })
    } else {
      if (subjectID === undefined || subjectID === "") {
        message.error(`subjectID === undefined || subjectID === ""`)
        return
      }
      curriculumAPI.CreateTopic(subjectID, values.name!, Number(values.order), values.description ?? "").then(() => {
        message.success("添加成功")
      }).catch((e) => {
        message.error(`添加失败：${e}`)
      })
    }
  };

  const onFinishFailed: FormProps<Topic>['onFinishFailed'] = (errorInfo) => {
    message.warning("请要求填写信息!")

  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-auto my-10 transition-all duration-300">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">主题</h2>

      <Form
        name="basic"
        layout="vertical"
        initialValues={props}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="space-y-5"
      >
        <Form.Item<Topic>
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input placeholder="例如： 章节练习，知识点，历年真题" size="large" />
        </Form.Item>

        <Form.Item<Topic>
          label="序号"
          name="order"
          rules={[{ required: true, message: '请输入序号' }]}
        >
          <Input type="number" placeholder="例如：1" size="large" />
        </Form.Item>

        <Form.Item<Topic>
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