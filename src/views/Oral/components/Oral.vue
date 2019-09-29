<template>
  <div class="oral">
    <div>
      <el-button @click="handleOralGenerator">
        生成
      </el-button>
      <el-button v-print="'#printContent'">
        打印
      </el-button>
      <el-button @click="handlePrint">
        打印2
      </el-button>
    </div>

    <!--startprint-->
    <div
      id="printContent"
      class="oral-content"
    >
      <template v-for="(item,index) in oralList">
        <div
          :key="index"
          class="oral-content-item"
        >
          {{ item.display }}
        </div>
      </template>
    </div>
    <!--endprint-->
  </div>
</template>

<script>
import { oralGeneratorBatch } from '../../../utils/OralUtil';

export default {
  name: 'Oral',
  data() {
    return {
      oralList: [],
    };
  },
  methods: {
    handleOralGenerator() {
      const oralList = oralGeneratorBatch();
      this.oralList = oralList.map(item => ({ display: `${item.equations.join(' ')} =` }));

      console.log(this.oralList);
    },
    handlePrint() {
      const newstr = document.getElementById('printContent').innerHTML;
      const oldstr = document.body.innerHTML;
      document.body.innerHTML = newstr;
      window.print();
      document.body.innerHTML = oldstr;
    },
  },
};
</script>

<style lang="scss" scoped>
  .oral {
    .oral-content {
      display: grid;
      grid-template-columns: 33.33% 33.33% 33.33%;
      grid-template-rows: 33.33% 33.33% 33.33%;
      .oral-content-item {
        font-size: 20px;
        padding: 10px 10px 50px 10px;
        text-align: left;
      }
    }
  }
</style>
