<template>
  <div class="oral-answer">
    <template v-if="oralPageList && oralPageList.length > 0">
      <div
        v-for="(oralPageDatas,pageIndex) in oralPageList"
        :key="pageIndex"
        class="sheet-page"
      >
        <div class="page-title">
          口算答案（{{ num2hanzi(pageIndex + 1) }}）
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
                <span>{{ item.answer }}</span>
              </span>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import CircleNumber from '../../../../../components/CircleNumber.vue';
import { num2hanzi } from '../../../../../utils/NumberUtil';

export default {
  name: 'PreviewAnswer',
  components: {
    CircleNumber,
  },
  props: {
    oralPageList: {
      type: Array,
      default: null,
    },
  },
  methods: {
    num2hanzi(num) {
      return num2hanzi(num);
    },
  },
};
</script>

<style lang="scss" scoped>

  .oral-answer {
    .sheet-page {
      width: 210mm;
      // height: 297mm;
      // margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
      // box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .page-title {
      padding: 20px;
      font-size: 30px;
      text-align: center;
      // page-break-before: always;
    }

    .page-subtitle {
      padding: 10px 50px 50px 10px;
      font-size: 16px;
      text-align: right;
    }

    .page-content {
      height: calc(100% - 160px);
      display: grid;
      grid-template-columns: repeat(10, 10%);
      // grid-template-rows: repeat(auto-fill, 50px);
      // grid-gap: 50px;

      .page-content-item {
        font-size: 20px;
        white-space: pre-wrap;
        margin-bottom: 20px;

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
