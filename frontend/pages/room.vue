<template>
  <div>
    <v-app>
      <v-app-bar app>
      </v-app-bar>
      <v-main>

        <div id="main-page">
          <div id="navigation-view">
            <v-card
                class="mx-auto">
              <v-navigation-drawer
                  permanent
                  expand-on-hover
              >
                <v-list
                  dense
                  nav>
                      <v-list-item class="px-2" style="margin: 5px; ">
                        <v-list-item-avatar>
                          <v-img :src="getUserInfo.userProfile"></v-img>
                        </v-list-item-avatar>
                      </v-list-item>

                      <v-list-item link>
                        <v-list-item-content>
                          <v-list-item-title style="padding: 5px" class="text-h6">
                            {{ getUserInfo.userName }}
                          </v-list-item-title>
                          <v-list-item-subtitle>{{ getUserInfo.userEmail }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list
                    dense
                    nav
                >
                  <v-list-item
                      v-for="item in items"
                      :key="item.title"
                      link
                  >
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </div>
          <div id="room-list-view" style="width: 100%;">
            룸리스트
            <RoomContainer/>
            <RoomContainer/>
            <RoomContainer/>
            <RoomContainer/>
          </div>

        </div>
      </v-main>
      <v-footer app>
        <!-- -->
      </v-footer>
    </v-app>
  </div>

</template>

<script>
import RoomContainer from "~/components/RoomContainer";

export default {
  data() {
    return {
      items: [{title: "홈화면", icon: "mdi-home"},
              {title: "방목록",icon:"mdi-account-multiple"},
              {title: "찾기",icon:"mdi-magnify"},
              {title: "설정",icon: "mdi-wrench"}]

    }
  },
  components: {
    RoomContainer

  },
  computed: {
    getRooms() {
      return this.$store.state.room.roomList;
    },
    getUserInfo() {
      return this.$store.state.user.myInfo;
    }


  }
}
</script>

<style scoped>
#main-page {
  display: flex;
}

#navigation-view {
}

#room-list-view {
}
</style>