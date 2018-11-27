<template>
  <div>
      <!-- table -->
      <Table
          :columns="columns"
          :data="data"
          :height="height"
          :loading="loading"
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
  props: ['columns', 'data', 'height', 'loading'],
  computed: {
  },
  methods: {
  },
  mounted () {
  }
};
</script>
