<template>
  <div class="oral">
    <div class="print_hide">
      <div class="params">
        <OralParams ref="oralParams" />
      </div>
      <div class="buttons">
        <el-button @click="handleOralGenerator">
          生成
        </el-button>
        <el-button @click="handlePrint">
          打印
        </el-button>
      </div>
    </div>
    <OralPreview ref="oralPreview" />
  </div>
</template>

<script>
import OralParams from './components/OralParams.vue';
import OralPreview from './components/OralPreview.vue';

export default {
  name: 'Oral',
  components: {
    OralParams,
    OralPreview,
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
      params.batchNum = parseInt(params.pageCount * params.pageSize, 10);
      console.log('题目参数：', params);
      this.$refs.oralPreview.oralGenerator(params);
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
  }

  .oral {
    .params {
      width: 1000px;
      margin-left: auto;
      margin-right: auto;
    }
    .buttons {
      display: flex;
      justify-content: center;
      margin: 10px;
    }
  }
</style>
