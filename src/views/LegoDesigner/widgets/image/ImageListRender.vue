<template>
  <div class="image-list-box">
    <template v-if="!widgetData?.dataSource.imgUrl">
      <!-- 上传控件 -->
      <div class="upload-widget">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :http-request="uploadHandle"
        >
          <img
            v-if="widgetData?.dataSource.imgUrl"
            :src="widgetData?.dataSource.imgUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
    </template>
    <template v-else>
      <img
        ref="imageRef"
        class="img-box"
        :src="getImgListStyleImageFile(widgetData?.dataSource.imgUrl)"
        alt="图片"
      />
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { IWidget } from '@/views/LegoDesigner/types';
  import { getImgListStyleImageFile } from './imageList';
  import { UploadProps } from 'element-plus';
  import { useGetWidgetItemById } from '../../hooks/useSelectWidgetItem';
  import { uploadFile, getFileUrl } from '@/http/api/oss';

  interface IAvatar {
    widgetData: IWidget | null; // 模块数据
  }
  const props = withDefaults(defineProps<IAvatar>(), {
    widgetData: null
  });

  // widgetItem
  const { widgetItem } = useGetWidgetItemById(props.widgetData?.id as string);

  // 文件上传成功
  const imageRef = ref<any>(null);

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 5) {
      ElMessage.error('图片不能大于5M');
      return false;
    }
    return true;
  };

  const uploadHandle = async (options: any) => {
    const objKey = await uploadFile('resume/img', options.file);
    widgetItem.dataSource.imgUrl = await getFileUrl(objKey);
  };
</script>
<style lang="scss" scoped>
  .image-list-box {
    width: v-bind('props.widgetData?.css.width + "px"');
    height: v-bind('props.widgetData?.css.height + "px"');
    border-style: v-bind('props.widgetData?.css.borderStyle');
    border-width: v-bind('props.widgetData?.css.borderWidth + "px"');
    padding: v-bind('props.widgetData?.css.padding.top  + "px"')
      v-bind('props.widgetData?.css.padding.right + "px"')
      v-bind('props.widgetData?.css.padding.bottom + "px"')
      v-bind('props.widgetData?.css.padding.left + "px"');
    border-color: v-bind('props.widgetData?.css.borderColor');
    border-radius: v-bind('props.widgetData?.css.borderRadius + "px"');
    background: v-bind('props.widgetData?.css.backgroundColor');
    .upload-widget {
      :deep(.avatar-uploader) {
        .el-upload {
          border: 1px dashed var(--el-border-color);
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);
          width: v-bind('props.widgetData?.css.width + "px"');
          height: v-bind('props.widgetData?.css.height + "px"');
        }

        .el-upload:hover {
          border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
          font-size: 48px;
          color: #8c939d;
          width: v-bind('props.widgetData?.css.width + "px"');
          height: v-bind('props.widgetData?.css.height + "px"');
          text-align: center;
        }
      }
    }
    .img-box {
      width: 100%;
      height: 100%;
    }
  }
</style>
