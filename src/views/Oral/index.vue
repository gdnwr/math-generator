<template>
  <div class="oral">
    <div class="print_hide">
      <OralParams ref="oralParams" />
      <el-button @click="handleOralGenerator">
        生成
      </el-button>
      <el-button @click="handlePrint">
        打印
      </el-button>
    </div>

    <template v-if="pageNum > 0">
      <div
        v-for="pageIndex in pageNum"
        :key="pageIndex"
        style="page-break-before: always"
      >
        <div class="page-title">
          口算题卡
        </div>
        <div class="page-subtitle">
          姓名:________&nbsp;&nbsp;&nbsp;&nbsp;日期:____年__月__日&nbsp;&nbsp;星期:____&nbsp;&nbsp;&nbsp;&nbsp;得分:________
        </div>
        <div class="page-content">
          <template v-for="(item,index) in oralList.slice(pageIndex * 30,(pageIndex + 1) * 30)">
            <div
              :key="index"
              class="page-content-item"
            >
              {{ item.display }}
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { oralGeneratorBatch } from '../../utils/OralUtil';
import OralParams from './components/OralParams';

export default {
  name: 'Oral',
  components: {
    OralParams,
  },
  data() {
    return {
      oralList: [],
    };
  },
  computed: {
    pageNum() {
      return Math.floor(this.oralList.length / 30) - 1;
    },
  },
  methods: {
    handleOralGenerator() {
      const params = this.$refs.oralParams.getParams();
      console.log('打印参数：', params);

      const oralList = oralGeneratorBatch({ batchNum: 3030 });
      this.oralList = oralList.map(item => ({ display: `${item.equations.join(' ')} =` }));

      console.log(this.oralList);
    },
    handlePrint() {
      window.print();
    },
  },
};
</script>

<style lang="scss" scoped>
  @media print {
    .print_hide {
      display: none;
    }
    header {
      display: block;
    }
    footer {
      display: block;
    }
  }

  .oral {
    .page-title {
      padding: 20px;
      font-size: 30px;
      grid-column-start: 1;
      grid-column-end: 4;
      page-break-before: always;
    }

    .page-subtitle {
      padding: 10px 50px 50px 10px;
      font-size: 16px;
      text-align: right;
      grid-column-start: 1;
      grid-column-end: 4;
    }

    .page-content {
      display: grid;
      grid-template-columns: 33.33% 33.33% 33.33%;
      grid-template-rows: 33.33% 33.33% 33.33%;

      .page-content-item {
        font-size: 20px;
        padding: 10px 10px 50px 10px;
        text-align: left;
      }
    }
  }
</style>
