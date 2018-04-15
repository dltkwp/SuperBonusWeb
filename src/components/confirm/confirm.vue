<template>
   <div id="divConfirmModal" class="modal fade" aria-hidden="true" style="display: none;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title">确认?</h4>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <form role="form">
                  <div class="form-group">
                      {{message}}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button v-bind:disabled="loading" v-bind:readonly="loading" @click="submit()" type="button" class="btn btn-primary">保存</button>
            <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
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
