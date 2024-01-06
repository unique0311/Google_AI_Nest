<template>
  <div class="home">

    <b-container v-if="loading">
      <b-card>
        <b-skeleton animation="wave" width="85%"></b-skeleton>
        <b-skeleton animation="wave" width="55%"></b-skeleton>
        <b-skeleton animation="wave" width="70%"></b-skeleton>
      </b-card>
    </b-container>
    <b-container v-else>
      <b-button-group>
        <b-button @click="Next(-1)" v-if="this.meta && this.meta.currentPage !==1">Previous</b-button>
        {{ meta.currentPage }} / {{ meta.totalPages }} ( {{ meta.totalItems }})
        <b-button @click="Next(1)" v-if="this.meta && this.meta.totalPages !== this.meta.currentPage">Next</b-button>
      </b-button-group>
      <b-card v-for="item in items" :key="item.id" @click="View(item)">
        <b-card-img img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2" :src="item.imageData" ></b-card-img>
        <b-card-body>
          <b-card-text>
            {{ JSON.parse(item.jsonResult).text }}
          </b-card-text>
        </b-card-body>
      </b-card>

    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src


export interface IListMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

@Component({
  components: {
    HelloWorld
  }
})
export default class HomeView extends Vue {
  loading: boolean = false;
  error: boolean = false;
  userMessage: string = "";
  meta?: IListMeta;
  items: any[] = [];

  View(item: any) {
    this.$router.push(`/view/${item.id}`);
  }

  async Next(i: number) {

    if (this.meta && this.meta.currentPage + i >= 0 && this.meta.currentPage + i <= this.meta.totalPages)
      await this.ListWrapper(this.meta.currentPage + i);

  }

  async created() {

    await this.ListWrapper(1);

  }


  private async ListWrapper(i: number = 1) {
    this.loading = true;

    try {
      const result = await List(i, 25);
      this.meta = result.meta;
      this.items = result.items;

      console.log(result);
    } catch (e: any) {
      this.loading = false;
      this.userMessage = e.message;
    }
    this.loading = false;
  }
}

export async function List(page: number, limit: number) {
  const result = await (fetch("/api/upload/list", {
    method: "POST",
    body: JSON.stringify({
      limit: limit,
      page: page

    })
  }));
  if (result.ok)
    return await result.json();
}
</script>
