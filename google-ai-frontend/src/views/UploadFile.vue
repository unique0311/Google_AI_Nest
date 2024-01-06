<template>
  <b-container>
    <user-messages :error="error" :user-message="userMessage" />
    <b-card v-if="loading">
      <b-skeleton animation="wave" width="85%"></b-skeleton>
      <b-skeleton animation="wave" width="55%"></b-skeleton>
      <b-skeleton animation="wave" width="70%"></b-skeleton>
    </b-card>
    <b-row v-else>
      <b-col cols="12">
        <b-form>
          <b-form-group label="Processor Id">
            <b-form-input v-model="pId"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Drag and drop or select a file. It will be auto processed. You must put in an Processor Id to enable this input.">
            <b-form-file placeholder="" drop-placeholder="Drag and drop a file" @input="FileSelected"
                         :disabled="hasId()" />
          </b-form-group>

        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Upload } from "@/views/upload.api";
import UserMessages from "@/views/UserMessages.vue";

@Component({
  components: { UserMessages }
})
export default class UploadFile extends Vue {
  created() {

  }

  pId: string = "4137328724cc9c6a";
  error: boolean = false;
  userMessage: string = "";
  loading:boolean=false;
  hasId(){
    return this.pId.trim().length ===0;
  }

  async FileSelected(file: any) {
    this.loading= true
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      let resp: any;
      try {

        resp = await Upload(reader.result as string, this.pId);
      } catch (e: any) {
        this.error = true;
        this.userMessage = e.message;
        this.loading= false;
        return;
      }
      if (resp && resp.id) {
        await this.$router.push(`/view/${resp.id}`);
        this.loading= false;
        return;
      }
      console.log("Could not read file");
      this.error = true;
      this.userMessage = "Server could not get file";
      this.loading= false;


    };


  }
}
</script>
