<template lang="html">
  <div id="example">
    <zk-table
      ref="table"
      sum-text="sum"
      index-text="#"
      :data="data"
      :columns="columns"
      :stripe="props.stripe"
      :border="props.border"
      :show-header="props.showHeader"
      :show-summary="props.showSummary"
      :show-row-hover="props.showRowHover"
      :show-index="props.showIndex"
      :tree-type="props.treeType"
      :is-fold="props.isFold"
      :expand-type="props.expandType"
      empty-text="暂无"
      :selection-type="props.selectionType">
      <template slot="likes" scope="scope">
          阿三打双打
        {{ scope.row.likes.join(',') }}
      </template>
    </zk-table>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data() {
      return {
        props: {
          stripe: false,
          border: false,
          showHeader: true,
          showSummary: false,
          showRowHover: true,
          showIndex: false,
          treeType: true,
          isFold: true,
          expandType: false,
          selectionType: true,
        },
        data: [
          {
            name: 'Jack',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 10,
            children: [
              {
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
                children: [
                  {
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                    children: [
                      {
                        name: 'Ashley',
                        sex: 'female',
                        likes: ['football', 'basketball'],
                        score: 20,
                      },
                      {
                        name: 'Taki',
                        sex: 'male',
                        likes: ['football', 'basketball'],
                        score: 10,
                        children: [
                          {
                            name: 'Ashley',
                            sex: 'female',
                            likes: ['football', 'basketball'],
                            score: 20,
                          },
                          {
                            name: 'Taki',
                            sex: 'male',
                            likes: ['football', 'basketball'],
                            score: 10,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
              },
            ],
          },
          {
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
            children: [
              {
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
                children: [
                  {
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                  },
                ],
              },
              {
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
                children: [
                  {
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                  },
                ],
              },
            ],
          },
          {
            name: 'Tom',
            sex: 'male',
            likes: '<div>撒嗒</div>',
            score: 20,
          },
          {
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
            children: [
              {
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
              },
              {
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
              },
            ],
          },
        ],
        columns: [
          {
            label: 'likes',
            prop: 'likes',
            type: 'template',
            template: `<div>我打打</div>`
          },

          {
            label: 'name',
            prop: 'name',
            width: '400px',
          },

          {
            label: 'sex',
            prop: 'sex',
            minWidth: '50px',
          },

          {
            label: 'score',
            prop: 'score',
          },

          {
            label: '撒打算打算',
            prop: 'score',
            type: 'template',
            template: ['撒大大'],
          }
        ],
      };
    },
    computed: {
      propList() {
        return Object.keys(this.props).map(item => ({
          name: item,
        }));
      },
    },
    methods: {

    },
  };
</script>

<style scoped lang="less">
  * {
    margin: 0;
    padding: 0;
  }

  .switch-list {
    margin: 20px 0;
    list-style: none;
    overflow: hidden;
  }

  .switch-item {
    margin: 20px;
    float: left;
  }
</style>
