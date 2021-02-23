<template>
  <div class="article">
    <h1>Чат с клиентом</h1>
    Подключение: {{ connect }}
    <div>
      Представьтесь:
      <input
        id="username"
        type="text"
        class="form-control"
        :class="invalid_username"
        @input="setUsername"
        :value="username"
      />

      <br />
      Чат:
      <div class="chat_block" id="block">
        <div class="chat_item" v-for="item in chat" :key="item.id">
          <div v-if="ifMe(item.userId)" class="right">
            <div class="message">
              <div class="username">
                {{ item.username }}
              </div>
              <div class="text">
                {{ item.message }}
              </div>
            </div>
          </div>

          <div v-else class="left">
            <div class="message">
              <div class="username">
                {{ item.username }}
              </div>
              <div class="text">
                {{ item.message }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="events">{{ events }}</div>

      <div class="row g-3" style="margin-top: 5px;">
        <div class="col-md-9">
          <input
            @input="onInput"
            :value="message"
            v-on:keyup.enter="onEnter"
            class="form-control"
            :class="invalid"
            placeholder="Введите ваше сообщение"
          />
        </div>
        <div class="col-auto">
          <button
            id="sock-send-butt"
            type="button"
            value="send"
            @click="sendMessage()"
            class="btn btn-primary mb-3"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { chatMessage, getChat } from "@/api/server";
export default {
  data() {
    return {
      connect: false,
      message: "",
      socket: {},
      chat: [],
      username: "",
      events: "",
      typingTimer: {},
      tiping: false,
      userId: null,
      invalid: "",
      invalid_username: false,
    };
  },
  components: {},
  computed: {},
  created() {
    this.setSocket();
    this.getUsername();
    let userId = localStorage.getItem("user_id");
    if (!userId) {
      let userId = uuidv4();
      localStorage.setItem("user_id", userId);
    }
    this.userId = userId;
    this.getChat().then((responce) => {
      this.chat = responce;
      setTimeout(() => {
        var block = document.getElementById("block");
        block.scrollTop = block.scrollHeight;
      }, 50);
    });
  },
  methods: {
    ifMe(userId) {
      if (this.userId == userId) {
        return true;
      } else {
        return false;
      }
    },
    setSocket() {
      this.socket = new WebSocket("ws://77.222.52.130:8000");
      this.socket.onopen = this.setConnect;
      this.socket.onmessage = this.messageReceived;
    },
    setConnect() {
      this.connect = true;
      console.log("Подключение установлено");
    },
    messageReceived(e) {
      console.log("Ответ сервера: " + e.data);
      let r = JSON.parse(e.data);

      if (r.action) {
        if (r.userId != this.userId) {
          if (r.tiping === true) {
            this.events = `${r.username} печатает...`;
          } else {
            this.events = ``;
          }
        }
      } else {
        this.chat.push(JSON.parse(e.data));
        if (r.userId != this.userId) {
          var audio = new Audio("/03caf835a8af476.mp3");
          audio.play();
        }

        setTimeout(() => {
          var block = document.getElementById("block");
          block.scrollTop = block.scrollHeight;
        }, 50);
      }
    },
    sendMessage() {
      if (!this.username) {
        this.invalid_username = "is-invalid";
      } else {
        if (this.message) {
          let message =
            '{"username": "' +
            this.username +
            '","userId": "' +
            this.userId +
            '", "message":"' +
            this.message +
            '"}';
          this.socket.send(message);
          let rrr = this.saveMessage(message);
          this.message = "";
        } else {
          this.invalid = "is-invalid";
        }
      }
    },
    onInput(e) {
      if (e.target.value) {
        this.invalid = "";
      }

      this.message = e.target.value;
      if (!this.tiping) {
        this.tiping = true;
        this.socket.send(
          '{"username": "' +
            this.username +
            '","userId": "' +
            this.userId +
            '", "action": "tiping", "tiping": true}'
        );
      }

      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.tiping = false;
        this.socket.send(
          '{"username": "' +
            this.username +
            '","userId": "' +
            this.userId +
            '", "action": "tiping", "tiping": false}'
        );
      }, 1000);
    },
    onEnter() {
      this.sendMessage();
    },
    getUsername() {
      let username = localStorage.getItem("username");
      if (username) {
        this.username = username;
      }
    },
    setUsername(e) {
      this.invalid_username = false;
      this.username = e.target.value;
      localStorage.setItem("username", e.target.value);
    },
    saveMessage: async (message) => {
      let form_data = new FormData();
      form_data.append("message", message);
      let result = await chatMessage(form_data);
      console.log(result);
    },
    updateChat(message) {
      this.chat.push(message);
    },
    getChat: async () => {
      let result = await getChat();
      return result;
    },
  },
};
</script>

<style>
.chat_block {
  border: 1px solid #dee2e6;
  border-radius: 3px;
  height: calc(100vh - 350px);
  overflow-y: auto;
  padding: 20px;
}

.chat_item {
  overflow: hidden;
  margin-bottom: 20px;
}
.chat_item .message {
  background: #f5f5f5;
  box-shadow: 2px 2px 3px -2px #d2d2d2;
  padding: 5px;
  border-radius: 3px;
  width: 80%;
  float: left;
  margin-left: 10px;
}

.chat_item .icon {
  width: 40px;
  height: 40px;
  background: #0d6efd;
  float: left;
  border-radius: 50%;
}

.chat_item .right .message {
  float: right;
  margin-right: 10px;
  background: #e7f7ef;
}
.chat_item .right .icon {
  float: right;
  background: #198754;
}

.username {
  font-size: 13px;
  font-weight: bold;
  color: #005196;
}

.events {
  height: 20px;
  font-size: 13px;
  color: darkgrey;
}
</style>
