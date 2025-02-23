<template>
  <div class="online-preview-box">
    <!-- 预览 -->
    <preview-image>
      <render-page></render-page>
    </preview-image>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { getOnlineResumeAsync } from '@/http/api/userResume';
  import PreviewImage from '@/views/LegoDesigner/render/PreviewImage/PreviewImage.vue';
  import RenderPage from '@/views/LegoDesigner/render/index.vue';

  const route = useRoute();
  const { setUuid } = appStore.useUuidStore;
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore); // store里的模板数据
  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);

  // 查询在线简历数据
  const getOnlineResume = async () => {
    if (!route.params.id) {
      return false;
    }
    const params = { id: route.params.id };
    const data = await getOnlineResumeAsync(params);
    if (data.status === 200) {
      HJSchemaJsonStore.value.componentsTree = data.data.lego_json.componentsTree;
      setUuid();
    } else {
      ElMessage.error(data.message);
    }
  };

  getOnlineResume();
</script>

<style lang="scss" scoped>
  .online-preview-box {
    padding: 30px 0;

    .design {
      background: white;
      width: 820px;
      min-height: 1160px;
      display: flex;
      position: relative;
      margin: 0 auto;
      border-radius: 5px;
      box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 10%);

      .design-content {
        font-family: v-bind(
          'resumeJsonNewStore.GLOBAL_STYLE.fontFamily ? resumeJsonNewStore.GLOBAL_STYLE.fontFamily : "微软雅黑"'
        );
      }

      .lines {
        z-index: 10;
        width: 880px;
        height: 24px;
        background: #f3f3f3;
        user-select: none;
        pointer-events: none;
        position: absolute;
        display: flex;
        align-items: center;
        left: -30px;

        .page {
          font-size: 9px;
          color: #999999;
        }

        .page {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
</style>
