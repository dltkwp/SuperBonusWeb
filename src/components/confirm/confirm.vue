<template>
  <div id="deleteConfirmMdoal" class="modal fade" aria-hidden="true" style="display: none;">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">温馨提示</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="alert alert-danger">确定要删除吗？</div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" v-bind:disabled="loading" v-bind:readonly="loading" @click="submit" class="btn btn-primary">确定</button>
            <button type="button" class="btn btn-white" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
     data() {
          return {
              loading: false,
              message : '',
          }
      },
      methods:{
        submit(){
            $('#divConfirmModal').moal(`hide`);
        }
      }
  }
</script>

<style>

</style>
