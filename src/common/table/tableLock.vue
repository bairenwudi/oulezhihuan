<template>
  <div>
    <!-- table -->
    <Table
        :columns="columns"
        :data="data"
        :height="height"
        :loading="listLoading"
    ></Table>
  </div>
</template>

<script>
export default {
  name: 'tableLock',
  data() {
    return {
        sels: [],   //列表选中列
    }
  },
  props: ['data', 'columns', 'checkbox', 'listLoading', 'height'],
  computed: {
  },
  methods: {
      selsChange () {
        console.log('selsChange');
      }
  },
  mounted () {
  }
};
</script>