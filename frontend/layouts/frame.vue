<template>

  <div>
    <div v-if="getUserInfo">
      <v-app>
        <v-app-bar app>
        </v-app-bar>
        <v-main>

          <div id="main-page" style="height: 100%">
            <div id="navigation-view">
              <v-card
                  class="mx-auto"
                  style="display: flex"
                  >
                <v-navigation-drawer
                    permanent
                    expand-on-hover>
                  <v-list
                      dense
                      nav>
                    <v-list-item  class="px-2" style="margin: 5px; "
                                 v-on:click="onClickMenuItem('프로필')">
                      <v-list-item-avatar>
                        <v-img :src="getUserInfo.profileURL"></v-img>
                      </v-list-item-avatar>
                    </v-list-item>

                    <v-list-item link>
                      <v-list-item-content>
                        <v-list-item-title style="padding: 5px" class="text-h6">
                          {{ getUserInfo.nickname }}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{ getUserInfo.email }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <v-divider></v-divider>

                  <v-list
                      dense
                      nav
                      height="1000">
                    <v-list-item
                        v-on:click="onClickMenuItem(item.title)"
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
                <nuxt style="width: 100%"/>
              </v-card>
            </div>
          </div>
        </v-main>
        <v-footer app>
          <!-- -->
        </v-footer>
      </v-app>
    </div>
    <div v-else>
      <h1>로그인을 먼저 해주세요</h1>
      <nuxt-link to="/login">로그인하러가기</nuxt-link>
    </div>
  </div>
</template>
<script>
const USER_PROFILE = "프로필"
const HOME_MENU = "홈화면";
const ROOM_LIST_MENU = "방생성";
const FIND_MENU = "검색";
const SETTING_MENU = "설정";

export default {
  data() {
    return {
      items: [
        {title: "홈화면", icon: "mdi-home"},
        {title: "방생성", icon: "mdi-account-multiple"},
        {title: "검색", icon: "mdi-magnify"},
        {title: "설정", icon: "mdi-wrench"}
      ]

    }
  },
  computed: {
    getRooms() {
      return this.$store.state.room.roomList;
    },
    getUserInfo() {
      return this.$store.state.user.myInfo;
    }
  },
  methods: {
    async onClickMenuItem(title) {
      console.log(title)
      switch (title) {
        case HOME_MENU:
          await this.$router.push("/")
          break;
        case ROOM_LIST_MENU:
          await this.$router.push("/room");
          break;
        case FIND_MENU:
          await this.$router.push("/search");
          break;
        case SETTING_MENU:
          await this.$router.push("/setting");
          break;
        case USER_PROFILE:
          await this.$router.push("/profile");
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style scoped>

</style>