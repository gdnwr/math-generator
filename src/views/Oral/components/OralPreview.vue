<template>
  <div class="oral-preview">
    <template v-if="pageNum > 0">
      <div
        v-for="pageIndex in pageNum"
        :key="pageIndex"
        class="sheet-page"
        style="page-break-before: always"
      >
        <div class="page-title">
          口算题卡
        </div>
        <div class="page-subtitle">
          姓名:________&nbsp;&nbsp;&nbsp;&nbsp;
          日期:____年__月__日&nbsp;&nbsp;星期:____&nbsp;&nbsp;&nbsp;&nbsp;
          得分:________
        </div>
        <div class="page-content">
          <template v-for="(item,index) in oralList.slice((pageIndex - 1) * 30,pageIndex * 30)">
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
import { oralGeneratorBatch } from '../../../utils/OralUtil';

export default {
  name: 'OralPreview',
  props: {
    // 生成口算是的参数
    pageSize: {
      type: Number,
      default: 30,
    },
  },
  data() {
    return {
      // 生成的口算题列表
      oralList: [],
    };
  },
  computed: {
    pageNum() {
      return Math.ceil(this.oralList.length / this.pageSize);
    },
  },
  methods: {
    oralGenerator(params) {
      const oralList = oralGeneratorBatch(params);
      this.oralList = oralList.map(item => ({ display: `${item.equations.join(' ')} =` }));
    },
    handlePrint() {
      window.print();
    },
  },
};
</script>

<style lang="scss" scoped>

  @media print {
    .sheet-page {
      width: 210mm;
      height: 297mm;
      box-shadow: none;
    }
  }

  .oral-preview {
    .sheet-page {
      width: 210mm;
      height: 297mm;
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
      // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .page-title {
      padding: 20px;
      font-size: 30px;
      text-align: center;
      page-break-before: always;
    }

    .page-subtitle {
      padding: 10px 50px 50px 10px;
      font-size: 16px;
      text-align: right;
    }

    .page-content {
      display: grid;
      grid-template-columns: 33.33% 33.33% 33.33%;

      .page-content-item {
        font-size: 20px;
        padding: 10px 10px 50px 10px;
        text-align: left;
      }
    }
  }
</style>
