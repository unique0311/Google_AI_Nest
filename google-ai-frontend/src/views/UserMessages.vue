<template>

  <b-row v-if="message.length >0">
    <b-col cols="4" offset="4">
      <b-alert show variant="danger" v-if="error" fade>{{ message }}</b-alert>
      <b-alert show variant="success" v-else fade>{{ message }}</b-alert>
    </b-col>
  </b-row>

</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class UserMessages extends Vue {
  @Prop() error?: boolean;
  @Prop() message?: string;

  created() {

  }

}
</script>
