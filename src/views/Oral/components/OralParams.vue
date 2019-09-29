<template>
  <div>
    <el-form :model="formModel">
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="formModel.operList">
          <el-checkbox
            :value="'+'"
            label="加法"
            name="type"
          />
          <el-checkbox
            :value="'-'"
            label="减法"
            name="type"
          />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'OralParams',
  data() {
    return {
      formModel: {
        operList: [],
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
