<template>
  <div class="version-uploader-container">

    <a-form :model="uploadModel" ref="uploadForm" class="version-form">
      <a-row>
        <a-col span="4">
          <a-form-item label="版本号" name="conf_ver" :rules="[{ required: true, message: '请输入版本号' }]">
            <a-input class="version-input" placeholder="请输入" v-model:value="uploadModel.conf_ver"/>
          </a-form-item>
        </a-col>
        <a-col span="16" offset="1">

          <a-form-item name="conf_url" label="安装包" :rules="[{ required: true, message: '请上传安装包' }]">
            <a-upload
                :showUploadList="false"
                :max-count="1"
                class="version-upload"
                v-model:fileList="uploadModel.conf_url"
                list-type="text"
                :customRequest="customRequest" @change="handleChange">
              <a-button :loading="uploadStatus == 'uploading'" :danger="uploadStatus == 'error'">
                {{ fileUrl.length == 0 ? '点击上传' : fileUrl }}
              </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col span="2" offset="1">
          <a-button html-type="submit" type="primary" @click="handleSubmit">
            下发
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>


<script setup lang="ts">

interface FormState {
  conf_ver: string;
  id: string;
  conf_name: string;
  conf_url: Array<string>;
  conf_md5: string | null | undefined;
}

const props = defineProps<{
  otaData: FormState
}>()
const emit = defineEmits(['submit'])
import {ref, reactive, watch} from 'vue'
import {message} from 'ant-design-vue'
import {uploadFile, fetchFileUrl} from '@/api/upload'

const uploadForm = ref()
const uploadStatus = ref('')
const fileUrl = ref('')

const uploadModel = reactive<FormState>({
  conf_ver: '',
  conf_url: [],
  id: '',
  conf_name: '',
  conf_md5: '',
})
const handleSubmit = () => {
  uploadForm.value.validate().then((valid) => {
    console.log('表单数据:', valid)

    if (props.otaData.conf_ver === valid.conf_ver) {
      message.error('版本已存在，请勿重复创建')
    } else {
      console.log('表单校验成功:', valid)
      valid.conf_url = valid.conf_url[0].name
      valid.id = uploadModel.id
      valid.conf_name = uploadModel.conf_name
      if(uploadModel.conf_md5) {
        valid.conf_md5 = uploadModel.conf_md5
      }
      emit('submit', valid)
    }
  }).catch((error) => {
    console.log('表单校验出错:', error)
  })
}

const handleChange = ({file}) => {
  console.log('file change file:', file)
  if (file.status == 'removed') {
    uploadModel['conf_url'] = null
    fileUrl.value = ''
  } else if (file.status == 'done') {
    uploadModel['conf_url'] = [{
      url: file.response.data.file_url,
      name: file.response.data.saved_filename,
      status: 'done',
    }]
  }

}
const customRequest = (options) => {
  uploadStatus.value = 'uploading'
  const {file, onSuccess, onError} = options
  fileUrl.value = file.name
  console.log('customRequest', options)
  uploadFile({file}).then((res) => {
    console.log('upload response:', res)
    uploadStatus.value = 'done'
    message.success('上传成功')
    onSuccess(res)
  }).catch((error) => {
    console.log('upload error:', error)
    uploadModel['conf_url'] = null
    uploadStatus.value = 'error'
    onError(error)
  })
}
watch(() => props.otaData, (data) => {
  console.log('data change:', data)
  if (data) {
    uploadModel['conf_ver'] = data.conf_ver
    uploadModel['id'] = data.id
    uploadModel['conf_name'] = data.conf_name
    uploadModel['conf_url'] = [{
      url: data.conf_url,
      name: data.conf_url,
      status: 'done',
    }]
    uploadStatus.value = 'done'
    uploadModel['conf_md5'] = data.conf_md5
    fileUrl.value = data.conf_url || ''
  }
}, {
  deep: true,
  immediate: true
})
</script>
<style scoped>
.version-uploader-container {
  display: flex;
}

.search-input {
  width: 300px;
}

.version-uploader-container .version-form {
  box-shadow: none;
  width: 100%;
}

:deep(.version-upload .ant-upload) {
  display: inline-block;
  width: 100%;
}

:deep(.version-upload .ant-upload .ant-btn) {
  display: inline-block;
  width: 100%;
  text-align: left;
}


:deep(.ant-upload-wrapper .ant-upload-list .ant-upload-list-item) {
  margin-top: 0px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: var(--borderColor);
  border-style: solid;
  border-radius: 6px;
  padding: 0px 11px;
}

.ant-upload-list-item-container,
.version-upload,
:deep(.ant-upload-list),
:deep(.ant-upload-list-item),
:deep(.ant-upload-list-item-container),
:deep(.ant-upload-list-item-container .ant-motion-collapse),
:deep(.ant-form-item-control-input-content) {
  display: inline-block;
  height: 32px !important;
  width: 100%;
}
</style>
