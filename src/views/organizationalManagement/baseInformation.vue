<style scope lang="less">
@import "./baseInformation.less";
</style>

<template>
      <Tabs type="card">
          <!-- 基地信息 -->
        <TabPane label="基地信息">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
                <Row>
                    <Col span="6">
                        <FormItem label="机构标题" prop="org_name" inline>
                         
                            <Select v-model="formValidate.org_name" placeholder="请选择" style="width:150px">
                                <Option value="乐满地">乐满地</Option>
                                <Option value="黄山">黄山</Option>
                                <Option value="山东">山东</Option>
                            </Select>
                        
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="省份" prop="province_name">
                        
                            <Select v-model="formValidate.province_name" placeholder="请选择" style="width:150px">
                                <Option value="乐满地">乐满地</Option>
                                <Option value="黄山">黄山</Option>
                                <Option value="山东">山东</Option>
                            </Select>
                        
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="城市" prop="city_name">
                            <Select v-model="formValidate.city_name" placeholder="请选择" style="width:150px">
                                <Option value="乐满地">乐满地</Option>
                                <Option value="黄山">黄山</Option>
                                <Option value="山东">山东</Option>
                            </Select>
                        </FormItem>
                    </Col>  
                    <Col span="4">  
                        <FormItem label="标签" prop="adm_user_type">
                            <Input v-model="formValidate.adm_user_type" placeholder="" disabled style="width:150px"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12"> 
                        <FormItem label="机构地址" prop="org_addr">
                            <Input v-model="formValidate.org_addr" placeholder="请输入机构地址" style="width:240px"></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="手机号码" prop="adm_phonenum">
                            <Input v-model="formValidate.adm_phonenum" placeholder="" disabled style="width:150px"></Input>
                        </FormItem>
                    </Col>
                </Row>        
                        <FormItem label="机构介绍" prop="org_introduction">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>                
                        </FormItem>

                        <FormItem label="机构设施" prop="org_facilities">
                            <div class="institutionalFacilities">
                                <img src="" width="50" height="50">
                                <img src="" width="50" height="50">
                                <img src="" width="50" height="50">
                                <img src="" width="50" height="50">
                            </div>
                        </FormItem>

                        <FormItem label="其他设施" prop="org_other_facilities">
                            <Input v-model="formValidate.org_other_facilities" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入其他设施"></Input>
                        </FormItem>

                        <FormItem label="机构特色" prop="room_type_sort">
                            <Card shadow>
                                <textarea class='tinymce-textarea' id="tinymceEditer"></textarea>
                            </Card>
                            <Spin fix v-if="spinShow">
                                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                                <div>加载组件中...</div>
                            </Spin>                
                        </FormItem>
                        
                        <FormItem label="机构封面" prop="org_cover">
                            
                        </FormItem>

                        <FormItem label="机构图片" prop="org_pic_name">
                        
                        </FormItem>

                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                            <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                        </FormItem>
             </Form>
         
        </TabPane>
        <!-- 房间管理 -->
        <TabPane label="房间类型">
          <div class="formView">

           <Form ref="formInline" :model="formInline" inline>

            <FormItem>
                <Button type="primary" @click="addClick">新增</Button>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="delClick">删除</Button>
            </FormItem>

        </Form>

        <TableM :columns="columns" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>
     <!-- 房间管理新增提示框 -->
        <Modal v-model="addModal"
                title="添加房型"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            
                <FormItem label="房型分类" prop="reserve_destination">
                    <Select v-model="formValidate.reserve_destination" placeholder="请选择">
                        <Option value="标准间">标准间</Option>
                        <Option value="大庄房">大庄房</Option>
                    </Select>
                </FormItem>

                <FormItem label="房型名称" prop="room_name">
                    <Input v-model="formValidate.room_name" placeholder="请输入名称"></Input>
                </FormItem>

                <FormItem label="排序" prop="room_type_sort">
                    <Input v-model="formValidate.room_type_sort" placeholder="请输入排序"></Input>
                </FormItem>

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">保存</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

    <!--  房间管理编辑提示框 -->
        <Modal v-model="editModal"
                title="编辑房型"
                :mask-closable="false"
                @on-ok="ModalConfirm('formValidate')"
                @on-cancel="ModalCancel('formValidate')"
            >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            
                <FormItem label="房型分类" prop="reserve_destination">
                    <Select v-model="formValidate.reserve_destination" placeholder="请选择">
                        <Option value="标准间">标准间</Option>
                        <Option value="大庄房">大庄房</Option>
                    </Select>
                </FormItem>

                <FormItem label="房型名称" prop="room_name">
                    <Input v-model="formValidate.room_name" placeholder="请输入名称"></Input>
                </FormItem>

                <FormItem label="排序" prop="room_type_sort">
                    <Input v-model="formValidate.room_type_sort" placeholder="请输入排序"></Input>
                </FormItem>

                

            </Form>
                <div slot="footer" align="center">
                    <Button type="primary" @click="ModalConfirm('formValidate')" :loading="loading">保存</Button>
                    <Button @click="ModalCancel('formValidate')" style="margin-left: 8px">取消</Button>
                </div>
        </Modal>

    <!-- 删除提示框 -->
    <Modal v-model="delDilaog" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>提示</span>
        </p>
        <div style="text-align:center">
            <p>确定要删除吗？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="delLoading" @click="delConfrmClick">删除</Button>
        </div>
    </Modal>
    
    </div>
        </TabPane>
        <TabPane label="区域管理">标签三的内容</TabPane>
        <TabPane label="价格设置">标签二的内容</TabPane>
        <TabPane label="默认价格">
            <TableM :columns="columns1" :data="userData" :loading="loading" :current.async="currentPageIndex" :total="total" @pageChange="pageChange"></TableM>
        </TabPane>
      </Tabs>
 
  
</Row>
</template>
<script>
export default {};
</script>

<script>
export default {};
</script>

