<template>
  <div class="my-create-info-box">
    <div v-if="!isShowSkeleton">
      <div v-if="legoCreateList.length" class="create-list-box">
        <template v-for="(item, index) in legoCreateList" :key="index">
          <create-card :card-data="item" @delete="deleteUserCreate"> </create-card>
        </template>
      </div>

      <!-- 无数据页 -->
      <template v-else>
        <div class="audit-no-data-box">
          <no-data-vue width="200px" height="200px"></no-data-vue>
        </div>
      </template>
    </div>
    <el-skeleton v-else :rows="5" animated />

    <!-- 分页组件 -->
    <Pagination
      v-if="total > limit"
      :limit="limit"
      :total="total"
      :current-page="currentPage"
      @handle-current-change="handleCurrentChange"
    ></Pagination>
  </div>
</template>
<script lang="ts" setup>
  import { deleteLegoUserTemplateAsync, legoUserTemplateListAsync } from '@/http/api/lego';

  import CreateCard from './CreateCard.vue';
  import NoDataVue from '@/components/NoData/NoData.vue';
  import appStore from '@/store';

  // 查询积木创作列表
  const legoCreateList = ref<Array<any>>([]);
  const page = ref<number>(1);
  const limit = ref<number>(6);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const isShowSkeleton = ref<boolean>(true);
  const getLegoUserTemplateList = async () => {
    let params = {
      currentPage: page.value,
      pageSize: limit.value,
      uid: appStore.useUserInfoStore.userInfo.id,
      states: [0, 1]
    };
    const data = await legoUserTemplateListAsync(params);
    if (data.status === 200) {
      legoCreateList.value = data.data.records;
      total.value = data.data.total;
      currentPage.value = data.data.currentPage;
      isShowSkeleton.value = false;
    } else {
      isShowSkeleton.value = false;
      ElMessage.error(data.data.message);
    }
  };
  getLegoUserTemplateList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getLegoUserTemplateList();
  };

  // 点击删除创作
  const deleteUserCreate = async (id: string) => {
    let params = {
      id: id
    };
    const data = await deleteLegoUserTemplateAsync(params);
    if (data.data.status === 200) {
      ElMessage.success('删除成功');
      getLegoUserTemplateList();
    } else {
      ElMessage.error(data.data.message);
    }
  };
</script>
<style lang="scss" scoped>
  .my-create-info-box {
    .create-list-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      & :last-child:nth-child(3n - 1) {
        margin-right: calc(260px + 15px);
      }
    }
  }
</style>
