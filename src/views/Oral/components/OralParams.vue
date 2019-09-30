<template>
  <div class="oral-param">
    <div class="param-form">
      <el-form :model="formModel">
        <el-form-item label="题型选择:">
          <el-checkbox-group v-model="formModel.operList">
            <el-checkbox
              label="+"
              name="type"
            >
              加法
            </el-checkbox>
            <el-checkbox
              label="-"
              name="type"
            >
              减法
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="算数范围:">
          <el-input-number
            v-model="formModel.paramMin"
            size="mini"
            label="最小值"
          />
          &nbsp;-&nbsp;
          <el-input-number
            v-model="formModel.paramMax"
            size="mini"
            label="最大值"
          />
        </el-form-item>
        <el-form-item label="结果范围:">
          <el-input-number
            v-model="formModel.resultMin"
            size="mini"
            label="最小值"
          />
          &nbsp;-&nbsp;
          <el-input-number
            v-model="formModel.resultMax"
            size="mini"
            label="最大值"
          />
        </el-form-item>
        <el-form-item label="运算位数:">
          <el-input-number
            v-model="formModel.operNum"
            :min="2"
            :max="10"
            size="mini"
            label="运算位数"
          />
        </el-form-item>
        <el-form-item label="题目数量:">
          <el-input-number
            v-model="formModel.batchNum"
            :min="1"
            size="mini"
            label="题目数量"
          />
          <span class="param-remark">注：每页30道题</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="param-declare" />
  </div>
</template>

<script>
export default {
  name: 'OralParams',
  data() {
    return {
      formModel: {
        operList: ['+', '-'], // 可先运算符
        paramMin: 1, // 参与运算的数的最小值
        paramMax: 99, // 参与运算的数的最大值
        resultMin: 0, // 计算结果的最小值
        resultMax: 100, // 计算结果的最大值
        operNum: 3, // 运算位数
        batchNum: 300, // 生成题目数量
      },
    };
  },
  methods: {
    getParams() {
      return this.formModel;
    },
  },
};
</script>

<style lang="scss" scoped>
  .oral-param {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #f9f9f9;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;

    .param-form {
      width: 100%;
      margin-left: 20px;

      .param-remark {
        margin-left: 50px;
        font-size: 12px;
        color: #7f8c8d;
      }
    }
    .param-declare {
      width: 100%;
    }
  }

  /deep/ .el-form-item {
    margin-bottom: 0;
  }
</style>
