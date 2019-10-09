<template>
  <div>
    <div class="oral-preview">
      <template v-if="oralPageList && oralPageList.length > 0">
        <div
          v-for="(oralPageDatas,pageIndex) in oralPageList"
          :key="pageIndex"
          class="sheet-page"
          style="page-break-before: always"
        >
          <div class="page-title">
            口算题卡（{{ num2hanzi(pageIndex + 1) }}）
          </div>
          <div class="page-subtitle">
            姓名:________________&nbsp;&nbsp;&nbsp;&nbsp;
            日期:________年____月____日&nbsp;&nbsp;星期:____&nbsp;&nbsp;&nbsp;&nbsp;
            得分:________
          </div>
          <div class="page-content">
            <template v-for="(item,index) in oralPageDatas">
              <div
                :key="index"
                class="page-content-item"
              >
                <span class="item-cell">
                  <!-- <span class="item-index">{{ circleNumber(index + 1) }}</span> -->
                  <CircleNumber
                    class="item-index"
                    :num="index + 1"
                  />
                  <span>{{ item.display }}</span>
                </span>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <PreviewAnswer :oral-page-list="oralPageList" />
  </div>
</template>

<script>
import { oralGeneratorBatch } from '../../../../utils/OralUtil';
import { num2hanzi } from '../../../../utils/NumberUtil';
import CircleNumber from '../../../../components/CircleNumber.vue';
import PreviewAnswer from './components/PreviewAnswer.vue';

export default {
  name: 'OralPreview',
  components: {
    CircleNumber,
    PreviewAnswer,
  },
  data() {
    return {
      // 生成的口算题列表
      oralList: [],
      pageSize: 30, // 每页题目数量
    };
  },
  computed: {
    // 页数
    pageNum() {
      return Math.ceil(this.oralList.length / this.pageSize);
    },
    // 分页后的数据
    oralPageList() {
      if (this.pageNum > 0) {
        return [...(new Array(this.pageNum)).keys()].map((pageIndex) => {
          const startIdx = pageIndex * this.pageSize;
          const endIdx = (pageIndex + 1) * this.pageSize;
          return this.oralList.slice(startIdx, endIdx);
        });
      }
      return [];
    },
  },
  methods: {
    // 生成题目
    oralGenerator(params) {
      this.pageSize = params.pageSize;
      const oralList = oralGeneratorBatch(params);
      this.oralList = oralList.map(item => ({
        display: item.display.replace('_', '____'),
        answer: item.answer,
      }));
    },
    // 打印
    handlePrint() {
      window.print();
    },
    num2hanzi(num) {
      return num2hanzi(num);
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
      height: calc(100% - 160px);
      display: grid;
      grid-template-columns: 33.33% 33.33% 33.33%;
      // grid-gap: 50px;

      .page-content-item {
        font-size: 20px;
        white-space: pre-wrap;
        margin-right: 50px;

        .item-cell {
          display: flex;
          align-items: center;
        }

        .item-index {
          margin-right: 10px;
        }
      }
    }
  }
</style>
